// scripts/fetch-revistas.mjs
//
// Baixa as revistas do site antigo (glomam.org.br/jornal):
//   - CAPAS  → public/revistas/<coverUid>.webp   (leve, versionado no git)
//   - PDFs   → ../glomam-revistas-staging/<pdfUid>.pdf   (FORA do git — subir no bucket externo)
//
// Idempotente (pula o que já existe). Uso:
//   node scripts/fetch-revistas.mjs           # capas + PDFs
//   node scripts/fetch-revistas.mjs --covers  # só capas
//   node scripts/fetch-revistas.mjs --pdfs    # só PDFs

import { readFile, mkdir, access, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'src', 'data', 'revistas.json');
const OUT_COVERS = path.join(ROOT, 'public', 'revistas');
const OUT_PDFS = path.resolve(ROOT, '..', 'glomam-revistas-staging');

const STORAGE = (uid, modo) => `https://sis.glomam.org.br/Storage/?uid=${uid}&modo=${modo}&modos=1`;

const args = process.argv.slice(2);
const only = args.includes('--covers') ? 'covers' : args.includes('--pdfs') ? 'pdfs' : 'both';

async function exists(p) { try { await access(p, constants.F_OK); return true; } catch { return false; } }

async function download(url, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) throw new Error(`muito pequeno (${buf.length}b)`);
      return buf;
    } catch (e) { last = e; await new Promise(r => setTimeout(r, 1000 * (i + 1))); }
  }
  throw last;
}

async function main() {
  const revistas = JSON.parse(await readFile(DATA, 'utf8'));
  await mkdir(OUT_COVERS, { recursive: true });
  if (only !== 'covers') await mkdir(OUT_PDFS, { recursive: true });

  let capaOk = 0, capaSkip = 0, pdfOk = 0, pdfSkip = 0, semPdf = 0;
  const fails = [];

  for (const r of revistas) {
    // Capa → webp
    if (only !== 'pdfs') {
      const dest = path.join(OUT_COVERS, `${r.coverUid}.webp`);
      if (await exists(dest)) { capaSkip++; }
      else {
        try {
          const buf = await download(STORAGE(r.coverUid, 'ver'));
          await sharp(buf).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
          capaOk++;
        } catch (e) { fails.push(`capa ${r.coverUid}: ${e.message}`); }
      }
    }
    // PDF → staging
    if (only !== 'covers') {
      if (!r.pdfUid) { semPdf++; }
      else {
        const dest = path.join(OUT_PDFS, `${r.pdfUid}.pdf`);
        if (await exists(dest)) { pdfSkip++; }
        else {
          try {
            const buf = await download(STORAGE(r.pdfUid, 'download'));
            if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('não é PDF');
            await writeFile(dest, buf);
            pdfOk++;
            process.stdout.write(`  [pdf ${r.pdfUid}] ${(buf.length / 1048576).toFixed(1)} MB — ${r.titulo}\n`);
          } catch (e) { fails.push(`pdf ${r.pdfUid}: ${e.message}`); }
        }
      }
    }
  }

  console.log(`\n✔ Capas: ${capaOk} baixadas, ${capaSkip} já existiam → public/revistas/`);
  if (only !== 'covers') console.log(`✔ PDFs: ${pdfOk} baixados, ${pdfSkip} já existiam, ${semPdf} sem PDF na origem → ${path.relative(ROOT, OUT_PDFS)}`);
  if (fails.length) { console.log('Falhas:'); fails.forEach(f => console.log('  - ' + f)); process.exitCode = 1; }
}

main().catch(e => { console.error(e); process.exit(1); });
