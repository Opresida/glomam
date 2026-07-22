// src/pages/NoticiaInstitucional.jsx
// Rota /noticiasinstitucionais/:id — matéria individual do acervo institucional, com galeria + lightbox.
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { getNoticiaInstitucional } from '../data/noticiasInstitucionais.js';

function Lightbox({ fotos, index, setIndex, onClose }) {
  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + fotos.length) % fotos.length);
  }, [fotos.length, setIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [go, onClose]);

  return (
    <div className="inst-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Galeria de fotos">
      <button className="inst-lb-close" aria-label="Fechar" onClick={onClose}>×</button>
      <button className="inst-lb-nav inst-lb-prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
      <img className="inst-lb-img" src={fotos[index]} alt="" onClick={(e) => e.stopPropagation()} />
      <button className="inst-lb-nav inst-lb-next" aria-label="Próxima" onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
      <div className="inst-lb-counter">{index + 1} / {fotos.length}</div>
    </div>
  );
}

export default function NoticiaInstitucional() {
  useReveal();
  const { id } = useParams();
  const n = getNoticiaInstitucional(id);
  const [lb, setLb] = useState(-1); // -1 fechado; senão índice aberto

  if (!n) {
    return (
      <>
        <Header />
        <main className="inst-page">
          <div className="inst-page-top" />
          <section className="section-inner" style={{ minHeight: '40vh', paddingTop: 40 }}>
            <div className="section-label">Institucional</div>
            <h1 className="inst-artigo-title">Notícia não encontrada</h1>
            <p style={{ marginTop: 16 }}>
              <Link to="/noticiasinstitucionais" className="inst-voltar">← Todas as notícias institucionais</Link>
            </p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const creditos = [n.creditos?.texto && `Texto: ${n.creditos.texto}`, n.creditos?.edicao && `Edição: ${n.creditos.edicao}`]
    .filter(Boolean).join('  ·  ');

  return (
    <>
      <Header />
      <main className="inst-page inst-artigo">
        <div className="inst-page-top" />
        <article className="section-inner inst-artigo-inner">
          <Link to="/noticiasinstitucionais" className="inst-voltar reveal">← Todas as notícias institucionais</Link>

          <div className="reveal">
            <span className="inst-artigo-cat">{n.categoria}</span>
            <h1 className="inst-artigo-title">{n.titulo}</h1>
            <div className="inst-artigo-meta">
              <span className="inst-artigo-data">{n.data}</span>
              {creditos && <span className="inst-artigo-cred">{creditos}</span>}
            </div>
          </div>

          {n.capa && (
            <div className="inst-artigo-capa reveal">
              <img src={n.capa} alt={n.titulo} />
            </div>
          )}

          {n.subtitulo && <p className="inst-artigo-lead reveal">{n.subtitulo}</p>}

          <div className="inst-artigo-corpo reveal">
            {n.corpo.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {n.galeria && n.galeria.length > 0 && (
            <div className="inst-artigo-galeria reveal">
              <h3 className="inst-galeria-title">Galeria de Fotos</h3>
              <div className="divider" />
              <div className="inst-galeria-grid">
                {n.galeria.map((foto, i) => (
                  <button key={foto} className="inst-galeria-thumb" onClick={() => setLb(i)} aria-label={`Abrir foto ${i + 1}`}>
                    <img src={foto} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="inst-artigo-fonte reveal">
            <a href={n.fonteUrl} target="_blank" rel="noopener noreferrer">Fonte original ↗</a>
          </div>
        </article>
      </main>
      <Footer />

      {lb >= 0 && n.galeria?.length > 0 && (
        <Lightbox fotos={n.galeria} index={lb} setIndex={setLb} onClose={() => setLb(-1)} />
      )}
    </>
  );
}
