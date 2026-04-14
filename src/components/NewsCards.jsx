import React from 'react';
import { Link } from 'react-router-dom';
import { noticias } from '../data/noticias.js';

const featured = noticias.filter(n => n.destaque).slice(0, 3);
const displayItems = featured.length >= 3 ? featured : noticias.slice(0, 3);

function formatDate(dateStr) {
  const monthMap = {
    'Jan':'JAN','Fev':'FEV','Mar':'MAR','Abr':'ABR','Mai':'MAI','Jun':'JUN',
    'Jul':'JUL','Ago':'AGO','Set':'SET','Out':'OUT','Nov':'NOV','Dez':'DEZ'
  };
  // Format: "28 Mar 2026"
  const parts = dateStr.split(' ');
  if (parts.length >= 2) {
    return { day: parts[0], month: monthMap[parts[1]] || parts[1].toUpperCase().slice(0,3) };
  }
  return { day: '--', month: '---' };
}

export default function NewsCards() {
  return (
    <section id="noticias" className="news-section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Novidades</div>
          <h2>Últimas Notícias</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>
        <div className="news-grid reveal">
          {displayItems.map((item) => {
            const { day, month } = formatDate(item.data);
            return (
              <div className="news-card" key={item.id}>
                <div className="news-card-img" style={{ backgroundImage: `url(${item.imagem})` }}>
                  <div className="news-card-date">
                    <span className="ncd-day">{day}</span>
                    <span className="ncd-month">{month}</span>
                  </div>
                </div>
                <div className="news-card-body">
                  <span className="news-card-cat">{item.categoria}</span>
                  <h4 className="news-card-title">{item.titulo}</h4>
                  <p className="news-card-resumo">{item.resumo}</p>
                  <Link to="/imprensa" className="news-card-link">Leia Mais →</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="news-cta reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/imprensa" className="btn-primary"><span>Ver Todas as Notícias</span></Link>
        </div>
      </div>
    </section>
  );
}
