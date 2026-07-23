// scripts/build-institucional-data.mjs
//
// Transforma o raspado bruto (scripts/institucional-raw.json) em:
//   1. scripts/institucional-manifest.json   → mapa de imagens remotas p/ o downloader
//   2. src/data/noticiasInstitucionais.json  → dados finais com caminhos LOCAIS (usado pelo React)
//
// Determinístico e idempotente. Uso: node scripts/build-institucional-data.mjs

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(__dirname, 'institucional-raw.json');
const MANIFEST = path.join(__dirname, 'institucional-manifest.json');
const DATA = path.join(ROOT, 'src', 'data', 'noticiasInstitucionais.json');

// "31/08/2025" -> "2025-08-31" (para ordenação). Retorna "" se não casar.
function toISO(data) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((data || '').trim());
  if (!m) return '';
  return `${m[3]}-${m[2]}-${m[1]}`;
}

async function main() {
  const raw = JSON.parse(await readFile(RAW, 'utf8'));

  const manifest = [];
  const data = [];

  for (const a of raw) {
    const id = a.id;
    const base = `/institucional/${id}`;

    // Manifesto de imagens (URLs remotas -> baixadas pelo fetch script na mesma ordem)
    manifest.push({ id, cover: a.cover || '', gallery: Array.isArray(a.gallery) ? a.gallery : [] });

    // Caminhos locais determinísticos (batem com o fetch script)
    const galeria = (Array.isArray(a.gallery) ? a.gallery : [])
      .map((_, i) => `${base}/${String(i + 1).padStart(2, '0')}.webp`);
    // Matérias antigas (2017-18) não têm og:image → usa a 1ª foto da galeria como capa
    const capa = a.cover ? `${base}/capa.webp` : (galeria[0] || '');

    data.push({
      id,
      titulo: a.titulo || '',
      data: a.data || '',
      dataISO: toISO(a.data),
      subtitulo: a.subtitulo || '',
      corpo: Array.isArray(a.corpo) ? a.corpo : [],
      creditos: {
        texto: a.creditos?.texto || '',
        edicao: a.creditos?.edicao || '',
      },
      categoria: 'Institucional',
      capa,
      galeria,
      fonteUrl: a.fonteUrl || `https://www.glomam.org.br/noticia/${id}`,
    });
  }

  // Ordena por data (mais recente primeiro); desempate por id desc
  data.sort((x, y) => {
    if (x.dataISO && y.dataISO && x.dataISO !== y.dataISO) return y.dataISO.localeCompare(x.dataISO);
    return y.id - x.id;
  });

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  await writeFile(DATA, JSON.stringify(data, null, 2) + '\n', 'utf8');

  const fotos = manifest.reduce((n, m) => n + (m.cover ? 1 : 0) + m.gallery.length, 0);
  console.log(`✔ ${data.length} matérias → ${path.relative(ROOT, DATA)}`);
  console.log(`✔ ${fotos} imagens no manifesto → ${path.relative(ROOT, MANIFEST)}`);
}

main().catch(e => { console.error(e); process.exit(1); });
