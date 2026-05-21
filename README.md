# GLOMAM — Grande Loja Maçônica do Amazonas

<p align="center">
  <strong>Ad Gloriam et Honorem</strong><br>
  <em>Tradição · Regularidade · Progresso</em>
</p>

Site institucional e intranet administrativa da Grande Loja Maçônica do Amazonas, potência maçônica regular fundada em 1904, Manaus/AM. O projeto combina um portal público de 16 seções interativas com um painel de gestão organizacional completo.

**URL de produção:** Netlify (deploy automático via push na main)
**Ambiente de dev:** `http://localhost:5000`

---

## Instalação e Uso

### Pré-requisitos

- Node.js >= 18
- **pnpm** (obrigatório — projeto padronizado em pnpm, ver `netlify.toml`)

Se não tiver pnpm, instale com: `corepack enable && corepack prepare pnpm@latest --activate` ou `npm install -g pnpm`.

### Instalação

```bash
git clone https://github.com/Opresida/glomam.git
cd glomam
pnpm install
```

### Rodar em desenvolvimento

```bash
pnpm dev
# Acesse: http://localhost:5000
```

### Build para produção

```bash
pnpm build
pnpm preview   # preview local do build
```

> ⚠️ **Não use `npm install` neste projeto** — vai criar um `package-lock.json` que conflita com o `pnpm-lock.yaml` usado pelo Netlify e quebra o deploy. O `package-lock.json` está no `.gitignore` por segurança.

### Deploy

Deploy automático na **Netlify** via `netlify.toml`. Qualquer push na branch principal dispara o deploy.

---

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Página institucional (17 seções) |
| `/principios` | Princípios Maçônicos — 3 blocos (Síntese, Ser Maçom, Nossas Finalidades) |
| `/judiciario` | Judiciário GLOMAM — Procuradoria, Corregedoria, Juízes, Secretaria |
| `/legislativo` | Legislativo GLOMAM — 27 Grandes Oficiais |
| `/lojas` | Lojas filiadas — 50 cadastradas com busca e filtro por Oriente |
| `/dispensario/quem-somos` | Dispensário Maçônico — carta de apresentação |
| `/imprensa` | Portal de notícias |
| `/brandbook` | Manual de identidade visual |
| `/admin` | Login administrativo |
| `/admin/intranet` | Painel administrativo (8 módulos) |

---

## Stack Tecnológica

- **Linguagem:** JavaScript (JSX)
- **Framework:** React 19 + Vite 8
- **Roteamento:** React Router DOM 7
- **Animações:** Framer Motion 12 + CSS custom animations
- **3D/WebGL:** Three.js 0.183.2
- **Mapas:** Leaflet 1.x + react-leaflet (OpenStreetMap, sem API key)
- **Estilização:** CSS puro com variáveis custom (sem Tailwind, sem CSS Modules)
- **Hospedagem:** Netlify (static SPA)
- **Ferramentas de IA:** Claude Code + RTK

> Dependências de produção minimalistas — bundle leve e rápido.

---

## Arquitetura

### Visão Geral

```
SPA estática (React + Vite)
        │
        ├── Portal Público (/)
        │     └── Home.jsx → 16 componentes em sequência
        │
        ├── Imprensa (/imprensa)
        │     └── dados de src/data/noticias.js
        │
        ├── Brandbook (/brandbook)
        │     └── documentação visual standalone
        │
        └── Intranet (/admin/intranet)
              └── AdminIntranet.jsx → roteamento por abas → 8 subpáginas
```

### Estrutura de Pastas

```
glomam/
├── public/                    # Assets estáticos servidos diretamente
│   ├── logo-glomam-*.svg      # Variantes do logo (original, slate, gold, blue-slate)
│   ├── palacio-masonico.png   # Imagem hero desktop (alta res)
│   ├── palacio-masonico-mobile.png
│   ├── amazonas-map.svg
│   └── favicon.*
│
├── src/
│   ├── main.jsx               # Entry point — monta <App /> no DOM
│   ├── App.jsx                # BrowserRouter + Routes (5 rotas)
│   ├── index.css              # Design system global: variáveis, reset, utilitários, estilos de todos os componentes públicos
│   │
│   ├── components/            # Seções e elementos reutilizáveis
│   │   ├── Header.jsx         # Navegação fixa — links de âncora + React Router Links
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx         # Splash screen (mostra durante hydration)
│   │   ├── ProgressBar.jsx    # Barra de progresso baseada em scroll
│   │   ├── AlbumEventos.jsx   # Grade de álbuns → Modal → Lightbox + download
│   │   └── [demais seções]    # Hero, Pilares, Memorial, etc.
│   │
│   ├── pages/
│   │   ├── Home.jsx                    # Orquestra todos os componentes de seção em ordem
│   │   ├── Principios.jsx              # Síntese, Ser Maçom, Nossas Finalidades
│   │   ├── Judiciario.jsx              # Procuradoria, Corregedoria, Juízes, Secretaria
│   │   ├── Legislativo.jsx             # 27 Grandes Oficiais (Legislativo 2024/2025)
│   │   ├── Lojas.jsx                   # 50 Lojas com busca e filtro por Oriente
│   │   ├── DispensarioQuemSomos.jsx    # Dispensário Maçônico — carta + contato
│   │   ├── Imprensa.jsx                # Consome src/data/noticias.js
│   │   ├── Brandbook.jsx               # Standalone, usa Brandbook.css
│   │   ├── AdminLogin.jsx              # UI de login (sem auth real)
│   │   └── AdminIntranet.jsx           # Layout da intranet + roteamento por aba state
│   │       ├── IntranetDashboard.jsx
│   │       ├── IntranetImprensa.jsx
│   │       ├── IntranetFinanceiro.jsx
│   │       ├── IntranetDocumentos.jsx
│   │       ├── IntranetEventos.jsx
│   │       ├── IntranetUsuarios.jsx
│   │       ├── IntranetNewsletter.jsx
│   │       └── IntranetCandidato.jsx
│   │
│   ├── hooks/
│   │   └── useReveal.js       # Intersection Observer → adiciona .active em .reveal
│   │
│   └── data/
│       ├── noticias.js        # Array de artigos — consumido por Imprensa.jsx e Novidades.jsx
│       ├── lojas.js           # 50 Lojas filiadas à GLOMAM (dados completos)
│       └── photoDirectory.js  # Diretório central de fotos de Irmãos + findPhoto(nome)
│
├── scripts/
│   ├── recolor-logo.mjs       # Script Node para gerar variantes de cor do SVG do logo
│   └── generate-pdf.mjs       # Gera PDF com screenshots de todas as rotas (Playwright + pdf-lib)
│
├── README.md                  # Este arquivo
├── CONTEXT.md                 # Regras, stack e lógica de negócio
├── TODO.md                    # Tarefas pendentes e bugs
├── vite.config.js
└── netlify.toml
```

### Fluxo de Dados — Página Pública (Home)

```
index.html
    └── main.jsx (ReactDOM.createRoot)
          └── App.jsx (BrowserRouter)
                └── Route "/" → Home.jsx
                      ├── useReveal() — registra Intersection Observer global
                      ├── <Loader /> — estado local, remove após mount
                      ├── <ProgressBar /> — ouve scroll via useEffect
                      ├── <Header /> — navegação estática
                      ├── <PalacioSection /> — imagem estática
                      ├── <Hero /> — SVG animado + parallax
                      ├── <Pilares /> — estado local (mousePos por card)
                      ├── <Memorial /> — estado local (carouselIndex)
                      ├── <NossaHistoria /> — estático
                      ├── <Novidades /> — consome data/noticias.js, rAF loop
                      ├── <Lideranca /> — estado local (2 tracks rAF)
                      ├── <Depoimentos /> — Framer Motion AnimatePresence
                      ├── <Familias /> — flip por CSS :hover + touch click
                      ├── <ProjetosSociais /> — SVG path interativo
                      ├── <AlbumEventos /> — estado local (albumAberto, fotoAtiva)
                      ├── <EsculturaParticulas /> — Three.js WebGL
                      ├── <FAQ /> — estado local (openIndex)
                      ├── <Newsletter /> — estado local (email, enviado)
                      └── <Oriente /> — estático + Google Maps iframe
```

### Fluxo de Dados — Álbum de Eventos

```
AlbumEventos.jsx
│
├── albums[] (dados hardcoded no componente)
│
├── Estado: albumAberto (null | album)
│     ├── null → renderiza grade de .alb-card
│     └── album → renderiza <Modal album={albumAberto} />
│
└── Modal
      ├── Estado: fotoAtiva (null | index)
      │     ├── null → renderiza .alb-fotos-grid (grade 3 colunas)
      │     └── index → renderiza .alb-lightbox (tela cheia)
      │
      └── downloadFoto(src, legenda)
            └── fetch(src) → blob → URL.createObjectURL → <a download> → click
```

### Fluxo de Dados — Intranet

```
AdminLogin.jsx
    └── navigate('/admin/intranet') [sem auth real]
          └── AdminIntranet.jsx
                ├── Estado: abaAtiva (string)
                └── Renderiza subcomponente conforme abaAtiva:
                      'dashboard'  → IntranetDashboard
                      'imprensa'   → IntranetImprensa
                      'financeiro' → IntranetFinanceiro
                      'documentos' → IntranetDocumentos
                      'eventos'    → IntranetEventos
                      'usuarios'   → IntranetUsuarios
                      'newsletter' → IntranetNewsletter
                      'candidato'  → IntranetCandidato
```

### Decisões Arquiteturais

| Decisão | Justificativa |
|---------|--------------|
| SPA sem backend | Hospedagem estática simples no Netlify, sem custos de servidor |
| CSS global em `index.css` | Design system único, evita conflitos de escopo e facilita manutenção visual |
| Dados hardcoded | Sem banco de dados — arrays em `data/` e dentro dos componentes |
| Three.js sem suspense | Componente detecta WebGL disponível e renderiza fallback se não houver |
| Intranet por aba (state) | UX de painel sem criar rotas separadas para cada módulo |
| React Router v7 | Versão mais recente com melhor performance e tipagem |

### Estilos por arquivo

| Arquivo CSS | Responsabilidade |
|-------------|-----------------|
| `src/index.css` | Reset, variáveis, utilitários, todos os componentes públicos |
| `src/components/Depoimentos.css` | Estilos específicos do carrossel de depoimentos |
| `src/pages/Brandbook.css` | Estilos exclusivos da página Brandbook |
| `src/pages/AdminIntranet.css` | Estilos completos do painel administrativo |

---

## Status Atual

### Concluído
- [x] Setup inicial React + Vite + React Router
- [x] Design system completo (paleta, tipografia, animações)
- [x] Header fixo responsivo com drawer mobile
- [x] Seção Palácio Maçônico (hero imagem)
- [x] Seção Hero (SVG animado + parallax + stats)
- [x] Seção Pilares (cards 3D com mouse tracking)
- [x] Seção Memorial (timeline + carrossel 22 Grão-Mestres)
- [x] Seção Nossa História
- [x] Seção Novidades (carrossel infinito via rAF)
- [x] Seção Liderança (pirâmide + 2 tracks auto-scroll)
- [x] Seção Depoimentos (Framer Motion)
- [x] Seção Famílias Paramaçônicas (flip cards CSS)
- [x] Seção Projetos Sociais (mapa SVG interativo do Amazonas)
- [x] Escultura de Partículas 3D (Three.js WebGL com morphing)
- [x] FAQ accordion
- [x] Newsletter form (UI)
- [x] Seção Oriente (contato + Google Maps)
- [x] Footer institucional
- [x] Portal de Imprensa (`/imprensa`) com carrosseis por categoria
- [x] Brandbook completo (`/brandbook`) — cores, tipografia, UI system, materiais
- [x] Intranet Administrativa (`/admin/intranet`) — 8 módulos UI
- [x] Loader animado + barra de progresso de scroll
- [x] useReveal hook (Intersection Observer)
- [x] Deploy configurado no Netlify
- [x] **Álbum de Eventos** — grade de álbuns, modal com fotos, lightbox, download individual ✓ *aprovado 2026-04-06*
- [x] Fotos reais dos Grão-Mestres no carrossel ✓ *aprovado 2026-04-06*
- [x] **Paleta oficial institucional** aplicada em todo o projeto (9 tons: navy/blue/copper/gold) ✓ *aprovado 2026-04-14*
- [x] **Tipografia oficial alinhada** — Playfair Display + Lora + Montserrat ✓ *aprovado 2026-04-14*
- [x] **Seção Nossos Objetivos** na Home — 5 pilares interativos (Amor, Aperfeiçoamento, Tolerância, Igualdade, Respeito) ✓ *aprovado 2026-04-14*
- [x] **Rota `/principios`** — Síntese dos Princípios Maçônicos, Ser Maçom e Nossas Finalidades ✓ *aprovado 2026-04-14*
- [x] **Rota `/judiciario`** — Procuradoria, Corregedoria, 8 Juízes e Secretaria do Judiciário ✓ *aprovado 2026-04-14*
- [x] **Rota `/legislativo`** — 27 Grandes Oficiais do Legislativo 2024/2025 ✓ *aprovado 2026-04-14*
- [x] **Rota `/lojas`** — 50 Lojas filiadas com busca, filtro por Oriente e expansão de detalhes ✓ *aprovado 2026-04-14*
- [x] **Rota `/dispensario/quem-somos`** — carta institucional do Dispensário Maçônico ✓ *aprovado 2026-04-14*
- [x] **Brandbook refeito** — logo adaptativa por fundo (claro/escuro), UI System com código de referência, diretrizes alinhadas ✓ *aprovado 2026-04-14*
- [x] **Diretório central de fotos** (`photoDirectory.js`) com matching tolerante entre Liderança / Judiciário / Legislativo ✓ *aprovado 2026-04-14*
- [x] **Hash-scroll** inteligente para âncoras vindas de outras rotas ✓ *aprovado 2026-04-14*
- [x] **Componente WhatsAppBtn** reutilizável ✓ *aprovado 2026-04-14*
- [x] **Script `generate-pdf.mjs`** — gera PDF do site com screenshots de todas as rotas (Playwright + pdf-lib) ✓ *aprovado 2026-04-14*

### Atualização de 2026-05-20

- [x] **Header transparente no topo** com transição para azul escuro + blur ao scroll
- [x] **Hero reformulado** — copy nova "A Grande Loja mais antiga do Brasil", removidos stats e CTAs antigos
- [x] **Hierarquia do logo invertida** no Header — "Grande Loja Maçônica do Amazonas" em destaque + sigla GLOMAM abaixo
- [x] **Logo institucional atualizada** (nova URL) — aplicada no Header e Footer
- [x] **Logo do Dispensário** adicionada na rota `/dispensario/quem-somos`
- [x] **Seção `<WelcomeSection />` removida** da Home (img + label + texto)
- [x] **Seção e rotas de Doação removidas** — `<ApoioProjetos />`, página `Doacao.jsx`, rota `/doar/:currency` e CSS órfão (~70 linhas em `index.css`)
- [x] **Nova seção `<MapaLojas />`** na Home — mapas interativos com Leaflet + OpenStreetMap (toggle Manaus / Interior do Amazonas, 48 Lojas geolocalizadas, popup customizado no tema GLOMAM)
- [x] **Botão "Como Chegar?"** em cada card da rota `/lojas` — modal com Google Maps + Waze + Uber (+ Apple Maps em iOS) usando lat/lng exatos
- [x] **Fonte do "rito" das Lojas** trocada de Playfair uppercase 8px para Lora 15px itálica — melhor leitura para público idoso
- [x] **Grid de Lojas corrigido** — `auto-fit` → `auto-fill` resolve bug do card único esticar quando filtrado
- [x] **Email institucional** trocado para `glomam@glomam.org.br` em 6 ocorrências (Oriente + Brandbook)
- [x] **`CLAUDE.md` portátil** na raiz do repo — pacote de contexto para Claude Code em qualquer máquina
- [x] **Paleta corrigida em CONTEXT.md e PROJECT_CONTEXT.md** — antes referenciavam paleta antiga (gold marrom #b4975a) mesmo após migração para 9 tons

### Pendente
- [ ] **Foto definitiva do Hero** (cliente vai enviar)
- [ ] **Logos das ordens paramaçônicas** (cliente vai enviar — DeMolay, Filhas de Jó, Estrela do Oriente, Escudeiros)
- [ ] **Revisão visual dos pinos do mapa** — cliente confirma quais Lojas estão fora do endereço exato (coords ajustáveis em `src/data/lojasCoords.js`)
- [ ] **Integração Instagram → seção "Últimas Notícias"** — Graph API + Netlify Function (aguardando confirmação de conta Business + Página Facebook do cliente)
- [ ] Substituir fotos placeholder do Álbum de Eventos por fotos reais
- [ ] Adicionar fotos dos Irmãos do Legislativo (27 cards hoje usam iniciais)
- [ ] Cadastrar Lojas Nº 25 e Nº 32 (faltantes na sequência)
- [ ] Confirmar número oficial do WhatsApp (atualmente placeholder)
- [ ] Backend/API para persistência real da Intranet
- [ ] Autenticação real em `/admin`
- [ ] Upload real de fotos no Álbum de Eventos
- [ ] Integração real da Newsletter (Mailchimp/Resend)
- [ ] Página de detalhe de notícia (`/imprensa/:slug`)
- [ ] Páginas de detalhe para cada Loja (`/lojas/:numero`)
- [ ] SEO — meta tags Open Graph dinâmicas por rota
- [ ] Lazy loading dos componentes pesados (Three.js)
- [ ] Otimização de imagens para `.webp`
- [ ] Otimizar SVG oficial da logo (atualmente ~17MB — rodar SVGO)

---

<p align="center">
  <strong>Tradição · Regularidade · Progresso</strong><br>
  <em>Ad Gloriam et Honorem</em><br><br>
  Grande Loja Maçônica do Amazonas — Fundada em 1904<br>
  Manaus, Amazonas, Brasil
</p>
