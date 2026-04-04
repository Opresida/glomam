import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Depoimentos.css';

const depoimentos = [
  {
    id: 0,
    stars: 5,
    texto: 'A Grande Loja do Amazonas me proporcionou uma jornada de autoconhecimento que transcendeu qualquer expectativa. O ensino maçônico moldou meu caráter e fortaleceu meus laços fraternos de maneira ímpar.',
    foto: 'https://i.pravatar.cc/150?img=11',
    nome: 'Irmão Raimundo Nogueira',
    cargo: 'Mestre Instalado',
    loja: 'Loja Estrela do Norte',
  },
  {
    id: 1,
    stars: 5,
    texto: 'Desde que ingressei na GLOMAM, compreendi que a Maçonaria vai muito além de rituais: é uma escola permanente de virtudes. Cada sessão é uma oportunidade de crescer como homem e como cidadão amazonense.',
    foto: 'https://i.pravatar.cc/150?img=32',
    nome: 'Irmão Manoel Batista',
    cargo: '2º Vigilante',
    loja: 'Loja Perseverança',
  },
  {
    id: 2,
    stars: 5,
    texto: 'Encontrei na fraternidade maçônica amazonense um ambiente de respeito mútuo e busca sincera pela verdade. Os projetos sociais da GLOMAM impactam vidas reais e me enchem de orgulho cada dia.',
    foto: 'https://i.pravatar.cc/150?img=53',
    nome: 'Irmão Carlos Drummond',
    cargo: 'Secretário',
    loja: 'Loja Força e Virtude',
  },
  {
    id: 3,
    stars: 5,
    texto: 'A filosofia da pedra bruta me tocou profundamente. Trabalhar o próprio caráter com a ajuda dos irmãos é um privilégio que levarei para toda a vida. A GLOMAM é um farol para o Amazonas.',
    foto: 'https://i.pravatar.cc/150?img=67',
    nome: 'Irmão José Albuquerque',
    cargo: 'Orador',
    loja: 'Loja Luz do Solimões',
  },
  {
    id: 4,
    stars: 5,
    texto: 'A tradição, o silêncio ritualístico e a fraternidade sincera que vivi nos Templos da GLOMAM são experiências que nenhuma palavra descreve plenamente. Recomendo a todo homem que busca algo maior em si mesmo.',
    foto: 'https://i.pravatar.cc/150?img=77',
    nome: 'Irmão Paulo Sérgio Leal',
    cargo: 'Venerável Mestre',
    loja: 'Loja União Amazônica',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

function Stars({ count }) {
  return (
    <div className="dep-stars" aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="dep-star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Depoimentos() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % depoimentos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" ref={sectionRef}>
      <div className="section-inner">
        <motion.div
          className="dep-grid"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* ── Coluna esquerda ── */}
          <motion.div className="dep-left" variants={itemVariants}>
            <div className="dep-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span>Irmandade Maçônica</span>
            </div>

            <h2 className="dep-heading">Amado pela<br /><span className="dep-heading-gold">Irmandade</span></h2>

            <p className="dep-subtitle">
              Não confie apenas em nossas palavras. Veja o que nossos irmãos têm a dizer sobre a jornada na Grande Loja Maçônica do Amazonas.
            </p>

            <div className="dep-dots" role="tablist" aria-label="Navegar entre depoimentos">
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  className={`dep-dot${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Coluna direita ── */}
          <motion.div className="dep-right" variants={itemVariants}>
            <div className="dep-cards-area">
              {depoimentos.map((dep, i) => (
                <motion.div
                  key={dep.id}
                  className="dep-card"
                  initial={{ opacity: 0, x: 80, scale: 0.94 }}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    x: active === i ? 0 : 80,
                    scale: active === i ? 1 : 0.94,
                    zIndex: active === i ? 10 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  style={{ pointerEvents: active === i ? 'auto' : 'none' }}
                >
                  <Stars count={dep.stars} />

                  <p className="dep-texto">
                    <svg className="dep-quote-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                    {dep.texto}
                  </p>

                  <div className="dep-sep"></div>

                  <div className="dep-author">
                    <img className="dep-avatar" src={dep.foto} alt={dep.nome} />
                    <div className="dep-info">
                      <span className="dep-nome">{dep.nome}</span>
                      <span className="dep-cargo">{dep.cargo}, {dep.loja}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="dep-deco dep-deco-bl" aria-hidden="true"></div>
              <div className="dep-deco dep-deco-tr" aria-hidden="true"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
