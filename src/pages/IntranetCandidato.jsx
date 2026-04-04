import React, { useState } from 'react';

const candidatos = [
  {
    nome: 'Gustavo Henrique Moreira', indicante: 'Ir. Carlos Figueiredo', loja: 'Loja Fraternidade nº 01',
    data: '15/03/2026', status: 'Em Análise',
    profissao: 'Engenheiro Civil', idade: 34, naturalidade: 'Manaus, AM',
    observacoes: 'Candidato com perfil adequado, aguardando aprovação em sessão de votação.',
  },
  {
    nome: 'Thiago Augusto Barbosa', indicante: 'Ir. Paulo Sérgio', loja: 'Loja Amazonas nº 12',
    data: '10/03/2026', status: 'Aprovado',
    profissao: 'Médico', idade: 42, naturalidade: 'Belém, PA',
    observacoes: 'Aprovado em sessão de 18/03/2026 com unanimidade.',
  },
  {
    nome: 'Leonardo Castro Pires', indicante: 'Ir. Roberto Alves', loja: 'Loja Força e Beleza nº 21',
    data: '05/03/2026', status: 'Reprovado',
    profissao: 'Advogado', idade: 29, naturalidade: 'Manaus, AM',
    observacoes: 'Candidato não atendeu os requisitos mínimos estabelecidos.',
  },
  {
    nome: 'Mateus Oliveira Santana', indicante: 'Ir. Henrique Lima', loja: 'Loja Luz do Oriente nº 09',
    data: '20/02/2026', status: 'Aprovado',
    profissao: 'Professor Universitário', idade: 38, naturalidade: 'Tefé, AM',
    observacoes: 'Aprovado em 28/02/2026. Iniciação agendada.',
  },
  {
    nome: 'Rafael Nogueira Duarte', indicante: 'Ir. Marcos Vinícius', loja: 'Loja Renovação nº 07',
    data: '18/02/2026', status: 'Em Análise',
    profissao: 'Empresário', idade: 45, naturalidade: 'Parintins, AM',
    observacoes: 'Documentação em fase de análise pela comissão de admissão.',
  },
  {
    nome: 'Caio Fernandes Britto', indicante: 'Ir. João Batista', loja: 'Loja Esperança nº 15',
    data: '10/02/2026', status: 'Em Análise',
    profissao: 'Contador', idade: 31, naturalidade: 'Manaus, AM',
    observacoes: 'Aguardando entrevista com a comissão investigadora.',
  },
  {
    nome: 'Vitor Hugo Nascimento', indicante: 'Ir. André Luiz', loja: 'Loja Fraternidade nº 01',
    data: '05/02/2026', status: 'Aprovado',
    profissao: 'Arquiteto', idade: 36, naturalidade: 'Itacoatiara, AM',
    observacoes: 'Aprovado por unanimidade em sessão de 14/02/2026.',
  },
  {
    nome: 'Bruno Araújo Lemes', indicante: 'Ir. Ricardo Nunes', loja: 'Loja Fraternidade nº 01',
    data: '28/01/2026', status: 'Reprovado',
    profissao: 'Comerciante', idade: 27, naturalidade: 'Manaus, AM',
    observacoes: 'Reapreciação possível após 12 meses conforme regimento.',
  },
];

const statusBadge = { 'Em Análise': 'itr-badge--orange', 'Aprovado': 'itr-badge--green', 'Reprovado': 'itr-badge--red' };

export default function IntranetCandidato() {
  const [modalCand, setModalCand] = useState(null);

  return (
    <div>
      <div className="itr-table-wrap">
        <div className="itr-table-header">
          <span className="itr-table-title">Candidatos à Iniciação</span>
          <button className="itr-table-action-btn">+ Nova Candidatura</button>
        </div>
        <table className="itr-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Indicante</th>
              <th>Loja</th>
              <th>Data de Solicitação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((c, i) => (
              <tr key={i}>
                <td style={{fontWeight:'500'}}>{c.nome}</td>
                <td style={{fontSize:'.74rem'}}>{c.indicante}</td>
                <td style={{fontSize:'.74rem',color:'rgba(44,62,80,.6)'}}>{c.loja}</td>
                <td style={{whiteSpace:'nowrap',fontSize:'.72rem',color:'rgba(44,62,80,.5)'}}>{c.data}</td>
                <td><span className={`itr-badge ${statusBadge[c.status]}`}>{c.status}</span></td>
                <td>
                  <button className="itr-act-btn" onClick={() => setModalCand(c)}>Ver Detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalCand && (
        <div className="itr-modal-overlay" onClick={() => setModalCand(null)}>
          <div className="itr-modal" onClick={e => e.stopPropagation()}>
            <button className="itr-modal-close" onClick={() => setModalCand(null)}>×</button>
            <div className="itr-modal-title">Detalhes do Candidato</div>
            <div className="itr-modal-row"><strong>Nome Completo</strong><span>{modalCand.nome}</span></div>
            <div className="itr-modal-row"><strong>Profissão</strong><span>{modalCand.profissao}</span></div>
            <div className="itr-modal-row"><strong>Idade</strong><span>{modalCand.idade} anos</span></div>
            <div className="itr-modal-row"><strong>Naturalidade</strong><span>{modalCand.naturalidade}</span></div>
            <div className="itr-modal-row"><strong>Indicante</strong><span>{modalCand.indicante}</span></div>
            <div className="itr-modal-row"><strong>Loja</strong><span>{modalCand.loja}</span></div>
            <div className="itr-modal-row"><strong>Data da Solicitação</strong><span>{modalCand.data}</span></div>
            <div className="itr-modal-row">
              <strong>Status</strong>
              <span className={`itr-badge ${statusBadge[modalCand.status]}`}>{modalCand.status}</span>
            </div>
            <div className="itr-modal-row" style={{flexDirection:'column',gap:'6px'}}>
              <strong>Observações</strong>
              <span style={{fontSize:'.8rem',color:'rgba(44,62,80,.7)',lineHeight:'1.6'}}>{modalCand.observacoes}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
