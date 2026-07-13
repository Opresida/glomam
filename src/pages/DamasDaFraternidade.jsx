import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import DamasLoader from '../components/DamasLoader.jsx';
import DamasConfirmacaoModal from '../components/DamasConfirmacaoModal.jsx';
import LetrasReveal from '../components/LetrasReveal.jsx';
import { evento, convite } from '../data/chaDasAcacias.js';
import { gerarPixPayload } from '../utils/pix.js';
import './DamasDaFraternidade.css';

const FORM_NAME = 'inscricao-cha-acacias';

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

const PIX_PAYLOAD = gerarPixPayload({
  chave: evento.pix.chave,
  nome: evento.pix.nomeRecebedor,
  cidade: evento.pix.cidade,
  valor: evento.passaporte.valor,
});

// Divisor ornamental em losangos, como o flyer.
function Losangos() {
  return (
    <div className="damas-losangos" aria-hidden="true">
      <span className="damas-losango-line" />
      <span className="damas-losango">◆</span>
      <span className="damas-losango">◆</span>
      <span className="damas-losango">◆</span>
      <span className="damas-losango-line" />
    </div>
  );
}

export default function DamasDaFraternidade() {
  useReveal();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    instagram: '',
    telefone: '',
    'e-acacia': '',
    oriente: '',
    loja: '',
    profissao: '',
    'primeira-dama': '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [pixCopiado, setPixCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim()) {
      setError('Por favor, preencha ao menos nome, e-mail e telefone.');
      return;
    }
    if (e.target['bot-field'] && e.target['bot-field'].value) return; // honeypot

    setStatus('sending');
    setError('');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': FORM_NAME, 'bot-field': '', ...form }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('network');
        setStatus('success');
        setModalAberto(true);
      })
      .catch(() => {
        setStatus('error');
        setError('Não foi possível enviar agora. Tente novamente em instantes.');
      });
  };

  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_PAYLOAD);
      setPixCopiado(true);
      setTimeout(() => setPixCopiado(false), 2500);
    } catch {
      setPixCopiado(false);
    }
  };

  return (
    <>
      <DamasLoader />
      <Header />

      <div className="damas-page">
        {/* ===== HERO ===== */}
        <section className="damas-hero">
          <div className="damas-hero-inner">
            <img className="damas-logo reveal" src="/damas-da-fraternidade.jpg" alt="Damas da Fraternidade" />
            <Losangos />
            <h1 className="damas-hero-titulo reveal">
              <LetrasReveal text={evento.titulo} />
            </h1>
            <div className="damas-hero-edicao reveal reveal-d1">{evento.edicao}</div>
            <div className="damas-divider-simples reveal reveal-d1" aria-hidden="true">◆</div>
            <p className="damas-hero-sub reveal reveal-d2">“{evento.subtitulo}”</p>
          </div>
        </section>

        {/* ===== DETALHES ===== */}
        <section className="damas-detalhes">
          <div className="damas-detalhes-grid">
            <div className="damas-card reveal">
              <div className="damas-card-label">Quando</div>
              <div className="damas-card-destaque">{evento.data.extenso}</div>
              <div className="damas-card-sub">{evento.data.diaSemana}</div>
              <div className="damas-card-sub">{evento.data.horario}</div>
            </div>
            <div className="damas-card reveal reveal-d1">
              <div className="damas-card-label">Onde</div>
              <div className="damas-card-destaque">{evento.local.nome}</div>
              <div className="damas-card-sub">{evento.local.condominio}</div>
              <div className="damas-card-sub">{evento.local.logradouro}</div>
              <div className="damas-card-sub">{evento.local.bairroCidade}</div>
              <a className="damas-card-link" href={evento.local.mapaUrl} target="_blank" rel="noreferrer">
                Ver no mapa →
              </a>
            </div>
            <div className="damas-card reveal reveal-d2">
              <div className="damas-card-label">Passaporte</div>
              <div className="damas-card-destaque damas-card-valor">{evento.passaporte.valorFormatado}</div>
              <div className="damas-card-sub">por participante</div>
            </div>
          </div>
        </section>

        {/* ===== CONVITE ===== */}
        <section className="damas-convite">
          <div className="damas-convite-inner reveal">
            <Losangos />
            <h2 className="damas-secao-titulo">
              <LetrasReveal text="Prezada Cunhada" />
            </h2>
            {convite.map((p, i) => (
              <p key={i} className="damas-convite-p">{p}</p>
            ))}
          </div>
        </section>

        {/* ===== INSCRIÇÃO ===== */}
        <section className="damas-inscricao" id="inscricao">
          <div className="damas-inscricao-inner">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <Losangos />
              <h2 className="damas-secao-titulo">
                <LetrasReveal text="Faça sua inscrição" />
              </h2>
              <p className="damas-secao-sub">
                Preencha seus dados para garantir sua presença no Chá das Acácias.
              </p>
            </div>

            {status === 'success' ? (
              <div className="damas-success reveal">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8 12 11 15 16 9" />
                </svg>
                <h3>Inscrição enviada!</h3>
                <p>
                  Recebemos seus dados. Agora conclua o pagamento via PIX e envie o comprovante pelo
                  WhatsApp para garantir sua vaga.
                </p>
                <button type="button" className="damas-btn" onClick={() => setModalAberto(true)}>
                  Ver próximos passos
                </button>
              </div>
            ) : (
              <form
                className="damas-form reveal reveal-d1"
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="damas-hp" hidden>
                  <label>Não preencha: <input name="bot-field" /></label>
                </p>

                <label className="damas-field">
                  <span>Nome completo *</span>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange} autoComplete="name" />
                </label>

                <div className="damas-field-row">
                  <label className="damas-field">
                    <span>E-mail *</span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" placeholder="voce@email.com" />
                  </label>
                  <label className="damas-field">
                    <span>Telefone / WhatsApp *</span>
                    <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} autoComplete="tel" placeholder="(92) 90000-0000" />
                  </label>
                </div>

                <div className="damas-field-row">
                  <label className="damas-field">
                    <span>Instagram</span>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} placeholder="@seu_perfil" />
                  </label>
                  <label className="damas-field">
                    <span>Profissão</span>
                    <input type="text" name="profissao" value={form.profissao} onChange={handleChange} />
                  </label>
                </div>

                <div className="damas-field-row">
                  <label className="damas-field">
                    <span>É Acácia?</span>
                    <select name="e-acacia" value={form['e-acacia']} onChange={handleChange}>
                      <option value="">Selecione</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                    </select>
                  </label>
                  <label className="damas-field">
                    <span>É ou já foi 1ª Dama?</span>
                    <select name="primeira-dama" value={form['primeira-dama']} onChange={handleChange}>
                      <option value="">Selecione</option>
                      <option value="Sou 1ª Dama">Sou 1ª Dama</option>
                      <option value="Já fui 1ª Dama">Já fui 1ª Dama</option>
                      <option value="Não">Não</option>
                    </select>
                  </label>
                </div>

                <div className="damas-field-row">
                  <label className="damas-field">
                    <span>Oriente</span>
                    <input type="text" name="oriente" value={form.oriente} onChange={handleChange} placeholder="Cidade / Oriente" />
                  </label>
                  <label className="damas-field">
                    <span>Qual a Loja</span>
                    <input type="text" name="loja" value={form.loja} onChange={handleChange} />
                  </label>
                </div>

                {error && <p className="damas-error">{error}</p>}

                <button className="damas-submit" type="submit" disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Enviando…' : 'Confirmar inscrição'}</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ===== PAGAMENTO PIX ===== */}
        <section className="damas-pix">
          <div className="damas-pix-inner reveal">
            <Losangos />
            <h2 className="damas-secao-titulo">
              <LetrasReveal text="Pagamento via PIX" />
            </h2>
            <p className="damas-secao-sub">
              Valor do passaporte: <strong>{evento.passaporte.valorFormatado}</strong>. Escaneie o QR
              Code ou copie a chave abaixo.
            </p>

            <div className="damas-pix-card">
              <div className="damas-pix-qr">
                <QRCodeSVG value={PIX_PAYLOAD} size={200} level="M" marginSize={2} />
              </div>
              <div className="damas-pix-info">
                <div className="damas-pix-label">Chave PIX (e-mail)</div>
                <div className="damas-pix-chave">{evento.pix.chave}</div>
                <button type="button" className="damas-btn damas-pix-copiar" onClick={copiarPix}>
                  {pixCopiado ? 'Copiado! ✓' : 'Copiar PIX copia e cola'}
                </button>
                <p className="damas-pix-hint">
                  Após o pagamento, envie o comprovante pelo WhatsApp para confirmarmos sua vaga.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <DamasConfirmacaoModal aberto={modalAberto} onClose={() => setModalAberto(false)} />
    </>
  );
}
