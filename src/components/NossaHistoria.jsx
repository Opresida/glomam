import React from 'react';

export default function NossaHistoria() {
  return (
    <section id="nossa-historia">
      <div className="section-inner">
        <div className="nh-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Desde 1904</div>
          <h2>Nossa História</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>

        <div className="nh-body reveal reveal-d1">
          <div className="nh-text-col">
            <p className="nh-para">O Amazonas, ao ser elevado à categoria de Província, em 1850, não possuía Loja Maçônica, permanecendo nessa situação até o surgimento, em 1872, da Loja <span className="nh-em">"Esperança e Porvir"</span>, no Oriente de Manaus.</p>
            <p className="nh-para">Tal fato não significava ausência de atividades da Maçonaria Universal em terras amazônicas. Ao contrário, houve acentuada participação de Maçons brasileiros e estrangeiros no meritório trabalho de manter a integridade do território nacional e propiciar condições para uma correta política de desenvolvimento regional.</p>
            <p className="nh-para">Com a proclamação do Grão-Mestre Desembargador Gaspar Antônio Vieira Guimarães, a 24 de julho de 1927, a nova Potência Maçônica recebeu sua Carta Constitutiva, tornando-se soberana e independente — a quinta Grande Loja brasileira a alcançar tal distinção.</p>
          </div>
          <div className="nh-accent-col">
            <div className="nh-year-deco">1884</div>
            <blockquote className="nh-quote">A Maçonaria lidera o decreto de extinção da escravidão no Amazonas — quatro anos antes do Brasil.</blockquote>
          </div>
        </div>

        <div className="nh-founding reveal reveal-d2">
          <div className="nh-founding-line"></div>
          <p className="nh-founding-text">A <strong>Grande Loja Maçônica do Amazonas</strong> é considerada a primeira das Grandes Lojas Brasileiras, com fundação em <span className="nh-gold">22 de setembro de 1904</span>, erguendo-se como Potência Maçônica no coração da Amazônia Ocidental.</p>
          <div className="nh-founding-line"></div>
        </div>

        <div className="nh-names reveal reveal-d3">
          <div className="nh-names-title">Evolução Institucional</div>
          <div className="nh-names-rail">
            <div className="nh-name-item"><span className="nh-n-year">1904 — 1927</span><span className="nh-n-label">Grande Oriente Estadual do Amazonas</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1927 — 1945</span><span className="nh-n-label">Grande Oriente do Amazonas e Acre</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1945 — 1961</span><span className="nh-n-label">Grande Oriente do Amazonas, Acre e demais Territórios Limítrofes</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1961 — 1968</span><span className="nh-n-label">Grande Loja do Amazonas, Acre, Rondônia e Rio Branco</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1968 — 1974</span><span className="nh-n-label">Grande Loja do Amazonas, Acre, Rondônia e Roraima</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1974 — 1980</span><span className="nh-n-label">Grande Loja do Amazonas e Territórios Limítrofes</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1980 — 1985</span><span className="nh-n-label">Grande Loja do Estado do Amazonas — GLEAM</span></div>
            <div className="nh-name-item"><span className="nh-n-year">1985 — 1988</span><span className="nh-n-label">Grande Loja Maçônica do Estado do Amazonas — GLOMAM</span></div>
            <div className="nh-name-item nh-name-current"><span className="nh-n-year">1988 — Hoje</span><span className="nh-n-label">Grande Loja Maçônica do Amazonas — GLOMAM</span></div>
          </div>
        </div>

        <div className="nh-closing reveal">
          <p className="nh-para" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>Os Maçons do Amazonas, ao longo de mais de um século, realizaram trabalho admirável. Souberam dignificar nossa Sacrossanta Instituição, mantendo a regularidade e conscientizando-se da necessidade do aprimoramento individual, através dos ensinamentos maçônicos, objetivando viver suas vidas pautadas nos fundamentos que sustentam até hoje a Maçonaria.</p>
        </div>

        <div className="nh-cta-block reveal">
          <div className="nh-cta-ornament"></div>
          <p className="nh-cta-sub">Faça parte desta história</p>
          <a href="#oriente" className="btn-primary" style={{ padding: 'clamp(14px,2vw,18px) clamp(42px,6vw,72px)' }}><span>Quero Ser Maçom</span></a>
        </div>
      </div>
    </section>
  );
}
