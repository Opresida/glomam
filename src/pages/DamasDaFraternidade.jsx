import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import DamasLoader from '../components/DamasLoader.jsx';
import LetrasReveal from '../components/LetrasReveal.jsx';
import { evento, convite } from '../data/chaDasAcacias.js';
import { gerarPixPayload } from '../utils/pix.js';
import './DamasDaFraternidade.css';

const FORM_NAME = 'inscricao-cha-acacias';

const AREAS = [
  'Serviço Social',
  'Medicina',
  'Psicologia / Psiquiatria',
  'Educação',
  'Eventos',
  'Outros',
];

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

// Links de rota para "Como chegar"
const ENDERECO = evento.local.enderecoCompleto;
const MAPAS = [
  { nome: 'Google Maps', cor: '#4285F4', url: evento.local.mapaUrl },
  { nome: 'Waze', cor: '#33CCFF', url: `https://waze.com/ul?q=${encodeURIComponent(ENDERECO)}&navigate=yes` },
  {
    nome: 'Uber',
    cor: '#111111',
    url: `https://m.uber.com/ul/?${new URLSearchParams({
      action: 'setPickup',
      pickup: 'my_location',
      'dropoff[formatted_address]': ENDERECO,
    }).toString()}`,
  },
];
const URL_COMPROVANTE = `https://wa.me/${evento.whatsapp.numeroComprovante}?text=${encodeURIComponent(
  'Olá! Acabei de me inscrever no Chá das Acácias e gostaria de enviar o comprovante do PIX.',
)}`;

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
    'data-nascimento': '',
    email: '',
    telefone: '',
    endereco: '',
    instagram: '',
    'voce-e': '',
    oriente: '',
    loja: '',
    profissao: '',
    'primeira-dama': '',
    'areas-outros': '',
  });
  const [areas, setAreas] = useState([]);
  const [etapa, setEtapa] = useState(1); // 1 | 2 (etapas do formulário)
  const [fase, setFase] = useState('form'); // form | pagamento | comprovante
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const toggleArea = (area) => {
    setAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]));
    if (error) setError('');
  };

  const irEtapa2 = () => {
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim()) {
      setError('Por favor, preencha nome, e-mail e telefone para continuar.');
      return;
    }
    setError('');
    setEtapa(2);
    window.scrollTo({ top: document.getElementById('inscricao')?.offsetTop - 80 || 0, behavior: 'smooth' });
  };

  const voltarEtapa1 = () => {
    setError('');
    setEtapa(1);
    window.scrollTo({ top: document.getElementById('inscricao')?.offsetTop - 80 || 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form['voce-e']) {
      setError('Conte pra gente: você é Acácia ou amiga das Acácias?');
      return;
    }
    if (e.target['bot-field'] && e.target['bot-field'].value) return; // honeypot

    setStatus('sending');
    setError('');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': FORM_NAME,
        'bot-field': '',
        ...form,
        'areas-interesse': areas.join(', '),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('network');
        setStatus('idle');
        setFase('pagamento');
        window.scrollTo({ top: document.getElementById('inscricao')?.offsetTop - 80 || 0, behavior: 'smooth' });
      })
      .catch(() => {
        setStatus('error');
        setError('Não foi possível enviar agora. Tente novamente em instantes.');
      });
  };

  const [pixCopiado, setPixCopiado] = useState(false);
  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_PAYLOAD);
      setPixCopiado(true);
      setTimeout(() => setPixCopiado(false), 2500);
    } catch {
      setPixCopiado(false);
    }
  };

  const confirmarPagamento = () => {
    setFase('comprovante');
    window.scrollTo({ top: document.getElementById('inscricao')?.offsetTop - 80 || 0, behavior: 'smooth' });
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

        {/* ===== FLUXO: inscrição → pagamento → comprovante ===== */}
        <section className="damas-inscricao" id="inscricao">
          <div className="damas-inscricao-inner">

            {/* ---- FASE FORMULÁRIO ---- */}
            {fase === 'form' && (
              <>
                <div className="reveal" style={{ textAlign: 'center' }}>
                  <Losangos />
                  <h2 className="damas-secao-titulo">
                    <LetrasReveal text="Faça sua inscrição" />
                  </h2>
                  <p className="damas-secao-sub">
                    Queremos lhe conhecer um pouquinho — e guardaremos seus dados em total sigilo. ‼️
                  </p>
                  <div className="damas-stepper" aria-hidden="true">
                    <span className={`damas-step-dot${etapa >= 1 ? ' on' : ''}`}>1</span>
                    <span className={`damas-step-bar${etapa >= 2 ? ' on' : ''}`} />
                    <span className={`damas-step-dot${etapa >= 2 ? ' on' : ''}`}>2</span>
                  </div>
                  <p className="damas-step-label">Etapa {etapa} de 2 — {etapa === 1 ? 'Seus dados' : 'Sobre você'}</p>
                </div>

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

                  {/* ETAPA 1 — dados pessoais */}
                  {etapa === 1 && (
                    <div className="damas-etapa">
                      <label className="damas-field">
                        <span>Nome do participante *</span>
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} autoComplete="name" />
                      </label>

                      <div className="damas-field-row">
                        <label className="damas-field">
                          <span>Data de nascimento</span>
                          <input type="date" name="data-nascimento" value={form['data-nascimento']} onChange={handleChange} />
                        </label>
                        <label className="damas-field">
                          <span>Telefone / WhatsApp *</span>
                          <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} autoComplete="tel" placeholder="(92) 90000-0000" />
                        </label>
                      </div>

                      <label className="damas-field">
                        <span>E-mail *</span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" placeholder="voce@email.com" />
                      </label>

                      <label className="damas-field">
                        <span>Endereço</span>
                        <input type="text" name="endereco" value={form.endereco} onChange={handleChange} autoComplete="street-address" />
                      </label>

                      <label className="damas-field">
                        <span>Instagram</span>
                        <input type="text" name="instagram" value={form.instagram} onChange={handleChange} placeholder="@seu_perfil" />
                      </label>

                      {error && <p className="damas-error">{error}</p>}

                      <div className="damas-form-nav">
                        <button type="button" className="damas-submit" onClick={irEtapa2}>
                          <span>Continuar →</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ETAPA 2 — sobre você + áreas */}
                  {etapa === 2 && (
                    <div className="damas-etapa">
                      <div className="damas-field">
                        <span className="damas-field-legend">Você é: *</span>
                        <div className="damas-radio-group">
                          {['Acácia', 'Amiga das Acácias'].map((op) => (
                            <label key={op} className={`damas-radio${form['voce-e'] === op ? ' on' : ''}`}>
                              <input type="radio" name="voce-e" value={op} checked={form['voce-e'] === op} onChange={handleChange} />
                              <span>{op}</span>
                            </label>
                          ))}
                        </div>
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

                      <div className="damas-field-row">
                        <label className="damas-field">
                          <span>Profissão</span>
                          <input type="text" name="profissao" value={form.profissao} onChange={handleChange} />
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

                      <div className="damas-field">
                        <span className="damas-field-legend">Em qual(is) área(s) você teria interesse em nos ajudar?</span>
                        <div className="damas-check-group">
                          {AREAS.map((area) => (
                            <label key={area} className={`damas-check${areas.includes(area) ? ' on' : ''}`}>
                              <input type="checkbox" checked={areas.includes(area)} onChange={() => toggleArea(area)} />
                              <span>{area}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {areas.includes('Outros') && (
                        <label className="damas-field">
                          <span>Qual(is) outra(s) área(s)?</span>
                          <input type="text" name="areas-outros" value={form['areas-outros']} onChange={handleChange} />
                        </label>
                      )}

                      {error && <p className="damas-error">{error}</p>}

                      <div className="damas-form-nav damas-form-nav--dupla">
                        <button type="button" className="damas-btn damas-btn-voltar" onClick={voltarEtapa1}>
                          ← Voltar
                        </button>
                        <button className="damas-submit" type="submit" disabled={status === 'sending'}>
                          <span>{status === 'sending' ? 'Enviando…' : 'Enviar inscrição'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}

            {/* ---- FASE PAGAMENTO ---- */}
            {fase === 'pagamento' && (
              <div className="damas-fase">
                <Losangos />
                <div className="damas-fase-check">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12 11 15 16 9" />
                  </svg>
                </div>
                <h2 className="damas-secao-titulo">Inscrição recebida!</h2>
                <p className="damas-secao-sub">
                  Agora conclua o pagamento do passaporte (<strong>{evento.passaporte.valorFormatado}</strong>) via
                  PIX. Escaneie o QR Code ou copie a chave abaixo.
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
                  </div>
                </div>

                <button type="button" className="damas-submit damas-fase-cta" onClick={confirmarPagamento}>
                  <span>Confirmo o pagamento</span>
                </button>
                <p className="damas-fase-hint">Clique acima após realizar o PIX para enviar seu comprovante.</p>
              </div>
            )}

            {/* ---- FASE COMPROVANTE ---- */}
            {fase === 'comprovante' && (
              <div className="damas-fase">
                <Losangos />
                <h2 className="damas-secao-titulo">Falta pouco, Cunhada!</h2>
                <p className="damas-secao-sub">
                  Para <strong>garantir sua vaga</strong>, envie o comprovante do PIX pelo WhatsApp. Será uma
                  alegria receber você no Chá das Acácias!
                </p>

                <div className="damas-fase-actions">
                  <a className="damas-fase-btn damas-fase-btn--wa" href={URL_COMPROVANTE} target="_blank" rel="noreferrer">
                    Enviar comprovante no WhatsApp
                  </a>
                  <a className="damas-fase-btn damas-fase-btn--group" href={evento.whatsapp.grupoUrl} target="_blank" rel="noreferrer">
                    Entrar no grupo do evento
                  </a>
                </div>

                <div className="damas-fase-sep"><span>Como chegar</span></div>
                <div className="damas-fase-local">
                  <strong>{evento.local.nome}</strong> — {evento.local.condominio}, {evento.local.logradouro} · {evento.local.bairroCidade}
                </div>
                <div className="damas-fase-maps">
                  {MAPAS.map((m) => (
                    <a key={m.nome} href={m.url} target="_blank" rel="noreferrer" className="damas-fase-map">
                      <span className="damas-fase-map-dot" style={{ background: m.cor }} />
                      {m.nome}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
