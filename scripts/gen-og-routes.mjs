// Pós-build: gera HTMLs pré-renderizados por rota com meta tags Open Graph
// exclusivas. Necessário porque a SPA serve o mesmo index.html em todas as
// rotas, e os robôs de link (WhatsApp/Facebook/Twitter) NÃO executam JS —
// leem apenas o HTML estático. O Netlify serve o arquivo estático da rota
// (que existe fisicamente) antes de aplicar o redirect SPA, então o React
// continua montando a página normalmente.
//
// Para adicionar mais rotas com OG próprio, basta acrescentar um item em ROTAS.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const BASE = 'https://glomamam.netlify.app';

const ROTAS = [
  {
    path: 'damasdafraternidade',
    title: 'Chá das Acácias — 1ª Edição 2026 | Damas da Fraternidade',
    description:
      '15 de agosto de 2026, em Manaus. Inscreva-se no Chá das Acácias das Damas da Fraternidade — GLOMAM. Mulheres que inspiram e fortalecem a família e a maçonaria.',
    image: `${BASE}/og-cha-das-acacias.png`,
    imageAlt: 'Chá das Acácias — 1ª Edição 2026 · Damas da Fraternidade',
  },
];

// Escapa aspas duplas para uso seguro em atributos HTML.
const attr = (s) => String(s).replace(/"/g, '&quot;');

function aplicarMeta(html, rota) {
  const url = `${BASE}/${rota.path}`;
  const repl = [
    [/<title>[\s\S]*?<\/title>/, `<title>${rota.title}</title>`],
    [/(<meta name="description" content=")[^"]*(">)/, `$1${attr(rota.description)}$2`],
    [/(<meta property="og:title" content=")[^"]*(">)/, `$1${attr(rota.title)}$2`],
    [/(<meta property="og:description" content=")[^"]*(">)/, `$1${attr(rota.description)}$2`],
    [/(<meta property="og:url" content=")[^"]*(">)/, `$1${attr(url)}$2`],
    [/(<meta property="og:image" content=")[^"]*(">)/, `$1${attr(rota.image)}$2`],
    [/(<meta property="og:image:alt" content=")[^"]*(">)/, `$1${attr(rota.imageAlt)}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(">)/, `$1${attr(rota.title)}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${attr(rota.description)}$2`],
    [/(<meta name="twitter:image" content=")[^"]*(">)/, `$1${attr(rota.image)}$2`],
    [/(<meta name="twitter:image:alt" content=")[^"]*(">)/, `$1${attr(rota.imageAlt)}$2`],
  ];
  return repl.reduce((acc, [re, sub]) => acc.replace(re, sub), html);
}

const indexHtml = readFileSync(resolve(DIST, 'index.html'), 'utf8');

for (const rota of ROTAS) {
  const out = aplicarMeta(indexHtml, rota);
  const dir = resolve(DIST, rota.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), out, 'utf8');
  console.log(`[og-routes] gerado dist/${rota.path}/index.html`);
}
