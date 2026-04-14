import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { findPhoto } from '../data/photoDirectory.js';

const vigilantes = [
  { cargo: 'Grande 1º Vigilante', nome: 'Louismar de Matos Bonates' },
  { cargo: 'Grande 2º Vigilante', nome: 'José Nasser' },
];

const membros = [
  { cargo: 'Grande Orador', nome: 'Luiz Filipi Batista Cardozo' },
  { cargo: 'Grande Orador Adjunto', nome: 'Jardel Alves Xavier' },
  { cargo: 'Grande Secretário', nome: 'José Itamar de Souto' },
  { cargo: 'Grande Secretário Adjunto', nome: 'José Antonio Costa Filho' },
  { cargo: 'Grande Tesoureiro', nome: 'Erick dos Santos Gadelha' },
  { cargo: 'Grande Tesoureiro Adjunto', nome: 'Ederson Thadeu Simões M. Viedes' },
  { cargo: 'Grande 1º Experto', nome: 'Paulo Avelino Filho' },
  { cargo: 'Grande 2º Experto', nome: 'João Bosco Pinto Rocha' },
  { cargo: 'Grande Mestre de Cerimônias', nome: 'Alexei Manauara Tavares Barros' },
  { cargo: 'Grande Mestre de Cerimônias Adjunto', nome: 'Eylan Manoel da Silva Lins' },
  { cargo: 'Grande 1º Diácono', nome: 'Marlon Prado da Silva' },
  { cargo: 'Grande 2º Diácono', nome: 'Ronaldo de Sena Vilar' },
  { cargo: 'Grande Porta Espada', nome: 'Gabriel Melgueiro Neto' },
  { cargo: 'Grande Porta Estandarte', nome: 'Raimundo Alcides Rodrigues de Lima' },
  { cargo: 'Grande Hospitaleiro', nome: 'Eduardo Akira Sakita' },
  { cargo: 'Grande Hospitaleiro Adjunto', nome: 'Marcus Valério de Rezende Colares' },
  { cargo: 'Grande Chanceler', nome: 'Bráulio da Silva Lima' },
  { cargo: 'Grande Guarda do Templo', nome: 'Ericlênio Faustino de Oliveira Castro' },
  { cargo: 'Grande Cobridor Externo', nome: 'Cláudio Antônio Paula de Cestaro' },
  { cargo: 'Grande Mestre de Harmonia', nome: 'Harrison Felipe Clementino Soares' },
  { cargo: 'Grande Mestre de Harmonia Adjunto', nome: 'Leandro Soares da Rocha' },
  { cargo: 'Grande Bibliotecário', nome: 'Igor Mendonça Pereira de Souza' },
  { cargo: 'Grande Arquiteto Decorador', nome: 'Raimundo Nonato Bezerra de Araujo' },
  { cargo: 'Grande Arquiteto Decorador Adjunto', nome: 'Luzimarque Romão Carlos da Silva' },
  { cargo: 'Grande Mestre de Banquetes', nome: 'Roberto Haddad Habrahão' },
];

function Initials({ nome }) {
  const parts = nome.split(' ').filter(Boolean);
  const init = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase();
  return <span className="jud-initials">{init}</span>;
}

function OficialCard({ cargo, nome, destaque, delay }) {
  const foto = findPhoto(nome);
  const cls = [
    'jud-card',
    destaque ? 'jud-card--destaque' : '',
    delay ? `reveal-d${delay}` : '',
    'reveal',
  ].filter(Boolean).join(' ');
  return (
    <article className={cls}>
      <div className="jud-card-photo">
        {foto ? (
          <img src={foto} alt={nome} loading="lazy" />
        ) : (
          <div className="jud-card-nophoto">
            <Initials nome={nome} />
            <span className="jud-card-nophoto-label">Sem Foto</span>
          </div>
        )}
        <div className="jud-card-photo-overlay" />
      </div>
      <div className="jud-card-cargo">{cargo}</div>
      <h3 className="jud-card-nome">{nome}</h3>
      <div className="jud-card-divider" />
    </article>
  );
}

export default function Legislativo() {
  useReveal();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="jud-hero">
        <div className="jud-hero-bg" aria-hidden="true" />
        <div className="section-inner jud-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Administração · 2024 / 2025</div>
            <h1 className="jud-hero-title">Legislativo</h1>
            <div className="jud-divider" style={{ margin: '24px auto 28px' }} />
            <p className="jud-hero-sub">
              A Assembleia Legislativa Maçônica da GLOMAM reúne os Grandes Oficiais responsáveis
              pela elaboração e zelo das leis que regem a Ordem, garantindo equilíbrio, tradição
              e continuidade dos ritos em todas as Lojas do Oriente.
            </p>
          </div>
        </div>
      </section>

      {/* Vigilantes */}
      <section className="jud-bloco">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Colunas do Templo</div>
            <h2 className="jud-bloco-titulo">Grandes Vigilantes</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Guardiões das colunas da sabedoria e da força — assistem o Grão-Mestre na
              condução dos trabalhos e velam pela ordem dos Irmãos.
            </p>
          </div>
          <div className="jud-destaque-grid">
            {vigilantes.map((v, i) => (
              <OficialCard key={v.cargo} {...v} destaque delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Grandes Oficiais */}
      <section className="jud-bloco jud-bloco--alt">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Colegiado</div>
            <h2 className="jud-bloco-titulo">Grandes Oficiais</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Cada Oficial do Legislativo cumpre uma função simbólica e administrativa,
              compondo o corpo vivo da Assembleia que sustenta a Ordem.
            </p>
          </div>
          <div className="jud-juizes-grid">
            {membros.map((m, i) => (
              <OficialCard key={m.cargo} {...m} delay={(i % 3) + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jud-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="jud-divider" style={{ margin: '0 auto 28px' }} />
          <p className="jud-cta-eyebrow">Ad Gloriam et Honorem</p>
          <h3 className="jud-cta-title">A lei que nos une, a tradição que nos sustenta.</h3>
          <p className="jud-cta-text">
            O Legislativo da GLOMAM representa a voz viva da Ordem — palavra ponderada,
            decisão fraterna, continuidade de mais de um século de trabalho maçônico.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
