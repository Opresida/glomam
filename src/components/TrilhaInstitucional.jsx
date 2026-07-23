// src/components/TrilhaInstitucional.jsx
// Linha do tempo em "trilha sinuosa" do acervo institucional — da 1ª à última publicação.
// Cards alternam esquerda/direita ao longo de uma espinha dourada, com marcos por ano.
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatarDataInst } from '../data/noticiasInstitucionais.js';

export default function TrilhaInstitucional({ itens }) {
  // Agrupa por ano em ordem CRESCENTE (da primeira publicação até a última).
  const anos = useMemo(() => {
    const asc = [...itens].sort((a, b) => (a.dataISO || '').localeCompare(b.dataISO || ''));
    const map = new Map();
    for (const n of asc) {
      const y = n.dataISO ? n.dataISO.slice(0, 4) : 'Sem data';
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(n);
    }
    return [...map.entries()];
  }, [itens]);

  if (!itens.length) {
    return (
      <section className="trilha">
        <div className="section-inner">
          <p className="inst-vazio">Nenhuma notícia nesse período.</p>
        </div>
      </section>
    );
  }

  // Contador global de paradas → alternância contínua (serpenteia) mesmo cruzando anos.
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
                <span className="trilha-marco-count">
                  {lista.length} publicaç{lista.length !== 1 ? 'ões' : 'ão'}
                </span>
              </div>
              {lista.map((n) => {
                const side = parada++ % 2 === 0 ? 'left' : 'right';
                const { dia, mes } = formatarDataInst(n.data);
                return (
                  <div className="trilha-parada" data-side={side} key={n.id}>
                    <span className="trilha-no" aria-hidden="true" />
                    <Link to={`/noticiasinstitucionais/${n.id}`} className="trilha-card">
                      {n.capa ? (
                        <span
                          className="trilha-card-thumb"
                          style={{ backgroundImage: `url(${n.capa})` }}
                        />
                      ) : (
                        <span className="trilha-card-thumb trilha-card-thumb--vazio" aria-hidden="true" />
                      )}
                      <span className="trilha-card-body">
                        <span className="trilha-card-data">
                          <strong>{dia}</strong> {mes}
                        </span>
                        <span className="trilha-card-titulo">{n.titulo}</span>
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="trilha-fim" aria-hidden="true">
            <span className="trilha-fim-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
