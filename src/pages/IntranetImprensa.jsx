import React from 'react';

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

export default function IntranetImprensa() {
  return (
    <div>
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
