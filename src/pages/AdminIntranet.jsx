import React, { useState } from 'react';
import './AdminIntranet.css';
import IntranetDashboard from './IntranetDashboard.jsx';
import IntranetImprensa from './IntranetImprensa.jsx';
import IntranetFinanceiro from './IntranetFinanceiro.jsx';
import IntranetDocumentos from './IntranetDocumentos.jsx';
import IntranetEventos from './IntranetEventos.jsx';
import IntranetUsuarios from './IntranetUsuarios.jsx';
import IntranetNewsletter from './IntranetNewsletter.jsx';
import IntranetCandidato from './IntranetCandidato.jsx';

const navItems = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 'imprensa', label: 'Imprensa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18"/><path d="M4 22h16"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    id: 'financeiro', label: 'Financeiro',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    id: 'documentos', label: 'Documentos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    id: 'eventos', label: 'Eventos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/><rect x="13" y="13" width="5" height="5"/>
      </svg>
    ),
  },
  {
    id: 'usuarios', label: 'Usuários',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'newsletter', label: 'Newsletter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: 'candidato', label: 'Candidatos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
];

const tabTitles = {
  dashboard: 'Dashboard',
  imprensa: 'Gestão de Imprensa',
  financeiro: 'Painel Financeiro',
  documentos: 'Gerador de Documentos',
  eventos: 'Galeria de Eventos',
  usuarios: 'Gestão de Usuários',
  newsletter: 'Campanhas Newsletter',
  candidato: 'Candidatos à Iniciação',
};

const tabComponents = {
  dashboard: IntranetDashboard,
  imprensa: IntranetImprensa,
  financeiro: IntranetFinanceiro,
  documentos: IntranetDocumentos,
  eventos: IntranetEventos,
  usuarios: IntranetUsuarios,
  newsletter: IntranetNewsletter,
  candidato: IntranetCandidato,
};

export default function AdminIntranet() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="intranet-root">
      <aside className="intranet-sidebar">
        <div className="intranet-sidebar-logo">
          <img src="https://i.imgur.com/2Lwr0pd.png" alt="GLOMAM" />
          <div className="intranet-sidebar-logo-text">
            <span>GLOMAM</span>
            <span>Intranet</span>
          </div>
        </div>

        <div className="intranet-sidebar-user">
          <div className="intranet-sidebar-avatar">GM</div>
          <div className="intranet-sidebar-user-info">
            <span>Ir. Grão-Mestre</span>
            <span>Administrador</span>
          </div>
        </div>

        <nav className="intranet-sidebar-nav">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`intranet-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>

        <div className="intranet-sidebar-footer">
          <div className="intranet-sidebar-footer-text">GLOMAM © 2026 — Intranet v1.0</div>
        </div>
      </aside>

      <div className="intranet-main">
        <div className="intranet-topbar">
          <span className="intranet-topbar-title">{tabTitles[activeTab]}</span>
          <div className="intranet-topbar-right">
            <span>04/04/2026</span>
            <span className="intranet-topbar-badge">Admin</span>
          </div>
        </div>

        <div className="intranet-mobile-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`intranet-mobile-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="intranet-content">
          <div className="itr-section-head">
            <h2 className="itr-section-title">{tabTitles[activeTab]}</h2>
            <div className="itr-divider" />
          </div>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
