import React, { useState, useEffect, useCallback } from 'react';

const albums = [
  {
    id: 1,
    titulo: 'Instalação da Diretoria 2024',
    data: 'Março · 2024',
    capa: 'https://picsum.photos/seed/gloinstl/600/400',
    totalFotos: 8,
    fotos: [
      { id: 1, src: 'https://picsum.photos/seed/gloinstl1/1200/800', legenda: 'Cerimônia de abertura' },
      { id: 2, src: 'https://picsum.photos/seed/gloinstl2/1200/800', legenda: 'Posse dos diretores' },
      { id: 3, src: 'https://picsum.photos/seed/gloinstl3/1200/800', legenda: 'Discurso do Grão-Mestre' },
      { id: 4, src: 'https://picsum.photos/seed/gloinstl4/1200/800', legenda: 'Homenagens' },
      { id: 5, src: 'https://picsum.photos/seed/gloinstl5/1200/800', legenda: 'Banquete fraternal' },
      { id: 6, src: 'https://picsum.photos/seed/gloinstl6/1200/800', legenda: 'Confraternização' },
      { id: 7, src: 'https://picsum.photos/seed/gloinstl7/1200/800', legenda: 'Entrega de medalhas' },
      { id: 8, src: 'https://picsum.photos/seed/gloinstl8/1200/800', legenda: 'Encerramento oficial' },
    ],
  },
  {
    id: 2,
    titulo: 'Semana Maçônica do Amazonas',
    data: 'Junho · 2024',
    capa: 'https://picsum.photos/seed/glosem/600/400',
    totalFotos: 6,
    fotos: [
      { id: 1, src: 'https://picsum.photos/seed/glosem1/1200/800', legenda: 'Abertura solene' },
      { id: 2, src: 'https://picsum.photos/seed/glosem2/1200/800', legenda: 'Palestras e conferências' },
      { id: 3, src: 'https://picsum.photos/seed/glosem3/1200/800', legenda: 'Mesa redonda' },
      { id: 4, src: 'https://picsum.photos/seed/glosem4/1200/800', legenda: 'Exposição histórica' },
      { id: 5, src: 'https://picsum.photos/seed/glosem5/1200/800', legenda: 'Visita ao Palácio' },
      { id: 6, src: 'https://picsum.photos/seed/glosem6/1200/800', legenda: 'Encerramento' },
    ],
  },
  {
    id: 3,
    titulo: 'Ação Social — Manaus Centro',
    data: 'Agosto · 2024',
    capa: 'https://picsum.photos/seed/glosoc/600/400',
    totalFotos: 7,
    fotos: [
      { id: 1, src: 'https://picsum.photos/seed/glosoc1/1200/800', legenda: 'Distribuição de cestas' },
      { id: 2, src: 'https://picsum.photos/seed/glosoc2/1200/800', legenda: 'Atendimento médico gratuito' },
      { id: 3, src: 'https://picsum.photos/seed/glosoc3/1200/800', legenda: 'Doação de uniformes escolares' },
      { id: 4, src: 'https://picsum.photos/seed/glosoc4/1200/800', legenda: 'Oficinas para jovens' },
      { id: 5, src: 'https://picsum.photos/seed/glosoc5/1200/800', legenda: 'Voluntários em ação' },
      { id: 6, src: 'https://picsum.photos/seed/glosoc6/1200/800', legenda: 'Encerramento com a comunidade' },
      { id: 7, src: 'https://picsum.photos/seed/glosoc7/1200/800', legenda: 'Agradecimentos' },
    ],
  },
  {
    id: 4,
    titulo: 'Aniversário da Grande Loja',
    data: 'Outubro · 2024',
    capa: 'https://picsum.photos/seed/gloaniv/600/400',
    totalFotos: 9,
    fotos: [
      { id: 1, src: 'https://picsum.photos/seed/gloaniv1/1200/800', legenda: 'Início das comemorações' },
      { id: 2, src: 'https://picsum.photos/seed/gloaniv2/1200/800', legenda: 'Cortejo maçônico' },
      { id: 3, src: 'https://picsum.photos/seed/gloaniv3/1200/800', legenda: 'Ritual solene' },
      { id: 4, src: 'https://picsum.photos/seed/gloaniv4/1200/800', legenda: 'Apresentação cultural' },
      { id: 5, src: 'https://picsum.photos/seed/gloaniv5/1200/800', legenda: 'Homenagem aos veteranos' },
      { id: 6, src: 'https://picsum.photos/seed/gloaniv6/1200/800', legenda: 'Corte do bolo comemorativo' },
      { id: 7, src: 'https://picsum.photos/seed/gloaniv7/1200/800', legenda: 'Jantar de gala' },
      { id: 8, src: 'https://picsum.photos/seed/gloaniv8/1200/800', legenda: 'Discurso de encerramento' },
      { id: 9, src: 'https://picsum.photos/seed/gloaniv9/1200/800', legenda: 'Foto oficial' },
    ],
  },
];

function downloadFoto(src, legenda) {
  fetch(src)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${legenda.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch(() => {
      window.open(src, '_blank');
    });
}

function Modal({ album, onClose }) {
  const [fotoAtiva, setFotoAtiva] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        if (fotoAtiva !== null) setFotoAtiva(null);
        else onClose();
      }
      if (fotoAtiva !== null) {
        if (e.key === 'ArrowRight') setFotoAtiva((p) => (p + 1) % album.fotos.length);
        if (e.key === 'ArrowLeft') setFotoAtiva((p) => (p - 1 + album.fotos.length) % album.fotos.length);
      }
    },
    [fotoAtiva, album.fotos.length, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const foto = fotoAtiva !== null ? album.fotos[fotoAtiva] : null;

  return (
    <div className="alb-overlay" onClick={onClose}>
      <div className="alb-modal" onClick={(e) => e.stopPropagation()}>
        {/* Cabeçalho */}
        <div className="alb-modal-header">
          <div>
            <div className="section-label" style={{ marginBottom: 6 }}>{album.data}</div>
            <h3 className="alb-modal-titulo">{album.titulo}</h3>
          </div>
          <button className="alb-close" onClick={onClose} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Grade de fotos */}
        <div className="alb-fotos-grid">
          {album.fotos.map((foto, idx) => (
            <div key={foto.id} className="alb-foto-item" onClick={() => setFotoAtiva(idx)}>
              <img src={foto.src} alt={foto.legenda} loading="lazy" />
              <div className="alb-foto-overlay">
                <span className="alb-foto-legenda">{foto.legenda}</span>
                <button
                  className="alb-download-btn"
                  onClick={(e) => { e.stopPropagation(); downloadFoto(foto.src, foto.legenda); }}
                  aria-label={`Baixar foto: ${foto.legenda}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {foto && (
        <div className="alb-lightbox" onClick={() => setFotoAtiva(null)}>
          <div className="alb-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="alb-lb-nav alb-lb-prev"
              onClick={() => setFotoAtiva((p) => (p - 1 + album.fotos.length) % album.fotos.length)}
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="alb-lb-img-wrap">
              <img src={foto.src} alt={foto.legenda} />
              <div className="alb-lb-bar">
                <span className="alb-lb-legenda">{foto.legenda}</span>
                <button
                  className="alb-lb-download"
                  onClick={() => downloadFoto(foto.src, foto.legenda)}
                  aria-label="Baixar foto"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Baixar foto
                </button>
              </div>
            </div>

            <button
              className="alb-lb-nav alb-lb-next"
              onClick={() => setFotoAtiva((p) => (p + 1) % album.fotos.length)}
              aria-label="Próxima"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button className="alb-lb-close" onClick={() => setFotoAtiva(null)} aria-label="Fechar lightbox">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="alb-lb-counter">
              {fotoAtiva + 1} / {album.fotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AlbumEventos() {
  const [albumAberto, setAlbumAberto] = useState(null);

  return (
    <>
      <section id="album-eventos">
        <div className="section-inner">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Memória e Fraternidade</div>
            <h2>Álbum de Eventos</h2>
            <p className="alb-subtitulo reveal">
              Registros fotográficos dos momentos que marcam a nossa história.<br />
              Clique em um álbum para explorar as fotos.
            </p>
            <div className="divider" style={{ margin: '16px auto 0' }}></div>
          </div>

          <div className="alb-grid">
            {albums.map((album, idx) => (
              <button
                key={album.id}
                className={`alb-card reveal${idx === 1 ? ' reveal-d1' : idx === 2 ? ' reveal-d2' : idx === 3 ? ' reveal-d3' : ''}`}
                onClick={() => setAlbumAberto(album)}
                aria-label={`Abrir álbum: ${album.titulo}`}
              >
                <div className="alb-card-img">
                  <img src={album.capa} alt={album.titulo} loading="lazy" />
                  <div className="alb-card-veil">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Ver álbum</span>
                  </div>
                </div>
                <div className="alb-card-info">
                  <div className="alb-card-data">{album.data}</div>
                  <div className="alb-card-titulo">{album.titulo}</div>
                  <div className="alb-card-count">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    {album.totalFotos} fotos
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {albumAberto && (
        <Modal album={albumAberto} onClose={() => setAlbumAberto(null)} />
      )}
    </>
  );
}
