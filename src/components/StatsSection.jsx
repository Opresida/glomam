import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { label: 'Maçons', value: 1200, suffix: '+' },
  { label: 'Lojas', value: 42, suffix: '' },
  { label: 'Cidades', value: 18, suffix: '' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="section-inner">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="stat-block" key={i}>
              <div className="stat-number">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-name">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
