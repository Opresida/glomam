// src/pages/AlbumGaleria.jsx
// Rota /galeria/:id — fotos de um álbum (thumbs lazy + lightbox). Fotos no R2.
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { getAlbum, fotoThumb, fotoFull } from '../data/galeria.js';

const LOTE = 60;

function Lightbox({ albumId, total, index, setIndex, onClose }) {
  const go = useCallback((dir) => setIndex((i) => (i + dir + total) % total), [total, setIndex]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [go, onClose]);

  return (
    <div className="inst-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Foto">
      <button className="inst-lb-close" aria-label="Fechar" onClick={onClose}>×</button>
      <button className="inst-lb-nav inst-lb-prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
      <img className="inst-lb-img" src={fotoFull(albumId, index + 1)} alt="" onClick={(e) => e.stopPropagation()} />
      <button className="inst-lb-nav inst-lb-next" aria-label="Próxima" onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
      <div className="inst-lb-counter">{index + 1} / {total}</div>
    </div>
  );
}

export default function AlbumGaleria() {
  useReveal();
  const { id } = useParams();
  const album = getAlbum(id);
  const [visiveis, setVisiveis] = useState(LOTE);
  const [lb, setLb] = useState(-1);

  useEffect(() => { setVisiveis(LOTE); setLb(-1); }, [id]);

  if (!album) {
    return (
      <>
        <Header />
        <main className="inst-page">
          <div className="inst-page-top" />
          <section className="section-inner" style={{ minHeight: '40vh', paddingTop: 40 }}>
            <div className="section-label">Institucional</div>
            <h1 className="inst-artigo-title">Álbum não encontrado</h1>
            <p style={{ marginTop: 16 }}>
              <Link to="/galeria" className="inst-voltar">← Todos os álbuns</Link>
            </p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const mostrar = Math.min(visiveis, album.nFotos);

  return (
    <>
      <Header />
      <main className="inst-page gal-album">
        <div className="inst-page-top" />
        <section className="section-inner gal-album-head reveal">
          <Link to="/galeria" className="inst-voltar">← Todos os álbuns</Link>
          <span className="gal-album-data">{album.data}</span>
          <h1 className="gal-album-titulo">{album.titulo}</h1>
          <p className="gal-album-count">{album.nFotos} fotos</p>
        </section>

        <section className="gal-fotos-sec">
          <div className="section-inner">
            <div className="gal-fotos-grid">
              {Array.from({ length: mostrar }, (_, i) => (
                <button
                  key={i}
                  className="gal-foto"
                  onClick={() => setLb(i)}
                  aria-label={`Abrir foto ${i + 1}`}
                >
                  <img src={fotoThumb(album.id, i + 1)} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            {mostrar < album.nFotos && (
              <div className="inst-more-wrap">
                <button className="btn-primary" onClick={() => setVisiveis((v) => v + LOTE)}>
                  <span>Mostrar mais fotos</span>
                </button>
                <p className="inst-more-count">{mostrar} de {album.nFotos} fotos</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {lb >= 0 && (
        <Lightbox albumId={album.id} total={album.nFotos} index={lb} setIndex={setLb} onClose={() => setLb(-1)} />
      )}
    </>
  );
}
