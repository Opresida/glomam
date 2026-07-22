// src/data/noticiasInstitucionais.js
//
// Notícias institucionais raspadas do site oficial glomam.org.br (acervo migrado).
// Os dados brutos vivem em noticiasInstitucionais.json (gerado por scripts/build-institucional-data.mjs).
// Este módulo só expõe a lista ordenada + helpers de acesso/formatação.

import data from './noticiasInstitucionais.json';

// Ordena por data (mais recente primeiro); desempate por id decrescente.
export const noticiasInstitucionais = [...data].sort((a, b) => {
  if (a.dataISO && b.dataISO && a.dataISO !== b.dataISO) return b.dataISO.localeCompare(a.dataISO);
  return b.id - a.id;
});

export function getNoticiaInstitucional(id) {
  const nid = Number(id);
  return noticiasInstitucionais.find((n) => n.id === nid) || null;
}

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

// "31/08/2025" -> { dia: "31", mes: "AGO", ano: "2025" }
export function formatarDataInst(data) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((data || '').trim());
  if (!m) return { dia: '--', mes: '---', ano: '' };
  return { dia: m[1], mes: MESES[parseInt(m[2], 10) - 1] || '---', ano: m[3] };
}
