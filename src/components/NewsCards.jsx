import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { noticias as fallbackNoticias } from '../data/noticias.js';
import instagramPosts from '../data/instagram.json';

const fallbackItems = fallbackNoticias.filter(n => n.destaque).slice(0, 3);
const igItems = Array.isArray(instagramPosts) ? instagramPosts.slice(0, 3) : [];
const items = igItems.length > 0 ? igItems : fallbackItems;
const isInstagramFeed = igItems.length > 0;

const BUILD_HOOK_URL = import.meta.env.VITE_NETLIFY_BUILD_HOOK_URL || '';

function formatDate(dateStr) {
  const monthMap = {
    'Jan':'JAN','Fev':'FEV','Mar':'MAR','Abr':'ABR','Mai':'MAI','Jun':'JUN',
    'Jul':'JUL','Ago':'AGO','Set':'SET','Out':'OUT','Nov':'NOV','Dez':'DEZ'
  };
  const parts = dateStr.split(' ');
  if (parts.length >= 2) {
    return { day: parts[0], month: monthMap[parts[1]] || parts[1].toUpperCase().slice(0,3) };
  }
  return { day: '--', month: '---' };
}

function SyncButton() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState({ kind: 'idle', msg: '' });

  useEffect(() => {
    const check = () => setVisible(window.location.hash === '#sync');
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  if (!visible) return null;

  async function refreshNow() {
    if (!BUILD_HOOK_URL) {
      setStatus({ kind: 'error', msg: 'Build Hook URL não configurada (só funciona em produção).' });
      return;
    }
    setStatus({ kind: 'loading', msg: 'Disparando rebuild…' });
    try {
      const res = await fetch(BUILD_HOOK_URL, { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ kind: 'success', msg: 'Build disparado. Site atualizado em ~2-3 min.' });
    } catch (e) {
      setStatus({ kind: 'error', msg: `Falha: ${e.message}` });
    }
  }

  return (
    <div className="news-sync-bar reveal">
      <span className="news-sync-label">↻ Sincronização manual</span>
      <button
        className="news-sync-btn"
        onClick={refreshNow}
        disabled={status.kind === 'loading'}
      >
        {status.kind === 'loading' ? 'Atualizando…' : 'Atualizar agora'}
      </button>
      {status.kind !== 'idle' && (
        <span className={`news-sync-msg news-sync-msg--${status.kind}`}>{status.msg}</span>
      )}
    </div>
  );
}

export default function NewsCards() {
  return (
    <section id="noticias" className="news-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Novidades</div>
          <h2>Últimas Notícias</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>
        <SyncButton />
        <div className="news-grid reveal">
          {items.map((item) => {
            const { day, month } = formatDate(item.data);
            const isIg = item._source === 'instagram';
            const cardInner = (
              <>
                <div className="news-card-img" style={{ backgroundImage: `url(${item.imagem})` }}>
                  <div className="news-card-date">
                    <span className="ncd-day">{day}</span>
                    <span className="ncd-month">{month}</span>
                  </div>
                </div>
                <div className="news-card-body">
                  <span className={`news-card-cat${isIg ? ' news-card-cat--ig' : ''}`}>{item.categoria}</span>
                  <h4 className="news-card-title">{item.titulo}</h4>
                  <p className="news-card-resumo">{item.resumo}</p>
                  {isIg && item.permalink ? (
                    <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="news-card-link">
                      Ver no Instagram →
                    </a>
                  ) : (
                    <Link to="/imprensa" className="news-card-link">Leia Mais →</Link>
                  )}
                </div>
              </>
            );
            return <div className="news-card" key={item.id}>{cardInner}</div>;
          })}
        </div>
        <div className="news-cta reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/imprensa" className="btn-primary">
            <span>{isInstagramFeed ? 'Ver Todas as Publicações' : 'Ver Todas as Notícias'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
