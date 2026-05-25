import React, { useEffect } from 'react';

export default function Familias() {
  useEffect(() => {
    const isTouch = () => window.matchMedia('(pointer:coarse)').matches;
    if (!isTouch()) return;

    const cards = document.querySelectorAll('.familia-card');
    const handlers = [];
    cards.forEach(card => {
      const handler = () => {
        const open = card.classList.contains('flipped');
        document.querySelectorAll('.familia-card').forEach(c => c.classList.remove('flipped'));
        if (!open) card.classList.add('flipped');
      };
      card.addEventListener('click', handler);
      handlers.push({ el: card, handler });
    });
    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener('click', handler));
    };
  }, []);

  return (
    <section id="familias">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>A Extensão do Templo na Família</div>
          <h2>Ordens Paramaçônicas</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>
        <p className="tap-hint reveal" style={{ marginTop: '20px' }}>Toque nos cards para ver mais ↓</p>
        <div className="familias-grid">
          <div className="familia-card reveal">
            <div className="fc-front">
              <div className="fc-num">01</div>
              <img className="fc-icon-logo" src="/ordem-demolay.png" alt="Brasão da Ordem DeMolay" loading="lazy" />
              <div className="fc-title">Ordem DeMolay</div>
              <p className="fc-desc">Formação de jovens de 12 a 20 anos baseada nas sete virtudes cardeais, patriotismo e desenvolvimento do carácter.</p>
              <div className="fc-tag">Masculino · 12–20 anos</div>
            </div>
            <div className="fc-back">
              <div className="fc-title">DeMolay</div>
              <p className="fc-desc">Jacques de Molay, último Grão-Mestre dos Templários, inspira jovens a viver com honra, cortesia e pureza de costumes.</p>
              <div className="fc-tag">Fundada em 1919</div>
              <div className="fc-back-glyph">D</div>
            </div>
          </div>
          <div className="familia-card reveal reveal-d1">
            <div className="fc-front">
              <div className="fc-num">02</div>
              <img className="fc-icon-logo" src="/ordem-filhas-jo.png" alt="Brasão das Filhas de Jó" loading="lazy" />
              <div className="fc-title">Filhas de Jó</div>
              <p className="fc-desc">Jovens de 10 a 19 anos, focadas no aperfeiçoamento do carácter através das virtudes bíblicas de paciência e fé.</p>
              <div className="fc-tag">Feminino · 10–19 anos</div>
            </div>
            <div className="fc-back">
              <div className="fc-title">Filhas de Jó</div>
              <p className="fc-desc">Cultiva fé, esperança, caridade e amor — os quatro pontos cardeais que norteiam a vida de cada jovem membro da ordem.</p>
              <div className="fc-tag">Fundada em 1920</div>
              <div className="fc-back-glyph">J</div>
            </div>
          </div>
          <div className="familia-card reveal reveal-d2">
            <div className="fc-front">
              <div className="fc-num">03</div>
              <img className="fc-icon-logo" src="/ordem-estrela-oriente.png" alt="Brasão da Ordem Estrela do Oriente" loading="lazy" />
              <div className="fc-title">Estrela do Oriente</div>
              <p className="fc-desc">Fraternidade para homens e mulheres adultos, zelando pela solidariedade moral e pelos laços familiares maçônicos.</p>
              <div className="fc-tag">Misto · Adultos</div>
            </div>
            <div className="fc-back">
              <div className="fc-title">Estrela do Oriente</div>
              <p className="fc-desc">Fundada sobre cinco pontos da estrela, cada um representando uma heroína bíblica cujas virtudes guiam os membros.</p>
              <div className="fc-tag">Fundada em 1850</div>
              <div className="fc-back-glyph">★</div>
            </div>
          </div>
          <div className="familia-card reveal reveal-d3">
            <div className="fc-front">
              <div className="fc-num">04</div>
              <img className="fc-icon-logo" src="/ordem-escudeiros.png" alt="Brasão da Ordem dos Escudeiros" loading="lazy" />
              <div className="fc-title">Escudeiros</div>
              <p className="fc-desc">Iniciação de garotos de 8 a 12 anos nas virtudes da Verdade, Justiça e Sabedoria — preparação para uma vida íntegra.</p>
              <div className="fc-tag">Infantil · 8–12 anos</div>
            </div>
            <div className="fc-back">
              <div className="fc-title">Escudeiros</div>
              <p className="fc-desc">O jovem Escudeiro aprende a honrar seus pais, respeitar as leis e agir com bondade — pilares de cidadãos exemplares.</p>
              <div className="fc-tag">Iniciação Precoce</div>
              <div className="fc-back-glyph">E</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
