/**
 * Camada de abstração para doações em múltiplas moedas.
 *
 * ⚠️ Implementação atual é um STUB — não processa pagamentos reais.
 *    Integre com um provider real substituindo a função createDonation:
 *
 *    - BRL → Mercado Pago / Asaas / Pagar.me (PIX + cartão nacional)
 *    - EUR / USD → Stripe / PayPal (cartão internacional)
 *
 * Ao integrar:
 *   1. Mova chaves sensíveis para variáveis de ambiente (import.meta.env.VITE_*).
 *   2. Faça a cobrança via endpoint backend — NUNCA exponha secret keys no frontend.
 *   3. Retorne { ok: true, paymentUrl } para redirecionar o doador para o gateway.
 */

/* ── Config de moedas disponíveis ──────────────────────────────────── */

export const currencies = {
  brl: {
    code: 'BRL',
    symbol: 'R$',
    label: 'Real Brasileiro',
    flag: '🇧🇷',
    locale: 'pt-BR',
    presets: [50, 100, 250, 500, 1000],
    gatewayHint: 'PIX, boleto ou cartão brasileiro',
    provider: 'mercadopago', // ou 'asaas', 'pagarme', 'stripe-br'
  },
  eur: {
    code: 'EUR',
    symbol: '€',
    label: 'Euro',
    flag: '🇪🇺',
    locale: 'pt-PT',
    presets: [20, 50, 100, 200, 500],
    gatewayHint: 'SEPA, cartão internacional',
    provider: 'stripe',
  },
  usd: {
    code: 'USD',
    symbol: '$',
    label: 'US Dollar',
    flag: '🇺🇸',
    locale: 'en-US',
    presets: [20, 50, 100, 200, 500],
    gatewayHint: 'International card, ACH',
    provider: 'stripe',
  },
};

export function formatAmount(currencyKey, amount) {
  const c = currencies[currencyKey];
  if (!c) return `${amount}`;
  try {
    return new Intl.NumberFormat(c.locale, { style: 'currency', currency: c.code }).format(amount);
  } catch {
    return `${c.symbol} ${amount}`;
  }
}

/* ── Stub de envio ─────────────────────────────────────────────────── */

/**
 * Envia uma doação ao backend.
 *
 * @param {('brl'|'eur'|'usd')} currencyKey
 * @param {{
 *   amount: number,
 *   name: string,
 *   email: string,
 *   document?: string,
 *   message?: string
 * }} payload
 * @returns {Promise<{ ok: boolean, paymentUrl?: string, error?: string }>}
 */
export async function createDonation(currencyKey, payload) {
  const currency = currencies[currencyKey];
  if (!currency) {
    return { ok: false, error: `Moeda não suportada: ${currencyKey}` };
  }

  // ┌─ INTEGRAÇÃO REAL (exemplo) ───────────────────────────────────┐
  // │ const res = await fetch('/api/donations', {                   │
  // │   method: 'POST',                                             │
  // │   headers: { 'Content-Type': 'application/json' },            │
  // │   body: JSON.stringify({ currency: currency.code, ...payload })│
  // │ });                                                           │
  // │ if (!res.ok) return { ok: false, error: 'Falha no servidor' };│
  // │ const data = await res.json();                                │
  // │ return { ok: true, paymentUrl: data.checkoutUrl };            │
  // └───────────────────────────────────────────────────────────────┘

  // Stub — simula latência e devolve erro controlado
  await new Promise(r => setTimeout(r, 900));
  return {
    ok: false,
    error: 'Integração de pagamento ainda não configurada. Entre em contato pelo WhatsApp ou e-mail do Dispensário para realizar sua doação.',
  };
}
