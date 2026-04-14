import React from 'react';
import { Link } from 'react-router-dom';
import { currencies } from '../services/donationAPI.js';

export default function ApoioProjetos() {
  return (
    <section id="apoio" className="ap-section">
      <div className="ap-bg" aria-hidden="true" />
      <div className="section-inner">
        <div className="ap-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Filantropia Maçônica</div>
          <h2 className="ap-titulo">Apoie os Projetos Sociais da Ordem</h2>
          <div className="divider" style={{ margin: '18px auto 22px' }} />
          <p className="ap-sub">
            Cada gesto fraterno se transforma em ação concreta — alimentando o Dispensário Maçônico,
            sustentando programas de saúde, educação e amparo às famílias. Sua contribuição ecoa
            em vidas além dos muros do Templo.
          </p>
        </div>

        <div className="ap-moedas-grid reveal reveal-d1">
          {Object.entries(currencies).map(([key, c]) => (
            <Link key={key} to={`/doar/${key}`} className="ap-moeda-card">
              <span className="ap-moeda-flag" aria-hidden="true">{c.flag}</span>
              <span className="ap-moeda-code">{c.code}</span>
              <span className="ap-moeda-symbol">{c.symbol}</span>
              <h4 className="ap-moeda-nome">{c.label}</h4>
              <span className="ap-moeda-hint">{c.gatewayHint}</span>
              <span className="ap-moeda-cta">
                Doar em {c.code}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="ap-disclaimer reveal reveal-d2">
          <span className="ap-ico" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </span>
          <p>
            Pagamento processado em ambiente seguro. A GLOMAM é uma instituição regular com CNPJ ativo
            e presta contas periodicamente aos seus Obreiros. Em caso de dúvidas, entre em contato
            com a Grande Secretaria.
          </p>
        </div>
      </div>
    </section>
  );
}
