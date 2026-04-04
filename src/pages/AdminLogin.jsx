import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [recuperar, setRecuperar] = useState(false);
  const [recuperarEmail, setRecuperarEmail] = useState('');
  const [recuperarEnviado, setRecuperarEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/intranet');
  };

  const handleRecuperar = (e) => {
    e.preventDefault();
    if (recuperarEmail.trim()) setRecuperarEnviado(true);
  };

  return (
    <>
      <Header />
      <main className="admin-login-page">
        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="admin-login-logo-wrap">
              <img
                src="https://i.imgur.com/2Lwr0pd.png"
                alt="GLOMAM"
                className="admin-login-logo"
              />
            </div>

            {!recuperar ? (
              <>
                <h1 className="admin-login-title">Acesso Restrito</h1>
                <p className="admin-login-subtitle">Grande Loja Maçônica do Amazonas</p>
                <form className="admin-login-form" onSubmit={handleSubmit}>
                  <div className="admin-login-field">
                    <label htmlFor="admin-email" className="admin-login-label">E-mail</label>
                    <input
                      id="admin-email"
                      type="email"
                      required
                      className="admin-login-input"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="admin-login-field">
                    <label htmlFor="admin-senha" className="admin-login-label">Senha</label>
                    <input
                      id="admin-senha"
                      type="password"
                      required
                      className="admin-login-input"
                      placeholder="••••••••"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <button type="submit" className="admin-login-btn">
                    Entrar
                  </button>
                </form>
                <button
                  type="button"
                  className="admin-login-forgot"
                  onClick={() => setRecuperar(true)}
                >
                  Esqueci minha senha
                </button>
              </>
            ) : (
              <>
                <h2 className="admin-login-title">Recuperar Senha</h2>
                <p className="admin-login-subtitle">
                  {recuperarEnviado
                    ? 'Verifique seu e-mail para prosseguir.'
                    : 'Informe seu e-mail e enviaremos as instruções.'}
                </p>
                {!recuperarEnviado ? (
                  <form className="admin-login-form" onSubmit={handleRecuperar}>
                    <div className="admin-login-field">
                      <label htmlFor="recuperar-email" className="admin-login-label">E-mail</label>
                      <input
                        id="recuperar-email"
                        type="email"
                        required
                        className="admin-login-input"
                        placeholder="seu@email.com"
                        value={recuperarEmail}
                        onChange={e => setRecuperarEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    <button type="submit" className="admin-login-btn">
                      Enviar instruções
                    </button>
                  </form>
                ) : (
                  <div className="admin-login-success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Instruções enviadas para <strong>{recuperarEmail}</strong>
                  </div>
                )}
                <button
                  type="button"
                  className="admin-login-forgot"
                  onClick={() => { setRecuperar(false); setRecuperarEnviado(false); setRecuperarEmail(''); }}
                >
                  ← Voltar ao login
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
