import React from 'react';

const membros = [
  { nome: 'Carlos Alberto Figueiredo', grau: '3º Grau — Mestre', loja: 'Loja Fraternidade nº 01', status: 'Ativo' },
  { nome: 'Paulo Sérgio Mendonça', grau: '3º Grau — Mestre', loja: 'Loja Amazonas nº 12', status: 'Ativo' },
  { nome: 'Marcos Vinícius Rocha', grau: '2º Grau — Companheiro', loja: 'Loja Renovação nº 07', status: 'Ativo' },
  { nome: 'Roberto Alves de Souza', grau: '3º Grau — Mestre', loja: 'Loja Força e Beleza nº 21', status: 'Ativo' },
  { nome: 'André Luiz Ferreira', grau: '1º Grau — Aprendiz', loja: 'Loja Fraternidade nº 01', status: 'Ativo' },
  { nome: 'Henrique Lima Pinheiro', grau: '3º Grau — Mestre', loja: 'Loja Luz do Oriente nº 09', status: 'Inativo' },
  { nome: 'João Batista Corrêa', grau: '2º Grau — Companheiro', loja: 'Loja Esperança nº 15', status: 'Ativo' },
  { nome: 'Fernando Costa Melo', grau: '3º Grau — Mestre', loja: 'Loja Amazonas nº 12', status: 'Inativo' },
  { nome: 'Diego Martins Leal', grau: '1º Grau — Aprendiz', loja: 'Loja Renovação nº 07', status: 'Ativo' },
  { nome: 'Ricardo Nunes Braga', grau: '3º Grau — Mestre', loja: 'Loja Fraternidade nº 01', status: 'Ativo' },
];

function initials(nome) {
  const parts = nome.split(' ');
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

export default function IntranetUsuarios() {
  return (
    <div>
      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Membros Cadastrados</span>
          <button className="itr-table-action-btn">+ Novo Membro</button>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Membro</th>
              <th>Grau</th>
              <th>Loja</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map((m, i) => (
              <tr key={i}>
                <td>
                  <div className="itr-user-cell">
                    <div className="itr-user-avatar">{initials(m.nome)}</div>
                    <span style={{fontWeight:'500'}}>{m.nome}</span>
                  </div>
                </td>
                <td style={{fontSize:'.74rem',color:'rgba(44,62,80,.65)'}}>{m.grau}</td>
                <td style={{fontSize:'.74rem'}}>{m.loja}</td>
                <td>
                  <span className={`itr-badge ${m.status === 'Ativo' ? 'itr-badge--green' : 'itr-badge--gray'}`}>
                    {m.status}
                  </span>
                </td>
                <td style={{whiteSpace:'nowrap'}}>
                  <button className="itr-act-btn">Visualizar</button>
                  <button className="itr-act-btn">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
