# GLOMAM — Grande Loja Maçônica do Amazonas

<p align="center">
  <strong>Ad Gloriam et Honorem</strong><br>
  <em>Tradição · Regularidade · Progresso</em>
</p>

Site institucional e intranet administrativa da Grande Loja Maçônica do Amazonas, fundada em 1904, Manaus/AM.

---

## Pré-requisitos

- Node.js >= 18
- npm ou pnpm

## Instalação

```bash
git clone https://github.com/Opresida/glomam.git
cd glomam
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
# Acesse: http://localhost:5000
```

## Build para produção

```bash
npm run build
npm run preview   # preview local do build
```

## Deploy

Deploy automático na **Netlify** via `netlify.toml`. Qualquer push na branch principal dispara o deploy.

---

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Página institucional (15 seções) |
| `/imprensa` | Portal de notícias |
| `/brandbook` | Manual de identidade visual |
| `/admin` | Login administrativo |
| `/admin/intranet` | Painel administrativo (8 módulos) |

---

> Consulte `ARCHITECTURE.md` para estrutura de pastas e fluxo de dados.
> Consulte `PROJECT_CONTEXT.md` para visão geral, stack e status atual.
