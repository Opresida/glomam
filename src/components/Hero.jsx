import React, { useState } from 'react';

export default function Hero() {
  // Vídeo só em telas grandes; no mobile fica o poster (leve, sem baixar o vídeo).
  const [largeScreen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );

  return (
    <section id="inicio" className="hero-banner">
      {largeScreen ? (
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
      ) : (
        <img className="hero-banner-video" src="/hero-glomam-poster.jpg" alt="" loading="eager" />
      )}
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
