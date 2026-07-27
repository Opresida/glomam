// src/components/TrilhaRevistas.jsx
// Linha do tempo "trilha sinuosa" das revistas — espelha TrilhaInstitucional/Galeria.
// Cada parada = uma edição (capa + data + título → abre o PDF). Reusa o CSS .trilha-*.
import React, { useMemo } from 'react';

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
function fmt(data) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data || '');
  return m ? { dia: m[1], mes: MESES[parseInt(m[2], 10) - 1] || '---' } : { dia: '--', mes: '---' };
}

export default function TrilhaRevistas({ itens }) {
  // Agrupa por ano CRESCENTE (da primeira à última edição).
  const anos = useMemo(() => {
    const asc = [...itens].sort((a, b) => (a.dataISO || '').localeCompare(b.dataISO || ''));
    const map = new Map();
    for (const r of asc) {
      const y = r.dataISO ? r.dataISO.slice(0, 4) : 'Sem data';
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(r);
    }
    return [...map.entries()];
  }, [itens]);

  if (!itens.length) {
    return (
      <section className="trilha">
        <div className="section-inner"><p className="inst-vazio">Nenhuma edição nesse período.</p></div>
      </section>
    );
  }

  let parada = 0;

  return (
    <section className="trilha">
      <div className="section-inner">
        <div className="trilha-inner">
          <span className="trilha-spine" aria-hidden="true" />
          {anos.map(([ano, lista]) => (
            <div className="trilha-ano" key={ano}>
              <div className="trilha-marco">
                <span className="trilha-marco-ano">{ano}</span>
                <span className="trilha-marco-count">{lista.length} ediç{lista.length !== 1 ? 'ões' : 'ão'}</span>
              </div>
              {lista.map((r) => {
                const side = parada++ % 2 === 0 ? 'left' : 'right';
                const { dia, mes } = fmt(r.data);
                const inner = (
                  <>
                    <span className="trilha-card-thumb" style={{ backgroundImage: `url(${r.capa})` }} />
                    <span className="trilha-card-body">
                      <span className="trilha-card-data"><strong>{dia}</strong> {mes}{r.pdfUrl ? ' · PDF' : ''}</span>
                      <span className="trilha-card-titulo">{r.titulo}</span>
                    </span>
                  </>
                );
                return (
                  <div className="trilha-parada" data-side={side} key={r.id}>
                    <span className="trilha-no" aria-hidden="true" />
                    {r.pdfUrl ? (
                      <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="trilha-card" aria-label={`Abrir ${r.titulo}`}>{inner}</a>
                    ) : (
                      <span className="trilha-card trilha-card--off">{inner}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <div className="trilha-fim" aria-hidden="true"><span className="trilha-fim-dot" /></div>
        </div>
      </div>
    </section>
  );
}
