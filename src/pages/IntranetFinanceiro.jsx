import React from 'react';

const lancamentos = [
  { data: '03/04/2026', descricao: 'Mensalidades — Abril 2026', categoria: 'Mensalidades', tipo: 'Entrada', valor: 'R$ 8.400,00' },
  { data: '02/04/2026', descricao: 'Aluguel do salão de eventos', categoria: 'Despesas', tipo: 'Saída', valor: 'R$ 2.200,00' },
  { data: '01/04/2026', descricao: 'Doação da Loja Amazonas nº 12', categoria: 'Doações', tipo: 'Entrada', valor: 'R$ 5.000,00' },
  { data: '31/03/2026', descricao: 'Taxa de participação — Sessão Magna', categoria: 'Eventos', tipo: 'Entrada', valor: 'R$ 3.600,00' },
  { data: '30/03/2026', descricao: 'Material de escritório e papelaria', categoria: 'Despesas', tipo: 'Saída', valor: 'R$ 480,00' },
  { data: '29/03/2026', descricao: 'Mensalidades — Março 2026 (complement.)', categoria: 'Mensalidades', tipo: 'Entrada', valor: 'R$ 1.200,00' },
  { data: '28/03/2026', descricao: 'Manutenção do sistema informativo', categoria: 'Despesas', tipo: 'Saída', valor: 'R$ 720,00' },
  { data: '27/03/2026', descricao: 'Patrocínio — Programa Ayuda Social', categoria: 'Doações', tipo: 'Entrada', valor: 'R$ 12.000,00' },
  { data: '25/03/2026', descricao: 'Serviços de limpeza e conservação', categoria: 'Despesas', tipo: 'Saída', valor: 'R$ 900,00' },
  { data: '22/03/2026', descricao: 'Inscrições Congresso Nacional 2026', categoria: 'Eventos', tipo: 'Entrada', valor: 'R$ 2.800,00' },
];

export default function IntranetFinanceiro() {
  return (
    <div>
      <div className="itr-finance-cards">
        <div className="itr-finance-card">
          <div className="itr-finance-card-label">Receita Total</div>
          <div className="itr-finance-card-val itr-finance-card-val--green">R$ 48.200</div>
          <div className="itr-finance-card-icon">R$</div>
        </div>
        <div className="itr-finance-card">
          <div className="itr-finance-card-label">Despesas Totais</div>
          <div className="itr-finance-card-val itr-finance-card-val--red">R$ 12.800</div>
          <div className="itr-finance-card-icon">−</div>
        </div>
        <div className="itr-finance-card">
          <div className="itr-finance-card-label">Saldo do Mês</div>
          <div className="itr-finance-card-val itr-finance-card-val--gold">R$ 35.400</div>
          <div className="itr-finance-card-icon">=</div>
        </div>
      </div>

      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Lançamentos Recentes</span>
          <button className="itr-table-action-btn">+ Novo Lançamento</button>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((l, i) => (
              <tr key={i}>
                <td style={{whiteSpace:'nowrap',fontSize:'.72rem',color:'rgba(44,62,80,.55)'}}>{l.data}</td>
                <td style={{maxWidth:'260px'}}>{l.descricao}</td>
                <td><span className="itr-badge itr-badge--blue">{l.categoria}</span></td>
                <td>
                  <span className={`itr-badge ${l.tipo === 'Entrada' ? 'itr-badge--green' : 'itr-badge--red'}`}>
                    {l.tipo}
                  </span>
                </td>
                <td style={{fontWeight:'600',whiteSpace:'nowrap',color: l.tipo === 'Entrada' ? '#388e3c' : '#c62828'}}>
                  {l.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
