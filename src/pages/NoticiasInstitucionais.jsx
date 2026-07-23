// src/pages/NoticiasInstitucionais.jsx
// Rota /noticiasinstitucionais — acervo institucional com filtro (ano/mês) e 2 visões: Grade e Trilha.
import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import InstCard from '../components/InstCard.jsx';
import TrilhaInstitucional from '../components/TrilhaInstitucional.jsx';
import useReveal from '../hooks/useReveal.js';
import { noticiasInstitucionais } from '../data/noticiasInstitucionais.js';

const PAGE = 24; // itens por lote (visão Grade)
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const anoDe = (n) => (n.dataISO ? n.dataISO.slice(0, 4) : '');
const mesDe = (n) => (n.dataISO ? n.dataISO.slice(5, 7) : ''); // '01'..'12'

export default function NoticiasInstitucionais() {
  useReveal();
  const [view, setView] = useState('grade'); // 'grade' | 'trilha'
  const [ano, setAno] = useState('todos');
  const [mes, setMes] = useState('todos'); // '01'..'12' | 'todos'
  const [visiveis, setVisiveis] = useState(PAGE);

  // Anos presentes (decrescente).
  const anos = useMemo(() => {
    const s = new Set(noticiasInstitucionais.map(anoDe).filter(Boolean));
    return [...s].sort((a, b) => b.localeCompare(a));
  }, []);

  // Meses com matéria no ano selecionado (ou em todos) — pra desabilitar os vazios.
  const mesesDisp = useMemo(() => {
    const s = new Set();
    for (const n of noticiasInstitucionais) {
      if (ano !== 'todos' && anoDe(n) !== ano) continue;
      const m = mesDe(n);
      if (m) s.add(m);
    }
    return s;
  }, [ano]);

  const filtradas = useMemo(
    () =>
      noticiasInstitucionais.filter((n) => {
        if (ano !== 'todos' && anoDe(n) !== ano) return false;
        if (mes !== 'todos' && mesDe(n) !== mes) return false;
        return true;
      }),
    [ano, mes]
  );

  // Reseta a paginação da Grade quando o filtro/visão muda.
  useEffect(() => { setVisiveis(PAGE); }, [ano, mes, view]);

  const selAno = (a) => { setAno(a); setMes('todos'); };
  const lista = filtradas.slice(0, visiveis);

  return (
    <>
      <Header />
      <main className="inst-page">
        <div className="inst-page-top" />
        <section className="inst-page-hero reveal">
          <div className="section-inner">
            <div className="section-label">Institucional</div>
            <h1 className="inst-page-title">Notícias Institucionais</h1>
            <div className="divider" />
            <p className="inst-page-intro">
              O acervo de notícias, comunicados e acontecimentos da Grande Loja Maçônica do Amazonas.
              História viva da Ordem no Estado — evento a evento, Oriente a Oriente.
            </p>
          </div>
        </section>

        {/* Controles: alternador de visão + filtros */}
        <section className="inst-controls">
          <div className="section-inner inst-controls-inner">
            <div className="inst-view-toggle" role="tablist" aria-label="Modo de visualização">
              <button
                role="tab"
                aria-selected={view === 'grade'}
                className={view === 'grade' ? 'ativo' : ''}
                onClick={() => setView('grade')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                Grade
              </button>
              <button
                role="tab"
                aria-selected={view === 'trilha'}
                className={view === 'trilha' ? 'ativo' : ''}
                onClick={() => setView('trilha')}
              >
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
                      <button
                        key={mm}
                        disabled={!disp}
                        className={`inst-chip${mes === mm ? ' ativo' : ''}`}
                        onClick={() => setMes(mm)}
                      >
                        {ml}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="inst-result-count">
              {filtradas.length} notícia{filtradas.length !== 1 ? 's' : ''}
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        {view === 'grade' ? (
          <section className="inst-page-list">
            <div className="section-inner">
              {filtradas.length === 0 ? (
                <p className="inst-vazio">Nenhuma notícia nesse período.</p>
              ) : (
                <>
                  <div className="inst-grid">
                    {lista.map((n) => <InstCard key={n.id} n={n} />)}
                  </div>
                  {visiveis < filtradas.length && (
                    <div className="inst-more-wrap">
                      <button className="btn-primary" onClick={() => setVisiveis((v) => v + PAGE)}>
                        <span>Mostrar mais</span>
                      </button>
                      <p className="inst-more-count">{lista.length} de {filtradas.length} notícias</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        ) : (
          <TrilhaInstitucional itens={filtradas} />
        )}
      </main>
      <Footer />
    </>
  );
}
