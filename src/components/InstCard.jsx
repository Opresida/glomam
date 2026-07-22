// src/components/InstCard.jsx
// Card de notícia institucional — reutilizado no carrossel da Home e na listagem.
import React from 'react';
import { Link } from 'react-router-dom';
import { formatarDataInst } from '../data/noticiasInstitucionais.js';

export default function InstCard({ n, carousel = false, clone = false }) {
  const { dia, mes, ano } = formatarDataInst(n.data);
  return (
    <Link
      to={`/noticiasinstitucionais/${n.id}`}
      className={`inst-card${carousel ? ' inst-card--carousel' : ''}`}
      aria-hidden={clone ? 'true' : undefined}
      tabIndex={clone ? -1 : undefined}
    >
      <div className="inst-card-img" style={{ backgroundImage: `url(${n.capa})` }}>
        <div className="inst-card-date">
          <span className="inst-card-day">{dia}</span>
          <span className="inst-card-month">{mes}</span>
          <span className="inst-card-year">{ano}</span>
        </div>
      </div>
      <div className="inst-card-body">
        <span className="inst-card-cat">{n.categoria}</span>
        <h4 className="inst-card-title">{n.titulo}</h4>
        {n.subtitulo ? <p className="inst-card-resumo">{n.subtitulo}</p> : null}
        <span className="inst-card-link">Leia Mais →</span>
      </div>
    </Link>
  );
}
