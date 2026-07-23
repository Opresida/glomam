// src/data/revistas.js
// Revistas e Jornais da GLOMAM (Arte Real, Balaústre, edições comemorativas),
// migrados do site oficial antigo (glomam.org.br/jornal).
//
// - capa: imagem local (webp) em public/revistas/ (leve, versionada no git)
// - pdfUrl: `${VITE_REVISTAS_BASE}/${pdfUid}.pdf` — PDFs hospedados FORA do git
//   (bucket externo). null quando o site antigo não tinha o PDF (indisponível na origem).

import data from './revistas.json';

// "DD/MM/AAAA" -> "AAAA-MM-DD"
function iso(d) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d || '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

// Base pública dos PDFs — bucket Cloudflare R2 "glomam-revistas" (público, não é segredo).
// Pode ser sobrescrita por VITE_REVISTAS_BASE (ex.: domínio custom no futuro).
const PDF_BASE = (import.meta.env.VITE_REVISTAS_BASE || 'https://pub-b42e196d31d44819a0ffed28e4075034.r2.dev').replace(/\/$/, '');

export const revistas = data
  .map((r) => ({
    id: r.coverUid,
    titulo: r.titulo,
    data: r.data,
    dataISO: iso(r.data),
    capa: `/revistas/${r.coverUid}.webp`,
    coverUid: r.coverUid,
    pdfUid: r.pdfUid,
    pdfFile: r.pdfUid ? `${r.pdfUid}.pdf` : null,
    // vazio até configurar VITE_REVISTAS_BASE (bucket externo)
    pdfUrl: r.pdfUid && PDF_BASE ? `${PDF_BASE}/${r.pdfUid}.pdf` : null,
  }))
  .sort((a, b) => (b.dataISO || '').localeCompare(a.dataISO || ''));
