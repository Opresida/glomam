import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="newsletter">
      <div className="section-inner">
        <div className="newsletter-wrap reveal">
          <div className="newsletter-deco">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8">
              <polygon points="24,4 28,16 40,16 31,24 34,36 24,29 14,36 17,24 8,16 20,16" />
            </svg>
          </div>
          <div className="newsletter-content">
            <div className="section-label" style={{ justifyContent: 'center' }}>Fique Informado</div>
            <h2 className="newsletter-title">Receba Nossas Novidades</h2>
            <div className="divider" style={{ margin: '16px auto 0' }}></div>
            <p className="newsletter-desc">
              Inscreva-se para receber notícias, eventos e comunicados da Grande Loja Maçônica do Amazonas diretamente em seu e-mail.
            </p>
            {submitted ? (
              <div className="newsletter-success">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Obrigado! Sua inscrição foi realizada com sucesso.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                <input
                  className="newsletter-input"
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  aria-label="Endereço de e-mail"
                />
                <button className="newsletter-btn" type="submit">
                  <span>Inscrever-se</span>
                </button>
              </form>
            )}
            {error && <p className="newsletter-error">{error}</p>}
            {!submitted && (
              <p className="newsletter-privacy">Respeitamos sua privacidade. Sem spam, jamais.</p>
            )}
          </div>
          <div className="newsletter-deco newsletter-deco--right">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.8">
              <polygon points="24,4 28,16 40,16 31,24 34,36 24,29 14,36 17,24 8,16 20,16" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
