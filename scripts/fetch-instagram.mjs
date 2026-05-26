#!/usr/bin/env node
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'src', 'data', 'instagram.json');
const GRAPH_VERSION = 'v22.0';
const POSTS_LIMIT = 3;

const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

function log(level, msg) {
  const tag = { info: '[ig-fetch]', warn: '[ig-fetch:warn]', error: '[ig-fetch:error]', ok: '[ig-fetch:ok]' }[level] || '[ig-fetch]';
  console.log(`${tag} ${msg}`);
}

function abortSoft(reason) {
  log('warn', `${reason} — mantendo JSON anterior; Novidades.jsx faz fallback pro conteúdo estático.`);
  if (!existsSync(OUTPUT_PATH)) writeFileSync(OUTPUT_PATH, '[]\n');
  process.exit(0);
}

function pickImage(post) {
  if (post.media_type === 'VIDEO') return post.thumbnail_url || post.media_url;
  if (post.media_type === 'CAROUSEL_ALBUM') {
    const first = post.children?.data?.[0];
    if (!first) return post.media_url;
    return first.media_type === 'VIDEO' ? (first.thumbnail_url || first.media_url) : first.media_url;
  }
  return post.media_url;
}

function buildTitleAndSummary(caption) {
  if (!caption) return { titulo: 'Publicação do Instagram', resumo: 'Confira esta novidade no perfil oficial da GLOMAM.' };
  const clean = caption.replace(/\s+/g, ' ').trim();
  const sentenceMatch = clean.match(/^(.+?[.!?])(\s|$)/);
  const firstSentence = sentenceMatch ? sentenceMatch[1] : clean.split('\n')[0];
  const tituloRaw = firstSentence.length > 90 ? firstSentence.slice(0, 87).trimEnd() + '…' : firstSentence;
  const titulo = tituloRaw.replace(/#\w+/g, '').replace(/\s+/g, ' ').trim() || 'Publicação do Instagram';
  const resumoRaw = clean.length > titulo.length ? clean.slice(titulo.length).trim() : clean;
  const resumo = resumoRaw.length > 220 ? resumoRaw.slice(0, 217).trimEnd() + '…' : (resumoRaw || clean.slice(0, 217));
  return { titulo, resumo };
}

function formatDate(iso) {
  const d = new Date(iso);
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${String(d.getDate()).padStart(2, '0')} ${meses[d.getMonth()]} ${d.getFullYear()}`;
}

async function fetchPosts() {
  const url = new URL(`https://graph.instagram.com/${GRAPH_VERSION}/${IG_USER_ID}/media`);
  url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_url,thumbnail_url,media_type}');
  url.searchParams.set('limit', String(POSTS_LIMIT));
  url.searchParams.set('access_token', IG_ACCESS_TOKEN);

  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Instagram API ${res.status}: ${body.slice(0, 500)}`);
  }
  const json = await res.json();
  if (!json.data || !Array.isArray(json.data)) {
    throw new Error(`Resposta inesperada da Instagram API: ${JSON.stringify(json).slice(0, 500)}`);
  }
  return json.data;
}

async function refreshToken() {
  try {
    const url = new URL(`https://graph.instagram.com/refresh_access_token`);
    url.searchParams.set('grant_type', 'ig_refresh_token');
    url.searchParams.set('access_token', IG_ACCESS_TOKEN);
    const res = await fetch(url);
    if (!res.ok) return;
    const json = await res.json();
    if (json.access_token && json.access_token !== IG_ACCESS_TOKEN) {
      log('info', `Token renovado (expira em ${json.expires_in}s). Atualize IG_ACCESS_TOKEN no Netlify:`);
      log('info', json.access_token);
    } else {
      log('info', `Token ainda válido (expira em ~${json.expires_in}s).`);
    }
  } catch (e) {
    log('warn', `Falha ao renovar token (não bloqueia build): ${e.message}`);
  }
}

async function main() {
  if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
    return abortSoft('IG_USER_ID/IG_ACCESS_TOKEN não definidos');
  }

  let raw;
  try {
    raw = await fetchPosts();
  } catch (e) {
    return abortSoft(`Falha no fetch da Graph API: ${e.message}`);
  }

  if (raw.length === 0) {
    return abortSoft('Graph API retornou 0 posts');
  }

  const posts = raw.slice(0, POSTS_LIMIT).map((p) => {
    const { titulo, resumo } = buildTitleAndSummary(p.caption);
    return {
      id: `ig-${p.id}`,
      titulo,
      categoria: 'Instagram',
      data: formatDate(p.timestamp),
      resumo,
      imagem: pickImage(p),
      permalink: p.permalink,
      destaque: true,
      _source: 'instagram',
    };
  });

  writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2) + '\n');
  log('ok', `${posts.length} posts gravados em src/data/instagram.json`);
  await refreshToken();
}

main().catch((e) => {
  log('error', e.message);
  abortSoft('Erro inesperado');
});
