# ARCHITECTURE — GLOMAM

Estrutura de pastas, fluxo de dados e decisões arquiteturais.

---

## Visão Geral

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

---

## Estrutura de Pastas

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
│   │   ├── Home.jsx           # Orquestra todos os componentes de seção em ordem
│   │   ├── Imprensa.jsx       # Consome src/data/noticias.js
│   │   ├── Brandbook.jsx      # Standalone, usa Brandbook.css
│   │   ├── AdminLogin.jsx     # UI de login (sem auth real)
│   │   └── AdminIntranet.jsx  # Layout da intranet + roteamento por aba state
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
│       └── noticias.js        # Array de artigos — consumido por Imprensa.jsx e Novidades.jsx
│
├── scripts/
│   └── recolor-logo.mjs       # Script Node para gerar variantes de cor do SVG do logo
│
├── README.md                  # Cartão de visitas — instalação e comandos
├── CONTEXT.md                 # Regras, stack e lógica de negócio
├── TODO.md                    # Tarefas pendentes e bugs
├── ARCHITECTURE.md            # Este arquivo
├── PROJECT_CONTEXT.md         # Visão geral consolidada para IA e equipe
├── vite.config.js
└── netlify.toml
```

---

## Fluxo de Dados

### Página pública (Home)

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

### Álbum de Eventos — fluxo detalhado

```
AlbumEventos.jsx
│
├── albums[] (dados hardcoded no componente)
│
├── Estado: albumAberto (null | album)
│     │
│     ├── null → renderiza grade de .alb-card
│     └── album → renderiza <Modal album={albumAberto} />
│
└── Modal
      ├── Estado: fotoAtiva (null | index)
      │     │
      │     ├── null → renderiza .alb-fotos-grid (grade 3col)
      │     └── index → renderiza .alb-lightbox (tela cheia)
      │
      └── downloadFoto(src, legenda)
            └── fetch(src) → blob → URL.createObjectURL → <a download> → click
```

### Intranet — fluxo de navegação

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

---

## Decisões Arquiteturais

| Decisão | Justificativa |
|---------|--------------|
| SPA sem backend | Hospedagem estática simples no Netlify, sem custos de servidor |
| CSS global em `index.css` | Design system único, evita conflitos de escopo e facilita manutenção visual |
| Dados hardcoded | Sem banco de dados — arrays em `data/` e dentro dos componentes |
| Three.js sem suspense | Componente detecta WebGL disponível e renderiza fallback se não houver |
| Intranet por aba (state) | UX de painel sem criar rotas separadas para cada módulo |
| React Router v7 | Versão mais recente com melhor performance e tipagem |

---

## Estilos por arquivo

| Arquivo CSS | Responsabilidade |
|-------------|-----------------|
| `src/index.css` | Reset, variáveis, utilitários, todos os componentes públicos |
| `src/components/Depoimentos.css` | Estilos específicos do carrossel de depoimentos |
| `src/pages/Brandbook.css` | Estilos exclusivos da página Brandbook |
| `src/pages/AdminIntranet.css` | Estilos completos do painel administrativo |
