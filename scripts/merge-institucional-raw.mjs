// scripts/merge-institucional-raw.mjs
//
// Junta o bruto de todas as páginas em scripts/institucional-raw.json.
// Fontes: o próprio institucional-raw.json (se já existir) + scripts/raw-pages/*.json.
// Dedupe por id, ordena por id DESC. Idempotente.
//
// Uso: node scripts/merge-institucional-raw.mjs

import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, 'institucional-raw.json');
const PAGES_DIR = path.join(__dirname, 'raw-pages');

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function readArray(p) {
  try {
    const v = JSON.parse(await readFile(p, 'utf8'));
    return Array.isArray(v) ? v : [];
  } catch { return []; }
}

async function main() {
  const byId = new Map();
  let sources = 0;

  // Base: raw consolidado atual (mantém páginas já mergeadas antes)
  if (await exists(RAW)) {
    for (const a of await readArray(RAW)) if (a && a.id != null) byId.set(a.id, a);
    sources++;
  }

  // Páginas novas
  if (await exists(PAGES_DIR)) {
    const files = (await readdir(PAGES_DIR)).filter(f => f.endsWith('.json')).sort();
    for (const f of files) {
      const arr = await readArray(path.join(PAGES_DIR, f));
      for (const a of arr) if (a && a.id != null) byId.set(a.id, a);
      sources++;
    }
  }

  const merged = [...byId.values()].sort((a, b) => b.id - a.id);
  await writeFile(RAW, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`✔ Merge: ${merged.length} matérias (de ${sources} fontes) → institucional-raw.json`);
  console.log(`  ids: ${merged.map(m => m.id).join(', ')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
