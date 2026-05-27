import React, { useState, useEffect, useRef } from 'react';
import Brandbook from '../pages/Brandbook.jsx';
import '../pages/Brandbook.css';

/**
 * Proteção client-side da rota /brandbook.
 *
 * IMPORTANTE: isso é "segurança contra acesso casual", não proteção real.
 * Os hashes ficam no bundle JS — quem abrir DevTools consegue ler o hash
 * (mas não a senha em si a menos que quebre o hash). Adequado para
 * brandbook/identidade visual; NÃO usar para dados pessoais ou financeiros.
 *
 * Como adicionar/trocar credenciais:
 *   1. No terminal:
 *        node -e "const c=require('crypto');console.log(c.createHash('sha256').update('USUARIO:SENHA').digest('hex'))"
 *   2. Copia o hash gerado
 *   3. Adiciona/substitui no array VALID_HASHES abaixo
 *
 * Credenciais ativas (não anotar a senha aqui — só o hash):
 *   - glomam : tradicao2026
 */
const VALID_HASHES = [
  '78eb50c2cac433995e7f4acccf8f70d3d421607bd152fccfefa4d84488900d77',
];

const STORAGE_KEY = 'glomam_brandbook_auth_v1';

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function BrandbookGate() {
  const [authed, setAuthed] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const usuarioRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'ok') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed && usuarioRef.current) usuarioRef.current.focus();
  }, [authed]);

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const hash = await sha256(`${usuario.trim()}:${senha}`);
      if (VALID_HASHES.includes(hash)) {
        sessionStorage.setItem(STORAGE_KEY, 'ok');
        setAuthed(true);
      } else {
        setErro('Usuário ou senha incorretos.');
        setSenha('');
      }
    } catch (e) {
      setErro(`Erro inesperado: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (authed) return <Brandbook />;

  return (
    <div className="bb-gate">
      <div className="bb-gate-deco" aria-hidden="true" />
      <div className="bb-gate-card">
        <div className="bb-gate-logo">
          <img src="/icon-512.png" alt="GLOMAM" width="80" height="80" />
        </div>
        <div className="bb-gate-head">
          <p className="bb-gate-label">Acesso Restrito</p>
          <h1 className="bb-gate-title">Brandbook GLOMAM</h1>
          <p className="bb-gate-desc">Esta área contém a identidade visual oficial, modelos institucionais e materiais de marca. Acesso autorizado apenas para colaboradores e fornecedores credenciados.</p>
        </div>
        <form className="bb-gate-form" onSubmit={handleLogin}>
          <label>
            <span>Usuário</span>
            <input
              ref={usuarioRef}
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          {erro && <div className="bb-gate-error">{erro}</div>}
          <button type="submit" className="btn-primary bb-gate-submit" disabled={loading}>
            <span>{loading ? 'Verificando…' : 'Entrar'}</span>
          </button>
        </form>
        <p className="bb-gate-help">Não tem acesso? Solicite suas credenciais pelo email <a href="mailto:glomam@glomam.org.br">glomam@glomam.org.br</a></p>
      </div>
    </div>
  );
}
