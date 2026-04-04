import React, { useState } from 'react';

const eventos = [
  { id: 1, nome: 'Sessão Magna — Abril 2026', data: '10/04/2026', thumb: 'https://picsum.photos/300/180?random=101' },
  { id: 2, nome: 'Festa de São João 2025', data: '24/06/2025', thumb: 'https://picsum.photos/300/180?random=102' },
  { id: 3, nome: 'Instalação da Diretoria 2025', data: '15/01/2025', thumb: 'https://picsum.photos/300/180?random=103' },
  { id: 4, nome: 'Congresso GLOMAM 2024', data: '08/11/2024', thumb: 'https://picsum.photos/300/180?random=104' },
  { id: 5, nome: 'Sessão Pública — Centenário', data: '22/09/2024', thumb: 'https://picsum.photos/300/180?random=105' },
  { id: 6, nome: 'Ação Social Compensa', data: '17/07/2024', thumb: 'https://picsum.photos/300/180?random=106' },
];

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="1.2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function IntranetEventos() {
  const [selectedEvento, setSelectedEvento] = useState(null);

  if (selectedEvento) {
    const ev = eventos.find(e => e.id === selectedEvento);
    return (
      <div>
        <button className="itr-gallery-back" onClick={() => setSelectedEvento(null)}>
          ← Voltar às Pastas
        </button>
        <div className="itr-gallery-title">{ev.nome} — {ev.data}</div>
        <div className="itr-photos-grid">
          {Array.from({length: 9}, (_, i) => i + selectedEvento * 10).map(n => (
            <div key={n} className="itr-photo-item">
              <img
                src={`https://picsum.photos/300/200?random=${n}`}
                alt={`Foto ${n}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="itr-section-head">
        <div className="itr-section-sub">Clique em uma pasta para visualizar as fotos</div>
      </div>
      <div className="itr-events-grid">
        {eventos.map(ev => (
          <div
            key={ev.id}
            className="itr-event-folder"
            onClick={() => setSelectedEvento(ev.id)}
          >
            <div className="itr-folder-thumb">
              <img src={ev.thumb} alt={ev.nome} loading="lazy" />
            </div>
            <div className="itr-folder-icon" style={{marginBottom:'8px'}}><FolderIcon /></div>
            <div className="itr-event-name">{ev.nome}</div>
            <div className="itr-event-date">{ev.data}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
