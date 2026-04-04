import React from 'react';

const chartData = [
  { month: 'Jan', pct: 55 }, { month: 'Fev', pct: 62 }, { month: 'Mar', pct: 70 },
  { month: 'Abr', pct: 80 }, { month: 'Mai', pct: 74 }, { month: 'Jun', pct: 88 },
  { month: 'Jul', pct: 92 }, { month: 'Ago', pct: 86 }, { month: 'Set', pct: 95 },
  { month: 'Out', pct: 78 }, { month: 'Nov', pct: 84 }, { month: 'Dez', pct: 100 },
];

const atividades = [
  { tipo: 'Admissão', descricao: 'Novo membro iniciado na Loja Fraternidade', responsavel: 'Ir. Carlos Figueiredo', data: '03/04/2026' },
  { tipo: 'Financeiro', descricao: 'Lançamento de mensalidades — março/2026', responsavel: 'Ir. Paulo Sérgio', data: '02/04/2026' },
  { tipo: 'Evento', descricao: 'Sessão Magna confirmada para 10/04', responsavel: 'Secretaria', data: '01/04/2026' },
  { tipo: 'Imprensa', descricao: 'Publicação do boletim informativo nº 47', responsavel: 'Ir. Marcos Vinícius', data: '31/03/2026' },
  { tipo: 'Newsletter', descricao: 'Campanha "Fraternidade em Ação" enviada', responsavel: 'Ir. Roberto Alves', data: '29/03/2026' },
  { tipo: 'Documento', descricao: 'Diploma de Grau gerado para Ir. Henrique', responsavel: 'Ir. João Batista', data: '28/03/2026' },
];

export default function IntranetDashboard() {
  return (
    <div>
      <div className="itr-cards-row">
        <div className="itr-metric-card">
          <div className="itr-metric-icon">
            <svg viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <div className="itr-metric-val">342</div>
          <div className="itr-metric-label">Membros Ativos</div>
          <div className="itr-metric-trend">↑ +12 este mês</div>
        </div>
        <div className="itr-metric-card">
          <div className="itr-metric-icon">
            <svg viewBox="0 0 24 24" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
          </div>
          <div className="itr-metric-val">7</div>
          <div className="itr-metric-label">Eventos este Mês</div>
          <div className="itr-metric-trend">↑ +2 vs mês anterior</div>
        </div>
        <div className="itr-metric-card">
          <div className="itr-metric-icon">
            <svg viewBox="0 0 24 24" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="itr-metric-val">R$ 48.200</div>
          <div className="itr-metric-label">Receita Mensal</div>
          <div className="itr-metric-trend">↑ +8% vs março</div>
        </div>
        <div className="itr-metric-card">
          <div className="itr-metric-icon">
            <svg viewBox="0 0 24 24" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div className="itr-metric-val">1.205</div>
          <div className="itr-metric-label">Assinantes Newsletter</div>
          <div className="itr-metric-trend">↑ +38 esta semana</div>
        </div>
      </div>

      <div className="itr-chart-wrap">
        <div className="itr-table-header" style={{padding:'0 0 16px',borderBottom:'1px solid rgba(44,62,80,.06)'}}>
          <span className="itr-table-title">Crescimento Mensal</span>
          <span style={{fontSize:'.58rem',letterSpacing:'.1em',color:'rgba(44,62,80,.4)',textTransform:'uppercase'}}>2026</span>
        </div>
        <div style={{paddingTop:'18px'}}>
          <div className="itr-chart-bars">
            {chartData.map(d => (
              <div key={d.month} className="itr-bar-col">
                <div className="itr-bar" style={{height: `${d.pct}%`}} title={`${d.month}: ${d.pct}%`} />
                <span className="itr-bar-month">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Atividades Recentes</span>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Responsável</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {atividades.map((a, i) => (
              <tr key={i}>
                <td><span className="itr-badge itr-badge--gold">{a.tipo}</span></td>
                <td style={{maxWidth:'280px'}}>{a.descricao}</td>
                <td style={{whiteSpace:'nowrap'}}>{a.responsavel}</td>
                <td style={{whiteSpace:'nowrap',color:'rgba(44,62,80,.5)',fontSize:'.72rem'}}>{a.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
