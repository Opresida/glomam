import React, { useState } from 'react';

const items = [
  { q: 'A Maçonaria é uma religião?', a: 'Não. A Maçonaria é um sistema de moral que une homens de bons costumes. Exige a crença em Deus — G.A.D.U. — e na imortalidade da alma como bases filosóficas, mas não é uma religião em si mesma.' },
  { q: 'É uma sociedade secreta?', a: 'Não. A Maçonaria é uma sociedade discreta. Nossos objetivos e leis são públicos. Mantemos reserva apenas sobre nossas cerimônias de reconhecimento e rituais internos — patrimônio simbólico da Ordem.' },
  { q: 'Como posso ingressar na Ordem?', a: 'A Maçonaria não convida — ela recebe. O candidato deve sentir o desejo espontâneo e genuíno de buscar a luz, ser um homem livre, de bons costumes, com crença em Deus e boa reputação moral.' },
  { q: 'Existe algum requisito de idade?', a: 'Sim. O candidato deve ter no mínimo 21 anos. Jovens mais novos podem participar das ordens paramaçônicas como o DeMolay (12–20 anos) ou as Filhas de Jó (10–19 anos).' },
  { q: 'Com que frequência há reuniões?', a: 'As lojas se reúnem geralmente uma a duas vezes por mês para trabalhos rituais, estudos filosóficos e o exercício da fraternidade entre os membros. As datas variam conforme cada loja.' },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = i => {
    setActive(prev => prev === i ? null : i);
  };

  return (
    <section id="faq-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Dúvidas Frequentes</div>
          <h2>Perguntas &amp; Respostas</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>
        <div className="faq-wrap reveal">
          {items.map((item, i) => (
            <div className={`faq-item${active === i ? ' active' : ''}`} key={i}>
              <div className="faq-q" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <div className="faq-icon">{active === i ? '−' : '+'}</div>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
