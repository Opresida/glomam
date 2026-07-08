import React, { useState } from 'react';

const VIDEO_ID = 'Q1BdxmRofDs';
const THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function VisitaVirtual() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="visita-virtual" className="vv-section">
      <div className="vv-bg" aria-hidden="true" />
      <div className="section-inner">
        <div className="vv-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Experiência Imersiva</div>
          <h2 className="vv-titulo">Visita ao Palácio Maçônico</h2>
          <div className="divider" style={{ margin: '18px auto 22px' }} />
          <p className="vv-sub">
            Sobrevoe a sede histórica da GLOMAM no coração de Manaus e conheça, em primeira mão,
            o espaço que há mais de um século abriga a Maçonaria amazonense. Uma experiência
            aérea em alta definição que revela cada detalhe de um templo vivo e centenário.
          </p>
        </div>

        <div className="vv-video-wrap reveal reveal-d1">
          <div className="vv-video">
            {!playing ? (
              <button
                type="button"
                className="vv-thumb"
                onClick={() => setPlaying(true)}
                aria-label="Assistir à visita ao Palácio Maçônico"
                style={{ backgroundImage: `url(${THUMB})` }}
              >
                <div className="vv-thumb-overlay" />
                <div className="vv-play">
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <circle cx="40" cy="40" r="38" fill="rgba(22,29,52,.72)" stroke="#d3a54c" strokeWidth="1.5" />
                    <polygon points="32,24 32,56 58,40" fill="#d3a54c" />
                  </svg>
                </div>
                <div className="vv-thumb-caption">
                  <span className="vv-thumb-eyebrow">Tour Aéreo · Drone 4K</span>
                  <span className="vv-thumb-title">Pressione para iniciar a jornada</span>
                </div>
              </button>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Visita ao Palácio Maçônico GLOMAM"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>

        <div className="vv-info-grid reveal reveal-d2">
          <div className="vv-info-card">
            <div className="vv-info-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
            </div>
            <h4>Perspectiva Aérea</h4>
            <p>Um olhar raro sobre a arquitetura do Palácio Maçônico, revelando simetrias e simbolismos imperceptíveis do solo.</p>
          </div>
          <div className="vv-info-card">
            <div className="vv-info-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4>Manaus · Amazonas</h4>
            <p>No coração do Centro Histórico, onde a Maçonaria amazonense escreve sua história desde 1904.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
