// src/data/galeria.js
// Galeria de fotos migrada do site antigo (glomam.org.br/galeria).
// Fotos hospedadas no Cloudflare R2 (bucket público glomam-galeria); metadados leves aqui.
// Padrão dos arquivos no R2: <base>/<albumId>/<n>.webp (full) e <albumId>/<n>_t.webp (thumb), n = 1..nFotos.

import data from './galeria.json';

const BASE = (import.meta.env.VITE_GALERIA_BASE || 'https://pub-8d285b7c895f47f39de90c14bfe058e4.r2.dev').replace(/\/$/, '');

export const galeria = [...data].sort(
  (a, b) => (b.dataISO || '').localeCompare(a.dataISO || '') || b.id - a.id
);

export function getAlbum(id) {
  const nid = Number(id);
  return galeria.find((a) => a.id === nid) || null;
}

export const fotoThumb = (albumId, n) => `${BASE}/${albumId}/${n}_t.webp`;
export const fotoFull = (albumId, n) => `${BASE}/${albumId}/${n}.webp`;
export const albumCapa = (album) => `${BASE}/${album.id}/1_t.webp`;

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
export function fmtData(data) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((data || '').trim());
  if (!m) return { dia: '--', mes: '---', ano: '' };
  return { dia: m[1], mes: MESES[parseInt(m[2], 10) - 1] || '---', ano: m[3] };
}
