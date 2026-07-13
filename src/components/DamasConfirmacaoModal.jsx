import React, { useEffect } from 'react';
import { evento } from '../data/chaDasAcacias.js';

const endereco = evento.local.enderecoCompleto;

const urlWaze = `https://waze.com/ul?q=${encodeURIComponent(endereco)}&navigate=yes`;
const urlUber = `https://m.uber.com/ul/?${new URLSearchParams({
  action: 'setPickup',
  pickup: 'my_location',
  'dropoff[formatted_address]': endereco,
}).toString()}`;
const urlComprovante = `https://wa.me/${evento.whatsapp.numeroComprovante}?text=${encodeURIComponent(
  'Olá! Acabei de me inscrever no Chá das Acácias e gostaria de enviar o comprovante do PIX.',
)}`;

const MAPS = [
  { key: 'gmaps', nome: 'Google Maps', cor: '#4285F4', url: evento.local.mapaUrl },
  { key: 'waze', nome: 'Waze', cor: '#33CCFF', url: urlWaze },
  { key: 'uber', nome: 'Uber', cor: '#111111', url: urlUber },
];

export default function DamasConfirmacaoModal({ aberto, onClose }) {
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [aberto, onClose]);

  if (!aberto) return null;

  return (
    <div className="damas-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="damas-modal-titulo">
      <div className="damas-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="damas-modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 3l12 12M15 3L3 15" />
          </svg>
        </button>

        <div className="damas-modal-icon">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="12" cy="12" r="10" />
            <polyline points="8 12 11 15 16 9" />
          </svg>
        </div>

        <h3 id="damas-modal-titulo" className="damas-modal-titulo">Inscrição recebida!</h3>
        <p className="damas-modal-texto">
          Que alegria contar com você, Cunhada! Para <strong>garantir sua vaga</strong>, realize o
          PIX de {evento.passaporte.valorFormatado} e envie o comprovante pelo WhatsApp.
        </p>

        <div className="damas-modal-actions">
          <a className="damas-modal-btn damas-modal-btn--primary" href={urlComprovante} target="_blank" rel="noreferrer">
            Enviar comprovante no WhatsApp
          </a>
          <a className="damas-modal-btn damas-modal-btn--group" href={evento.whatsapp.grupoUrl} target="_blank" rel="noreferrer">
            Entrar no grupo do evento
          </a>
        </div>

        <div className="damas-modal-sep"><span>Como chegar</span></div>

        <div className="damas-modal-local">
          <strong>{evento.local.nome}</strong> — {evento.local.condominio}, {evento.local.logradouro} · {evento.local.bairroCidade}
        </div>

        <div className="damas-modal-maps">
          {MAPS.map((m) => (
            <a key={m.key} href={m.url} target="_blank" rel="noreferrer" className="damas-modal-map">
              <span className="damas-modal-map-dot" style={{ background: m.cor }} />
              {m.nome}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
