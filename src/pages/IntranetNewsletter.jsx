import React from 'react';

const campanhas = [
  { titulo: 'Boletim Informativo — Março 2026', data: '01/04/2026', destinatarios: 1205, abertura: 68, cliques: 42, status: 'Enviada' },
  { titulo: 'Sessão Magna Abril — Convite Oficial', data: '28/03/2026', destinatarios: 1205, abertura: 74, cliques: 51, status: 'Enviada' },
  { titulo: 'Fraternidade em Ação — Relatório Social', data: '15/03/2026', destinatarios: 1190, abertura: 61, cliques: 38, status: 'Enviada' },
  { titulo: 'Boletim Informativo — Fevereiro 2026', data: '03/03/2026', destinatarios: 1180, abertura: 65, cliques: 44, status: 'Enviada' },
  { titulo: 'Convite: Congresso Nacional Maçonaria', data: '20/04/2026', destinatarios: 1205, abertura: 0, cliques: 0, status: 'Agendada' },
  { titulo: 'Boletim Informativo — Abril 2026', data: '', destinatarios: 1205, abertura: 0, cliques: 0, status: 'Rascunho' },
];

const statusBadge = { 'Enviada': 'itr-badge--green', 'Agendada': 'itr-badge--blue', 'Rascunho': 'itr-badge--gray' };

export default function IntranetNewsletter() {
  return (
    <div>
      <div className="itr-nl-topbar">
        <button className="itr-table-action-btn">+ Nova Campanha</button>
      </div>

      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Campanhas de E-mail</span>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Data de Envio</th>
              <th>Destinatários</th>
              <th>Abertura</th>
              <th>Cliques</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {campanhas.map((c, i) => (
              <tr key={i}>
                <td style={{fontWeight:'500',maxWidth:'240px'}}>{c.titulo}</td>
                <td style={{whiteSpace:'nowrap',fontSize:'.72rem',color:'rgba(44,62,80,.5)'}}>{c.data || '—'}</td>
                <td style={{textAlign:'center'}}>{c.destinatarios.toLocaleString('pt-BR')}</td>
                <td style={{textAlign:'center'}}>
                  {c.abertura > 0 ? (
                    <span style={{color:'#388e3c',fontWeight:'600'}}>{c.abertura}%</span>
                  ) : '—'}
                </td>
                <td style={{textAlign:'center'}}>
                  {c.cliques > 0 ? (
                    <span style={{color:' var(--gold)',fontWeight:'600'}}>{c.cliques}%</span>
                  ) : '—'}
                </td>
                <td>
                  <span className={`itr-badge ${statusBadge[c.status]}`}>{c.status}</span>
                </td>
                <td style={{whiteSpace:'nowrap'}}>
                  <button className="itr-act-btn">Ver</button>
                  <button className="itr-act-btn">Duplicar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
