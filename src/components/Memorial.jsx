import React, { useEffect, useRef } from 'react';

const masters = [
  { name: 'Raimundo Perdigão', term: '1904-1908', photo: 'https://i.imgur.com/D5FphSc.jpeg' },
  { name: 'Clemente Bittencourt', term: '1908-1914', photo: 'https://i.imgur.com/0rTsJYm.jpeg' },
  { name: 'Ramalho Júnior', term: '1914-1917', photo: 'https://i.imgur.com/schlQjs.jpeg' },
  { name: 'Silvério Nery', term: '1917-1923', photo: 'https://i.imgur.com/u5J8V9W.jpeg' },
  { name: 'Gaspar Guimarães', term: '1923-1935', photo: 'https://i.imgur.com/8CAa1EN.jpeg' },
  { name: 'Hamilton Mourão', term: '1935-1942', photo: 'https://i.imgur.com/Kk0KCRe.jpeg' },
  { name: 'Angello Bitencourt', term: '1942-1952', photo: 'https://i.imgur.com/DDk5Zlx.jpeg' },
  { name: 'Venâncio Igreja', term: '1952-1961', photo: 'https://i.imgur.com/LfH3XrM.jpeg' },
  { name: 'Felismino Soares', term: '1961-1962', photo: 'https://i.imgur.com/mYtZfe2.jpeg' },
  { name: 'Mário Verçosa', term: '1962-1977', photo: 'https://i.imgur.com/TbBKoff.jpeg' },
  { name: 'Cândido Honório', term: '1977-1979', photo: 'https://i.imgur.com/MwuT6lB.jpeg' },
  { name: 'Rodolpho Valle', term: '1977 (Ago-Out)', photo: 'https://i.imgur.com/CO0VzJv.jpeg' },
  { name: 'Afonso Lins', term: '1979-1980 / 1986-1989', photo: 'https://i.imgur.com/JWVHqHC.jpeg' },
  { name: 'Manoel Ribeiro', term: '1980-1986', photo: 'https://i.imgur.com/p23qgyP.jpeg' },
  { name: 'Vicente Nogueira', term: '1989 (Ago-Dez)', photo: 'https://i.imgur.com/E8cla5p.jpeg' },
  { name: 'Francisco Oswaldino', term: '1990-1993', photo: 'https://i.imgur.com/8h63RVg.jpeg' },
  { name: 'Renan Corrêa Peixoto', term: '1994-1997', photo: 'https://i.imgur.com/44FBUJ1.jpeg' },
  { name: 'Ronaldo de Brito Leite', term: '1998-2004', photo: 'https://i.imgur.com/GiSESq8.jpeg' },
  { name: 'René Levy Aguiar', term: '2004-2010', photo: 'https://i.imgur.com/es7Jwfr.jpeg' },
  { name: 'Átila Atala Tuma', term: '2010-2013', photo: 'https://i.imgur.com/Z8DZtrf.jpeg' },
  { name: 'Elzio Duarte Alecrim', term: '2013-2016', photo: 'https://i.imgur.com/PUTJSNL.jpeg' },
  { name: 'Fernando Ferreira Lima', term: '2016-2019', photo: 'https://i.imgur.com/FjDdkMM.png' },
];

export default function Memorial() {
  const trackRef = useRef(null);
  const dotsRef = useRef(null);
  const wrapRef = useRef(null);
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const dotsWrap = dotsRef.current;
    const wrap = wrapRef.current;
    if (!track || !dotsWrap || !wrap) return;

    const cardW = () => {
      const card = track.children[0];
      if (!card) return 184;
      const gap = window.innerWidth <= 480 ? 10 : window.innerWidth <= 768 ? 12 : 24;
      return card.offsetWidth + gap;
    };
    const vis = () => {
      if (window.innerWidth <= 480) return 2;
      if (window.innerWidth <= 768) return 3;
      if (window.innerWidth <= 1024) return 4;
      return 5;
    };

    const buildDots = () => {
      dotsWrap.innerHTML = '';
      const grps = Math.ceil(masters.length / vis());
      for (let i = 0; i < grps; i++) {
        const d = document.createElement('div');
        d.className = 'c-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => { goTo(i * vis()); startAuto(); });
        dotsWrap.appendChild(d);
      }
    };

    const goTo = i => {
      const v = vis(), max = masters.length - v;
      idxRef.current = Math.max(0, Math.min(i, max));
      track.style.transform = `translateX(-${idxRef.current * cardW()}px)`;
      const g = Math.floor(idxRef.current / v);
      [...dotsWrap.children].forEach((d, j) => d.classList.toggle('active', j === g));
    };

    const startAuto = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        goTo(idxRef.current + 1 > masters.length - vis() ? 0 : idxRef.current + 1);
      }, 3500);
    };

    const prevBtn = document.getElementById('prev-master');
    const nextBtn = document.getElementById('next-master');
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(idxRef.current - vis()); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(idxRef.current + vis()); startAuto(); });

    let tx = 0;
    const touchStart = e => { tx = e.touches[0].clientX; };
    const touchEnd = e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 36) { d > 0 ? goTo(idxRef.current + 1) : goTo(idxRef.current - 1); startAuto(); }
    };
    wrap.addEventListener('touchstart', touchStart, { passive: true });
    wrap.addEventListener('touchend', touchEnd, { passive: true });

    const onResize = () => { buildDots(); goTo(0); };
    window.addEventListener('resize', onResize);

    buildDots();
    goTo(0);
    startAuto();

    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('touchstart', touchStart);
      wrap.removeEventListener('touchend', touchEnd);
    };
  }, []);

  useEffect(() => {
    const hist = document.getElementById('historia');
    const spl = document.getElementById('spotlight');
    if (!hist || !spl) return;

    const onMove = e => {
      const r = hist.getBoundingClientRect();
      if (e.clientY >= r.top && e.clientY <= r.bottom) {
        hist.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        hist.style.setProperty('--my', (e.clientY - r.top) + 'px');
        spl.style.opacity = '1';
      } else {
        spl.style.opacity = '0';
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="historia">
      <div className="hist-noise"></div>
      <div id="spotlight"></div>
      <div className="section-inner">
        <div className="hist-intro reveal">
          <div className="section-label">Memorial</div>
          <h2>Iluminando o Passado</h2>
          <div className="divider"></div>
        </div>
        <div className="hist-grid reveal reveal-d1">
          <div className="compasso-wrap">
            <div className="compasso-year">1904</div>
            <div className="orbit-ring" style={{ width: '90%', height: '90%' }}></div>
            <div className="orbit-ring" style={{ width: '62%', height: '62%' }}></div>
            <svg className="compasso-svg" viewBox="0 0 100 100">
              <path className="c-path" d="M12,38 L50,78 L88,38 L78,28 L50,68 L22,28 Z" />
              <g className="c-legs">
                <line className="c-path" x1="50" y1="12" x2="22" y2="88" style={{ animationDelay: '.3s' }} />
                <line className="c-path" x1="50" y1="12" x2="78" y2="88" style={{ animationDelay: '.5s' }} />
                <circle cx="50" cy="12" r="2.5" fill="#b4975a" stroke="none" />
              </g>
              <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fontFamily="Cinzel" fontSize="8" fill="#b4975a" opacity=".5">G</text>
              <circle cx="50" cy="52" r="8" stroke="#b4975a" strokeWidth=".4" fill="none" strokeDasharray="2,4" opacity=".4" />
            </svg>
          </div>
          <div className="timeline">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1872</div><div className="tl-text">Surge a Loja "Esperança e Porvir" — primeiro farol maçônico a iluminar as terras do Amazonas.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1884</div><div className="tl-text">Marco histórico: a Maçonaria lidera o decreto de extinção da escravidão na Província do Amazonas, antecedendo o Brasil.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">1904</div><div className="tl-text">Fundação formal da GLOMAM — consolidando a regularidade no coração da Amazônia Ocidental.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">Hoje</div><div className="tl-text">Sentinela vigilante da tradição, a GLOMAM projeta sua luz através de gerações comprometidas com a humanidade.</div></div>
          </div>
        </div>

        <div className="reveal">
          <div className="masters-header">
            <h3 className="masters-h3">Galeria de Grão-Mestres</h3>
            <div className="carousel-controls">
              <button className="ctrl-btn" id="prev-master" aria-label="Anterior">&#8592;</button>
              <button className="ctrl-btn" id="next-master" aria-label="Próximo">&#8594;</button>
            </div>
          </div>
          <div className="masters-track-wrap" id="carousel-wrap" ref={wrapRef}>
            <div className="masters-track" id="masters-track" ref={trackRef}>
              {masters.map((m, i) => {
                const init = m.name.split(' ').find(w => w.length > 2)?.[0] || m.name[0];
                return (
                  <div className="master-card" key={i}>
                    {m.photo
                      ? <div className="master-portrait" style={{ backgroundImage: `url('${m.photo}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }}></div>
                      : <div className="master-portrait"><div className="master-initial">{init}</div></div>
                    }
                    <div className="master-label">Grão-Mestre</div>
                    <div className="master-name">{m.name}</div>
                    <div className="master-term">{m.term}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="carousel-dots" id="carousel-dots" ref={dotsRef}></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', opacity: '.17', fontSize: '.52rem', letterSpacing: '.5em', textTransform: 'uppercase', color: '#fff' }}>Mova o cursor para explorar com a sua luz</div>
      </div>
    </section>
  );
}
