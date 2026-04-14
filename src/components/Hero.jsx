import React from 'react';

export default function Hero() {
  return (
    <section id="inicio" className="hero-banner" style={{ backgroundImage: "url('https://i.imgur.com/UMMFzmS.jpeg')" }}>
      <div className="hero-banner-overlay"></div>
      <div className="hero-banner-content">
        <h1 className="hero-banner-title">
          Grande Loja Maçônica<br />
          <span className="gold">do Amazonas</span>
        </h1>
        <p className="hero-banner-desc">
          Uma Ordem Universal dedicada ao aperfeiçoamento da humanidade através do estudo constante, da retidão moral e da fraternidade eterna.
        </p>
        <div className="hero-banner-stats">
          <div className="hb-stat">
            <div className="hb-stat-num">1904</div>
            <div className="hb-stat-label">Fundação</div>
          </div>
          <div className="hb-stat">
            <div className="hb-stat-num">13+</div>
            <div className="hb-stat-label">Grão-Mestres</div>
          </div>
          <div className="hb-stat">
            <div className="hb-stat-num">120+</div>
            <div className="hb-stat-label">Anos de Luz</div>
          </div>
        </div>
        <div className="hero-banner-btns">
          <a href="#geometria" className="btn-primary"><span>Ver Princípios</span></a>
          <a href="#oriente" className="btn-outline-light">Localização</a>
        </div>
      </div>
    </section>
  );
}
