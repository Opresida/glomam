import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="/">Início</Link>
          <a href="#historia">Memorial</a>
          <a href="#nossa-historia">História</a>
          <a href="#lideranca">Liderança</a>
          <Link to="/imprensa">Imprensa</Link>
          <Link to="/admin" className="nav-cta">Login</Link>
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
        <Link to="/" onClick={closeDrawer}>Início</Link>
        <a href="#historia" onClick={closeDrawer}>Memorial</a>
        <a href="#nossa-historia" onClick={closeDrawer}>História</a>
        <a href="#lideranca" onClick={closeDrawer}>Liderança</a>
        <Link to="/imprensa" onClick={closeDrawer}>Imprensa</Link>
        <Link to="/admin" onClick={closeDrawer} className="nav-cta">Login</Link>
      </nav>
    </header>
  );
}
