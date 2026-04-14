import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { findPhoto } from '../data/photoDirectory.js';

const procurador = { cargo: 'Procurador de Justiça', nome: 'Carlos Alexandre Baracho Valente' };
const subProcurador = { cargo: 'Sub Procurador de Justiça', nome: 'Euler Carlos de Souza Cordeiro' };
const corregedor = { cargo: 'Juiz Corregedor', nome: 'Leonardo Marques Bentes da Cunha' };

const juizes = [
  { nome: 'Jocione dos Santos Souza Júnior' },
  { nome: 'Eduardo Akira Sakita' },
  { nome: 'André de Souza Oliveira' },
  { nome: 'Adilson Dantas Maciel' },
  { nome: 'José Manoel Biatto de Menezes' },
  { nome: 'Fábio Lopes Alfaia' },
  { nome: 'Renato de Souza Pinto' },
  { nome: 'Imbergman Maia Litaiff' },
];

const secretario = { cargo: 'Grande Secretário do Judiciário', nome: 'Eduardo Freitas Moraes' };

function Initials({ nome }) {
  const parts = nome.split(' ').filter(Boolean);
  const init = ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase();
  return <span className="jud-initials">{init}</span>;
}

function MagistradoCard({ cargo, nome, destaque, delay }) {
  const resolvedFoto = findPhoto(nome);
  const cls = [
    'jud-card',
    destaque ? 'jud-card--destaque' : '',
    delay ? `reveal-d${delay}` : '',
    'reveal',
  ].filter(Boolean).join(' ');
  return (
    <article className={cls}>
      <div className="jud-card-photo">
        {resolvedFoto ? (
          <img src={resolvedFoto} alt={nome} loading="lazy" />
        ) : (
          <div className="jud-card-nophoto">
            <Initials nome={nome} />
            <span className="jud-card-nophoto-label">Sem Foto</span>
          </div>
        )}
        <div className="jud-card-photo-overlay" />
      </div>
      {cargo && <div className="jud-card-cargo">{cargo}</div>}
      <h3 className="jud-card-nome">{nome}</h3>
      <div className="jud-card-divider" />
    </article>
  );
}

export default function Judiciario() {
  useReveal();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="jud-hero">
        <div className="jud-hero-bg" aria-hidden="true" />
        <div className="section-inner jud-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Administração</div>
            <h1 className="jud-hero-title">Judiciário</h1>
            <div className="jud-divider" style={{ margin: '24px auto 28px' }} />
            <p className="jud-hero-sub">
              O Judiciário Maçônico da GLOMAM zela pela observância fiel do Direito Maçônico,
              preservando a regularidade da Ordem e a justiça entre os Irmãos. Compõe-se do
              Ministério Público, da Corregedoria e dos Juízes que guardam os ritos e decisões.
            </p>
          </div>
        </div>
      </section>

      {/* Ministério Público */}
      <section className="jud-bloco">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Ministério Público</div>
            <h2 className="jud-bloco-titulo">Procuradoria de Justiça</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Vozes da Ordem na defesa da regularidade e da observância estrita da Constituição Maçônica.
            </p>
          </div>
          <div className="jud-destaque-grid">
            <MagistradoCard cargo={procurador.cargo} nome={procurador.nome} destaque delay={1} />
            <MagistradoCard cargo={subProcurador.cargo} nome={subProcurador.nome} destaque delay={2} />
          </div>
        </div>
      </section>

      {/* Corregedoria */}
      <section className="jud-bloco jud-bloco--alt">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Corregedoria</div>
            <h2 className="jud-bloco-titulo">Juiz Corregedor</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Sentinela da disciplina e da fidelidade aos rituais — vela pela coerência entre a letra e o espírito da Lei Maçônica.
            </p>
          </div>
          <div className="jud-corregedor-wrap">
            <MagistradoCard cargo={corregedor.cargo} nome={corregedor.nome} destaque delay={1} />
          </div>
        </div>
      </section>

      {/* Juízes */}
      <section className="jud-bloco">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Colegiado</div>
            <h2 className="jud-bloco-titulo">Juízes do Judiciário</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Guardiões do equilíbrio — interpretam a Lei, julgam com prudência e preservam a harmonia entre as Lojas.
            </p>
          </div>
          <div className="jud-juizes-grid">
            {juizes.map((j, i) => (
              <MagistradoCard
                key={j.nome}
                cargo="Juiz"
                nome={j.nome}
                delay={(i % 3) + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Secretaria */}
      <section className="jud-bloco jud-bloco--alt">
        <div className="section-inner">
          <div className="jud-bloco-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Secretaria</div>
            <h2 className="jud-bloco-titulo">Grande Secretário do Judiciário</h2>
            <div className="jud-divider" style={{ margin: '18px auto 18px' }} />
            <p className="jud-bloco-epigrafe">
              Escriba da Justiça — registra, guarda e assegura a memória viva de todas as decisões do Judiciário.
            </p>
          </div>
          <div className="jud-corregedor-wrap">
            <MagistradoCard cargo={secretario.cargo} nome={secretario.nome} destaque delay={1} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jud-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="jud-divider" style={{ margin: '0 auto 28px' }} />
          <p className="jud-cta-eyebrow">Ad Gloriam et Honorem</p>
          <h3 className="jud-cta-title">Justiça, regularidade e fraternidade.</h3>
          <p className="jud-cta-text">
            O Judiciário da GLOMAM atua em silêncio — com a firmeza do esquadro e a precisão do compasso —
            para que a Ordem permaneça fiel aos seus princípios centenários.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
