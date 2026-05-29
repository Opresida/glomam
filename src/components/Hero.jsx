import React from 'react';

export default function Hero() {
  return (
    <section id="inicio" className="hero-banner">
      <video
        className="hero-banner-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-glomam-poster.jpg"
      >
        <source src="/hero-glomam.webm" type="video/webm" />
        <source src="/hero-glomam.mp4" type="video/mp4" />
      </video>
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
