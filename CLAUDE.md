# CLAUDE.md — GLOMAM

Instruções para o Claude Code ao trabalhar neste repositório. Este arquivo é carregado automaticamente em qualquer máquina onde o repo for clonado e o Claude Code for invocado, então funciona como **pacote de contexto portátil** — não depende da memória local de uma máquina específica.

---

## 👤 Quem é o usuário

**Humberto** (humbertodeassuncao@gmail.com). Product/strategy do GLOMAM, plano Claude Max. Usa o **Antigravity IDE** no Windows.

### Preferências fortes
- **Nunca abrir VS Code Simple Browser nem qualquer browser embutido na IDE.** Quando subir o dev server, apenas informar a URL `http://localhost:5000` — o Humberto abre no browser dele.
- **Comunicação em PT-BR direta**, vocativo "meu amigo" é OK no chat.
- Respostas **curtas e objetivas**. Sem floreio.
- Se for explicar uma decisão técnica, mostrar o trade-off — não escolher por ele.

---

## 🎨 Paleta oficial — 9 tons institucionais (OBRIGATÓRIA)

⚠️ **A paleta foi atualizada em 2026-04-14 (commit `b3c62b1`)**. A paleta antiga (gold marrom `#b4975a`, slate `#1a2332`) está **OBSOLETA** e não deve aparecer em código novo.

```css
/* src/index.css :root */
--slate:      #161d34;   /* navy profundo, texto principal */
--slate-mid:  #172d4b;   /* navy intermediário */
--blue:       #005587;   /* azul institucional base */
--blue-light: #0d7dc2;
--blue-dark:  #123b61;
--gold:       #d3a54c;   /* dourado principal (NUNCA usar amarelo puro) */
--gold-light: #e3da98;
--gold-dark:  #a95f21;
--copper:     #a95f21;   /* alias de gold-dark */

/* Neutros */
--bg:    #f0ede8;
--ice:   #edf2f7;
--white: #ffffff;
```

**Regra:** se você está hesitando entre uma cor "que parece certa" e uma das 9 variáveis acima — sempre usar a variável.

---

## 📚 Stack e arquitetura

- **React 19** + **Vite 8** + **React Router DOM 7**
- **Framer Motion 12** + **Three.js 0.183** (escultura de partículas 3D)
- **Leaflet 1.x + react-leaflet** + **OpenStreetMap** (mapas das Lojas)
- **CSS puro** com variáveis custom (sem Tailwind, sem CSS Modules)
- **Netlify** (deploy automático via push na `main`)
- **Sem backend, sem banco de dados.** SPA estática.

### Estrutura
- `src/components/` — seções da página pública + globais (Header, Footer, Loader)
- `src/pages/` — Home, Imprensa, Brandbook, AdminLogin, AdminIntranet + 8 subpáginas de intranet
- `src/hooks/useReveal.js` — Intersection Observer para scroll reveal
- `src/data/` — dados estáticos (`noticias.js` etc)
- `public/` — assets estáticos
- `src/index.css` — design system público centralizado
- Intranet tem `AdminIntranet.css` separado

### Padrão de seção pública (obrigatório)
```jsx
<section id="nome-da-secao">
  <div className="section-inner">
    <div className="section-label">RÓTULO</div>
    <h2 className="reveal">Título</h2>
    <div className="divider" />
    {/* conteúdo com .reveal nos elementos animados */}
  </div>
</section>
```

E registrar o `id` como link de âncora no `Header.jsx`.

---

## 🚀 Como rodar localmente

⚠️ **Projeto padronizado em pnpm** (obrigatório por causa do Netlify — `netlify.toml` usa `pnpm build` com frozen-lockfile). Nunca rode `npm install` aqui — cria `package-lock.json` que conflita.

```bash
cd glomam
pnpm install
pnpm dev
```

Se o pnpm não estiver instalado: `corepack enable && corepack prepare pnpm@latest --activate` ou `npm install -g pnpm`.

Server sobe em `http://localhost:5000`. **Não abrir Simple Browser** — apenas avisar a URL ao Humberto.

Para derrubar: matar o processo do terminal (ou pelo PID se ficou órfão).

### Adicionando dependências

```bash
pnpm add <pacote>          # produção
pnpm add -D <pacote>       # dev
```

Depois do add, commite o `package.json` **E** o `pnpm-lock.yaml` no mesmo commit — senão o Netlify quebra.

---

## 📝 Padrão de documentação (regra do Humberto em todos os projetos)

Todo projeto dele tem **5 docs canônicos**, e devem ser atualizados após cada feature aprovada:

| Arquivo | Propósito |
|---|---|
| `README.md` | Instalação, comandos, rotas — cartão de visitas |
| `CONTEXT.md` | Regras, stack, lógica de negócio, design system |
| `PROJECT_CONTEXT.md` | Visão geral consolidada + status atual |
| `ARCHITECTURE.md` | Estrutura de pastas, fluxo de dados, decisões |
| `TODO.md` | Concluído + pendente (marcar `[x]`, não remover do histórico) |

Quando uma feature for aprovada: atualizar README + PROJECT_CONTEXT + TODO no mesmo commit. Marcar `aprovado YYYY-MM-DD`.

---

## 🔒 Regras invioláveis (não fazer)

- ❌ **Nunca** alterar as 9 variáveis CSS de cor sem aprovação explícita do Humberto
- ❌ **Nunca** criar backend, API ou banco — projeto é 100% estático
- ❌ **Nunca** introduzir Tailwind ou CSS-in-JS — o design system é CSS puro com variáveis
- ❌ **Nunca** abrir Simple Browser / browser embutido — apenas informar URL
- ❌ **Nunca** usar a paleta antiga (`#b4975a`, `#1a2332`) — código novo deve usar as 9 variáveis atuais
- ❌ **Nunca** commitar sem `Co-Authored-By` apropriado se for commit feito por IA

---

## ✅ Princípios de trabalho

- **Mapear features existentes ANTES de criar do zero.** Antes de adicionar componente, seção ou padrão, procurar se já existe algo similar reutilizável. Reutilizar > duplicar.
- **Atualizar os 5 docs canônicos** após cada feature aprovada (não esperar acumular).
- **Testar responsividade nos breakpoints obrigatórios:** 1024px, 768px, 540px, 480px.
- **Usar `var(--ease)`** em toda transition/animation nova.
- **Adicionar `.reveal`** em elementos novos de seção pública para entrar com scroll.
- **Commits em PT-BR** com mensagem descritiva (padrão Conventional Commits opcional, mas mensagem clara é obrigatória).

---

## 🔧 Comandos RTK (token-saving)

O Humberto usa `rtk` como prefixo padrão pra economizar tokens em saída de comandos. Sempre que possível:

```bash
rtk git status        # em vez de git status
rtk git diff          # em vez de git diff
rtk pnpm dev          # em vez de pnpm dev
rtk grep <pattern>    # em vez de grep
rtk ls <path>         # em vez de ls
```

Se `rtk` não estiver instalado na máquina atual, usar comandos normais e mencionar.

---

## 🎯 Estado atual do projeto (snapshot 2026-05-20)

### Concluído
- Design system completo (paleta oficial de 9 tons + tipografia Playfair Display + Lora + Montserrat)
- **Header transparente** com transição para azul-escuro + `backdrop-filter: blur(14px)` ao scroll
- Hero com copy "A Grande Loja mais antiga do Brasil" (sem stats nem CTAs)
- Hierarquia do logo invertida: "Grande Loja Maçônica do Amazonas" em destaque + sigla GLOMAM abaixo
- Seções da Home (em ordem): Hero, Visita Virtual, Nossa História, Novidades, Objetivos, Pilares, Stats, Memorial, Liderança, Famílias Paramaçônicas, **MapaLojas (Leaflet)**, FAQ, Oriente
- **Mapas interativos** das Lojas — toggle Manaus/Interior, 48 Lojas geolocalizadas, popup customizado
- Rotas: `/principios`, `/judiciario`, `/legislativo`, `/lojas`, `/dispensario/quem-somos`, `/imprensa`, `/brandbook`, `/admin`, `/admin/intranet`
- Rota `/lojas` com **botão "Como Chegar?"** (modal Google Maps + Waze + Uber + Apple Maps)
- Portal de Imprensa, Brandbook, Intranet Administrativa (8 módulos UI, frontend apenas)
- Álbum de Eventos com grade → modal → lightbox + download individual
- Deploy Netlify configurado

### Removido recentemente (não recriar sem confirmação)
- ❌ Seção Welcome (img + label "Bem-Vindo" + texto) — **removida em 2026-05-20**
- ❌ Seção Apoio aos Projetos + página `/doar/:currency` — **removida em 2026-05-20**

### Aguardando entrega do cliente
- Foto definitiva do Hero (substitui `https://i.imgur.com/UMMFzmS.jpeg` em Hero.jsx)
- Logos das ordens paramaçônicas (DeMolay, Filhas de Jó, Estrela do Oriente, Escudeiros) — para Familias.jsx
- Confirmação de conta Business Instagram + Página Facebook conectada (pré-requisito Graph API)
- Revisão visual dos pinos do mapa de Manaus (coords ajustáveis em `src/data/lojasCoords.js`)

### Pendente (ver TODO.md para lista completa)
- Integração Instagram → seção "Últimas Notícias" (Graph API + Netlify Function — planejada)
- Backend/API para persistência real da Intranet
- Autenticação real em `/admin`
- Upload real de fotos no Álbum
- Integração real da Newsletter (Mailchimp/Resend)
- SEO — meta tags Open Graph dinâmicas
- Lazy loading dos componentes Three.js
- Otimização de imagens para `.webp`
