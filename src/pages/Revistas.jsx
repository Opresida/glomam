// src/pages/Revistas.jsx
// Rota /revistas — acervo de revistas e jornais (PDFs no R2), com filtro (ano/mês) e 2 visões: Grade e Trilha.
import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TrilhaRevistas from '../components/TrilhaRevistas.jsx';
import useReveal from '../hooks/useReveal.js';
import { revistas } from '../data/revistas.js';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const anoDe = (r) => (r.dataISO ? r.dataISO.slice(0, 4) : '');
const mesDe = (r) => (r.dataISO ? r.dataISO.slice(5, 7) : '');

function RevistaCard({ r }) {
  const disponivel = !!r.pdfUrl;
  const semPdfOrigem = !r.pdfFile;

  const Capa = (
    <div className="rev-card-capa" style={{ backgroundImage: `url(${r.capa})` }}>
      {disponivel && (
        <span className="rev-card-badge" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
        </span>
      )}
    </div>
  );

  return (
    <div className="rev-card reveal">
      {disponivel ? (
        <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="rev-card-link" aria-label={`Abrir revista ${r.titulo}`}>
          {Capa}
        </a>
      ) : (
        Capa
      )}
      <div className="rev-card-body">
        <span className="rev-card-data">{r.data}</span>
        <h3 className="rev-card-titulo">{r.titulo}</h3>
        {disponivel ? (
          <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="rev-card-btn">Baixar PDF</a>
        ) : (
          <span className="rev-card-btn rev-card-btn--off">{semPdfOrigem ? 'Indisponível' : 'Em breve'}</span>
        )}
      </div>
    </div>
  );
}

export default function Revistas() {
  useReveal();
  const [view, setView] = useState('grade');
  const [ano, setAno] = useState('todos');
  const [mes, setMes] = useState('todos');

  const anos = useMemo(() => {
    const s = new Set(revistas.map(anoDe).filter(Boolean));
    return [...s].sort((a, b) => b.localeCompare(a));
  }, []);

  const mesesDisp = useMemo(() => {
    const s = new Set();
    for (const r of revistas) {
      if (ano !== 'todos' && anoDe(r) !== ano) continue;
      const m = mesDe(r);
      if (m) s.add(m);
    }
    return s;
  }, [ano]);

  const filtradas = useMemo(
    () => revistas.filter((r) => {
      if (ano !== 'todos' && anoDe(r) !== ano) return false;
      if (mes !== 'todos' && mesDe(r) !== mes) return false;
      return true;
    }),
    [ano, mes]
  );

  const selAno = (a) => { setAno(a); setMes('todos'); };

  return (
    <>
      <Header />
      <main className="inst-page rev-page">
        <div className="inst-page-top" />
        <section className="inst-page-hero reveal">
          <div className="section-inner">
            <div className="section-label">Institucional</div>
            <h1 className="inst-page-title">Revistas e Jornais</h1>
            <div className="divider" />
            <p className="inst-page-intro">
              O acervo editorial da Grande Loja Maçônica do Amazonas — a revista <em>Arte Real</em>,
              o Folhetim <em>O Balaústre</em> e edições comemorativas. Memória impressa da Ordem,
              disponível para leitura e download.
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

            <div className="inst-result-count">{filtradas.length} ediç{filtradas.length !== 1 ? 'ões' : 'ão'}</div>
          </div>
        </section>

        {view === 'grade' ? (
          <section className="rev-list">
            <div className="section-inner">
              {filtradas.length === 0 ? (
                <p className="inst-vazio">Nenhuma edição nesse período.</p>
              ) : (
                <div className="rev-grid">
                  {filtradas.map((r) => <RevistaCard key={r.id} r={r} />)}
                </div>
              )}
            </div>
          </section>
        ) : (
          <TrilhaRevistas itens={filtradas} />
        )}
      </main>
      <Footer />
    </>
  );
}
