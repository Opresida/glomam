// src/components/Institucional.jsx
// Seção "Institucional" na Home — carrossel infinito com as notícias do acervo migrado.
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noticiasInstitucionais } from '../data/noticiasInstitucionais.js';
import InstCard from './InstCard.jsx';

const SPEED = 0.4; // px por frame (~24px/s)

function InfiniteCarousel({ items }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const doubled = [...items, ...items];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
    const on = () => { reducedRef.current = mq.matches; };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animate = () => {
      if (!pausedRef.current && !reducedRef.current) {
        posRef.current -= SPEED;
        const half = track.scrollWidth / 2;
        if (half > 0 && Math.abs(posRef.current) >= half) posRef.current += half;
        track.style.transform = `translate3d(${posRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const nudge = (dir) => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!track) return;
    const step = wrap ? Math.min(wrap.offsetWidth * 0.8, 360) : 360;
    posRef.current -= dir * step;
    const half = track.scrollWidth / 2;
    if (half > 0) {
      while (Math.abs(posRef.current) >= half) posRef.current += (posRef.current < 0 ? half : -half);
      if (posRef.current > 0) posRef.current -= half;
    }
    track.style.transition = 'transform .6s var(--ease)';
    track.style.transform = `translate3d(${posRef.current}px,0,0)`;
    window.setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ''; }, 620);
  };

  return (
    <div className="inst-carousel reveal">
      <div
        className="inst-carousel-wrap"
        ref={wrapRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="inst-carousel-track" ref={trackRef}>
          {doubled.map((n, i) => (
            <div className="inst-carousel-item" key={`${n.id}-${i}`}>
              <InstCard n={n} carousel clone={i >= items.length} />
            </div>
          ))}
        </div>
      </div>
      <div className="inst-carousel-arrows">
        <button type="button" className="inst-arrow" aria-label="Anterior" onClick={() => nudge(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" className="inst-arrow" aria-label="Próxima" onClick={() => nudge(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function Institucional() {
  const items = noticiasInstitucionais;
  if (!items.length) return null;

  return (
    <section id="institucional" className="inst-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Institucional</div>
          <h2>Notícias Institucionais</h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>
      </div>
      {items.length > 1 ? (
        <InfiniteCarousel items={items} />
      ) : (
        <div className="section-inner">
          <div className="inst-grid reveal">
            {items.map((n) => <InstCard key={n.id} n={n} />)}
          </div>
        </div>
      )}
      <div className="section-inner">
        <div className="inst-cta reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/noticiasinstitucionais" className="btn-primary">
            <span>Ver Todas as Notícias</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
