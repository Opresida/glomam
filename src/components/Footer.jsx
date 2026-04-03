import React from 'react';

export default function Footer() {
  return (
    <footer>
      <img src="https://i.imgur.com/Hi8vRw1.png" alt="Logo GLOMAM" style={{ display: 'block', margin: '0 auto', height: '100px' }} />
      <div className="footer-logo">GLOMAM</div>
      <div className="footer-sub">Grande Loja Maçônica do Amazonas — Desde 1904</div>
      <div className="footer-links">
        <a href="#inicio">Início</a>
        <a href="#geometria">Princípios</a>
        <a href="#historia">Memorial</a>
        <a href="#nossa-historia">História</a>
        <a href="#familias">Colunas</a>
        <a href="#faq-section">FAQ</a>
        <a href="#oriente">Contacto</a>
      </div>
      <div className="footer-line"></div>
      <div className="footer-copy">© 2025 GLOMAM · Tradição · Regularidade · Progresso · CNPJ 04.405.007/0001-44</div>
      <div className="footer-motto">Ad Gloriam et Honorem</div>
    </footer>
  );
}
