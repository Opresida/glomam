import React from 'react';

export default function Oriente() {
  return (
    <section id="oriente">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">Oriente de Manaus</div>
          <h2>Sede &amp; Localização</h2>
          <div className="divider"></div>
        </div>
        <div className="contact-grid">
          <div className="reveal">
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <div>
                <div className="contact-label">Endereço</div>
                <div className="contact-val">Av. Prof. Nilton Lins, 1655<br />Flores — CEP 69.058-030<br />Manaus, Amazonas — Brasil</div>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              <div>
                <div className="contact-label">E-mail</div>
                <div className="contact-val">secretaria@glomam.org.br</div>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              <div>
                <div className="contact-label">Registro</div>
                <div className="contact-val">CNPJ: 04.405.007/0001-44</div>
              </div>
            </div>
            <div style={{ marginTop: '32px' }}>
              <a href="https://wa.me/5592999999999" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-block' }}><span>Entrar em Contacto</span></a>
            </div>
          </div>
          <div className="map-wrap reveal reveal-d1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.1157929457223!2d-60.0185!3d-3.0645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c1967277a0631%3A0xc07a8264584b80b7!2sAv.%20Prof.%20Nilton%20Lins%2C%201655%20-%20Flores%2C%20Manaus%20-%20AM!5e0!3m2!1spt-BR!2sbr!4v1715000000000"
              allowFullScreen=""
              loading="lazy"
              title="Localização GLOMAM"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
