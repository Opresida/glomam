# TODO — GLOMAM

Lista de tarefas pendentes, melhorias planejadas e bugs conhecidos.

---

## Em andamento

### Aguardando entrega do cliente
- [ ] **Token IG_ACCESS_TOKEN + IG_USER_ID** — configurar no Netlify (Site settings → Environment variables) e Build Hook pingado por cron-job.org a cada 6h. Ver README seção "Integração Instagram"
  - **Status 2026-05-25:** app `GLOMAM feed` criado no Meta for Developers (FB App ID `1025115713522309`, IG App ID `4304571463128427`). Caso de uso "Gerenciar mensagens e conteúdo no Instagram" configurado, mas usa o fluxo NOVO **Instagram API with Instagram Login** (`graph.instagram.com`, não `graph.facebook.com`).
  - **Parado em:** passo A da página "Personalizar caso de uso" — falta clicar **"Add all required permissions"** (instagram_business_basic + manage_comments + business_manage_messages), depois adicionar `@glomam` como Testador na aba **Funções do app → Funções**, e por fim clicar "Adicionar conta" no quadro 2 pra gerar o token.
  - **TODO Claude:** quando o token chegar, ajustar `scripts/fetch-instagram.mjs` pra usar endpoint `https://graph.instagram.com/v22.0/me/media` (em vez do `graph.facebook.com/{ig-user-id}/media`) e renomear permissão pra `instagram_business_basic`. ~10 linhas de mudança.
- [ ] **Revisão visual dos pinos do mapa** — cliente confirma quais Lojas estão fora do endereço exato (coordenadas ajustáveis em `src/data/lojasCoords.js`)

### Aguardando dados internos da GLOMAM
- [ ] Cadastro das Lojas Nº 25 e Nº 32 (faltam na sequência numerada)
- [ ] Número oficial do WhatsApp (atualmente placeholder em `WhatsAppBtn.jsx`)
- [ ] Fotos dos Irmãos do Legislativo (27 cards usam iniciais como fallback)

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

### Atualização de 2026-05-25

- [x] **Logos das ordens paramaçônicas integradas** em `src/components/Familias.jsx` — DeMolay, Filhas de Jó, Estrela do Oriente, Escudeiros agora exibem o brasão oficial PNG (`public/ordem-*.png`) em vez do SVG genérico, com nova classe `.fc-icon-logo` (clamp 56-78px, drop-shadow sutil) ✓ *aprovado 2026-05-25*
- [x] **Vídeo institucional no Hero** — substituída a imagem de fundo (`https://i.imgur.com/UMMFzmS.jpeg`) por `public/hero-glomam.mp4` em `src/components/Hero.jsx` (autoplay, muted, loop, playsinline, poster mantido como fallback). Overlay diagonal preservado com opacidade ajustada (.70/.78) pra manter legibilidade do título sobre vídeo em movimento. Nova classe `.hero-banner-video` (object-fit cover, z-index 0) ✓ *aprovado 2026-05-25*
- [x] **Otimização do vídeo Hero** — re-encode H.264 CRF 28 / 30fps / sem áudio: 7.23 MB → 4.42 MB (-39%) ✓ *aprovado 2026-05-25*
- [x] **Infra de integração Instagram (build-time)** — `scripts/fetch-instagram.mjs` puxa últimos 3 posts via Graph API no `prebuild`, grava `src/data/instagram.json`. `Novidades.jsx` consome o JSON e faz fallback automático pra `data/noticias.js` se vazio. Soft-abort sem env vars não quebra build. Token long-lived é auto-refreshed e novo valor é logado no build. Falta apenas configurar `IG_USER_ID` + `IG_ACCESS_TOKEN` no Netlify e webhook de cron (ver README seção "Integração Instagram") ✓ *aprovado 2026-05-25*

### Atualização de 2026-05-20

- [x] **`CLAUDE.md` portátil** na raiz do repo — pacote de contexto para Claude Code em qualquer máquina (preferências do usuário, paleta oficial, padrões, regras invioláveis)
- [x] **Paleta corrigida em CONTEXT.md e PROJECT_CONTEXT.md** — ambos referenciavam paleta antiga (gold marrom `#b4975a`, slate `#1a2332`) mesmo após o commit que migrou para os 9 tons
- [x] **Header transparente no topo** — transição suave para azul-escuro `#123b61` com `backdrop-filter: blur(14px)` quando `window.scrollY > 60`
- [x] **Hero reformulado:**
  - Copy nova: "**A Grande Loja** *mais antiga do Brasil*" (sem subtítulo, sem stats, sem CTAs)
  - Mantida a animação de fade-up no título
- [x] **Hierarquia do logo invertida** no Header — texto principal "Grande Loja Maçônica do Amazonas" (Playfair Display, branco) + sigla "GLOMAM" abaixo (Lora, gold, letter-spacing forte)
- [x] **Responsividade do logo** ajustada em 768px/480px/360px — em 360px a sigla é ocultada para deixar só o nome completo
- [x] **Logo institucional atualizada** — `https://i.imgur.com/0bVk0qx.png` aplicada em Header.jsx e Footer.jsx
- [x] **Logo do Dispensário** adicionada na rota `/dispensario/quem-somos` (centralizada, drop-shadow, responsiva clamp 160-360px)
- [x] **Seção `<WelcomeSection />` removida** da Home (e estilos `.welcome-*` órfãos limpos do CSS)
- [x] **Seção e rotas de Doação removidas:**
  - Componente `src/components/ApoioProjetos.jsx` (deletado)
  - Página `src/pages/Doacao.jsx` (deletada)
  - Rota `/doar/:currency` (removida de `App.jsx`)
  - ~70 linhas de CSS `.ap-*` e `.doa-*` (removidas de `index.css`)
- [x] **Nova seção `<MapaLojas />`** na Home (entre Famílias Paramaçônicas e FAQ):
  - **Stack:** Leaflet 1.x + react-leaflet + OpenStreetMap (grátis, sem API key)
  - **Toggle Manaus / Interior do Amazonas**
  - 48 Lojas geolocalizadas em `src/data/lojasCoords.js`
  - 28 cidades do interior (centros municipais — alta confiança)
  - 21 Lojas em Manaus agrupadas por endereço (5 condomínios maçônicos compartilhados)
  - Pinos custom em SVG no tema GLOMAM (gold + slate)
  - Popup customizado com nome, endereço, link para Google Maps de cada Loja
  - CSS dark-mode override do Leaflet (`.leaflet-popup-content-wrapper`, controles de zoom, attribution)
- [x] **Botão "Como Chegar?"** em cada card da rota `/lojas`:
  - Modal `src/components/ComoChegarModal.jsx`
  - 3 opções universais (Google Maps + Waze + Uber)
  - + Apple Maps detectado automaticamente em iOS
  - Usa lat/lng exatos quando disponíveis, fallback endereço completo
  - Mobile: vira bottom sheet (≤540px)
  - Fecha com ESC, click fora ou X
- [x] **Legibilidade do `loja-rito`** melhorada — Playfair uppercase `.5rem` letter-spacing `.32em` → Lora itálica `.92rem` letter-spacing `.02em` (público idoso)
- [x] **Grid de Lojas corrigido** — `auto-fit` → `auto-fill` + `justify-content: center` resolve bug do card único esticando ao filtrar
- [x] **Email institucional** trocado de `secretaria@glomam.org.br` para `glomam@glomam.org.br` em 6 ocorrências (1 em Oriente.jsx + 5 em Brandbook.jsx)
