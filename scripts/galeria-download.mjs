// scripts/galeria-download.mjs
//
// Baixa as fotos da galeria (largura880 do site antigo) e converte pra webp:
//   <STAGING>/<albumId>/<n>.webp     (full ~880px, q78)
//   <STAGING>/<albumId>/<n>_t.webp   (thumb ~400px, q72)
// STAGING = ../glomam-galeria-staging (FORA do git → sobe no R2 depois).
//
// n = 1..N na ordem do manifesto. Idempotente (pula o que já existe). Resumível.
// Uso: node scripts/galeria-download.mjs

import { readFile, mkdir, access, appendFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(__dirname, 'galeria-manifest.json');
const STAGING = path.resolve(ROOT, '..', 'glomam-galeria-staging');
const FAILLOG = path.join(__dirname, 'galeria-fails.log');
const UA = { headers: { 'User-Agent': 'Mozilla/5.0' } };

const CONC = 12;
const FULL_W = 880, FULL_Q = 78;
const THUMB_W = 400, THUMB_Q = 72;

async function exists(p) { try { await access(p, constants.F_OK); return true; } catch { return false; } }

async function dl(url, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...UA, signal: AbortSignal.timeout(60000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const b = Buffer.from(await r.arrayBuffer());
      if (b.length < 500) throw new Error(`pequeno (${b.length}b)`);
      return b;
    } catch (e) { last = e; await new Promise(r => setTimeout(r, 700 * (i + 1))); }
  }
  throw last;
}

async function main() {
  const albums = JSON.parse(await readFile(MANIFEST, 'utf8'));
  // achata: uma tarefa por foto
  const tasks = [];
  for (const a of albums) {
    for (let i = 0; i < a.fotos.length; i++) {
      tasks.push({ albumId: a.id, n: i + 1, url: a.fotos[i] });
    }
  }
  const TOTAL = tasks.length;
  console.log(`${albums.length} álbuns, ${TOTAL} fotos. STAGING=${STAGING}`);

  let ok = 0, skip = 0, fail = 0, bytes = 0, done = 0;
  let i = 0;
  const t0 = Date.now();

  async function worker() {
    while (i < tasks.length) {
      const t = tasks[i++];
      const dir = path.join(STAGING, String(t.albumId));
      const full = path.join(dir, `${t.n}.webp`);
      const thumb = path.join(dir, `${t.n}_t.webp`);
      try {
        if ((await exists(full)) && (await exists(thumb))) { skip++; }
        else {
          await mkdir(dir, { recursive: true });
          const buf = await dl(t.url);
          const img = sharp(buf).rotate();
          await img.clone().resize({ width: FULL_W, withoutEnlargement: true }).webp({ quality: FULL_Q }).toFile(full);
          await img.clone().resize({ width: THUMB_W, withoutEnlargement: true }).webp({ quality: THUMB_Q }).toFile(thumb);
          bytes += buf.length; ok++;
        }
      } catch (e) {
        fail++;
        await appendFile(FAILLOG, `${t.albumId}/${t.n} ${t.url} ${e.message}\n`).catch(() => {});
      }
      done++;
      if (done % 500 === 0) {
        const s = (Date.now() - t0) / 1000;
        console.log(`  ${done}/${TOTAL} (${(done / TOTAL * 100).toFixed(0)}%) | ok ${ok} skip ${skip} fail ${fail} | ${(bytes / 1048576).toFixed(0)} MB baixados | ${(done / s).toFixed(1)} fotos/s`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONC }, worker));
  console.log(`\n✔ Fim: ${ok} convertidas, ${skip} já existiam, ${fail} falhas. Baixado: ${(bytes / 1048576).toFixed(0)} MB.`);
  if (fail) console.log(`  Falhas registradas em ${path.relative(ROOT, FAILLOG)}`);
}

main().catch(e => { console.error(e); process.exit(1); });
