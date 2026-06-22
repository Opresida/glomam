import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  lojasManaus,
  lojasInterior,
  lojasAgrupadasPorCoord,
} from '../data/lojasCoords.js';

// ── Pino custom no tema GLOMAM (gold + slate) ──
const goldPinIcon = L.divIcon({
  className: 'glomam-pin',
  html: `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.45" />
        </filter>
      </defs>
      <path
        d="M16 1 C8 1 2 7 2 15 c0 11 14 25 14 25 s14-14 14-25 c0-8-6-14-14-14 z"
        fill="#d3a54c" stroke="#161d34" stroke-width="1.5" filter="url(#pinShadow)" />
      <circle cx="16" cy="15" r="5" fill="#161d34" />
    </svg>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -38],
});

function googleMapsUrl(endereco, cidade) {
  const query = encodeURIComponent(
    `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${cidade}, Amazonas, Brasil`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function enderecoLinha(endereco) {
  const num =
    endereco.numero && endereco.numero !== 'S/N' && endereco.numero !== 'S/Nº'
      ? `, ${endereco.numero}`
      : '';
  return `${endereco.logradouro}${num}`;
}

function PopupContent({ lojasNoPonto }) {
  // Condomínio maçônico: várias Lojas no mesmo endereço.
  // Mostra UM único link do Maps (o prédio é o mesmo) + as informações de cada Loja.
  const condominio = lojasNoPonto.length > 1;
  const principal = lojasNoPonto[0];

  if (condominio) {
    return (
      <div className="mapa-popup">
        <div className="mapa-popup-cond-head">
          <div className="mapa-popup-cond-label">Condomínio Maçônico · {lojasNoPonto.length} Lojas</div>
          <p className="mapa-popup-endereco">
            {enderecoLinha(principal.endereco)}
            <br/>
            {principal.endereco.bairro} · {principal.oriente}
          </p>
          <a
            href={googleMapsUrl(principal.endereco, principal.oriente)}
            target="_blank"
            rel="noreferrer"
            className="mapa-popup-link"
          >
            Abrir no Google Maps ↗
          </a>
        </div>
        <ul className="mapa-popup-lista">
          {lojasNoPonto.map((loja) => (
            <li key={loja.numero} className="mapa-popup-lista-item">
              <span className="mapa-popup-lista-num">Nº {loja.numero}</span>
              <span className="mapa-popup-lista-nome">{loja.nome}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mapa-popup">
      <div className="mapa-popup-item">
        <div className="mapa-popup-numero">Nº {principal.numero}</div>
        <h4 className="mapa-popup-nome">{principal.nome}</h4>
        <p className="mapa-popup-endereco">
          {enderecoLinha(principal.endereco)}
          <br/>
          {principal.endereco.bairro} · {principal.oriente}
        </p>
        <a
          href={googleMapsUrl(principal.endereco, principal.oriente)}
          target="_blank"
          rel="noreferrer"
          className="mapa-popup-link"
        >
          Abrir no Google Maps ↗
        </a>
      </div>
    </div>
  );
}

export default function MapaLojas() {
  const [view, setView] = useState('manaus'); // 'manaus' | 'interior'

  // Manaus: zoom centralizado na cidade
  const pinosManaus = useMemo(
    () => lojasAgrupadasPorCoord(lojasManaus()),
    []
  );
  // Interior: pinos por cidade do estado
  const pinosInterior = useMemo(
    () => lojasAgrupadasPorCoord(lojasInterior()),
    []
  );

  const mapConfig = view === 'manaus'
    ? { center: [-3.0900, -60.0150], zoom: 12, key: 'manaus' }
    : { center: [-4.0, -63.5], zoom: 6, key: 'interior' };

  const pinosAtuais = view === 'manaus' ? pinosManaus : pinosInterior;

  // Total geral de Lojas no estado (Manaus + interior) — exibido sem detalhar municípios.
  const totalGeral = useMemo(
    () =>
      pinosManaus.reduce((s, p) => s + p.lojas.length, 0) +
      pinosInterior.reduce((s, p) => s + p.lojas.length, 0),
    [pinosManaus, pinosInterior]
  );

  return (
    <section id="onde-estamos" className="mapa-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Onde Estamos</div>
          <h2 className="mapa-titulo">Nossas Lojas no Amazonas</h2>
          <div className="divider" style={{ margin: '16px auto 22px' }} />
          <p className="mapa-sub">
            A jurisdição da GLOMAM se estende por todo o estado do Amazonas, com
            <strong> {totalGeral} Lojas</strong> filiadas.
          </p>
        </div>

        {/* Toggle Manaus / Interior */}
        <div className="mapa-toggle reveal">
          <button
            type="button"
            className={`mapa-toggle-btn${view === 'manaus' ? ' active' : ''}`}
            onClick={() => setView('manaus')}
          >
            Manaus
          </button>
          <button
            type="button"
            className={`mapa-toggle-btn${view === 'interior' ? ' active' : ''}`}
            onClick={() => setView('interior')}
          >
            Interior do Amazonas
          </button>
        </div>

        <div className="mapa-hint reveal">
          {view === 'manaus'
            ? 'Use os botões + / − para aproximar e clique nos pinos para ver as Lojas.'
            : 'Cada pino marca um município com Loja filiada. Clique para detalhes.'}
        </div>

        <div className="mapa-container reveal">
          <MapContainer
            key={mapConfig.key}
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            scrollWheelZoom={false}
            style={{ height: '520px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pinosAtuais.map((ponto, idx) => (
              <Marker
                key={`${mapConfig.key}-${idx}`}
                position={[ponto.coord.lat, ponto.coord.lng]}
                icon={goldPinIcon}
              >
                <Popup maxHeight={300} autoPan={true}>
                  <PopupContent lojasNoPonto={ponto.lojas} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
