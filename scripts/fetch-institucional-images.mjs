// scripts/fetch-institucional-images.mjs
//
// Baixa as fotos das notícias institucionais (raspadas do site oficial glomam.org.br)
// e converte para webp otimizado em public/institucional/<id>/.
//
// Entrada: scripts/institucional-manifest.json
//   [{ id: 7057, cover: "https://sis.glomam.org.br/Storage/?uid=...", gallery: ["...", ...] }, ...]
//
// Saída: public/institucional/<id>/capa.webp, 01.webp, 02.webp, ...
//
// Idempotente: pula arquivos que já existem (seguro re-rodar a cada página nova).
// Uso: node scripts/fetch-institucional-images.mjs

import { readFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(__dirname, 'institucional-manifest.json');
const OUT_ROOT = path.join(ROOT, 'public', 'institucional');

const MAX_WIDTH = 1600;   // reduz peso sem perder qualidade de leitura
const QUALITY = 80;       // webp quality

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function downloadBuffer(url, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(45000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ab = await res.arrayBuffer();
      const buf = Buffer.from(ab);
      if (buf.length < 100) throw new Error(`resposta muito pequena (${buf.length}b)`);
      return buf;
    } catch (e) {
      lastErr = e;
      await new Promise(r => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

async function saveWebp(url, destPath) {
  if (await exists(destPath)) return 'skip';
  const buf = await downloadBuffer(url);
  await sharp(buf)
    .rotate() // respeita EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destPath);
  return 'ok';
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  let okCount = 0, skipCount = 0, failCount = 0;
  const fails = [];

  for (const item of manifest) {
    const dir = path.join(OUT_ROOT, String(item.id));
    await mkdir(dir, { recursive: true });

    // Capa
    if (item.cover) {
      try {
        const r = await saveWebp(item.cover, path.join(dir, 'capa.webp'));
        r === 'ok' ? okCount++ : skipCount++;
      } catch (e) { failCount++; fails.push(`${item.id}/capa: ${e.message}`); }
    }

    // Galeria
    const gallery = Array.isArray(item.gallery) ? item.gallery : [];
    for (let i = 0; i < gallery.length; i++) {
      const name = String(i + 1).padStart(2, '0') + '.webp';
      try {
        const r = await saveWebp(gallery[i], path.join(dir, name));
        r === 'ok' ? okCount++ : skipCount++;
      } catch (e) { failCount++; fails.push(`${item.id}/${name}: ${e.message}`); }
    }
    process.stdout.write(`  [${item.id}] capa + ${gallery.length} fotos\n`);
  }

  console.log(`\n✔ Imagens: ${okCount} baixadas, ${skipCount} já existiam, ${failCount} falhas.`);
  if (fails.length) {
    console.log('Falhas:');
    for (const f of fails) console.log('  - ' + f);
    process.exitCode = 1;
  }
}

main().catch(e => { console.error(e); process.exit(1); });
