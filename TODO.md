# TODO — GLOMAM

Lista de tarefas pendentes, melhorias planejadas e bugs conhecidos.

---

## Em andamento

- [ ] Substituir imagens placeholder (picsum.photos) do Álbum de Eventos por fotos reais da GLOMAM

---

## Funcionalidades pendentes

### Alta prioridade
- [ ] Backend/API para persistência real da Intranet (atualmente apenas UI)
- [ ] Sistema de autenticação real em `/admin` (atualmente login sem validação de servidor)
- [ ] Upload real de fotos no Álbum de Eventos (atualmente dados hardcoded)
- [ ] Formulário de Newsletter com integração real (Mailchimp, Resend, etc.)

### Média prioridade
- [ ] Link âncora `#album-eventos` no Header e Footer
- [ ] Página de detalhe de notícia (`/imprensa/:slug`)
- [ ] SEO: meta tags Open Graph e Twitter Card dinâmicas por página
- [ ] Sitemap.xml e robots.txt

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
- [ ] Centralizar dados de liderança em `src/data/` (atualmente hardcoded nos componentes)
- [ ] Criar Design Tokens separados (arquivo `tokens.css`) em vez de variáveis inline

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
