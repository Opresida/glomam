import React, { useEffect } from 'react';
import { getLojaCoords } from '../data/lojasCoords.js';

/**
 * Constroi a string de endereço completo a partir do objeto de loja.
 */
function formatarEndereco(loja) {
  const e = loja.endereco;
  const num = (e.numero && e.numero !== 'S/N' && e.numero !== 'S/Nº') ? `, ${e.numero}` : '';
  return `${e.logradouro}${num}, ${e.bairro}, ${loja.oriente}, Amazonas, Brasil`;
}

/**
 * URLs universais — abrem o app se instalado, senão o site.
 */
function urlGoogleMaps(loja, coords) {
  if (coords) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatarEndereco(loja))}`;
}

function urlWaze(loja, coords) {
  if (coords) {
    return `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
  }
  return `https://waze.com/ul?q=${encodeURIComponent(formatarEndereco(loja))}&navigate=yes`;
}

function urlUber(loja, coords) {
  const endereco = formatarEndereco(loja);
  const params = new URLSearchParams({
    action: 'setPickup',
    'pickup': 'my_location',
    'dropoff[formatted_address]': endereco,
  });
  if (coords) {
    params.set('dropoff[latitude]', String(coords.lat));
    params.set('dropoff[longitude]', String(coords.lng));
  }
  return `https://m.uber.com/ul/?${params.toString()}`;
}

function urlAppleMaps(loja, coords) {
  if (coords) {
    return `https://maps.apple.com/?daddr=${coords.lat},${coords.lng}`;
  }
  return `https://maps.apple.com/?daddr=${encodeURIComponent(formatarEndereco(loja))}`;
}

// Detecta se é iOS (pra mostrar Apple Maps)
function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

const APPS = [
  {
    key: 'gmaps',
    nome: 'Google Maps',
    desc: 'Rota com trânsito ao vivo',
    cor: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
      </svg>
    ),
    url: urlGoogleMaps,
  },
  {
    key: 'waze',
    nome: 'Waze',
    desc: 'Rota colaborativa com alertas',
    cor: '#33CCFF',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M20.54 6.63c.32.83.47 1.72.46 2.61-.02 1.99-.7 3.97-2 5.61-1.85 2.33-4.78 3.62-7.78 3.62-.21 0-.42 0-.63-.02-.79-.05-1.55-.18-2.27-.4-.3.4-.78.66-1.32.66-.91 0-1.65-.74-1.65-1.65 0-.39.14-.75.37-1.03C4.61 14.94 4 13.62 4 12.21c0-3.07 2.69-7.21 8-7.21 5.31 0 8.54 4.16 8.54 6.84 0 .02 0 .04 0 .06v.02c.04-.5.04-1.05 0-1.32V6.63z"/>
      </svg>
    ),
    url: urlWaze,
  },
  {
    key: 'uber',
    nome: 'Uber',
    desc: 'Solicitar carro até este endereço',
    cor: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M0 7.97v8.06C0 19.36 2.66 22 5.97 22h12.06c3.29 0 5.97-2.64 5.97-5.97V7.97C24 4.64 21.34 2 18.03 2H5.97C2.66 2 0 4.64 0 7.97zm17.4 8.43H13.7v.85h-3.42v-.85H6.6V7.6h3.68V11.5h3.42V7.6h3.7v8.8z"/>
      </svg>
    ),
    url: urlUber,
  },
];

export default function ComoChegarModal({ loja, onClose }) {
  // Fecha com ESC
  useEffect(() => {
    if (!loja) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [loja, onClose]);

  if (!loja) return null;

  const coords = getLojaCoords(loja);
  const enderecoExibicao = `${loja.endereco.logradouro}${loja.endereco.numero && loja.endereco.numero !== 'S/N' ? `, ${loja.endereco.numero}` : ''} — ${loja.endereco.bairro}, ${loja.oriente}`;

  // Apple Maps só mostra em iOS
  const appsExibidos = isIOS()
    ? [...APPS, {
        key: 'apple',
        nome: 'Apple Maps',
        desc: 'Padrão do iPhone',
        cor: '#A2AAAD',
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M17.5 2C20 2 22 4 22 6.5v11c0 2.5-2 4.5-4.5 4.5h-11C4 22 2 20 2 17.5v-11C2 4 4 2 6.5 2h11zm-1.42 14.04l-3.84-7.18a.7.7 0 0 0-1.18 0L6.92 16.04a.7.7 0 0 0 .59 1.04h8.98a.7.7 0 0 0 .59-1.04z"/>
          </svg>
        ),
        url: urlAppleMaps,
      }]
    : APPS;

  return (
    <div className="cc-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="cc-titulo">
      <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cc-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 3l12 12M15 3L3 15" />
          </svg>
        </button>

        <div className="cc-header">
          <div className="cc-eyebrow">Como Chegar até</div>
          <h3 id="cc-titulo" className="cc-loja-nome">{loja.nome}</h3>
          <p className="cc-endereco">{enderecoExibicao}</p>
        </div>

        <div className="cc-apps">
          {appsExibidos.map(app => (
            <a
              key={app.key}
              href={app.url(loja, coords)}
              target="_blank"
              rel="noreferrer"
              className="cc-app"
              onClick={onClose}
            >
              <span className="cc-app-icon" style={{ color: app.cor }}>{app.icon}</span>
              <span className="cc-app-info">
                <span className="cc-app-nome">{app.nome}</span>
                <span className="cc-app-desc">{app.desc}</span>
              </span>
              <span className="cc-app-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h8M8 4l3 3-3 3" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="cc-hint">
          Tocando em uma opção, o aplicativo abre automaticamente se estiver instalado no seu celular.
        </div>
      </div>
    </div>
  );
}
