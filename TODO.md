# TODO — GLOMAM

Lista de tarefas pendentes, melhorias planejadas e bugs conhecidos.

---

## Em andamento

- [ ] Aguardando cadastro das Lojas Nº 25 e Nº 32 (faltam na sequência numerada)
- [ ] Aguardando número oficial do WhatsApp (atualmente placeholder em `WhatsAppBtn.jsx`)
- [ ] Aguardando fotos dos Irmãos do Legislativo (27 cards usam iniciais como fallback)

---

## Funcionalidades pendentes

### Alta prioridade
- [ ] Substituir imagens placeholder (picsum.photos) do Álbum de Eventos por fotos reais
- [ ] Backend/API para persistência real da Intranet (atualmente apenas UI)
- [ ] Sistema de autenticação real em `/admin` (atualmente login sem validação de servidor)
- [ ] Upload real de fotos no Álbum de Eventos (atualmente dados hardcoded)
- [ ] Formulário de Newsletter com integração real (Mailchimp, Resend, etc.)
- [ ] Otimizar SVG oficial da logo (~17MB → rodar SVGO e hospedar versão reduzida em `/public`)

### Média prioridade
- [ ] Página de detalhe de notícia (`/imprensa/:slug`)
- [ ] Página de detalhe para cada Loja (`/lojas/:numero`)
- [ ] Link âncora `#album-eventos` no Header e Footer
- [ ] SEO: meta tags Open Graph e Twitter Card dinâmicas por página/rota
- [ ] Sitemap.xml e robots.txt
- [ ] Integrar Grão-Mestres no `photoDirectory.js` (fotos históricas do Memorial)

### Baixa prioridade
- [ ] Modo escuro (dark mode toggle)
- [ ] Internacionalização (PT-BR / EN / ES)
- [ ] PWA (Service Worker + manifest para instalação mobile)
- [ ] Testes automatizados (Vitest + Playwright)

---

## Melhorias técnicas

- [ ] Lazy loading dos componentes pesados (Three.js, Framer Motion) via `React.lazy`
- [ ] Otimização de imagens: converter `.png` para `.webp`
- [ ] Centralizar dados dos álbuns em `src/data/albums.js` (atualmente hardcoded no componente)
- [ ] Refatorar `Lideranca.jsx` para consumir `photoDirectory.js` (fonte única de verdade)
- [ ] Criar Design Tokens separados (arquivo `tokens.css`) em vez de variáveis inline
- [ ] Extrair CSS das páginas novas (`.jud-*`, `.lojas-*`, `.disp-*`, `.principios-*`, `.objetivos-*`) de `index.css` para arquivos dedicados

---

## Bugs conhecidos

- [ ] Cursor customizado (CSS) não funciona em alguns browsers mobile
- [ ] Carrossel de Grão-Mestres pode ter race condition no resize listener

---

## Concluído

- [x] Setup inicial React + Vite + React Router
- [x] Design system com paleta gold/slate/bg
- [x] Header fixo com navegação responsiva e drawer mobile
- [x] Seção Hero com SVG animado e parallax
- [x] Seção Pilares com cards 3D e mouse tracking
- [x] Memorial com timeline + carrossel de Grão-Mestres
- [x] Seção Nossa História
- [x] Seção Novidades (carrossel infinito)
- [x] Seção Liderança com pirâmide animada
- [x] Seção Depoimentos (Framer Motion)
- [x] Seção Famílias Paramaçônicas (flip cards)
- [x] Seção Projetos Sociais com mapa SVG do Amazonas
- [x] Escultura de Partículas 3D (Three.js WebGL)
- [x] FAQ accordion
- [x] Newsletter form (UI)
- [x] Seção Oriente (contato + Google Maps)
- [x] Footer institucional
- [x] Portal de Imprensa (`/imprensa`)
- [x] Brandbook completo (`/brandbook`)
- [x] Intranet Administrativa (`/admin/intranet`) — 8 módulos UI
- [x] Loader animado + barra de progresso de scroll
- [x] useReveal hook (Intersection Observer)
- [x] Deploy configurado no Netlify
- [x] **Álbum de Eventos** — grade de álbuns, modal com fotos, lightbox, download individual ✓ *aprovado 2026-04-06*
- [x] Fotos reais dos Grão-Mestres no carrossel ✓ *aprovado 2026-04-06*

### Atualização de 2026-04-14

- [x] **Paleta oficial institucional** — 9 tons (navy/blue/copper/gold) aplicados em todo o projeto, substituindo a paleta anterior
- [x] **Tipografia oficial alinhada** — Playfair Display (headings) + Lora (corpo literário) + Montserrat (UI)
- [x] **Seção Nossos Objetivos** na Home — 5 pilares interativos em abas verticais
- [x] **Rota `/principios`** — Síntese dos Princípios Maçônicos (14), Ser Maçom (9), Nossas Finalidades (9)
- [x] **Rota `/judiciario`** — Procuradoria, Corregedoria, 8 Juízes, Grande Secretário
- [x] **Rota `/legislativo`** — 27 Grandes Oficiais (Legislativo 2024/2025)
- [x] **Rota `/lojas`** — 50 Lojas filiadas, busca textual, filtro por Oriente (28 Orientes diferentes), expansão de detalhes
- [x] **Rota `/dispensario/quem-somos`** — carta institucional do Dispensário + CTA + contato + foto do Grão-Mestre
- [x] **Brandbook refeito:**
  - Logo oficial adaptativa (SVG colorida para fundos claros, PNG oficial dark para fundos escuros)
  - UI System com código-fonte de referência (botões, cards, formulários, ícones, animações)
  - Aba Diretrizes realinhada (9 tons oficiais, 32px mínimo, regras de aplicação)
  - Tipografia atualizada para o trio oficial
- [x] **Diretório central de fotos** (`src/data/photoDirectory.js`) com matching tolerante a aliases — Liderança, Judiciário e Legislativo consomem a mesma fonte
- [x] **Hash-scroll** inteligente para âncoras vindas de outras rotas (espera até 4s pela seção montar)
- [x] **Componente `WhatsAppBtn`** reutilizável com `cursor:pointer` e animação bounce
- [x] **Script `scripts/generate-pdf.mjs`** — gera PDF do site com screenshots full-page de todas as rotas (Playwright + pdf-lib)
- [x] Responsividade reforçada — grids com `minmax(min(Npx, 100%), 1fr)` para telas ≤320px
