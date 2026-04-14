import React from 'react';

export default function WelcomeSection() {
  return (
    <section id="bem-vindo" className="welcome-section">
      <div className="section-inner">
        <div className="welcome-grid reveal">
          <div className="welcome-img">
            <img src="https://raw.githubusercontent.com/Opresida/glomam/main/GLOMAM%20SVG%20EM%20ALTA.svg" alt="GLOMAM" />
          </div>
          <div className="welcome-text">
            <div className="section-label">Bem-Vindo</div>
            <h2>Seja Bem-Vindo à Grande Loja Maçônica do Amazonas</h2>
            <div className="divider"></div>
            <p>
              A GLOMAM — Grande Loja Maçônica do Amazonas — é uma Potência Maçônica soberana e independente,
              fundada em 22 de setembro de 1904, sendo a quinta Grande Loja brasileira a conquistar soberania.
            </p>
            <p>
              A Maçonaria exerceu papel fundamental em momentos históricos do Amazonas, liderando em 1884 o
              decreto de extinção da escravidão na Província — quatro anos antes da Lei Áurea nacional.
              Desde então, a GLOMAM segue como sentinela vigilante da tradição, projetando sua luz através
              de gerações comprometidas com a humanidade.
            </p>
            <a href="#geometria" className="btn-primary" style={{ marginTop: '20px' }}><span>Saiba Mais</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
