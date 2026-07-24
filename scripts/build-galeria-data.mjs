// scripts/build-galeria-data.mjs
// Deriva src/data/galeria.json (metadados leves) do manifesto pesado.
// Cada álbum vira { id, titulo, data, dataISO, nFotos }. As URLs das fotos NÃO
// vão pro cliente — são geradas pelo padrão <base>/<id>/<n>.webp (n=1..nFotos).

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(__dirname, 'galeria-manifest.json');
const OUT = path.join(ROOT, 'src', 'data', 'galeria.json');

async function main() {
  const albums = JSON.parse(await readFile(MANIFEST, 'utf8'));
  const data = albums
    .filter((a) => a.fotos.length > 0) // ignora álbuns vazios
    .map((a) => ({ id: a.id, titulo: a.titulo, data: a.data, dataISO: a.dataISO, nFotos: a.fotos.length }))
    .sort((x, y) => (y.dataISO || '').localeCompare(x.dataISO || '') || y.id - x.id);
  await writeFile(OUT, JSON.stringify(data, null, 1) + '\n', 'utf8');
  const totalFotos = data.reduce((n, a) => n + a.nFotos, 0);
  console.log(`✔ ${data.length} álbuns (${totalFotos} fotos) → ${path.relative(ROOT, OUT)}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
