# CONTEXT — GLOMAM

Regras, stack e lógica de negócio do projeto. Leia antes de fazer qualquer alteração.

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| UI | React | 19.2.4 |
| Build | Vite | 8.0.3 |
| Roteamento | React Router DOM | 7.14.0 |
| Animações | Framer Motion | 12.38.0 |
| 3D/WebGL | Three.js | 0.183.2 |
| Hospedagem | Netlify | — |

**Sem backend. Sem banco de dados.** Aplicação 100% estática (SPA).

---

## Design System — Regras Invioláveis

### Paleta de cores oficial — 9 tons institucionais

⚠️ **Paleta atualizada em 2026-04-14 (commit `b3c62b1`)**. A paleta antiga (gold marrom `#b4975a`, slate `#1a2332`) está **OBSOLETA** e não deve ser usada em lugar nenhum.

CSS variables em `src/index.css`:

```css
:root {
  /* Navy / Slate (texto e seções escuras) */
  --slate:      #161d34;   ← navy profundo, texto principal
  --slate-mid:  #172d4b;   ← navy intermediário

  /* Blue (acentos institucionais) */
  --blue:       #005587;   ← azul institucional base
  --blue-light: #0d7dc2;   ← azul claro
  --blue-dark:  #123b61;   ← azul escuro

  /* Gold (accent primário, NUNCA substituir por amarelo puro) */
  --gold:       #d3a54c;   ← dourado principal
  --gold-light: #e3da98;   ← dourado pálido
  --gold-dark:  #a95f21;   ← dourado escuro (= copper)

  /* Copper (alias do gold-dark, usado em acentos quentes) */
  --copper:     #a95f21;

  /* Neutros e utilitários */
  --bg:         #f0ede8;   ← fundo principal (bege quente)
  --ice:        #edf2f7;   ← fundo alternativo (cinza-azulado claro)
  --white:      #ffffff;

  /* Animação */
  --ease:       cubic-bezier(0.19,1,0.22,1);
  --nav-h:      68px;
}
```

**Os 9 tons institucionais** (excluindo neutros): `--slate`, `--slate-mid`, `--blue`, `--blue-light`, `--blue-dark`, `--gold`, `--gold-light`, `--gold-dark`, `--copper`.

### Tipografia — hierarquia obrigatória

| Fonte | Uso |
|-------|-----|
| Cinzel | Todos os `h2`, `h3`, labels de seção, navegação |
| Cinzel Decorative | Numerais ornamentais, títulos especiais |
| Cormorant Garamond | Subtítulos, citações, descrições premium |
| Montserrat | Corpo de texto, UI, formulários |

### Animações
- Scroll reveal: classe `.reveal` + `.active` via `useReveal` hook (Intersection Observer)
- Delays escalonados: `.reveal-d1` (+120ms), `.reveal-d2` (+240ms), `.reveal-d3` (+360ms)
- Todos os `transition` devem usar `var(--ease)`

---

## Padrões de Componente

- Todo novo componente de seção pública deve:
  1. Ter um `id` para navegação por âncora
  2. Usar `<section id="nome-secao">` como wrapper
  3. Ter `<div className="section-inner">` como container interno
  4. Ter cabeçalho com `.section-label` + `<h2>` + `.divider`
  5. Aplicar `.reveal` nos elementos para animação de entrada
- Imagens externas: Unsplash (fotos), Imgur (logos/ícones), Pravatar (avatares placeholder)

---

## Lógica de Negócio

### Organização
- GLOMAM é uma potência maçônica regular, fundada em 1904
- Hierarquia: Grande Loja → Lojas → Membros (Maçons)
- Ordens paramaçônicas tuteladas: DeMolay, Filhas de Jó, Estrela do Oriente, Escudeiros
- Grão-Mestres históricos: 22 ao total desde 1904

### Intranet Administrativa (`/admin/intranet`)
- Acesso restrito — login em `/admin`
- 8 módulos: Dashboard, Imprensa, Financeiro, Documentos, Eventos, Usuários, Newsletter, Candidatos
- **Frontend apenas** — os formulários e CRUDs são visuais, sem persistência real no momento

### Álbum de Eventos (`#album-eventos`)
- Componente: `src/components/AlbumEventos.jsx`
- Dados: array `albums` hardcoded dentro do próprio componente
- Fluxo: card → modal com grade → lightbox individual
- Download de fotos: fetch → Blob → `<a download>`

---

## Regras para a IA

- **Nunca alterar** as variáveis CSS de cor sem aprovação
- **Sempre usar** `var(--ease)` em transitions/animations novas
- **Sempre adicionar** `.reveal` em novos elementos de seção
- **Nunca criar** backend ou banco de dados — projeto é estático
- **Sempre testar** responsividade nos breakpoints: 1024px, 768px, 540px, 480px
- Para novos álbuns/fotos, adicionar no array `albums` em `AlbumEventos.jsx`
- Ao adicionar nova seção no `Home.jsx`, registrar o `id` no `Header.jsx` como link de âncora
