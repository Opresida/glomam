// src/pages/Galeria.jsx
// Rota /galeria — álbuns de fotos (fotos no R2), com filtro (ano/mês) e 2 visões: Grade e Trilha.
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TrilhaGaleria from '../components/TrilhaGaleria.jsx';
import useReveal from '../hooks/useReveal.js';
import { galeria, albumCapa, fmtData } from '../data/galeria.js';

const PAGE = 24;
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const anoDe = (a) => (a.dataISO ? a.dataISO.slice(0, 4) : '');
const mesDe = (a) => (a.dataISO ? a.dataISO.slice(5, 7) : '');

function AlbumCard({ a }) {
  const { dia, mes, ano } = fmtData(a.data);
  return (
    <Link to={`/galeria/${a.id}`} className="gal-card">
      <div className="gal-card-capa" style={{ backgroundImage: `url(${albumCapa(a)})` }}>
        <div className="gal-card-over" />
        <div className="gal-card-data"><span>{dia}</span><small>{mes} {ano}</small></div>
        <div className="gal-card-count">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          {a.nFotos}
        </div>
      </div>
      <div className="gal-card-body">
        <h3 className="gal-card-titulo">{a.titulo}</h3>
      </div>
    </Link>
  );
}

export default function Galeria() {
  useReveal();
  const [view, setView] = useState('grade');
  const [ano, setAno] = useState('todos');
  const [mes, setMes] = useState('todos');
  const [visiveis, setVisiveis] = useState(PAGE);

  const anos = useMemo(() => {
    const s = new Set(galeria.map(anoDe).filter(Boolean));
    return [...s].sort((a, b) => b.localeCompare(a));
  }, []);

  const mesesDisp = useMemo(() => {
    const s = new Set();
    for (const a of galeria) {
      if (ano !== 'todos' && anoDe(a) !== ano) continue;
      const m = mesDe(a);
      if (m) s.add(m);
    }
    return s;
  }, [ano]);

  const filtrados = useMemo(
    () => galeria.filter((a) => {
      if (ano !== 'todos' && anoDe(a) !== ano) return false;
      if (mes !== 'todos' && mesDe(a) !== mes) return false;
      return true;
    }),
    [ano, mes]
  );

  useEffect(() => { setVisiveis(PAGE); }, [ano, mes, view]);
  const selAno = (a) => { setAno(a); setMes('todos'); };
  const lista = filtrados.slice(0, visiveis);

  return (
    <>
      <Header />
      <main className="inst-page">
        <div className="inst-page-top" />
        <section className="inst-page-hero reveal">
          <div className="section-inner">
            <div className="section-label">Institucional</div>
            <h1 className="inst-page-title">Galeria de Fotos</h1>
            <div className="divider" />
            <p className="inst-page-intro">
              O registro visual da Grande Loja Maçônica do Amazonas — sessões, visitas, ações sociais
              e confraternizações, evento a evento. {galeria.length} álbuns preservados.
            </p>
          </div>
        </section>

        {/* Controles: alternador de visão + filtros */}
        <section className="inst-controls">
          <div className="section-inner inst-controls-inner">
            <div className="inst-view-toggle" role="tablist" aria-label="Modo de visualização">
              <button role="tab" aria-selected={view === 'grade'} className={view === 'grade' ? 'ativo' : ''} onClick={() => setView('grade')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                Grade
              </button>
              <button role="tab" aria-selected={view === 'trilha'} className={view === 'trilha' ? 'ativo' : ''} onClick={() => setView('trilha')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="6" cy="5" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="6" cy="19" r="2" /><path d="M8 5h6a3 3 0 0 1 3 3v1M16 12h-6a3 3 0 0 0-3 3v1" /></svg>
                Trilha
              </button>
            </div>

            <div className="inst-filtros">
              <div className="inst-filtro-grupo">
                <span className="inst-filtro-label">Ano</span>
                <div className="inst-chips">
                  <button className={`inst-chip${ano === 'todos' ? ' ativo' : ''}`} onClick={() => selAno('todos')}>Todos</button>
                  {anos.map((a) => (
                    <button key={a} className={`inst-chip${ano === a ? ' ativo' : ''}`} onClick={() => selAno(a)}>{a}</button>
                  ))}
                </div>
              </div>
              <div className="inst-filtro-grupo">
                <span className="inst-filtro-label">Mês</span>
                <div className="inst-chips">
                  <button className={`inst-chip${mes === 'todos' ? ' ativo' : ''}`} onClick={() => setMes('todos')}>Todos</button>
                  {MESES.map((ml, i) => {
                    const mm = String(i + 1).padStart(2, '0');
                    const disp = mesesDisp.has(mm);
                    return (
                      <button key={mm} disabled={!disp} className={`inst-chip${mes === mm ? ' ativo' : ''}`} onClick={() => setMes(mm)}>{ml}</button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="inst-result-count">{filtrados.length} álbu{filtrados.length !== 1 ? 'ns' : 'm'}</div>
          </div>
        </section>

        {view === 'grade' ? (
          <section className="gal-list">
            <div className="section-inner">
              {filtrados.length === 0 ? (
                <p className="inst-vazio">Nenhum álbum nesse período.</p>
              ) : (
                <>
                  <div className="gal-grid">
                    {lista.map((a) => <AlbumCard key={a.id} a={a} />)}
                  </div>
                  {visiveis < filtrados.length && (
                    <div className="inst-more-wrap">
                      <button className="btn-primary" onClick={() => setVisiveis((v) => v + PAGE)}>
                        <span>Mostrar mais</span>
                      </button>
                      <p className="inst-more-count">{lista.length} de {filtrados.length} álbuns</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        ) : (
          <TrilhaGaleria itens={filtrados} />
        )}
      </main>
      <Footer />
    </>
  );
}
