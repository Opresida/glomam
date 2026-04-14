#!/usr/bin/env node
/**
 * Gera um PDF único com screenshots full-page de todas as rotas do site.
 *
 * Pré-requisitos:
 *   1. O dev server do Vite precisa estar rodando em http://localhost:5000
 *      (rode `npm run dev` em outro terminal antes de executar este script).
 *   2. Dependências instaladas: playwright + pdf-lib.
 *      Na primeira vez, rode: npm run pdf:setup
 *
 * Uso:
 *   node scripts/generate-pdf.js
 *   ou:  npm run pdf
 *
 * Saída: ./glomam-site.pdf
 */

import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// ── Config ─────────────────────────────────────────────────────────────
const BASE = process.env.BASE_URL || 'http://localhost:5000';
const OUT_FILE = path.join(rootDir, 'glomam-site.pdf');
const VIEWPORT = { width: 1920, height: 1080 };

const routes = [
  { path: '/', title: 'Home' },
  { path: '/principios', title: 'Princípios' },
  { path: '/judiciario', title: 'Judiciário' },
  { path: '/legislativo', title: 'Legislativo' },
  { path: '/lojas', title: 'Lojas' },
  { path: '/dispensario/quem-somos', title: 'Dispensário — Quem Somos' },
  { path: '/imprensa', title: 'Imprensa' },
  { path: '/brandbook', title: 'Brandbook' },
];
// ───────────────────────────────────────────────────────────────────────

async function checkServer() {
  try {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error(`\n❌ Dev server não está acessível em ${BASE}`);
    console.error(`   Rode "npm run dev" em outro terminal e tente novamente.\n`);
    process.exit(1);
  }
}

async function main() {
  await checkServer();

  console.log(`\n🚀 Gerando PDF do site GLOMAM`);
  console.log(`   Base: ${BASE}`);
  console.log(`   Viewport: ${VIEWPORT.width}×${VIEWPORT.height}`);
  console.log(`   Rotas: ${routes.length}\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  const page = await context.newPage();

  const finalPdf = await PDFDocument.create();

  for (const [i, route] of routes.entries()) {
    const url = `${BASE}${route.path}`;
    process.stdout.write(`[${i + 1}/${routes.length}] ${route.title.padEnd(32)} ${route.path} ... `);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Aguarda animações reveal + lazy-loaded images
      await page.waitForTimeout(2500);

      // Scroll até o fim pra disparar lazy-loading, depois volta
      await page.evaluate(async () => {
        await new Promise(resolve => {
          let y = 0;
          const step = 400;
          const timer = setInterval(() => {
            window.scrollBy(0, step);
            y += step;
            if (y >= document.body.scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              setTimeout(resolve, 600);
            }
          }, 120);
        });
      });

      const pdfBytes = await page.pdf({
        printBackground: true,
        preferCSSPageSize: false,
        width: `${VIEWPORT.width}px`,
        height: await page.evaluate(() => document.body.scrollHeight) + 'px',
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      const srcPdf = await PDFDocument.load(pdfBytes);
      const pages = await finalPdf.copyPages(srcPdf, srcPdf.getPageIndices());
      pages.forEach(p => finalPdf.addPage(p));

      console.log('✓');
    } catch (err) {
      console.log(`✗  (${err.message})`);
    }
  }

  await browser.close();

  const finalBytes = await finalPdf.save();
  await fs.writeFile(OUT_FILE, finalBytes);

  const sizeMB = (finalBytes.byteLength / 1024 / 1024).toFixed(2);
  console.log(`\n✅ PDF gerado: ${path.relative(rootDir, OUT_FILE)} (${sizeMB} MB)\n`);
}

main().catch(err => {
  console.error('\n❌ Falha:', err);
  process.exit(1);
});
