#!/usr/bin/env node
/**
 * Gera a Open Graph image (1200x630) usada nas meta tags do site.
 *
 * Pré-requisitos:
 *   - Dependências instaladas (pnpm pdf:setup já cobre)
 *
 * Uso:
 *   node scripts/generate-og-image.mjs
 *
 * Saída: ./public/og-image.png
 */

import { chromium } from 'playwright';
import { writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'og-image.png');
const LOGO_PATH = join(__dirname, '..', 'public', 'logo-glomam-transparent.png');

const logoBase64 = (await readFile(LOGO_PATH)).toString('base64');
const logoDataUrl = `data:image/png;base64,${logoBase64}`;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: linear-gradient(135deg, #161d34 0%, #172d4b 60%, #123b61 100%);
    color: #fff;
    font-family: 'Playfair Display', serif;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 70px 80px;
  }
  /* gold radial accent */
  body::before {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(211,165,76,.15) 0%, transparent 70%);
    pointer-events: none;
  }
  body::after {
    content: '';
    position: absolute;
    bottom: -250px; left: -250px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(0,85,135,.25) 0%, transparent 70%);
    pointer-events: none;
  }
  .logo {
    width: 160px;
    height: 160px;
    margin-bottom: 36px;
    filter: drop-shadow(0 6px 28px rgba(0,0,0,.5));
    z-index: 2;
    object-fit: contain;
  }
  .title {
    font-size: 78px;
    font-weight: 500;
    line-height: 1.05;
    text-align: center;
    letter-spacing: -.005em;
    color: #fff;
    margin-bottom: 8px;
    z-index: 2;
  }
  .title em {
    font-style: italic;
    font-weight: 600;
    color: #d3a54c;
  }
  .divider {
    width: 140px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d3a54c 30%, #d3a54c 70%, transparent);
    margin: 32px 0 22px;
    z-index: 2;
  }
  .subtitle {
    font-family: 'Lora', serif;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: rgba(255,255,255,.78);
    z-index: 2;
  }
  .footer {
    position: absolute;
    bottom: 36px;
    font-family: 'Lora', serif;
    font-size: 17px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(211,165,76,.62);
    z-index: 2;
  }
</style>
</head>
<body>
  <img class="logo" src="${logoDataUrl}" alt="GLOMAM" />
  <h1 class="title">A Grande Loja<br><em>mais antiga do Brasil</em></h1>
  <div class="divider"></div>
  <p class="subtitle">GLOMAM · Grande Loja Maçônica do Amazonas</p>
  <div class="footer">Tradição · Regularidade · Progresso</div>
</body>
</html>`;

async function main() {
  console.log('[og-image] launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  console.log('[og-image] loading template...');
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready.then(() => true));
  await page.waitForTimeout(500);

  console.log('[og-image] capturing screenshot...');
  const buffer = await page.screenshot({ type: 'png', omitBackground: false, fullPage: false });
  await writeFile(OUTPUT_PATH, buffer);

  await browser.close();
  console.log(`[og-image:ok] saved to ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error('[og-image:error]', e);
  process.exit(1);
});
