import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ROTAS_HEADER_SOLIDO = ['/imprensa', '/damasdafraternidade'];

const menuItems = [
  { label: 'Home', link: '/' },
  {
    label: 'GLOMAM',
    children: [
      { label: 'Nossa História', link: '#nossa-historia' },
      { label: 'Paramaçônicos', link: '#familias' },
    ],
  },
  {
    label: 'Institucional',
    children: [
      { label: 'Notícias Institucionais', link: '/noticiasinstitucionais' },
      { label: 'Revistas e Jornais', link: '/revistas' },
      { label: 'Galeria de Fotos', link: '/galeria' },
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
  // OCULTO (2026-07-08 — pedido do Humberto): aba "Administração" (Legislativo + Judiciário)
  // removida do menu. Rotas (/legislativo, /judiciario), páginas e CSS mantidos intactos
  // para reaproveitamento futuro. Para reexibir, basta descomentar o bloco abaixo.
  // {
  //   label: 'Administração',
  //   children: [
  //     { label: 'Legislativo', link: '/legislativo' },
  //     { label: 'Judiciário', link: '/judiciario' },
  //   ],
  // },
  { label: 'Como se tornar um Maçom', link: '#iniciacao' },
  { label: 'Lojas', link: '/lojas' },
  { label: 'Dispensário', link: 'https://www.glomamdispensario.org/', external: true },
];

export default function Header() {
  const location = useLocation();
  const forcarSolido = ROTAS_HEADER_SOLIDO.includes(location.pathname)
    || location.pathname.startsWith('/noticiasinstitucionais')
    || location.pathname === '/revistas'
    || location.pathname.startsWith('/galeria');
  const [scrollShrunk, setScrollShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSubs, setOpenSubs] = useState({});
  const shrunk = forcarSolido || scrollShrunk;

  useEffect(() => {
    const onScroll = () => setScrollShrunk(window.scrollY > 60);
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
        // posição real no documento, descontando a altura do header fixo
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      closeDrawer();
    }
  };

  // Clicar em "Home" estando na própria home rola suavemente para o começo
  const handleHome = (e) => {
    closeDrawer();
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Clicar em um link de rota (ex.: "Lojas", "Princípios") estando já naquela
  // rota rola suavemente para o topo — mudança de rota é tratada pelo ScrollToTop.
  const handleRoute = (to) => {
    closeDrawer();
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <img src="https://i.imgur.com/0bVk0qx.png" alt="Logo GLOMAM" />
          <div className="logo-text">
            Grande Loja Maçônica do Amazonas
            <small>GLOMAM</small>
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
                        <Link key={j} to={child.link} onClick={() => handleRoute(child.link)}>
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </>
              ) : item.external ? (
                <a href={item.link} target="_blank" rel="noreferrer" className="external">
                  {item.label}
                </a>
              ) : item.link === '/' ? (
                <Link to="/" onClick={handleHome}>{item.label}</Link>
              ) : item.link.startsWith('#') ? (
                <a href={item.link} onClick={(e) => handleLink(item.link, e)}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.link} onClick={() => handleRoute(item.link)}>{item.label}</Link>
              )}
            </div>
          ))}
          <div className="nav-social">
            <a href="https://www.instagram.com/glomam_oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da GLOMAM" className="nav-social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/oficialglomam" target="_blank" rel="noopener noreferrer" aria-label="Facebook da GLOMAM" className="nav-social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
          </div>
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
                      <Link key={j} to={child.link} onClick={() => handleRoute(child.link)}>
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              </>
            ) : item.external ? (
              <a href={item.link} target="_blank" rel="noreferrer" onClick={closeDrawer}>
                {item.label} ↗
              </a>
            ) : item.link === '/' ? (
              <Link to="/" onClick={handleHome}>
                {item.label}
              </Link>
            ) : item.link.startsWith('#') ? (
              <a href={item.link} onClick={(e) => handleLink(item.link, e)}>
                {item.label}
              </a>
            ) : (
              <Link to={item.link} onClick={() => handleRoute(item.link)}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="nav-drawer-item">
          <Link to="/admin" onClick={closeDrawer}>Login</Link>
        </div>
        <div className="nav-drawer-social">
          <a href="https://www.instagram.com/glomam_oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da GLOMAM" className="nav-social-link">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://www.facebook.com/oficialglomam" target="_blank" rel="noopener noreferrer" aria-label="Facebook da GLOMAM" className="nav-social-link">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
