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

function PopupContent({ lojasNoPonto }) {
  return (
    <div className="mapa-popup">
      {lojasNoPonto.map((loja, idx) => (
        <div key={loja.numero} className={idx > 0 ? 'mapa-popup-item mapa-popup-item-sep' : 'mapa-popup-item'}>
          <div className="mapa-popup-numero">Nº {loja.numero}</div>
          <h4 className="mapa-popup-nome">{loja.nome}</h4>
          <p className="mapa-popup-endereco">
            {loja.endereco.logradouro}
            {loja.endereco.numero && loja.endereco.numero !== 'S/N' && loja.endereco.numero !== 'S/Nº' && `, ${loja.endereco.numero}`}
            <br/>
            {loja.endereco.bairro} · {loja.oriente}
          </p>
          <a
            href={googleMapsUrl(loja.endereco, loja.oriente)}
            target="_blank"
            rel="noreferrer"
            className="mapa-popup-link"
          >
            Abrir no Google Maps ↗
          </a>
        </div>
      ))}
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
  const totalLojas = pinosAtuais.reduce((sum, p) => sum + p.lojas.length, 0);

  return (
    <section id="onde-estamos" className="mapa-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Onde Estamos</div>
          <h2 className="mapa-titulo">Nossas Lojas no Amazonas</h2>
          <div className="divider" style={{ margin: '16px auto 22px' }} />
          <p className="mapa-sub">
            A jurisdição da GLOMAM se estende por todo o estado do Amazonas, com
            <strong> {totalLojas} {view === 'manaus' ? 'Lojas em Manaus' : `Lojas em ${pinosInterior.length} municípios do interior`}</strong>.
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
                <Popup>
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
