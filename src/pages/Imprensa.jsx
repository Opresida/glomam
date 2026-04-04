import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { noticias, categorias } from '../data/noticias.js';

function HeroDestaque() {
  const principal = noticias.find(n => n.destaque);
  const secundarias = noticias.filter(n => n.destaque && n.id !== principal.id).slice(0, 2);

  return (
    <section className="imp-hero reveal">
      <div className="section-inner">
        <div className="section-label">Imprensa</div>
        <h2 style={{ marginBottom: '36px' }}>Notícias em Destaque</h2>
        <div className="imp-hero-grid">
          <button className="imp-hero-main reveal imp-link-btn" aria-label={principal.titulo}>
            <div className="imp-hero-main-img" style={{ backgroundImage: `url(${principal.imagem})` }}>
              <div className="imp-hero-overlay" />
              <div className="imp-hero-main-content">
                <span className="imp-cat-tag">{principal.categoria}</span>
                <h3 className="imp-hero-main-title">{principal.titulo}</h3>
                <p className="imp-hero-main-date">{principal.data}</p>
                <p className="imp-hero-main-resumo">{principal.resumo}</p>
              </div>
            </div>
          </button>
          <div className="imp-hero-side">
            {secundarias.map((n, i) => (
              <button key={n.id} className={`imp-hero-sec reveal reveal-d${i + 1} imp-link-btn`} aria-label={n.titulo}>
                <div className="imp-hero-sec-img" style={{ backgroundImage: `url(${n.imagem})` }}>
                  <div className="imp-hero-overlay" />
                  <div className="imp-hero-sec-content">
                    <span className="imp-cat-tag imp-cat-tag--sm">{n.categoria}</span>
                    <h4 className="imp-hero-sec-title">{n.titulo}</h4>
                    <p className="imp-hero-sec-date">{n.data}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ noticia }) {
  return (
    <button className="imp-news-card imp-link-btn" aria-label={noticia.titulo}>
      <div className="imp-news-card-img" style={{ backgroundImage: `url(${noticia.imagem})` }} />
      <div className="imp-news-card-body">
        <span className="imp-cat-tag imp-cat-tag--sm">{noticia.categoria}</span>
        <h4 className="imp-news-card-title">{noticia.titulo}</h4>
        <p className="imp-news-card-date">{noticia.data}</p>
      </div>
    </button>
  );
}

function InfiniteCarousel({ items }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    function animate() {
      if (!pausedRef.current) {
        posRef.current -= 0.5;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    const handleEnter = () => { pausedRef.current = true; };
    const handleLeave = () => { pausedRef.current = false; };
    wrap.addEventListener('mouseenter', handleEnter);
    wrap.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      wrap.removeEventListener('mouseenter', handleEnter);
      wrap.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="imp-carousel-wrap" ref={wrapRef}>
      <div className="imp-carousel-track" ref={trackRef}>
        {doubled.map((n, i) => (
          <div key={`${n.id}-${i}`} className="imp-carousel-item" aria-hidden={i >= items.length}>
            <NewsCard noticia={n} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriasSection() {
  return (
    <>
      {categorias.map((cat, idx) => {
        const items = noticias.filter(n => n.categoria === cat);
        if (items.length === 0) return null;
        const isDark = idx % 2 === 1;
        return (
          <section key={cat} className={`imp-cat-section${isDark ? ' imp-cat-dark' : ''} reveal`}>
            <div className="section-inner">
              <div className="imp-cat-header">
                <div>
                  <div className="section-label">{cat}</div>
                  <h2 className="imp-cat-title">{cat}</h2>
                </div>
                <button className="imp-ver-mais imp-link-btn">Ver todas</button>
              </div>
              <InfiniteCarousel items={items} />
            </div>
          </section>
        );
      })}
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEnviado(true);
    }
  };

  return (
    <section className="imp-newsletter reveal">
      <div className="section-inner">
        <div className="imp-newsletter-inner">
          <div className="imp-newsletter-deco" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
              <path d="M32 8 L32 56 M8 32 L56 32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              <polygon points="32,16 38,28 26,28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
            </svg>
          </div>
          <div className="imp-newsletter-content">
            <div className="section-label">Newsletter</div>
            <h2 className="imp-newsletter-title">Fique sempre informado</h2>
            <p className="imp-newsletter-desc">
              Receba em primeira mão as notícias, comunicados e eventos da Grande Loja Maçônica do Amazonas
              diretamente no seu e-mail. Tradição, regularidade e progresso — a cada edição.
            </p>
            {enviado ? (
              <div className="imp-newsletter-success">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Inscrição confirmada. Bem-vindo à nossa comunidade.
              </div>
            ) : (
              <form className="imp-newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  className="imp-newsletter-input"
                  placeholder="Seu endereço de e-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="imp-newsletter-btn">
                  <span>Inscrever-se</span>
                </button>
              </form>
            )}
            <p className="imp-newsletter-privacy">
              Respeitamos a sua privacidade. Nenhum dado é compartilhado com terceiros.
            </p>
          </div>
          <div className="imp-newsletter-deco imp-newsletter-deco--right" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
              <path d="M32 8 L56 32 L32 56 L8 32 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Imprensa() {
  useReveal();

  return (
    <>
      <Header />
      <main className="imp-page">
        <div className="imp-page-top" />
        <HeroDestaque />
        <CategoriasSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
