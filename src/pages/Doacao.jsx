import React, { useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppBtn from '../components/WhatsAppBtn.jsx';
import useReveal from '../hooks/useReveal.js';
import { currencies, formatAmount, createDonation } from '../services/donationAPI.js';

export default function Doacao() {
  useReveal();
  const { currency } = useParams();
  const config = currencies[currency];

  if (!config) return <Navigate to="/" replace />;

  const [amount, setAmount] = useState(config.presets[1]);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document_, setDocument] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { ok, paymentUrl? | error? }

  const finalAmount = useMemo(() => {
    const num = Number(custom || amount);
    return isNaN(num) ? 0 : num;
  }, [amount, custom]);

  const canSubmit = finalAmount > 0 && name.trim() && email.includes('@') && !loading;

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await createDonation(currency, {
        amount: finalAmount,
        name: name.trim(),
        email: email.trim(),
        document: document_.trim(),
        message: message.trim(),
      });
      setResult(res);
      if (res.ok && res.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (err) {
      setResult({ ok: false, error: err.message || 'Erro inesperado' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <section className="doa-hero">
        <div className="doa-hero-bg" aria-hidden="true" />
        <div className="section-inner doa-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Doação em {config.label}
            </div>
            <h1 className="doa-hero-title">
              Sua doação <span className="gold">{config.flag} em {config.code}</span><br/>mantém a luz acesa.
            </h1>
            <div className="jud-divider" style={{ margin: '24px auto 28px' }} />
            <p className="doa-hero-sub">
              Cada contribuição financia diretamente o Dispensário Maçônico, programas de saúde,
              amparo às famílias e as ações filantrópicas sustentadas pela GLOMAM há mais de um século.
            </p>
          </div>
        </div>
      </section>

      <section className="doa-form-section">
        <div className="section-inner">
          <div className="doa-wrap reveal">
            <form className="doa-form" onSubmit={onSubmit} noValidate>
              {/* Valor */}
              <div className="doa-group">
                <label className="doa-label">Valor da Doação ({config.code})</label>
                <div className="doa-presets">
                  {config.presets.map(v => (
                    <button
                      key={v}
                      type="button"
                      className={`doa-preset${!custom && amount === v ? ' active' : ''}`}
                      onClick={() => { setAmount(v); setCustom(''); }}
                    >
                      {formatAmount(currency, v)}
                    </button>
                  ))}
                </div>
                <div className="doa-custom">
                  <span className="doa-custom-prefix">{config.symbol}</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="Outro valor"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                  />
                </div>
              </div>

              {/* Dados do doador */}
              <div className="doa-group">
                <label className="doa-label" htmlFor="doa-nome">Nome Completo</label>
                <input
                  id="doa-nome"
                  type="text"
                  required
                  placeholder="Como devemos registrar seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="doa-row">
                <div className="doa-group">
                  <label className="doa-label" htmlFor="doa-email">E-mail</label>
                  <input
                    id="doa-email"
                    type="email"
                    required
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="doa-group">
                  <label className="doa-label" htmlFor="doa-doc">
                    {currency === 'brl' ? 'CPF / CNPJ (opcional)' : 'Document ID (opcional)'}
                  </label>
                  <input
                    id="doa-doc"
                    type="text"
                    placeholder={currency === 'brl' ? '000.000.000-00' : 'Optional'}
                    value={document_}
                    onChange={(e) => setDocument(e.target.value)}
                  />
                </div>
              </div>

              <div className="doa-group">
                <label className="doa-label" htmlFor="doa-msg">Mensagem (opcional)</label>
                <textarea
                  id="doa-msg"
                  rows="3"
                  placeholder="Uma palavra fraterna, uma intenção, uma dedicatória..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Resumo */}
              <div className="doa-resumo">
                <div>
                  <span className="doa-resumo-label">Total da doação</span>
                  <span className="doa-resumo-valor">{formatAmount(currency, finalAmount)}</span>
                </div>
                <button type="submit" className="btn-primary" disabled={!canSubmit}>
                  <span>{loading ? 'Processando…' : 'Confirmar Doação'}</span>
                </button>
              </div>

              {result && !result.ok && (
                <div className="doa-alert doa-alert--warn">
                  <strong>Pagamento em breve.</strong><br/>
                  {result.error}
                </div>
              )}
            </form>

            {/* Sidebar — confiança + contato */}
            <aside className="doa-aside">
              <div className="doa-aside-card">
                <h4>Onde sua doação chega</h4>
                <ul>
                  <li>Dispensário Maçônico — saúde aos Obreiros e Dependentes</li>
                  <li>Campanhas sociais da Grande Loja</li>
                  <li>Manutenção do Palácio Maçônico</li>
                  <li>Apoio a famílias em vulnerabilidade</li>
                </ul>
              </div>
              <div className="doa-aside-card">
                <h4>Pagamento em {config.code}</h4>
                <p className="doa-aside-hint">{config.gatewayHint}</p>
                <p className="doa-aside-small">
                  Processado em ambiente seguro. Após confirmação, você receberá um recibo por e-mail.
                </p>
              </div>
              <div className="doa-aside-card">
                <h4>Prefere outra moeda?</h4>
                <div className="doa-switch">
                  {Object.entries(currencies)
                    .filter(([k]) => k !== currency)
                    .map(([k, c]) => (
                      <Link key={k} to={`/doar/${k}`} className="doa-switch-link">
                        <span>{c.flag}</span> Doar em {c.code}
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />
    </>
  );
}
