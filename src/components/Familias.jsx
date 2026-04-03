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
              <svg className="fc-icon-svg" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
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
              <svg className="fc-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="5" r="3" /><path d="M12 8v8M9 14l3 4 3-4M7 10l5 2 5-2" /></svg>
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
              <svg className="fc-icon-svg" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
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
              <svg className="fc-icon-svg" viewBox="0 0 24 24"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" /></svg>
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
