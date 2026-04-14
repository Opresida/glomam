import React, { useState } from 'react';

const pilares = [
  {
    key: 'amor',
    titulo: 'Amor',
    resumo: 'A força primordial que une os corações sob a abóbada celeste.',
    descricao: 'Cultivar o amor fraterno como laço invisível que atravessa classes, credos e fronteiras — o primeiro mandamento da Ordem e o motor silencioso de toda virtude maçônica.',
    symbol: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M16 22c0-3 2.5-5.5 5.5-5.5 1.5 0 2.5.5 2.5.5s1-.5 2.5-.5c3 0 5.5 2.5 5.5 5.5 0 6-8 10-8 10s-8-4-8-10z" />
      </svg>
    ),
  },
  {
    key: 'aperfeicoamento',
    titulo: 'Aperfeiçoamento',
    resumo: 'Lapidar a pedra bruta — a obra interior de uma vida inteira.',
    descricao: 'Aprimorar continuamente os costumes e o caráter, transformando a pedra bruta do homem comum em pedra polida digna do Templo, através do estudo, da reflexão e da prática virtuosa.',
    symbol: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l14 10v16L24 42 10 32V16z" />
        <path d="M24 6v36M10 16l28 16M38 16L10 32" />
      </svg>
    ),
  },
  {
    key: 'tolerancia',
    titulo: 'Tolerância',
    resumo: 'A arte de acolher o diferente sem renunciar ao próprio centro.',
    descricao: 'Respeitar a liberdade de consciência de todo ser humano, reconhecendo que a Verdade se manifesta por muitos caminhos e que nenhuma voz deve ser silenciada em nome da Ordem.',
    symbol: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24h36M24 6v36M12 12l24 24M36 12L12 36" />
      </svg>
    ),
  },
  {
    key: 'igualdade',
    titulo: 'Igualdade',
    resumo: 'No Templo, todos somos irmãos sob a mesma esquadria.',
    descricao: 'Reconhecer em cada homem a mesma dignidade essencial, desfazendo as barreiras artificiais erguidas pelo mundo profano e restabelecendo a fraternidade primordial entre os filhos do Grande Arquiteto.',
    symbol: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32l16-18 16 18" />
        <path d="M24 14v24M8 38h32" />
      </svg>
    ),
  },
  {
    key: 'respeito',
    titulo: 'Respeito',
    resumo: 'À autoridade legítima, à crença sincera, à consciência alheia.',
    descricao: 'Honrar a autoridade justa e as crenças de cada irmão, compreendendo que a ordem social e a paz do Templo repousam sobre o respeito mútuo — pedra angular de toda civilização duradoura.',
    symbol: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" />
      </svg>
    ),
  },
];

export default function Objetivos() {
  const [ativo, setAtivo] = useState('amor');
  const pilarAtivo = pilares.find(p => p.key === ativo) || pilares[0];

  return (
    <section id="objetivos" className="objetivos-section">
      <div className="objetivos-bg" aria-hidden="true" />
      <div className="section-inner">
        <div className="objetivos-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Nossos Objetivos</div>
          <h2 className="objetivos-titulo">Tornar Feliz a Humanidade</h2>
          <div className="divider" style={{ margin: '18px auto 22px' }} />
          <p className="objetivos-subtitulo">
            A Maçonaria é uma instituição dedicada a um propósito eterno: a felicidade do gênero humano.
            Esse ideal se manifesta através de cinco pilares vivos — forças complementares que,
            unidas, erguem o edifício moral de cada irmão e da sociedade em que vivemos.
          </p>
        </div>

        <div className="objetivos-grid reveal reveal-d1">
          <div className="objetivos-nav" role="tablist">
            {pilares.map((p, i) => (
              <button
                key={p.key}
                role="tab"
                aria-selected={ativo === p.key}
                className={`objetivos-tab${ativo === p.key ? ' active' : ''}`}
                onClick={() => setAtivo(p.key)}
              >
                <span className="objetivos-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="objetivos-tab-titulo">{p.titulo}</span>
                <span className="objetivos-tab-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div className="objetivos-painel" key={pilarAtivo.key}>
            <div className="objetivos-painel-symbol">{pilarAtivo.symbol}</div>
            <div className="objetivos-painel-eyebrow">Pilar da Ordem</div>
            <h3 className="objetivos-painel-titulo">{pilarAtivo.titulo}</h3>
            <p className="objetivos-painel-resumo">{pilarAtivo.resumo}</p>
            <div className="objetivos-painel-divider" />
            <p className="objetivos-painel-descricao">{pilarAtivo.descricao}</p>
          </div>
        </div>

        <div className="objetivos-footer reveal reveal-d2">
          <p>
            <em>"Uma instituição que tem por objetivo tornar feliz a humanidade — pelo amor, pelo aperfeiçoamento
            dos costumes, pela tolerância, pela igualdade, pelo respeito à autoridade e à crença de cada um."</em>
          </p>
        </div>
      </div>
    </section>
  );
}
