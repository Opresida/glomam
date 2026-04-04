import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noticias } from '../data/noticias.js';

const items = noticias.filter(n => n.destaque || n.categoria === 'Institucional');
const doubled = [...items, ...items];

function NovidadeCard({ noticia }) {
  return (
    <div className="nov-card">
      <div className="nov-card-img" style={{ backgroundImage: `url(${noticia.imagem})` }}>
        <div className="nov-card-overlay" />
        <span className="nov-card-tag">{noticia.categoria}</span>
      </div>
      <div className="nov-card-body">
        <p className="nov-card-date">{noticia.data}</p>
        <h4 className="nov-card-title">{noticia.titulo}</h4>
        <p className="nov-card-resumo">{noticia.resumo}</p>
      </div>
    </div>
  );
}

export default function Novidades() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    function animate() {
      if (!pausedRef.current) {
        posRef.current -= 0.6;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    wrap.addEventListener('mouseenter', pause);
    wrap.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      wrap.removeEventListener('mouseenter', pause);
      wrap.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section id="novidades" className="nov-section">
      <div className="nov-bg-grid" aria-hidden="true" />
      <div className="section-inner nov-inner reveal">
        <div className="nov-header">
          <div>
            <div className="section-label">Novidades</div>
            <h2 className="nov-title">Confira nossas Novidades</h2>
            <div className="divider" style={{ marginBottom: 0 }} />
          </div>
          <Link to="/imprensa" className="btn-primary nov-cta">
            <span>Saiba Mais</span>
          </Link>
        </div>
      </div>

      <div className="nov-carousel-outer" ref={wrapRef}>
        <div className="nov-carousel-fade nov-carousel-fade--left" aria-hidden="true" />
        <div className="nov-carousel-fade nov-carousel-fade--right" aria-hidden="true" />
        <div className="nov-carousel-track" ref={trackRef}>
          {doubled.map((n, i) => (
            <div key={`${n.id}-${i}`} className="nov-carousel-item" aria-hidden={i >= items.length}>
              <NovidadeCard noticia={n} />
            </div>
          ))}
        </div>
      </div>

      <div className="nov-cta-mobile section-inner reveal">
        <Link to="/imprensa" className="btn-primary">
          <span>Saiba Mais</span>
        </Link>
      </div>
    </section>
  );
}
