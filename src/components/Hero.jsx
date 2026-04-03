import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const orbRef = useRef(null);

  useEffect(() => {
    const isTouch = () => window.matchMedia('(pointer:coarse)').matches;
    if (isTouch()) return;

    const onScroll = () => {
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${window.scrollY * 0.028}px,${window.scrollY * -0.05}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="inicio">
      <div className="hero-bg-grid"></div>
      <div className="hero-bg-orb" ref={orbRef}></div>
      <div className="hero-inner">
        <div>
          <div className="hero-tag">Arquitetura Social da Virtude</div>
          <h1>A Perfeição<br />na <span className="gold"><span className="italic">Medida</span></span></h1>
          <p className="hero-desc">Uma Ordem Universal dedicada ao aperfeiçoamento da humanidade através do estudo constante, da retidão moral e da fraternidade eterna.</p>
          <div className="hero-btns">
            <a href="#geometria" className="btn-primary"><span>Ver Princípios</span></a>
            <a href="#oriente" className="btn-outline">Localização</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><div className="stat-num">1904</div><div className="stat-label">Fundação</div></div>
            <div className="stat-item"><div className="stat-num">13+</div><div className="stat-label">Grão-Mestres</div></div>
            <div className="stat-item"><div className="stat-num">120+</div><div className="stat-label">Anos de Luz</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-symbol-wrap">
            <div className="ring-outer"></div>
            <div className="ring-inner"></div>
            <svg className="hero-svg-main" viewBox="0 0 200 200">
              <path className="svg-path-anim" d="M15,48 L100,148 L185,48 L168,30 L100,120 L32,30 Z" stroke="#2C3E50" strokeWidth=".7" />
              <line className="svg-path-anim" x1="100" y1="18" x2="38" y2="162" stroke="#b4975a" strokeWidth=".8" style={{ animationDelay: '.5s' }} />
              <line className="svg-path-anim" x1="100" y1="18" x2="162" y2="162" stroke="#b4975a" strokeWidth=".8" style={{ animationDelay: '.7s' }} />
              <circle cx="100" cy="18" r="3" fill="#b4975a" stroke="none" />
              <circle cx="100" cy="95" r="12" stroke="#b4975a" strokeWidth=".5" opacity=".32" strokeDasharray="3,4" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontFamily="Cinzel" fontSize="11" fill="#b4975a" opacity=".52">G</text>
              <circle cx="100" cy="100" r="88" stroke="#2C3E50" strokeWidth=".25" strokeDasharray="4,8" opacity=".17" />
            </svg>
            <div className="hero-gadu">G.A.D.U.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
