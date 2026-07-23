// src/pages/Revistas.jsx
// Rota /revistas — acervo de revistas e jornais da GLOMAM (PDFs), migrado do site antigo.
import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import { revistas } from '../data/revistas.js';

function RevistaCard({ r }) {
  const disponivel = !!r.pdfUrl; // tem PDF E base configurada
  const semPdfOrigem = !r.pdfFile; // não existe PDF na origem

  const Capa = (
    <div className="rev-card-capa" style={{ backgroundImage: `url(${r.capa})` }}>
      {disponivel && (
        <span className="rev-card-badge" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
        </span>
      )}
    </div>
  );

  return (
    <div className="rev-card reveal">
      {disponivel ? (
        <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="rev-card-link" aria-label={`Abrir revista ${r.titulo}`}>
          {Capa}
        </a>
      ) : (
        Capa
      )}
      <div className="rev-card-body">
        <span className="rev-card-data">{r.data}</span>
        <h3 className="rev-card-titulo">{r.titulo}</h3>
        {disponivel ? (
          <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer" className="rev-card-btn">
            Baixar PDF
          </a>
        ) : (
          <span className={`rev-card-btn rev-card-btn--off`}>
            {semPdfOrigem ? 'Indisponível' : 'Em breve'}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Revistas() {
  useReveal();
  const comPdf = revistas.filter((r) => r.pdfFile).length;

  return (
    <>
      <Header />
      <main className="inst-page rev-page">
        <div className="inst-page-top" />
        <section className="inst-page-hero reveal">
          <div className="section-inner">
            <div className="section-label">Institucional</div>
            <h1 className="inst-page-title">Revistas e Jornais</h1>
            <div className="divider" />
            <p className="inst-page-intro">
              O acervo editorial da Grande Loja Maçônica do Amazonas — a revista <em>Arte Real</em>,
              o Folhetim <em>O Balaústre</em> e edições comemorativas. Memória impressa da Ordem,
              disponível para leitura e download.
            </p>
          </div>
        </section>

        <section className="rev-list">
          <div className="section-inner">
            <div className="rev-grid">
              {revistas.map((r) => <RevistaCard key={r.id} r={r} />)}
            </div>
            <p className="rev-rodape">{comPdf} edições disponíveis · acervo histórico desde 2008</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
