import React, { useState, useEffect } from 'react';

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeDrawer = () => setOpen(false);

  return (
    <header id="header" className={shrunk ? 'shrunk' : ''}>
      <div className="nav-inner">
        <a href="#inicio" className="logo">GLOMAM<small>Grande Loja Maçônica do Amazonas</small></a>
        <div className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#geometria">Princípios</a>
          <a href="#historia">Memorial</a>
          <a href="#nossa-historia">História</a>
          <a href="#lideranca">Liderança</a>
          <a href="#familias">Colunas</a>
          <a href="#faq-section">FAQ</a>
          <a href="#oriente" className="nav-cta">Contacto</a>
        </div>
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label="Abrir menu"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav className={`nav-drawer${open ? ' open' : ''}`}>
        <a href="#inicio" onClick={closeDrawer}>Início</a>
        <a href="#geometria" onClick={closeDrawer}>Princípios</a>
        <a href="#historia" onClick={closeDrawer}>Memorial</a>
        <a href="#nossa-historia" onClick={closeDrawer}>História</a>
        <a href="#lideranca" onClick={closeDrawer}>Liderança</a>
        <a href="#familias" onClick={closeDrawer}>Colunas</a>
        <a href="#faq-section" onClick={closeDrawer}>FAQ</a>
        <a href="#oriente" onClick={closeDrawer}>Contacto</a>
      </nav>
    </header>
  );
}
