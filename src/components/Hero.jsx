import React from 'react';

export default function Hero() {
  return (
    <section id="inicio" className="hero-banner" style={{ backgroundImage: "url('https://i.imgur.com/UMMFzmS.jpeg')" }}>
      <div className="hero-banner-overlay"></div>
      <div className="hero-banner-content">
        <h1 className="hero-banner-title">
          A Grande Loja<br />
          <span className="gold">mais antiga do Brasil</span>
        </h1>
      </div>
    </section>
  );
}
