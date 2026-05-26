import React, { useState } from 'react';
import instagramPosts from '../data/instagram.json';

const noticias = [
  { titulo: 'GLOMAM realiza Sessão Magna em comemoração ao aniversário da Grande Loja', categoria: 'Institucional', data: '03/04/2026', autor: 'Ir. Marcos Vinícius', status: 'Publicado' },
  { titulo: 'Grande Loja do Amazonas promove ação social no bairro Compensa', categoria: 'Social', data: '28/03/2026', autor: 'Ir. André Luiz', status: 'Publicado' },
  { titulo: 'Novo ciclo de palestras sobre filosofia maçônica terá início em maio', categoria: 'Educação', data: '25/03/2026', autor: 'Ir. Roberto Alves', status: 'Rascunho' },
  { titulo: 'Delegação da GLOMAM participa do Congresso Nacional de Maçonaria', categoria: 'Institucional', data: '20/03/2026', autor: 'Ir. Marcos Vinícius', status: 'Publicado' },
  { titulo: 'Campanha de arrecadação de alimentos beneficia famílias do interior', categoria: 'Social', data: '15/03/2026', autor: 'Secretaria', status: 'Publicado' },
  { titulo: 'Reforma do templo da Loja Amazonas é concluída com sucesso', categoria: 'Institucional', data: '10/03/2026', autor: 'Ir. Paulo Sérgio', status: 'Publicado' },
  { titulo: 'Entrevista exclusiva com o Grão-Mestre sobre o plano de gestão 2026', categoria: 'Entrevista', data: '05/03/2026', autor: 'Ir. Carlos Figueiredo', status: 'Rascunho' },
  { titulo: 'Cobertura fotográfica da Festa de São João da Loja Fraternidade 2025', categoria: 'Eventos', data: '28/02/2026', autor: 'Ir. Henrique Lima', status: 'Publicado' },
];

const BUILD_HOOK_URL = import.meta.env.VITE_NETLIFY_BUILD_HOOK_URL || '';

function InstagramFeedCard() {
  const [status, setStatus] = useState({ kind: 'idle', msg: '' });
  const igCount = Array.isArray(instagramPosts) ? instagramPosts.length : 0;
  const ultimoPost = igCount > 0 ? instagramPosts[0] : null;

  async function refreshNow() {
    if (!BUILD_HOOK_URL) {
      setStatus({ kind: 'error', msg: 'VITE_NETLIFY_BUILD_HOOK_URL não configurado (apenas funciona em produção/preview do Netlify).' });
      return;
    }
    setStatus({ kind: 'loading', msg: 'Disparando rebuild no Netlify…' });
    try {
      const res = await fetch(BUILD_HOOK_URL, { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ kind: 'success', msg: 'Build disparado. Site atualizado em ~2-3 min.' });
    } catch (e) {
      setStatus({ kind: 'error', msg: `Falha ao disparar: ${e.message}` });
    }
  }

  return (
    <div className="itr-table-wrap" style={{ marginBottom: 24 }}>
      <div className="itr-table-header" style={{ alignItems: 'center' }}>
        <div>
          <span className="itr-table-title">Feed do Instagram (Seção Novidades)</span>
          <div style={{ fontSize: '.72rem', color: 'rgba(44,62,80,.6)', marginTop: 4 }}>
            <span className="itr-badge itr-badge--green" style={{ marginRight: 8 }}>Automático</span>
            Sincroniza a cada 6h com <strong>@glomam_oficial</strong>
          </div>
        </div>
        <button
          className="itr-table-action-btn"
          onClick={refreshNow}
          disabled={status.kind === 'loading'}
          style={{ opacity: status.kind === 'loading' ? 0.6 : 1, cursor: status.kind === 'loading' ? 'wait' : 'pointer' }}
        >
          {status.kind === 'loading' ? 'Atualizando…' : '↻ Atualizar agora'}
        </button>
      </div>

      <div style={{ padding: '16px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.16em', color: 'rgba(44,62,80,.5)', textTransform: 'uppercase', marginBottom: 6 }}>Posts no site</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', color: 'var(--slate)' }}>{igCount}<span style={{ fontSize: '.9rem', color: 'rgba(44,62,80,.45)' }}> / 3</span></div>
        </div>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.16em', color: 'rgba(44,62,80,.5)', textTransform: 'uppercase', marginBottom: 6 }}>Última publicação</div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: '.92rem', color: 'var(--slate)' }}>{ultimoPost ? ultimoPost.data : '—'}</div>
        </div>
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.16em', color: 'rgba(44,62,80,.5)', textTransform: 'uppercase', marginBottom: 6 }}>Próximo rebuild automático</div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: '.92rem', color: 'var(--slate)' }}>00h, 06h, 12h, 18h (Manaus)</div>
        </div>
      </div>

      {status.kind !== 'idle' && (
        <div style={{
          padding: '12px 14px',
          borderRadius: 4,
          fontSize: '.82rem',
          marginTop: 4,
          background: status.kind === 'success' ? 'rgba(34,139,34,.08)' : status.kind === 'error' ? 'rgba(220,53,69,.08)' : 'rgba(0,85,135,.08)',
          color: status.kind === 'success' ? '#1a6b1a' : status.kind === 'error' ? '#a02530' : 'var(--blue)',
          borderLeft: `3px solid ${status.kind === 'success' ? '#1a6b1a' : status.kind === 'error' ? '#a02530' : 'var(--blue)'}`,
        }}>
          {status.msg}
        </div>
      )}
    </div>
  );
}

export default function IntranetImprensa() {
  return (
    <div>
      <InstagramFeedCard />

      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Gestão de Notícias</span>
          <button className="itr-table-action-btn">+ Nova Notícia</button>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((n, i) => (
              <tr key={i}>
                <td style={{maxWidth:'260px',fontWeight:'500'}}>{n.titulo}</td>
                <td><span className="itr-badge itr-badge--blue">{n.categoria}</span></td>
                <td style={{whiteSpace:'nowrap',fontSize:'.72rem',color:'rgba(44,62,80,.55)'}}>{n.data}</td>
                <td style={{whiteSpace:'nowrap'}}>{n.autor}</td>
                <td>
                  <span className={`itr-badge ${n.status === 'Publicado' ? 'itr-badge--green' : 'itr-badge--gray'}`}>
                    {n.status}
                  </span>
                </td>
                <td style={{whiteSpace:'nowrap'}}>
                  <button className="itr-act-btn">Editar</button>
                  <button className="itr-act-btn itr-act-btn--danger">Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
