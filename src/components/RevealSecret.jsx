// src/components/RevealSecret.jsx
// Revela uma credencial cifrada (AES-256-GCM + PBKDF2) mediante senha, 100% no navegador.
// O texto cifrado é público (inútil sem a senha); a senha é compartilhada por canal seguro.
import React, { useState } from 'react';

const b64ToBuf = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function decryptBlob(blob, pass) {
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64ToBuf(blob.salt), iterations: blob.it, hash: blob.hash },
    km,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64ToBuf(blob.iv) }, key, b64ToBuf(blob.ct));
  return new TextDecoder().decode(pt);
}

export default function RevealSecret({ blob }) {
  const [pass, setPass] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  async function revelar(e) {
    e.preventDefault();
    if (!pass) return;
    setErro('');
    setLoading(true);
    try {
      setValor(await decryptBlob(blob, pass));
    } catch {
      setErro('Senha incorreta.');
      setValor('');
    } finally {
      setLoading(false);
    }
  }

  function copiar() {
    navigator.clipboard?.writeText(valor).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    });
  }

  function ocultar() {
    setValor('');
    setPass('');
    setErro('');
  }

  if (valor) {
    return (
      <div className="bb-reveal bb-reveal--open">
        <code className="bb-reveal-val">{valor}</code>
        <div className="bb-reveal-actions">
          <button type="button" className="bb-reveal-btn" onClick={copiar}>{copiado ? '✓ Copiado' : 'Copiar'}</button>
          <button type="button" className="bb-reveal-btn bb-reveal-btn--ghost" onClick={ocultar}>Ocultar</button>
        </div>
      </div>
    );
  }

  return (
    <form className="bb-reveal" onSubmit={revelar}>
      <input
        type="password"
        className="bb-reveal-input"
        placeholder="Senha de acesso"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      <button type="submit" className="bb-reveal-btn" disabled={loading || !pass}>
        {loading ? '…' : 'Revelar'}
      </button>
      {erro && <span className="bb-reveal-erro">{erro}</span>}
    </form>
  );
}
