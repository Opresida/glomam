import React, { useEffect } from 'react';

export default function Pilares() {
  useEffect(() => {
    const isTouch = () => window.matchMedia('(pointer:coarse)').matches;
    if (isTouch()) return;

    const cards = document.querySelectorAll('.pilar-card');
    const handlers = [];
    cards.forEach(c => {
      const move = e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(6px)`;
      };
      const leave = () => { c.style.transform = ''; };
      c.addEventListener('mousemove', move);
      c.addEventListener('mouseleave', leave);
      handlers.push({ el: c, move, leave });
    });
    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <section id="geometria">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Os Pilares da Ordem</div>
          <h2>Princípios que Sustentam o Templo</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>
        <div className="pilares-grid reveal reveal-d1">
          <div className="pilar-card">
            <div className="pilar-num">I</div>
            <div className="pilar-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2z" /><line x1="12" y1="9" x2="12" y2="14" /><circle cx="12" cy="17" r=".5" fill="#b4975a" /></svg>
            </div>
            <div className="pilar-title">A Maçonaria</div>
            <p>Ordem constituída por homens de todas as raças, congregados em Lojas para o aperfeiçoamento da Sociedade Humana através de símbolos e alegorias.</p>
            <ul className="pilar-list">
              <li>· Crença num Princípio Criador — G.A.D.U.</li>
              <li>· Liberdade de consciência sacratíssima</li>
              <li>· Tolerância e investigação da Verdade</li>
            </ul>
          </div>
          <div className="pilar-card" style={{ background: 'var(--slate)' }}>
            <div className="pilar-num" style={{ color: 'rgba(255,255,255,.03)' }}>II</div>
            <div className="pilar-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" /></svg>
            </div>
            <div className="pilar-title">Ser Maçom</div>
            <p style={{ color: 'rgba(255,255,255,.52)', fontStyle: 'italic', fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem' }}>"É ser amante da Virtude, da Sabedoria e da Justiça. É educar a inteligência para o bem e praticar a concórdia entre os povos."</p>
            <ul className="pilar-list">
              <li>· Prática constante da caridade</li>
              <li>· Respeito à família e à nação</li>
            </ul>
          </div>
          <div className="pilar-card">
            <div className="pilar-num">III</div>
            <div className="pilar-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
            </div>
            <div className="pilar-title">A Grande Loja</div>
            <p>Potência Maçônica soberana e independente, fundada em 1904, que rege e orienta as lojas filiadas no Amazonas com regularidade, legitimidade e tradição.</p>
            <ul className="pilar-list">
              <li>· Regularidade e legitimidade universais</li>
              <li>· Jurisdição sobre lojas filiadas</li>
              <li>· Guardiã da tradição maçônica</li>
            </ul>
          </div>
          <div className="triade-block">
            <span className="triade-word">Liberdade</span>
            <span className="triade-sep"></span>
            <span className="triade-word">Igualdade</span>
            <span className="triade-sep"></span>
            <span className="triade-word">Fraternidade</span>
          </div>
        </div>
      </div>
    </section>
  );
}
