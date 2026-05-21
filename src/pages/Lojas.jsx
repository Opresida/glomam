import React, { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import WhatsAppBtn from '../components/WhatsAppBtn.jsx';
import ComoChegarModal from '../components/ComoChegarModal.jsx';
import { lojas } from '../data/lojas.js';

function LojaCard({ loja, delay, onComoChegar }) {
  const [aberto, setAberto] = useState(false);
  const dCls = delay ? `reveal-d${delay}` : '';
  const numStr = String(loja.numero).padStart(2, '0');

  return (
    <article className={`loja-card reveal ${dCls}`}>
      <div className="loja-foto-wrap">
        {loja.foto ? (
          <img src={loja.foto} alt={loja.nome} loading="lazy" className="loja-foto" />
        ) : (
          <div className="loja-foto loja-foto--empty"><span>GLOMAM</span></div>
        )}
        <div className="loja-foto-overlay" />
        <div className="loja-num">Nº {numStr}</div>
      </div>

      <div className="loja-body">
        <span className="loja-rito">{loja.rito}</span>
        <h3 className="loja-nome">{loja.nome}</h3>
        <div className="loja-oriente">Oriente de {loja.oriente}</div>

        <div className="loja-meta">
          <div className="loja-meta-item">
            <span className="loja-meta-label">Reuniões</span>
            <span className="loja-meta-value">{loja.reunioes.dia} · {loja.reunioes.hora}</span>
          </div>
          <div className="loja-meta-item">
            <span className="loja-meta-label">Fundação</span>
            <span className="loja-meta-value">{loja.fundacao}</span>
          </div>
        </div>

        <button
          type="button"
          className="loja-como-chegar"
          onClick={() => onComoChegar(loja)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          <span>Como Chegar?</span>
        </button>

        <button
          type="button"
          className="loja-toggle"
          aria-expanded={aberto}
          onClick={() => setAberto(v => !v)}
        >
          <span>{aberto ? 'Recolher detalhes' : 'Ver detalhes'}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </button>

        {aberto && (
          <div className="loja-detalhes">
            <div className="loja-group">
              <h4>Endereço da Sede</h4>
              <p>{loja.endereco.logradouro}, nº {loja.endereco.numero}</p>
              <p>{loja.endereco.bairro} — CEP {loja.endereco.cep}</p>
            </div>

            <div className="loja-group">
              <h4>Reuniões</h4>
              <p>{loja.reunioes.periodicidade} · {loja.reunioes.dia} às {loja.reunioes.hora}</p>
              <p>{loja.reunioes.local} · Oriente de {loja.reunioes.oriente}</p>
              <p>{loja.reunioes.endereco} — CEP {loja.reunioes.cep}</p>
            </div>

            <div className="loja-group">
              <h4>Contato</h4>
              {loja.site ? (
                <p>
                  <span className="loja-ico">🔗</span>
                  <a href={loja.site} target="_blank" rel="noreferrer">{loja.site.replace(/^https?:\/\//, '')}</a>
                </p>
              ) : loja.siteNote ? (
                <p>
                  <span className="loja-ico">🔗</span>
                  <span>{loja.siteNote}</span>
                </p>
              ) : null}
              {loja.email ? (
                <p>
                  <span className="loja-ico">✉</span>
                  <a href={`mailto:${loja.email}`}>{loja.email}</a>
                </p>
              ) : (
                <p className="loja-email-empty"><span className="loja-ico">✉</span>E-mail não informado</p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Lojas() {
  useReveal();
  const [busca, setBusca] = useState('');
  const [orienteFiltro, setOrienteFiltro] = useState('todos');
  const [lojaModal, setLojaModal] = useState(null);

  const orientesDisponiveis = useMemo(() => {
    const set = new Set(lojas.map(l => l.oriente));
    return ['todos', ...Array.from(set).sort()];
  }, []);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return lojas.filter(l => {
      if (orienteFiltro !== 'todos' && l.oriente !== orienteFiltro) return false;
      if (!termo) return true;
      return (
        l.nome.toLowerCase().includes(termo) ||
        String(l.numero).includes(termo) ||
        l.oriente.toLowerCase().includes(termo)
      );
    });
  }, [busca, orienteFiltro]);

  return (
    <>
      <Header />

      <section className="lojas-hero">
        <div className="lojas-hero-bg" aria-hidden="true" />
        <div className="section-inner lojas-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>GLOMAM · Lojas Filiadas</div>
            <h1 className="lojas-hero-title">Lojas da Ordem</h1>
            <div className="jud-divider" style={{ margin: '24px auto 28px' }} />
            <p className="lojas-hero-sub">
              Cada Loja é um Templo sagrado, sob cuja abóbada os homens livres e de bons costumes
              se reúnem fraternalmente em busca do bem da humanidade. Conheça as Lojas que compõem
              a família maçônica do Amazonas.
            </p>
          </div>
        </div>
      </section>

      <section className="lojas-controls-section">
        <div className="section-inner">
          <div className="lojas-controls reveal">
            <div className="lojas-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Buscar por nome, número ou Oriente..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="lojas-filtros">
              {orientesDisponiveis.map(o => (
                <button
                  key={o}
                  type="button"
                  className={`lojas-filtro${orienteFiltro === o ? ' active' : ''}`}
                  onClick={() => setOrienteFiltro(o)}
                >
                  {o === 'todos' ? 'Todos os Orientes' : o}
                </button>
              ))}
            </div>
            <div className="lojas-count">
              {filtradas.length} {filtradas.length === 1 ? 'loja' : 'lojas'} · {lojas.length} cadastradas
            </div>
          </div>
        </div>
      </section>

      <section className="lojas-grid-section">
        <div className="section-inner">
          {filtradas.length === 0 ? (
            <div className="lojas-vazio">Nenhuma Loja encontrada com esses critérios.</div>
          ) : (
            <div className="lojas-grid">
              {filtradas.map((l, i) => (
                <LojaCard
                  key={l.numero}
                  loja={l}
                  delay={(i % 3) + 1}
                  onComoChegar={setLojaModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="jud-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="jud-divider" style={{ margin: '0 auto 28px' }} />
          <p className="jud-cta-eyebrow">Faça parte desta irmandade</p>
          <h3 className="jud-cta-title">Você está pronto para dar o próximo passo?</h3>
          <p className="jud-cta-text">
            Da primeira Loja instalada no Oriente de Manaus em 1872 até as iniciações mais recentes,
            cada Loja carrega uma parte da história da GLOMAM e do Amazonas maçônico. Se você sente
            o chamado da Luz, o Templo tem uma vaga reservada para você.
          </p>
          <a
            href="/#faq-section"
            className="btn-primary"
            style={{ marginTop: 'clamp(24px,4vw,40px)', padding: 'clamp(14px,2vw,18px) clamp(42px,6vw,72px)' }}
          >
            <span>Quero Ser Maçom</span>
          </a>
          <div style={{ width: '44px', height: '1px', background: 'var(--gold)', margin: 'clamp(28px,4vw,44px) auto 0', opacity: '.3' }} />
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />

      <ComoChegarModal loja={lojaModal} onClose={() => setLojaModal(null)} />
    </>
  );
}
