# GLOMAM - Grande Loja Maconica do Amazonas

<p align="center">
  <strong>Ad Gloriam et Honorem</strong><br>
  <em>Tradicao . Regularidade . Progresso</em>
</p>

---

Website institucional e sistema de intranet administrativa da **Grande Loja Maconica do Amazonas**, potencia maconica regular fundada em **1904** na cidade de Manaus/AM. O projeto combina um portal publico com informacoes institucionais, historicas e de impacto social, com um painel administrativo completo para gestao interna da organizacao.

## Indice

- [Visao Geral](#visao-geral)
- [Demonstracao](#demonstracao)
- [Stack Tecnologica](#stack-tecnologica)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas e Paginas](#rotas-e-paginas)
- [Identidade Visual e Design System](#identidade-visual-e-design-system)
- [Intranet Administrativa](#intranet-administrativa)
- [Instalacao e Desenvolvimento](#instalacao-e-desenvolvimento)
- [Build e Deploy](#build-e-deploy)
- [Responsividade](#responsividade)
- [Performance e Acessibilidade](#performance-e-acessibilidade)
- [Licenca](#licenca)

---

## Visao Geral

O **GLOMAM** e uma aplicacao web Single Page Application (SPA) construida com React 19 e Vite 8, projetada para atender duas necessidades principais:

1. **Portal Publico** - Site institucional com 15 secoes interativas, portal de noticias e brandbook/manual de identidade visual
2. **Intranet Administrativa** - Painel de gestao com 8 modulos para administracao de membros, eventos, financas, documentos, noticias e campanhas

A aplicacao e inteiramente frontend (sem backend/banco de dados), sendo ideal para hospedagem estatica em plataformas como Netlify.

## Demonstracao

### Portal Publico
- **Pagina Inicial** - 15 secoes com animacoes avancadas, carrosseis infinitos, particulas 3D (Three.js) e efeitos de scroll
- **Portal de Imprensa** - Noticias organizadas por categorias com carrosseis
- **Brandbook** - Manual completo de identidade visual com logo, cores, tipografia, componentes UI e materiais graficos

### Painel Administrativo
- **Dashboard** com KPIs, graficos e atividades recentes
- **8 modulos** de gestao organizacional com interfaces completas

---

## Stack Tecnologica

| Tecnologia | Versao | Funcao |
|------------|--------|--------|
| **React** | 19.2.4 | Biblioteca de interface de usuario |
| **Vite** | 8.0.3 | Build tool, bundler e servidor de desenvolvimento |
| **React Router** | 7.14.0 | Roteamento SPA (client-side) |
| **Framer Motion** | 12.38.0 | Animacoes declarativas e transicoes |
| **Three.js** | 0.183.2 | Renderizacao 3D WebGL (sistema de particulas) |
| **Netlify** | - | Plataforma de hospedagem e deploy |

> **Apenas 6 dependencias de producao** - stack minimalista e de alta performance.

---

## Funcionalidades

### Site Institucional (Pagina Inicial - 15 Secoes)

| # | Secao | Descricao |
|---|-------|-----------|
| 1 | **Palacio Masonico** | Imagem hero do Palacio com efeito de reflexo CSS |
| 2 | **Inicio (Hero)** | Proposta de valor com geometria SVG animada interativamente |
| 3 | **Pilares** | 3 flip cards 3D com tracking de mouse + bloco Triade (Liberdade/Igualdade/Fraternidade) |
| 4 | **Memorial** | Timeline interativa (1904-presente) + carrossel de 22 Graos-Mestres |
| 5 | **Nossa Historia** | Secao escura com animacoes de compasso SVG e narrativa historica |
| 6 | **Novidades** | Carrossel infinito de noticias com loop automatico |
| 7 | **Lideranca** | Piramide animada + 2 carrosseis scrolling com 30+ diretores |
| 8 | **Depoimentos** | Cards de testemunhos com auto-rotacao (Framer Motion) |
| 9 | **Familias Paramasonicas** | 4 flip cards: DeMolay, Filhas de Jo, Estrela do Oriente, Escudeiros |
| 10 | **Projetos Sociais** | 4 projetos de impacto + mapa interativo SVG do Amazonas (8 municipios) |
| 11 | **Escultura 3D** | Sistema de particulas Three.js com morphing entre 2 formas via slider |
| 12 | **FAQ** | Accordion expansivel de perguntas frequentes |
| 13 | **Newsletter** | Formulario de inscricao com validacao de email |
| 14 | **Oriente** | Informacoes de contato + Google Maps embarcado |
| 15 | **Footer** | Rodape institucional com links e copyright |

### Portal de Imprensa (`/imprensa`)

- Secao hero com 3 artigos em destaque
- Grid de artigos organizados por categoria (Institucional, Eventos, Comunicados, Oriente)
- Carrosseis infinitos por categoria
- Cards de noticias com metadados (data, autor, categoria)
- Base de 25+ artigos em `src/data/noticias.js`

### Brandbook & UI System (`/brandbook`)

- **Logo** - 3 variantes cromaticas (original indigo, slate, gold) com area de protecao, tamanhos minimos e regras de uso
- **Paleta de Cores** - 8 cores com codigos hex, gradientes e teste de contraste WCAG
- **Tipografia** - 4 familias tipograficas com escala, pesos e letter-spacing
- **UI System** - Botoes, cards, formularios, espacamento, iconografia SVG
- **Materiais** - Cartao de visita (frente/verso), papel timbrado A4, assinatura de email HTML
- **Diretrizes** - Regras de aplicacao, tom de voz e exemplos DO/DON'T

---

## Estrutura do Projeto

```
glomam/
├── public/                          # Assets estaticos
│   ├── logo-glomam-original.svg     # Brasao oficial (indigo #2e2f98)
│   ├── logo-glomam-slate.svg        # Variante monocromatica slate (#1a2332)
│   ├── logo-glomam-gold.svg         # Variante monocromatica gold (#b4975a)
│   ├── logo-glomam-blue-slate.svg   # Variante adicional
│   ├── palacio-masonico.png         # Palacio Masonico (alta resolucao)
│   ├── palacio-masonico-mobile.png  # Versao mobile otimizada
│   ├── amazonas-map.svg             # Mapa SVG do Amazonas
│   └── favicon.*                    # Favicons (ico, svg, png 16/32, apple-touch)
│
├── src/
│   ├── main.jsx                     # Entry point React
│   ├── App.jsx                      # Configuracao do Router
│   ├── index.css                    # Estilos globais (~705 linhas)
│   │
│   ├── components/                  # 19 componentes reutilizaveis
│   │   ├── Header.jsx               # Navegacao fixa (68px) + drawer mobile
│   │   ├── Hero.jsx                 # Hero com SVG interativo e parallax
│   │   ├── PalacioSection.jsx       # Imagem do Palacio com reflexo
│   │   ├── Pilares.jsx              # Cards 3D com perspective transform
│   │   ├── Memorial.jsx             # Timeline + carrossel de Graos-Mestres
│   │   ├── NossaHistoria.jsx        # Historia + animacoes de compasso
│   │   ├── Novidades.jsx            # Carrossel infinito (requestAnimationFrame)
│   │   ├── Lideranca.jsx            # Piramide + 2 tracks auto-scrolling
│   │   ├── Depoimentos.jsx          # Testemunhos auto-rotativos
│   │   ├── Depoimentos.css          # Estilos dos depoimentos
│   │   ├── Familias.jsx             # Ordens Paramasonicas (flip cards)
│   │   ├── ProjetosSociais.jsx      # Projetos + mapa interativo
│   │   ├── EsculturaParticulas.jsx  # Three.js particle morphing WebGL
│   │   ├── FAQ.jsx                  # Accordion de perguntas
│   │   ├── Newsletter.jsx           # Formulario de inscricao
│   │   ├── Oriente.jsx              # Contato + Google Maps
│   │   ├── Footer.jsx               # Rodape institucional
│   │   ├── Loader.jsx               # Splash screen animado
│   │   ├── ProgressBar.jsx          # Barra de progresso de scroll
│   │   └── amazonasPath.js          # Dados SVG path do mapa
│   │
│   ├── pages/                       # Paginas/rotas
│   │   ├── Home.jsx                 # Pagina inicial (15 secoes)
│   │   ├── Imprensa.jsx             # Portal de noticias
│   │   ├── Brandbook.jsx            # Manual de identidade visual
│   │   ├── Brandbook.css            # Estilos do brandbook (~848 linhas)
│   │   ├── AdminLogin.jsx           # Tela de login administrativo
│   │   ├── AdminIntranet.jsx        # Layout principal da intranet
│   │   ├── AdminIntranet.css        # Estilos da intranet (~1029 linhas)
│   │   ├── IntranetDashboard.jsx    # Dashboard com KPIs e graficos
│   │   ├── IntranetImprensa.jsx     # Gestao de noticias (CRUD)
│   │   ├── IntranetFinanceiro.jsx   # Metricas financeiras
│   │   ├── IntranetDocumentos.jsx   # Gerador de documentos PDF
│   │   ├── IntranetEventos.jsx      # Galeria e calendario de eventos
│   │   ├── IntranetUsuarios.jsx     # Gestao de membros
│   │   ├── IntranetNewsletter.jsx   # Interface de campanhas de email
│   │   └── IntranetCandidato.jsx    # Formulario de candidatura
│   │
│   ├── data/
│   │   └── noticias.js              # Dataset de noticias (25+ artigos)
│   │
│   └── hooks/
│       └── useReveal.js             # Hook de Intersection Observer (scroll reveal)
│
├── scripts/
│   ├── recolor-logo.mjs             # Gerador de variantes cromaticas do logo
│   └── post-merge.sh                # Git hook pos-merge
│
├── package.json                     # Dependencias e scripts
├── vite.config.js                   # Configuracao do Vite
├── netlify.toml                     # Configuracao de deploy Netlify
├── index.html                       # HTML entry point
└── .gitignore
```

---

## Rotas e Paginas

| Rota | Componente | Descricao |
|------|-----------|-----------|
| `/` | `Home` | Pagina institucional com 15 secoes interativas |
| `/imprensa` | `Imprensa` | Portal de noticias com carrosseis por categoria |
| `/brandbook` | `Brandbook` | Manual de identidade visual completo e UI System |
| `/admin` | `AdminLogin` | Tela de login com recuperacao de senha |
| `/admin/intranet` | `AdminIntranet` | Painel administrativo com 8 modulos |

### Modulos da Intranet (navegacao por abas)

| Aba | Componente | Funcionalidade |
|-----|-----------|----------------|
| Dashboard | `IntranetDashboard` | KPIs, grafico mensal, atividades recentes |
| Imprensa | `IntranetImprensa` | Tabela CRUD de artigos com status |
| Financeiro | `IntranetFinanceiro` | Cards e metricas financeiras |
| Documentos | `IntranetDocumentos` | Gerador de documentos PDF |
| Eventos | `IntranetEventos` | Galeria de fotos e calendario |
| Usuarios | `IntranetUsuarios` | Gestao de membros/usuarios |
| Newsletter | `IntranetNewsletter` | Criacao de campanhas de email |
| Candidatos | `IntranetCandidato` | Formulario de ingresso |

---

## Identidade Visual e Design System

### Paleta de Cores

| Variavel CSS | Hex | Uso |
|-------------|-----|-----|
| `--gold` | `#b4975a` | Destaque primario, botoes, CTAs |
| `--gold-light` | `#d4b87a` | Gradientes claros, hovers |
| `--gold-dark` | `#8a7040` | Gradientes escuros, sombras |
| `--slate` | `#1a2332` | Texto principal, secoes escuras, headers |
| `--slate-mid` | `#2c3e50` | Texto secundario, bordas |
| `--bg` | `#f0ede8` | Fundo principal (bege quente) |
| `--ice` | `#edf2f7` | Fundos alternativos claros |
| `--white` | `#ffffff` | Cards, areas de destaque |

### Tipografia

| Familia | Pesos | Uso |
|---------|-------|-----|
| **Cinzel** | 400, 600, 700 | Headings, identidade institucional |
| **Cinzel Decorative** | 400, 700 | Titulos especiais, numerais ornamentais |
| **Cormorant Garamond** | 300, 400, 500 | Subtitulos, citacoes, descricoes |
| **Montserrat** | 200-600 | Corpo de texto, UI, formularios, labels |

### Variantes do Logo

| Variante | Arquivo | Cor Principal |
|----------|---------|---------------|
| Original | `logo-glomam-original.svg` | Indigo `#2e2f98` |
| Slate | `logo-glomam-slate.svg` | Slate `#1a2332` |
| Gold | `logo-glomam-gold.svg` | Gold `#b4975a` |

### Variaveis CSS

```css
:root {
  --bg: #f0ede8;
  --slate: #1a2332;
  --slate-mid: #2c3e50;
  --gold: #b4975a;
  --gold-light: #d4b87a;
  --gold-dark: #8a7040;
  --ice: #edf2f7;
  --white: #ffffff;
  --ease: cubic-bezier(0.19, 1, 0.22, 1);
  --nav-h: 68px;
}
```

---

## Intranet Administrativa

O painel administrativo (`/admin/intranet`) oferece uma interface completa para gestao da organizacao:

### Dashboard
- **4 KPIs principais**: Membros Ativos (342), Eventos do Mes (7), Receita Mensal (R$ 48.200), Assinantes Newsletter (1.205)
- Grafico de barras com crescimento mensal (12 meses)
- Tabela de atividades recentes com 6 tipos de registro

### Modulos de Gestao
- **Imprensa** - Tabela de artigos com colunas: Titulo, Categoria, Data, Autor, Status (Publicado/Rascunho), Acoes (Editar/Remover)
- **Financeiro** - Cards com metricas monetarias e indicadores
- **Documentos** - Gerador e gerenciador de documentos PDF institucionais
- **Eventos** - Galeria de imagens e calendario de eventos
- **Usuarios** - Interface de gestao de membros e permissoes
- **Newsletter** - Criacao e envio de campanhas de email marketing
- **Candidatos** - Formulario de cadastro para candidatos a iniciacao

### Layout da Intranet
- Sidebar fixa (300px desktop, 220px tablet, drawer no mobile)
- Topbar com titulo da pagina e badges informativos
- Area de conteudo responsiva
- Navegacao mobile inferior

---

## Instalacao e Desenvolvimento

### Pre-requisitos

- **Node.js** >= 18
- **npm** ou **pnpm**

### Instalacao

```bash
# Clonar o repositorio
git clone https://github.com/Opresida/glomam.git
cd glomam

# Instalar dependencias
npm install
# ou
pnpm install
```

### Servidor de Desenvolvimento

```bash
# Iniciar dev server (porta 5000)
npm run dev
```

O servidor iniciara em `http://localhost:5000` com Hot Module Replacement (HMR).

### Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR (porta 5000) |
| `npm run build` | Build de producao para `/dist` |
| `npm run preview` | Preview local do build de producao |

---

## Build e Deploy

### Build de Producao

```bash
npm run build
```

O build gera os arquivos otimizados no diretorio `dist/`.

### Deploy no Netlify

O projeto esta configurado para deploy automatico no Netlify via `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Configuracoes de cache**:
- Assets imutaveis com `Cache-Control: max-age=31536000` (1 ano)
- Favicons e logos com cache otimizado
- Compressao GZIP automatica

---

## Responsividade

O projeto e totalmente responsivo com **8 breakpoints**:

| Breakpoint | Dispositivo |
|-----------|-------------|
| 1440px | Desktop grande |
| 1024px | Tablet paisagem |
| 900px | Tablet retrato |
| 820px | Mobile grande |
| 768px | Tablet vertical |
| 640px | Mobile paisagem |
| 480px | Mobile retrato |
| 360px | Smartphone pequeno |

### Tecnicas Utilizadas

- **`clamp()`** para tipografia e espacamento fluidos
- **CSS Grid** e **Flexbox** para layouts adaptativos
- **Media queries** para ajustes condicionais
- **Drawer mobile** para navegacao em telas pequenas
- **Imagens otimizadas** (`palacio-masonico-mobile.png` para dispositivos moveis)

---

## Performance e Acessibilidade

### Performance

- **Intersection Observer** para animacoes lazy de scroll reveal
- **requestAnimationFrame** para carrosseis suaves
- **Deteccao de WebGL** com fallback para Three.js
- **Tree-shaking** e code splitting via Vite
- **Apenas 6 dependencias** - bundle leve e rapido

### Acessibilidade

- HTML semantico (`header`, `nav`, `section`, `main`, `footer`)
- Atributos `aria-label` em elementos interativos
- Texto alternativo em imagens
- Formularios navegaveis por teclado
- Testes de contraste WCAG documentados no Brandbook

### Animacoes e Interatividade

| Recurso | Tecnologia |
|---------|------------|
| Scroll reveal | Intersection Observer + CSS transitions |
| Desenho SVG | `stroke-dasharray` animation |
| Cards 3D | CSS `perspective` + `transform` com mouse tracking |
| Carrosseis infinitos | `requestAnimationFrame` + clone de elementos |
| Particulas 3D | Three.js WebGL com morphing entre formas |
| Transicoes de pagina | Framer Motion `AnimatePresence` |
| Parallax | Scroll event + `translateY` |
| Splash screen | SVG spin/pulse animation |

---

## Estatisticas do Codigo

| Categoria | Arquivos | Linhas Aproximadas |
|-----------|----------|-------------------|
| Componentes | 19 | ~2.000 |
| Paginas | 10 | ~1.200 |
| CSS | 4 | ~2.830 |
| Dados | 2 | ~150 |
| Hooks | 1 | ~22 |
| **Total** | **36** | **~6.200+** |

---

## Licenca

Propriedade da **Grande Loja Maconica do Amazonas**. Todos os direitos reservados.

Este software e de uso exclusivo da GLOMAM e nao pode ser copiado, distribuido ou modificado sem autorizacao expressa.

---

<p align="center">
  <strong>Tradicao . Regularidade . Progresso</strong><br>
  <em>Ad Gloriam et Honorem</em><br><br>
  Grande Loja Maconica do Amazonas - Fundada em 1904<br>
  Manaus, Amazonas, Brasil
</p>
