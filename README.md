# GLOMAM - Grande Loja Maconica do Amazonas

Website institucional e sistema de intranet da Grande Loja Maconica do Amazonas, fundada em 1904.

## Stack Tecnologica

- **React 19** - Biblioteca de UI
- **Vite 8** - Build tool e dev server
- **Framer Motion** - Animacoes e transicoes
- **Three.js** - Visualizacao 3D de particulas
- **React Router 7** - Roteamento SPA

## Estrutura do Projeto

```
glomam/
├── public/                    # Assets estaticos
│   ├── logo-glomam-*.svg      # Variantes do brasao (original, slate, gold)
│   ├── palacio-masonico.png   # Imagem do Palacio Masonico
│   └── favicon.*              # Favicons
├── src/
│   ├── App.jsx                # Router principal
│   ├── main.jsx               # Entry point
│   ├── index.css              # Estilos globais
│   ├── components/            # Componentes reutilizaveis
│   │   ├── Header.jsx         # Navegacao fixa com drawer mobile
│   │   ├── Hero.jsx           # Secao de abertura com SVG interativo
│   │   ├── PalacioSection.jsx # Imagem do Palacio com reflexo
│   │   ├── Pilares.jsx        # Cards 3D dos pilares masonicos
│   │   ├── Memorial.jsx       # Timeline + carrossel de Grao-Mestres
│   │   ├── NossaHistoria.jsx  # Historia da Maconaria no Amazonas
│   │   ├── Novidades.jsx      # Carrossel infinito de noticias
│   │   ├── Lideranca.jsx      # Piramide animada + executivos
│   │   ├── Depoimentos.jsx    # Depoimentos com auto-rotate
│   │   ├── Familias.jsx       # Ordens Paramasonicas (flip cards)
│   │   ├── ProjetosSociais.jsx # Projetos + mapa SVG do Amazonas
│   │   ├── EsculturaParticulas.jsx # Three.js - morphing de particulas
│   │   ├── FAQ.jsx            # Accordion de perguntas frequentes
│   │   ├── Newsletter.jsx     # Formulario de inscricao
│   │   ├── Oriente.jsx        # Contato + Google Maps
│   │   ├── Footer.jsx         # Rodape institucional
│   │   ├── Loader.jsx         # Splash screen animado
│   │   └── ProgressBar.jsx    # Barra de progresso de scroll
│   ├── pages/                 # Paginas/rotas
│   │   ├── Home.jsx           # Pagina inicial (15 secoes)
│   │   ├── Imprensa.jsx       # Portal de noticias
│   │   ├── Brandbook.jsx      # Brandbook & UI System
│   │   ├── Brandbook.css      # Estilos do Brandbook
│   │   ├── AdminLogin.jsx     # Tela de login administrativo
│   │   ├── AdminIntranet.jsx  # Painel administrativo
│   │   └── Intranet*.jsx      # Sub-paginas da intranet (8 modulos)
│   ├── data/
│   │   └── noticias.js        # Dados de noticias
│   └── hooks/
│       └── useReveal.js       # Intersection Observer para scroll reveal
├── scripts/
│   └── recolor-logo.mjs       # Script de variantes cromaticas do logo
├── package.json
├── vite.config.js
└── netlify.toml               # Configuracao de deploy
```

## Rotas

| Rota | Pagina | Descricao |
|------|--------|-----------|
| `/` | Home | Pagina institucional com 15 secoes |
| `/imprensa` | Imprensa | Portal de noticias com carrosseis por categoria |
| `/brandbook` | Brandbook | Manual de identidade visual e UI System |
| `/admin` | Login | Acesso restrito administrativo |
| `/admin/intranet` | Intranet | Painel com 8 modulos de gestao |

## Brandbook & UI System

O Brandbook (`/brandbook`) documenta toda a identidade visual:

- **Logo** - Brasao oficial com variantes cromaticas (original, slate #1a2332, gold #b4975a), area de protecao, tamanhos minimos, usos incorretos e composicoes
- **Cores** - Paleta completa (8 cores), gradientes e testes de contraste WCAG
- **Tipografia** - 4 familias (Cinzel, Cinzel Decorative, Cormorant Garamond, Montserrat), escala tipografica e letter-spacing
- **UI System** - Botoes, cards, formularios, espacamento, iconografia SVG e animacoes
- **Materiais** - Cartao de visita (frente/verso), papel timbrado A4, assinatura de email HTML
- **Diretrizes** - Regras de uso, area de protecao do logo e tom de voz

## Paleta de Cores

| Variavel | Hex | Uso |
|----------|-----|-----|
| `--gold` | `#b4975a` | Destaque primario, CTAs |
| `--gold-light` | `#d4b87a` | Gradientes claros |
| `--gold-dark` | `#8a7040` | Gradientes escuros |
| `--slate` | `#1a2332` | Texto principal, secoes escuras |
| `--slate-mid` | `#2c3e50` | Texto secundario |
| `--bg` | `#f0ede8` | Fundo geral |
| `--ice` | `#edf2f7` | Fundos alternativos |
| `--white` | `#ffffff` | Cards, destaque |

## Tipografia

- **Cinzel** - Headings e identidade institucional
- **Cinzel Decorative** - Titulos especiais e numerais ornamentais
- **Cormorant Garamond** - Subtitulos, citacoes e descricoes
- **Montserrat** - Corpo, UI, formularios e labels

## Desenvolvimento

```bash
# Instalar dependencias
npm install

# Servidor de desenvolvimento (porta 5000)
npm run dev

# Build de producao
npm run build

# Preview do build
npm run preview
```

## Intranet Administrativa

O painel administrativo (`/admin/intranet`) inclui 8 modulos:

1. **Dashboard** - Metricas e indicadores
2. **Imprensa** - Gestao de noticias (CRUD)
3. **Financeiro** - Cards financeiros e graficos
4. **Documentos** - Gerador de documentos PDF
5. **Eventos** - Galeria e calendario de eventos
6. **Usuarios** - Gestao de membros
7. **Newsletter** - Campanhas de email
8. **Candidatos** - Cadastro de novos candidatos

## Responsividade

Breakpoints: 1440px, 1024px, 900px, 820px, 768px, 640px, 480px, 360px

Tecnicas: `clamp()` fluido, CSS Grid/Flexbox, media queries, menu drawer mobile.

## Licenca

Propriedade da Grande Loja Maconica do Amazonas. Todos os direitos reservados.

---

*Tradicao - Regularidade - Progresso*

*Ad Gloriam et Honorem*
