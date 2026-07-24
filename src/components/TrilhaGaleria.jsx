// src/components/TrilhaGaleria.jsx
// Linha do tempo "trilha sinuosa" dos álbuns da galeria — espelha TrilhaInstitucional,
// mas cada parada é um álbum (capa + data + título → /galeria/:id). Reusa o CSS .trilha-*.
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { albumCapa, fmtData } from '../data/galeria.js';

export default function TrilhaGaleria({ itens }) {
  // Agrupa por ano CRESCENTE (do primeiro álbum até o último).
  const anos = useMemo(() => {
    const asc = [...itens].sort((a, b) => (a.dataISO || '').localeCompare(b.dataISO || ''));
    const map = new Map();
    for (const a of asc) {
      const y = a.dataISO ? a.dataISO.slice(0, 4) : 'Sem data';
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(a);
    }
    return [...map.entries()];
  }, [itens]);

  if (!itens.length) {
    return (
      <section className="trilha">
        <div className="section-inner"><p className="inst-vazio">Nenhum álbum nesse período.</p></div>
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
                <span className="trilha-marco-count">{lista.length} álbu{lista.length !== 1 ? 'ns' : 'm'}</span>
              </div>
              {lista.map((a) => {
                const side = parada++ % 2 === 0 ? 'left' : 'right';
                const { dia, mes } = fmtData(a.data);
                return (
                  <div className="trilha-parada" data-side={side} key={a.id}>
                    <span className="trilha-no" aria-hidden="true" />
                    <Link to={`/galeria/${a.id}`} className="trilha-card">
                      <span className="trilha-card-thumb" style={{ backgroundImage: `url(${albumCapa(a)})` }} />
                      <span className="trilha-card-body">
                        <span className="trilha-card-data"><strong>{dia}</strong> {mes} · {a.nFotos} fotos</span>
                        <span className="trilha-card-titulo">{a.titulo}</span>
                      </span>
                    </Link>
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
