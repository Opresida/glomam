import React, { useState } from 'react';

const templates = [
  {
    id: 'diploma',
    nome: 'Diploma de Grau',
    desc: 'Emite diploma oficial de grau maçônico para o irmão.',
    campos: [
      { id: 'nome', label: 'Nome Completo do Irmão' },
      { id: 'grau', label: 'Grau', type: 'select', options: ['1º Grau — Aprendiz', '2º Grau — Companheiro', '3º Grau — Mestre'] },
      { id: 'loja', label: 'Loja de Origem' },
      { id: 'data', label: 'Data de Elevação', type: 'date' },
      { id: 'gm', label: 'Grão-Mestre' },
    ],
  },
  {
    id: 'certidao',
    nome: 'Certidão de Membro',
    desc: 'Documento comprobatório de vínculo com a GLOMAM.',
    campos: [
      { id: 'nome', label: 'Nome Completo do Irmão' },
      { id: 'matricula', label: 'Matrícula' },
      { id: 'loja', label: 'Loja' },
      { id: 'situacao', label: 'Situação', type: 'select', options: ['Ativo', 'Quite', 'Irregular'] },
    ],
  },
  {
    id: 'ata',
    nome: 'Ata de Reunião',
    desc: 'Geração de ata oficial de sessão registrada.',
    campos: [
      { id: 'loja', label: 'Nome da Loja' },
      { id: 'numero', label: 'Número da Sessão' },
      { id: 'data', label: 'Data da Sessão', type: 'date' },
      { id: 'grau', label: 'Grau de Sessão', type: 'select', options: ['Aprendiz', 'Companheiro', 'Mestre', 'Magna'] },
      { id: 'sec', label: 'Secretário' },
    ],
  },
  {
    id: 'carta',
    nome: 'Carta de Apresentação',
    desc: 'Carta formal de apresentação de irmão para outra loja.',
    campos: [
      { id: 'nome', label: 'Nome do Irmão' },
      { id: 'destino', label: 'Loja Destinatária' },
      { id: 'motivo', label: 'Motivo da Visita' },
      { id: 'data', label: 'Data de Emissão', type: 'date' },
    ],
  },
];

const DocIcon = () => (
  <svg viewBox="0 0 24 24" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export default function IntranetDocumentos() {
  const [active, setActive] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSelect = (id) => {
    setActive(active === id ? null : id);
    setFormData({});
  };

  const tpl = templates.find(t => t.id === active);

  return (
    <div>
      <div className="itr-docs-grid">
        {templates.map(t => (
          <div key={t.id} className="itr-doc-card">
            <div className="itr-doc-icon"><DocIcon /></div>
            <div className="itr-doc-info">
              <div className="itr-doc-name">{t.nome}</div>
              <div className="itr-doc-desc">{t.desc}</div>
            </div>
            <button
              className={`itr-doc-btn ${active === t.id ? 'active' : ''}`}
              onClick={() => handleSelect(t.id)}
            >
              {active === t.id ? 'Fechar' : 'Gerar'}
            </button>
          </div>
        ))}
      </div>

      {tpl && (
        <div className="itr-doc-form-wrap">
          <div className="itr-doc-form-title">Gerar: {tpl.nome}</div>
          <div className="itr-form-grid">
            {tpl.campos.map(c => (
              <div key={c.id} className="itr-form-field">
                <label htmlFor={`doc-${c.id}`}>{c.label}</label>
                {c.type === 'select' ? (
                  <select
                    id={`doc-${c.id}`}
                    value={formData[c.id] || ''}
                    onChange={e => setFormData(p => ({...p, [c.id]: e.target.value}))}
                  >
                    <option value="">Selecione...</option>
                    {c.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    id={`doc-${c.id}`}
                    type={c.type || 'text'}
                    placeholder={c.label}
                    value={formData[c.id] || ''}
                    onChange={e => setFormData(p => ({...p, [c.id]: e.target.value}))}
                  />
                )}
              </div>
            ))}
          </div>
          <button className="itr-pdf-btn"><span>Gerar PDF</span></button>
        </div>
      )}
    </div>
  );
}
