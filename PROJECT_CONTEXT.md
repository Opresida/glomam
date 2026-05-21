# GLOMAM — Grande Loja Maçônica do Amazonas

## Visão Geral

Site institucional e intranet administrativa da Grande Loja Maçônica do Amazonas (GLOMAM), potência maçônica regular fundada em 1904, Manaus/AM. O projeto combina um portal público de 16 seções interativas com um painel de gestão organizacional completo.

**URL de produção:** Netlify (deploy automático via push na main)
**Ambiente de dev:** `http://localhost:5000`

---

## Stack Tecnológica

- **Linguagem:** JavaScript (JSX)
- **Framework:** React 19 + Vite 8
- **Roteamento:** React Router DOM 7
- **Animações:** Framer Motion 12 + CSS custom animations
- **3D/WebGL:** Three.js 0.183.2
- **Mapas:** Leaflet 1.x + react-leaflet + OpenStreetMap (sem API key, sem rate limit, sem cadastro)
- **Estilização:** CSS puro com variáveis custom (sem Tailwind, sem CSS Modules)
- **Hospedagem:** Netlify (static SPA)
- **Ferramentas de IA:** Claude Code + RTK

---

## Arquitetura e Padrões

- Pasta `src/components/`: seções da página pública e elementos globais (Header, Footer, Loader)
- Pasta `src/pages/`: páginas completas — Home, Imprensa, Brandbook, AdminLogin, AdminIntranet + 8 subpáginas da intranet
- Pasta `src/hooks/`: `useReveal.js` (Intersection Observer para animações de scroll)
- Pasta `src/data/`: dados estáticos — `noticias.js`, `lojas.js`, `lojasCoords.js`, `photoDirectory.js`
- Pasta `public/`: assets estáticos — logos SVG, imagens do palácio, favicon
- **Sem backend, sem banco de dados** — aplicação 100% estática
- **Estilos:** `index.css` centraliza todo o design system público; intranet tem `AdminIntranet.css` separado
- **Padrão de seções públicas:** `<section id="x">` → `.section-inner` → `.section-label` + `<h2>` + `.divider` + `.reveal`
- **Padrão de Commits:** mensagens descritivas em português

---

## Instruções para a IA (Vibe Coding)

- Sempre respeitar a paleta oficial de 9 tons (atualizada 2026-04-14): `--slate` `#161d34`, `--slate-mid` `#172d4b`, `--blue` `#005587`, `--blue-light` `#0d7dc2`, `--blue-dark` `#123b61`, `--gold` `#d3a54c`, `--gold-light` `#e3da98`, `--gold-dark` `#a95f21`, `--copper` `#a95f21`. Neutros: `--bg` `#f0ede8`, `--ice` `#edf2f7`, `--white` `#ffffff`. ⚠️ A paleta antiga (gold marrom `#b4975a`, slate `#1a2332`) está OBSOLETA — não usar. Detalhes em [CONTEXT.md](./CONTEXT.md#paleta-de-cores-oficial--9-tons-institucionais)
- Sempre usar `var(--ease)` em transitions e animations
- Sempre adicionar `.reveal` em elementos novos de seção para animação de entrada
- Nunca criar backend, API ou banco — o projeto é estático
- Nunca alterar as variáveis CSS de cor sem aprovação explícita
- Ao criar nova seção, registrar o `id` como link de âncora no `Header.jsx`
- Ao adicionar dados (álbuns, notícias, membros), preferir `src/data/` se reutilizados em vários lugares
- Sempre testar responsividade nos breakpoints: 1024px, 768px, 540px, 480px
- Atualizar este arquivo após cada funcionalidade aprovada

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
- [x] Intranet Administrativa (`/admin/intranet`) — 8 módulos UI (Dashboard, Imprensa, Financeiro, Documentos, Eventos, Usuários, Newsletter, Candidatos)
- [x] Loader animado + barra de progresso de scroll
- [x] useReveal hook (Intersection Observer)
- [x] Deploy configurado no Netlify
- [x] **Álbum de Eventos** — grade de álbuns, modal com grade de fotos, lightbox em tela cheia, download individual por foto ✓ *aprovado 2026-04-06*
- [x] **Rotas institucionais** — `/principios`, `/judiciario`, `/legislativo`, `/lojas`, `/dispensario/quem-somos` ✓ *aprovado 2026-04-14*
- [x] **Mapas interativos das Lojas** (Leaflet + OSM) na Home, com toggle Manaus/Interior ✓ *aprovado 2026-05-20*
- [x] **Botão "Como Chegar?"** na rota `/lojas` com Google Maps + Waze + Uber (+ Apple Maps em iOS) ✓ *aprovado 2026-05-20*
- [x] **Header transparente com blur ao scroll** + Hero reformulado + Welcome/Doação removidos ✓ *aprovado 2026-05-20*

### Aguardando entrega do cliente
- [ ] Foto definitiva do Hero
- [ ] Logos das ordens paramaçônicas (DeMolay, Filhas de Jó, Estrela do Oriente, Escudeiros)
- [ ] Confirmação de conta Business Instagram (pré-requisito para integração Graph API)
- [ ] Revisão visual dos pinos do mapa de Manaus

### Pendente
- [ ] Substituir fotos placeholder do Álbum de Eventos por fotos reais
- [ ] Backend/API para persistência real da Intranet
- [ ] Autenticação real em `/admin`
- [ ] Upload real de fotos no Álbum de Eventos
- [ ] Integração real da Newsletter (Mailchimp/Resend)
- [ ] Integração do Instagram → seção "Últimas Notícias" (Graph API + Netlify Function)
- [ ] Cadastrar Lojas Nº 25 e Nº 32 (faltantes na sequência)
- [ ] Link âncora `#album-eventos` no Header e Footer
- [ ] Página de detalhe de notícia (`/imprensa/:slug`)
- [ ] Páginas de detalhe para cada Loja (`/lojas/:numero`)
- [ ] SEO — meta tags Open Graph dinâmicas
- [ ] Lazy loading dos componentes pesados (Three.js)
- [ ] Otimização de imagens para `.webp`

---

## Arquivos de Documentação

| Arquivo | Propósito |
|---------|-----------|
| `README.md` | Instalação, comandos e rotas — cartão de visitas |
| `CONTEXT.md` | Regras, stack e lógica de negócio para desenvolvedores e IA |
| `TODO.md` | Tarefas pendentes, melhorias e bugs conhecidos |
| `ARCHITECTURE.md` | Estrutura de pastas, fluxo de dados e decisões arquiteturais |
| `PROJECT_CONTEXT.md` | Este arquivo — visão geral consolidada, sempre atualizado |
| `CLAUDE.md` | Pacote de contexto portátil para Claude Code (paleta, padrões, regras invioláveis) |
