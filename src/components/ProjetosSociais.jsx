import React, { useEffect, useRef, useState } from 'react';
import amazonasPath from './amazonasPath.js';

const projetos = [
  {
    titulo: 'Luz no Lar',
    descricao: 'Distribuição de cestas básicas e material escolar para famílias em situação de vulnerabilidade nos bairros periféricos de Manaus.',
    impacto: '320 famílias beneficiadas por mês',
    tag: 'Assistência Social',
    municipio: 'Manaus',
  },
  {
    titulo: 'Escola do Futuro',
    descricao: 'Reforço escolar gratuito para crianças de 6 a 14 anos, com professores voluntários filiados às lojas da GLOMAM.',
    impacto: '180 alunos atendidos anualmente',
    tag: 'Educação',
    municipio: 'Manaus',
  },
  {
    titulo: 'Saúde em Ação',
    descricao: 'Mutirões de saúde com atendimentos médicos, odontológicos e exames preventivos em municípios do interior do Amazonas.',
    impacto: '2.400 atendimentos realizados',
    tag: 'Saúde',
    municipio: 'Itacoatiara',
  },
  {
    titulo: 'Guardiões do Rio',
    descricao: 'Projeto de preservação ambiental e educação ecológica nas comunidades ribeirinhas do Rio Negro e seus afluentes.',
    impacto: '8 comunidades ribeirinhas alcançadas',
    tag: 'Meio Ambiente',
    municipio: 'Barcelos',
  },
];

const stats = [
  { value: 1200, suffix: '+', label: 'Famílias Impactadas', decimais: 0 },
  { value: 8, suffix: '', label: 'Municípios Atendidos', decimais: 0 },
  { value: 120, suffix: ' anos', label: 'De História', decimais: 0 },
  { value: 47, suffix: '', label: 'Lojas Ativas', decimais: 0 },
];

const municipiosAtivos = [
  { id: 'manaus', nome: 'Manaus', cx: 759, cy: 301, familias: 820 },
  { id: 'itacoatiara', nome: 'Itacoatiara', cx: 835, cy: 303, familias: 140 },
  { id: 'parintins', nome: 'Parintins', cx: 910, cy: 275, familias: 95 },
  { id: 'tefe', nome: 'Tefé', cx: 527, cy: 315, familias: 72 },
  { id: 'coari', nome: 'Coari', cx: 604, cy: 355, familias: 58 },
  { id: 'barcelos', nome: 'Barcelos', cx: 615, cy: 183, familias: 35 },
  { id: 'sao_gabriel', nome: 'São Gabriel', cx: 410, cy: 137, familias: 40 },
  { id: 'tabatinga', nome: 'Tabatinga', cx: 270, cy: 364, familias: 30 },
];

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return count;
}

function formatPT(n) {
  return n.toLocaleString('pt-BR');
}

function StatCard({ value, suffix, label, active }) {
  const count = useCountUp(value, 1600, active);
  return (
    <div className="ps-stat">
      <div className="ps-stat-num">
        {formatPT(count)}{suffix}
      </div>
      <div className="ps-stat-label">{label}</div>
    </div>
  );
}

function AmazonasMap() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const active = hovered || selected;

  const handleClick = (id) => {
    setSelected(prev => prev === id ? null : id);
  };

  return (
    <div className="ps-map-wrap reveal reveal-d1">
      <div className="ps-map-header">
        <div className="section-label" style={{ justifyContent: 'center' }}>Presença Regional</div>
        <p className="ps-map-subtitle">Passe o cursor sobre os marcadores para ver o impacto por município</p>
      </div>
      <div className="ps-map-container">
        <svg
          className="ps-map-svg"
          viewBox="0 0 960 671"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mapa do Estado do Amazonas"
        >
          <g transform="translate(0,671) scale(0.1,-0.1)">
            <path className="ps-map-state" d={amazonasPath} />
          </g>
          {municipiosAtivos.map(m => (
            <g
              key={m.id}
              className={`ps-marker${active === m.id ? ' ps-marker--active' : ''}`}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(m.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={m.cx} cy={m.cy} r={active === m.id ? 22 : 16} className="ps-marker-pulse" />
              <circle cx={m.cx} cy={m.cy} r={active === m.id ? 10 : 7} className="ps-marker-dot" />
              <text x={m.cx} y={m.cy - 24} className="ps-marker-label" textAnchor="middle" fontSize="13">{m.nome}</text>
            </g>
          ))}
        </svg>
        {active && (() => {
          const m = municipiosAtivos.find(x => x.id === active);
          return m ? (
            <div className="ps-map-tooltip">
              <div className="ps-map-tooltip-name">{m.nome}</div>
              <div className="ps-map-tooltip-stat">{m.familias} famílias impactadas</div>
            </div>
          ) : null;
        })()}
      </div>
    </div>
  );
}

export default function ProjetosSociais() {
  const statsRef = useRef(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsActive(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projetos-sociais">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Responsabilidade Social</div>
          <h2>Conheça Nossos Projetos Sociais</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
          <p className="ps-intro reveal">
            A GLOMAM vai além dos templos. Através de iniciativas concretas, transformamos vidas no Amazonas há mais de um século.
          </p>
        </div>

        <div className="ps-stats-row" ref={statsRef}>
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} suffix={s.suffix} label={s.label} active={statsActive} />
          ))}
        </div>

        <div className="ps-cards-grid">
          {projetos.map((p, i) => (
            <div className={`ps-card reveal${i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : i === 3 ? ' reveal-d3' : ''}`} key={i}>
              <div className="ps-card-tag">{p.tag}</div>
              <h3 className="ps-card-title">{p.titulo}</h3>
              <p className="ps-card-desc">{p.descricao}</p>
              <div className="ps-card-impact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{p.impacto}</span>
              </div>
              <div className="ps-card-municipio">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {p.municipio}
              </div>
            </div>
          ))}
        </div>

        <AmazonasMap />
      </div>
    </section>
  );
}
