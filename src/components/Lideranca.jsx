import React, { useEffect } from 'react';

const track1 = [
  { photo: 'https://i.imgur.com/KDSWv0p.png', alt: 'Arthur Sales', role: 'Gr. Sec. de Rel. Exteriores Adj.', name: 'Arthur Sales Gesta de Melo' },
  { photo: 'https://i.imgur.com/JsYyh6o.png', alt: 'Daniel Amâncio', role: 'Gr. Sec. de Entidades Paramaç. Adj.', name: 'Daniel Txa-Iá A. Amâncio' },
  { photo: 'https://i.imgur.com/aVECNDU.png', alt: 'Denner Fadoul', role: 'Gr. Sec. de Comunicação Adj.', name: 'Denner Fadoul' },
  { photo: 'https://i.imgur.com/RhxrvMj.png', alt: 'Eduardo Toledo', role: 'Gr. Sec. de Relações Interiores', name: 'Eduardo Toledo da Silva' },
  { photo: 'https://i.imgur.com/mgR6oKp.png', alt: 'Ericlenio Castro', role: 'Gr. Sec. de Gestão de Patrimônio Adj.', name: 'Ericlenio F. de Oliveira Castro' },
  { photo: 'https://i.imgur.com/BK3W3PM.png', alt: 'Gabriel Melgueiro', role: 'Gr. Sec. de Gestão Administrativa Adj.', name: 'Gabriel Melgueiro Neto' },
  { photo: 'https://i.imgur.com/edK0jBY.png', alt: 'Jose Antonio', role: 'Gr. Sec. de Dispensário Maçônico', name: 'Jose Antonio Costa Filho' },
  { photo: 'https://i.imgur.com/6FWy862.png', alt: 'Jose Ribamar', role: 'Gr. Sec. de Relações Institucionais', name: 'Jose Ribamar Campelo Anibal' },
  { photo: 'https://i.imgur.com/oT1Kvem.png', alt: 'Leonardo Câmara', role: 'Gr. Sec. de Estratégia e Planejamento', name: 'Leonardo Câmara' },
  { photo: 'https://i.imgur.com/LscWXIJ.png', alt: 'Marcos Sarquis', role: 'Gr. Sec. de Gestão de Patrimônio Adj.', name: 'Marcos Carvalho Sarquis' },
  { photo: 'https://i.imgur.com/GUXxYmC.png', alt: 'Paulo Almeida', role: 'Gr. Sec. de Patrimônio Histórico Adj.', name: 'Paulo da Silva R. de Almeida Filho' },
  { photo: 'https://i.imgur.com/jIxdaH9.png', alt: 'Arthur Sales', role: 'Gr. Sec. de Relações Exteriores Adj.', name: 'Arthur Sales de Gesta de Melo' },
  { photo: 'https://i.imgur.com/BajoV1h.png', alt: 'Rafael Miranda', role: 'Gr. Sec. de Assessoria Téc. de Intel.', name: 'Rafael Normando Miranda' },
  { photo: 'https://i.imgur.com/AUU4x3w.png', alt: 'Thiago Brandão', role: 'Gr. Sec. de Gestão de Patrimônio Adj.', name: 'Thiago de Souza Brandão' },
  { photo: 'https://i.imgur.com/bppgpAw.png', alt: 'Valter Silveira', role: 'Gr. Sec. de Tecnologia da Informação', name: 'Valter M. da Silveira Jr' },
  { photo: 'https://i.imgur.com/XCLpiPL.png', alt: 'Zilmar Souza', role: 'Gr. Sec. de Eventos Adjunto', name: 'Zilmar Moreira de Souza' },
];

const track2 = [
  { photo: 'https://i.imgur.com/vppcUiM.png', alt: 'Luiz Filipe', role: 'Gr. Sec. de Relações Exteriores', name: 'Luiz Filipe B. Cardozo' },
  { photo: 'https://i.imgur.com/IuL19JA.png', alt: 'Julio Tomé', role: 'Gr. Sec. de Assessoria Téc. Jurídica', name: 'Julio Tomé Neto' },
  { photo: 'https://i.imgur.com/4vTqmNX.png', alt: 'Yuri Simon', role: 'Gr. Sec. de Entidades Paramaçônicas', name: 'Yuri Simon Salim J. Assel' },
  { photo: 'https://i.imgur.com/NwIlEIq.png', alt: 'Marcos Catunda', role: 'Gr. Sec. de Patrimônio Histórico e Cultural', name: 'Marcos Túlio Tomé Catunda' },
  { photo: 'https://i.imgur.com/EQGfOkd.png', alt: 'Samuel Silva', role: 'Gr. Sec. de Finanças', name: 'Samuel Marques da Silva' },
  { photo: 'https://i.imgur.com/o3LlRqB.png', alt: 'Rennalt Freitas', role: 'Gr. Sec. de Assessoria Téc. Jurídica', name: 'Rennalt Lessa de Freitas' },
  { photo: 'https://i.imgur.com/OFOCaKv.png', alt: 'Manoel Matos', role: 'Gr. Sec. de Integração Institucional', name: 'Manoel Bernado Matos' },
  { photo: 'https://i.imgur.com/NSk9VTP.png', alt: 'Wandecy Campos', role: 'Gr. Sec. de Gestão Administrativa', name: 'Wandecy Gomes Campos' },
  { photo: 'https://i.imgur.com/iOhdKtU.png', alt: 'André Souza', role: 'Gr. Sec. de Comunicação', name: 'André L. Souza' },
  { photo: 'https://i.imgur.com/4acXfeO.png', alt: 'Raimundo Almeida', role: 'Gr. Sec. de Eventos Adjunto', name: 'Raimundo Bentes de Almeida' },
  { photo: 'https://i.imgur.com/Eqt05Io.png', alt: 'Eduardo Sakita', role: 'Gr. Sec. de Relações Interiores Adj.', name: 'Eduardo Akira Sakita' },
  { photo: 'https://i.imgur.com/GrpwsZE.png', alt: 'João Bosco', role: 'Gr. Sec. de Eventos', name: 'João Bosco Pinto Rocha' },
  { photo: 'https://i.imgur.com/5I2xorA.png', alt: 'Éder Santiago', role: 'Gr. Sec. de Assessoria Téc. de Intel.', name: 'Éder Willian Lisboa Santiago' },
  { photo: 'https://i.imgur.com/5anxwJ1.png', alt: 'José Jaborandy', role: 'Gr. Sec. de Assessoria Téc. de Intel.', name: 'José Jaborandy Neto' },
  { photo: 'https://i.imgur.com/cp8Qw3m.png', alt: 'Jocélio Cardoso', role: 'Gr. Sec. de Integração Inst. Adj.', name: 'Jocélio B. Cardoso' },
];

function ExecCard({ photo, alt, role, name }) {
  return (
    <div className="exec-card">
      <div className="exec-photo">
        <img src={photo} alt={alt} />
      </div>
      <div className="exec-role">{role}</div>
      <div className="exec-name">{name}</div>
    </div>
  );
}

export default function Lideranca() {
  useEffect(() => {
    ['exec-track-1', 'exec-track-2'].forEach(id => {
      const track = document.getElementById(id);
      if (!track) return;
      const cards = Array.from(track.children);
      cards.forEach(card => track.appendChild(card.cloneNode(true)));
    });
  }, []);

  return (
    <section id="lideranca">
      <div className="section-inner">
        <div className="lid-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Grande Loja Maçônica do Amazonas</div>
          <h2>Liderança GLOMAM</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>

        <div className="pyramid-wrap">
          <svg className="pyramid-svg-border" viewBox="0 0 900 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polyline className="pyr-edge" points="450,10 10,590 890,590" fill="none" />
            <line className="pyr-edge pyr-edge-r" x1="450" y1="10" x2="10" y2="590" />
            <line className="pyr-edge" x1="450" y1="10" x2="890" y2="590" />
          </svg>

          <div className="eye-section reveal">
            <div className="eye-wrap">
              <div className="eye-glow"></div>
              <svg className="eye-rays" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g stroke="rgba(180,151,90,0.22)" strokeWidth="1" fill="none">
                  <line x1="100" y1="100" x2="100" y2="4" />
                  <line x1="100" y1="100" x2="159" y2="18" />
                  <line x1="100" y1="100" x2="196" y2="59" />
                  <line x1="100" y1="100" x2="196" y2="141" />
                  <line x1="100" y1="100" x2="159" y2="182" />
                  <line x1="100" y1="100" x2="100" y2="196" />
                  <line x1="100" y1="100" x2="41" y2="182" />
                  <line x1="100" y1="100" x2="4" y2="141" />
                  <line x1="100" y1="100" x2="4" y2="59" />
                  <line x1="100" y1="100" x2="41" y2="18" />
                  <line x1="100" y1="100" x2="129" y2="11" />
                  <line x1="100" y1="100" x2="71" y2="11" />
                </g>
              </svg>
              <svg className="eye-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <polygon points="100,24 184,162 16,162" stroke="rgba(180,151,90,0.7)" strokeWidth="2" fill="rgba(180,151,90,0.04)" />
                <path d="M60,100 Q100,58 140,100 Q100,142 60,100Z" stroke="rgba(180,151,90,0.85)" strokeWidth="1.5" fill="rgba(10,12,16,0.9)" />
                <circle className="iris-anim" cx="100" cy="100" r="16" stroke="var(--gold)" strokeWidth="1.5" fill="rgba(180,151,90,0.08)" />
                <circle className="pupil-anim" cx="100" cy="100" r="6" fill="var(--gold)" opacity="0.85" />
                <circle cx="100" cy="100" r="24" stroke="rgba(180,151,90,0.18)" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>

          <div className="gov-tier-top reveal reveal-d1">
            <div className="gov-card gov-main">
              <div className="gov-portrait">
                <img src="https://i.imgur.com/DmqA6an.png" alt="TUFI SALIM JORGE FILHO" />
              </div>
              <div className="gov-rank">Grão-Mestre</div>
              <div className="gov-cim">CIM: 8023</div>
              <div className="gov-name">TUFI SALIM JORGE FILHO</div>
            </div>
          </div>

          <div className="gov-tier-bottom reveal reveal-d2">
            <div className="gov-card gov-vigilante">
              <div className="gov-portrait">
                <img src="https://i.imgur.com/yMM6r3J.png" alt="LOUSMAR BONATES" />
              </div>
              <div className="gov-rank">Gr.: 1º Vigilante</div>
              <div className="gov-name">LOUSMAR BONATES</div>
            </div>
            <div className="gov-card gov-vigilante">
              <div className="gov-portrait">
                <img src="https://i.imgur.com/a2bVjCf.png" alt="José Nasser" />
              </div>
              <div className="gov-rank">Gr.: 2º Vigilante</div>
              <div className="gov-name">JOSÉ NASSER</div>
            </div>
          </div>

          <div className="exec-carousels reveal reveal-d3">
            <div className="exec-track-wrap">
              <div className="exec-track right" id="exec-track-1">
                {track1.map((m, i) => <ExecCard key={i} {...m} />)}
              </div>
            </div>
            <div className="exec-track-wrap">
              <div className="exec-track left" id="exec-track-2">
                {track2.map((m, i) => <ExecCard key={i} {...m} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="lid-cta reveal" style={{ textAlign: 'center', marginTop: 'clamp(56px,8vw,96px)', paddingTop: 'clamp(40px,6vw,64px)', borderTop: '1px solid rgba(180,151,90,.14)' }}>
          <div style={{ width: '44px', height: '1px', background: 'var(--gold)', margin: '0 auto 24px', opacity: '.6' }}></div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: '.5rem', letterSpacing: '.48em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'clamp(18px,3vw,28px)', opacity: '.85' }}>Faça parte desta irmandade</p>
          <h3 style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 'clamp(1.2rem,3vw,2rem)', color: 'var(--white)', fontWeight: 400, lineHeight: 1.3, marginBottom: 'clamp(16px,2.5vw,24px)', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>Você está pronto para dar o próximo passo?</h3>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.8vw,1.22rem)', color: 'rgba(255,255,255,.52)', lineHeight: 1.85, maxWidth: '600px', margin: '0 auto clamp(28px,4vw,44px)', fontStyle: 'italic' }}>A liderança que você acabou de conhecer não é fruto do acaso — é o resultado de anos de aprimoramento moral, intelectual e fraterno. A Maçonaria não transforma apenas o homem; ela transforma o mundo ao seu redor. Se você sente que nasceu para algo maior, o Templo tem uma vaga reservada para você.</p>
          <a href="#oriente" className="btn-primary" style={{ padding: 'clamp(14px,2vw,18px) clamp(42px,6vw,72px)' }}><span>Quero Ser Maçom</span></a>
          <div style={{ width: '44px', height: '1px', background: 'var(--gold)', margin: 'clamp(28px,4vw,44px) auto 0', opacity: '.3' }}></div>
        </div>
      </div>
    </section>
  );
}
