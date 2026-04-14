import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: 'Home', link: '/' },
  {
    label: 'GLOMAM',
    children: [
      { label: 'Nossa História', link: '#nossa-historia' },
      { label: 'Paramaçônicos', link: '#familias' },
      { label: 'Quero ser um Maçom', link: '#faq-section' },
    ],
  },
  {
    label: 'Maçonaria',
    children: [
      { label: 'O que é', link: '#geometria' },
      { label: 'Princípios', link: '/principios' },
      { label: 'Objetivos', link: '#objetivos' },
      { label: 'Perguntas e Respostas', link: '#faq-section' },
    ],
  },
  {
    label: 'Administração',
    children: [
      { label: 'Governantes', link: '#lideranca' },
      { label: 'Executivos', link: '#lideranca' },
      { label: 'Legislativos', link: '/legislativo' },
      { label: 'Judiciário', link: '/judiciario' },
      { label: 'Grandes Comissões', link: '#lideranca' },
    ],
  },
  { label: 'Lojas', link: '/lojas' },
  {
    label: 'Dispensários',
    children: [
      { label: 'Site Dispensário', link: 'https://www.glomamdispensario.org/', external: true },
      { label: 'Quem Somos', link: '/dispensario/quem-somos' },
    ],
  },
];

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSubs, setOpenSubs] = useState({});

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeDrawer = () => {
    setOpen(false);
    setOpenSubs({});
  };

  const toggleSub = (idx) => {
    setOpenSubs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleLink = (link, e) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      closeDrawer();
      if (window.location.pathname !== '/') {
        window.location.href = '/' + link;
        return;
      }
      const el = document.querySelector(link);
      if (el) {
        const top = el.offsetTop - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      closeDrawer();
    }
  };

  const ChevronDown = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );

  return (
    <header id="header" className={shrunk ? 'shrunk' : ''}>
      <div className="nav-inner">
        <a href="#inicio" className="logo" onClick={(e) => handleLink('#inicio', e)}>
          <img src="https://i.imgur.com/Hi8vRw1.png" alt="Logo GLOMAM" />
          <div className="logo-text">
            GLOMAM
            <small>Grande Loja Maçônica do Amazonas</small>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="nav-links">
          {menuItems.map((item, i) => (
            <div className="nav-item" key={i}>
              {item.children ? (
                <>
                  <button className="nav-trigger">
                    {item.label}
                    <ChevronDown />
                  </button>
                  <div className="nav-dropdown">
                    {item.children.map((child, j) =>
                      child.external ? (
                        <a key={j} href={child.link} target="_blank" rel="noreferrer" className="external">
                          {child.label}
                        </a>
                      ) : child.link.startsWith('#') ? (
                        <a key={j} href={child.link} onClick={(e) => handleLink(child.link, e)}>
                          {child.label}
                        </a>
                      ) : (
                        <Link key={j} to={child.link} onClick={closeDrawer}>
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </>
              ) : item.link.startsWith('#') ? (
                <a href={item.link} onClick={(e) => handleLink(item.link, e)}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.link}>{item.label}</Link>
              )}
            </div>
          ))}
          <Link to="/admin" className="nav-cta">Login</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label="Abrir menu"
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <nav className={`nav-drawer${open ? ' open' : ''}`}>
        {menuItems.map((item, i) => (
          <div className="nav-drawer-item" key={i}>
            {item.children ? (
              <>
                <button
                  className={`drawer-trigger${openSubs[i] ? ' open' : ''}`}
                  onClick={() => toggleSub(i)}
                >
                  {item.label}
                  <ChevronDown />
                </button>
                <div className={`drawer-sub${openSubs[i] ? ' open' : ''}`}>
                  {item.children.map((child, j) =>
                    child.external ? (
                      <a key={j} href={child.link} target="_blank" rel="noreferrer" onClick={closeDrawer}>
                        {child.label} ↗
                      </a>
                    ) : child.link.startsWith('#') ? (
                      <a key={j} href={child.link} onClick={(e) => handleLink(child.link, e)}>
                        {child.label}
                      </a>
                    ) : (
                      <Link key={j} to={child.link} onClick={closeDrawer}>
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              </>
            ) : item.link.startsWith('#') ? (
              <a href={item.link} onClick={(e) => handleLink(item.link, e)}>
                {item.label}
              </a>
            ) : (
              <Link to={item.link} onClick={closeDrawer}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="nav-drawer-item">
          <Link to="/admin" onClick={closeDrawer}>Login</Link>
        </div>
      </nav>
    </header>
  );
}
