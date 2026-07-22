// src/pages/NoticiasInstitucionais.jsx
// Rota /noticiasinstitucionais — listagem completa do acervo institucional.
import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import InstCard from '../components/InstCard.jsx';
import useReveal from '../hooks/useReveal.js';
import { noticiasInstitucionais } from '../data/noticiasInstitucionais.js';

const PAGE = 24; // itens por lote

export default function NoticiasInstitucionais() {
  useReveal();
  const [visiveis, setVisiveis] = useState(PAGE);
  const total = noticiasInstitucionais.length;
  const lista = noticiasInstitucionais.slice(0, visiveis);

  return (
    <>
      <Header />
      <main className="inst-page">
        <div className="inst-page-top" />
        <section className="inst-page-hero reveal">
          <div className="section-inner">
            <div className="section-label">Institucional</div>
            <h1 className="inst-page-title">Notícias Institucionais</h1>
            <div className="divider" />
            <p className="inst-page-intro">
              O acervo de notícias, comunicados e acontecimentos da Grande Loja Maçônica do Amazonas.
              História viva da Ordem no Estado — evento a evento, Oriente a Oriente.
            </p>
          </div>
        </section>

        <section className="inst-page-list">
          <div className="section-inner">
            <div className="inst-grid">
              {lista.map((n) => <InstCard key={n.id} n={n} />)}
            </div>
            {visiveis < total && (
              <div className="inst-more-wrap">
                <button className="btn-primary" onClick={() => setVisiveis((v) => v + PAGE)}>
                  <span>Mostrar mais</span>
                </button>
                <p className="inst-more-count">{lista.length} de {total} notícias</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
