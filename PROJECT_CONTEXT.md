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
- **Estilização:** CSS puro com variáveis custom (sem Tailwind, sem CSS Modules)
- **Hospedagem:** Netlify (static SPA)
- **Ferramentas de IA:** Claude Code + RTK

---

## Arquitetura e Padrões

- Pasta `src/components/`: seções da página pública e elementos globais (Header, Footer, Loader)
- Pasta `src/pages/`: páginas completas — Home, Imprensa, Brandbook, AdminLogin, AdminIntranet + 8 subpáginas da intranet
- Pasta `src/hooks/`: `useReveal.js` (Intersection Observer para animações de scroll)
- Pasta `src/data/`: dados estáticos — `noticias.js` (artigos de imprensa)
- Pasta `public/`: assets estáticos — logos SVG, imagens do palácio, favicon
- **Sem backend, sem banco de dados** — aplicação 100% estática
- **Estilos:** `index.css` centraliza todo o design system público; intranet tem `AdminIntranet.css` separado
- **Padrão de seções públicas:** `<section id="x">` → `.section-inner` → `.section-label` + `<h2>` + `.divider` + `.reveal`
- **Padrão de Commits:** mensagens descritivas em português

---

## Instruções para a IA (Vibe Coding)

- Sempre respeitar a paleta: `--gold` `#b4975a`, `--slate` `#1a2332`, `--bg` `#f0ede8`
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

### Pendente
- [ ] Substituir fotos placeholder do Álbum de Eventos por fotos reais
- [ ] Backend/API para persistência real da Intranet
- [ ] Autenticação real em `/admin`
- [ ] Upload real de fotos no Álbum de Eventos
- [ ] Integração real da Newsletter (Mailchimp/Resend)
- [ ] Fotos reais dos Grão-Mestres no carrossel
- [ ] Link âncora `#album-eventos` no Header e Footer
- [ ] Página de detalhe de notícia (`/imprensa/:slug`)
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
