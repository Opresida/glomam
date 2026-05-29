import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { noticias as fallbackNoticias } from '../data/noticias.js';
import instagramPosts from '../data/instagram.json';

const fallbackItems = fallbackNoticias.filter(n => n.destaque);
const igItems = Array.isArray(instagramPosts) ? instagramPosts.slice(0, 12) : [];
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

function NewsCard({ item, clone = false, carousel = false }) {
  const { day, month } = formatDate(item.data);
  const isIg = item._source === 'instagram';
  return (
    <div
      className={`news-card${carousel ? ' news-card--carousel' : ''}`}
      aria-hidden={clone ? 'true' : undefined}
    >
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
          <a href={item.permalink} target="_blank" rel="noopener noreferrer" className="news-card-link" tabIndex={clone ? -1 : undefined}>
            Ver no Instagram →
          </a>
        ) : (
          <Link to="/imprensa" className="news-card-link" tabIndex={clone ? -1 : undefined}>Leia Mais →</Link>
        )}
      </div>
    </div>
  );
}

function NewsCarousel({ items: list }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0, moved: false, pointerId: null });
  const nudgeTimer = useRef(0);
  const reducedRef = useRef(false);
  const [repeat, setRepeat] = useState(2);

  const SPEED = 40; // px/s

  const applyTransform = () => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
  };

  const normalize = () => {
    const lw = loopWidthRef.current;
    if (lw <= 0) return;
    while (offsetRef.current <= -lw) offsetRef.current += lw;
    while (offsetRef.current > 0) offsetRef.current -= lw;
  };

  // Mede a largura de UMA cópia a partir dos primeiros N cards — independente de `repeat`,
  // pra evitar loop/oscilação de setState (a largura do card é fixa por CSS).
  const measure = useCallback(() => {
    const wrap = wrapRef.current, track = trackRef.current;
    if (!wrap || !track) return;
    const N = list.length;
    const children = track.children;
    if (children.length < N) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    let oneCopy = 0;
    for (let i = 0; i < N; i++) oneCopy += children[i].offsetWidth + gap;
    if (oneCopy <= 0) return;
    loopWidthRef.current = oneCopy;
    const wrapW = wrap.offsetWidth;
    const desired = Math.max(3, Math.ceil(2 + wrapW / oneCopy));
    setRepeat(prev => (prev !== desired ? desired : prev));
  }, [list.length]);

  useEffect(() => { measure(); }, [measure]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
    const on = () => { reducedRef.current = mq.matches; };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      if (!pausedRef.current && !dragRef.current.active && !reducedRef.current && loopWidthRef.current > 0) {
        offsetRef.current -= SPEED * dt;
        normalize();
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pause = () => { pausedRef.current = true; };
  const resume = () => {
    if (dragRef.current.active) return;
    pausedRef.current = false;
    lastTsRef.current = 0;
  };

  const nudge = (dir) => {
    const wrap = wrapRef.current, track = trackRef.current;
    if (!track) return;
    const step = wrap ? Math.min(wrap.offsetWidth * 0.8, 340) : 340;
    track.style.transition = 'transform .6s var(--ease)';
    offsetRef.current -= dir * step;
    applyTransform();
    pausedRef.current = true;
    window.clearTimeout(nudgeTimer.current);
    nudgeTimer.current = window.setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = '';
        normalize();
        applyTransform();
      }
      resume();
    }, 650);
  };

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (track) track.style.transition = '';
    window.clearTimeout(nudgeTimer.current);
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current, moved: false, pointerId: e.pointerId };
    pausedRef.current = true;
    wrapRef.current?.classList.add('dragging');
    try { wrapRef.current?.setPointerCapture?.(e.pointerId); } catch { /* noop */ }
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragRef.current.moved = true;
    offsetRef.current = dragRef.current.startOffset + dx;
    normalize();
    applyTransform();
  };
  const endDrag = (e) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    wrapRef.current?.classList.remove('dragging');
    try { wrapRef.current?.releasePointerCapture?.(e.pointerId); } catch { /* noop */ }
    lastTsRef.current = 0;
    pausedRef.current = false;
  };
  const onClickCapture = (e) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
  };

  useEffect(() => () => window.clearTimeout(nudgeTimer.current), []);

  const display = [];
  for (let c = 0; c < repeat; c++) {
    for (const it of list) display.push({ it, c });
  }

  return (
    <div className="news-carousel reveal">
      <div
        className="news-carousel-wrap"
        ref={wrapRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Carrossel de últimas notícias"
        tabIndex={0}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className="news-carousel-track" ref={trackRef}>
          {display.map(({ it, c }) => (
            <NewsCard key={`${it.id}-${c}`} item={it} clone={c > 0} carousel />
          ))}
        </div>
      </div>
      <div className="news-carousel-arrows">
        <button type="button" className="nc-arrow" aria-label="Notícia anterior" onClick={() => nudge(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" className="nc-arrow" aria-label="Próxima notícia" onClick={() => nudge(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
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
        {items.length > 1 ? (
          <NewsCarousel items={items} />
        ) : (
          <div className="news-grid reveal">
            {items.map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        )}
        <div className="news-cta reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/imprensa" className="btn-primary">
            <span>{isInstagramFeed ? 'Ver Todas as Publicações' : 'Ver Todas as Notícias'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
