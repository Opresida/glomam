// scripts/galeria-scrape.mjs
//
// Monta o manifesto da galeria do site antigo (glomam.org.br/galeria):
//   - Lê a listagem → álbuns (id, título, data, capa-thumb)
//   - Para cada álbum, lê a página → URLs das fotos (largura880)
// Saída: scripts/galeria-manifest.json  [{ id, titulo, data, dataISO, fotos:[url,...] }, ...]
//
// Só HTTP (fetch) — zero firecrawl, zero IA. Uso: node scripts/galeria-scrape.mjs

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'galeria-manifest.json');
const UA = { headers: { 'User-Agent': 'Mozilla/5.0' } };
const LISTA = 'https://www.glomam.org.br/galeria';

function decode(s) {
  return (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
const iso = (d) => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d || ''); return m ? `${m[3]}-${m[2]}-${m[1]}` : ''; };

async function getText(url, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...UA, signal: AbortSignal.timeout(60000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) { last = e; await new Promise(r => setTimeout(r, 800 * (i + 1))); }
  }
  throw last;
}

// pool de concorrência
async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx], idx); }
  }));
  return out;
}

function parseListagem(html) {
  // Legenda: <h5><span...>DATE</span></h5> <p><strong> TITLE</strong></p> ... <a href="galeria/ID" class="btn...">
  const re = /<h5><span[^>]*>([^<]+)<\/span><\/h5>\s*<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>[\s\S]*?href="galeria\/(\d+)"[^>]*class="btn/g;
  const map = new Map();
  let m;
  while ((m = re.exec(html))) {
    const id = Number(m[3]);
    if (map.has(id)) continue;
    map.set(id, { id, data: decode(m[1]), titulo: decode(m[2]) });
  }
  return [...map.values()];
}

function parseFotos(html) {
  const re = /https:\/\/sis\.glomam\.org\.br\/Storage\/161\/[0-9/]+\/largura880\/[A-Za-z0-9]+\.(?:jpg|jpeg|png)/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html))) { if (!seen.has(m[0])) { seen.add(m[0]); out.push(m[0]); } }
  return out;
}

async function main() {
  console.log('Lendo listagem…');
  const albums = parseListagem(await getText(LISTA));
  console.log(`Álbuns encontrados: ${albums.length}`);

  let done = 0;
  const full = await pool(albums, 12, async (a) => {
    let fotos = [];
    try { fotos = parseFotos(await getText(`https://www.glomam.org.br/galeria/${a.id}`)); }
    catch (e) { console.log(`  ! álbum ${a.id} falhou: ${e.message}`); }
    done++;
    if (done % 40 === 0) process.stdout.write(`  ${done}/${albums.length} álbuns…\n`);
    return { id: a.id, titulo: a.titulo, data: a.data, dataISO: iso(a.data), fotos };
  });

  full.sort((x, y) => (y.dataISO || '').localeCompare(x.dataISO || '') || y.id - x.id);
  await writeFile(OUT, JSON.stringify(full, null, 1), 'utf8');

  const totalFotos = full.reduce((n, a) => n + a.fotos.length, 0);
  const vazios = full.filter(a => a.fotos.length === 0).map(a => a.id);
  console.log(`\n✔ ${full.length} álbuns, ${totalFotos} fotos → ${path.relative(path.join(__dirname, '..'), OUT)}`);
  console.log(`  álbuns sem foto: ${vazios.length}${vazios.length ? ' (' + vazios.join(',') + ')' : ''}`);
}

main().catch(e => { console.error(e); process.exit(1); });
