import React, { useState, useRef } from 'react';

const faqItems = [
  {
    q: 'O que é preciso para tornar-se um maçom?',
    a: 'Ser homem; crer em Deus; ser maior de idade e alfabetizado; estar consciente de seus deveres para com a Pátria, seus semelhantes e consigo mesmo; ter profissão ou ocupação lícita e honrada, capaz de suprir suas necessidades e de sua família, além das obras maçônicas; ser bem recomendado e estar bem intencionado quanto ao propósito de ingresso.',
  },
  {
    q: 'Por que tornar-se maçom?',
    a: 'O mundo em que vivemos oferece uma educação funcionalista, para atender demandas da sociedade. Mas muitos entre nós acreditam que a sociedade necessita também, mais do que nunca, de mais ética, mais princípios, mais valores, mais retidão. Na Maçonaria, você encontra esses ensinamentos, por séculos preservados, que colaboram para que você construa uma vida melhor para você, sua família e comunidade — sem descartar a diversão e a caridade. O benefício de ser maçom é o do aprendizado e da convivência fraterna com outros homens de bem. Se você busca benefício financeiro, profissional ou material, a Maçonaria não proporciona isso. Ao contrário, ela oferece muitas oportunidades de servir ao próximo, com muito trabalho voluntário a ser feito.',
  },
  {
    q: 'Quanto custa para ser maçom?',
    a: 'Isso varia de loja para loja, mas estima-se que, após o ingresso, a manutenção mensal fique entre 10% a 20% do salário mínimo, em média. Esse recurso serve para arcar com despesas de alimentação ao final das reuniões, manutenção da Loja, custos prediais e taxas para a Grande Loja, dentre outras destinações. Além disso, ao ingressar você assume o compromisso de frequentar as reuniões, cuja periodicidade é geralmente semanal. Contudo, a Maçonaria ensina que esses compromissos vêm depois dos familiares e profissionais, nunca antes.',
  },
  {
    q: 'O que a Maçonaria exige do Maçom?',
    a: 'Além da crença em um Ser Supremo e de ser livre e de bons costumes, a Maçonaria exige o mesmo que qualquer outra instituição democrática e legal: respeito aos seus estatutos, regulamentos e acatamento às resoluções da maioria — amor à Pátria; respeito aos governos legalmente constituídos; acatamento às leis do país em que viva. Exige ainda, particularmente: a guarda do sigilo dos rituais maçônicos; conduta correta e digna dentro e fora da Maçonaria; a dedicação de parte do seu tempo para assistir às reuniões; e a prática da moral, da igualdade, da solidariedade humana e da justiça em toda a sua plenitude.',
  },
  {
    q: 'Quais os cuidados antes de ingressar na Maçonaria?',
    a: 'Infelizmente, há golpistas que abusam do comportamento discreto da Maçonaria e criam instituições que se dizem maçônicas com o fim exclusivo de angariar dinheiro, muitas vezes relacionando a Ordem com Illuminati ou com um balcão de negócios, prometendo prosperidade financeira. Por isso, ao ser abordado ou convidado, verifique se a Loja está vinculada a uma Grande Loja da CMSB e, caso não esteja, a um Grande Oriente da COMAB ou do GOB — as três únicas vertentes maçônicas brasileiras com extenso reconhecimento internacional, com as quais nos relacionamos. Ressalte-se que todo ingresso na Maçonaria regular brasileira é feito presencialmente: não existem iniciações online, por telefone, correspondência ou similares.',
  },
  {
    q: 'Como posso me tornar maçom?',
    a: 'Caso você: (1) seja emancipado e tenha 21 anos ou mais; (2) se casado ou em união estável, tenha a concordância da esposa ou companheira; (3) seja um homem íntegro de caráter e de reputação ilibada, ligado e atualizado ao seu tempo; (4) seja capaz de assumir compromissos com responsabilidade; (5) esteja vivendo há pelo menos 2 anos no atual município onde reside; (6) tenha emprego ou meios de sustento próprio e exerça sua profissão de forma lícita; (7) tenha tempo livre e recursos disponíveis para participar de reuniões maçônicas e colaborar com as obras — então você reúne os requisitos básicos para manifestar seu interesse.',
  },
];

const MAX_MOTIVACAO = 600;
const FORM_NAME = 'iniciacao-macom';

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

export default function Iniciacao() {
  const [active, setActive] = useState(null);
  const answerRefs = useRef([]);

  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    'midia-social': '',
    motivacao: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const toggle = (i) => setActive((prev) => (prev === i ? null : i));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim() || !form.motivacao.trim()) {
      setError('Por favor, preencha ao menos nome, telefone e o motivo do seu interesse.');
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
      })
      .catch(() => {
        setStatus('error');
        setError('Não foi possível enviar agora. Tente novamente em instantes.');
      });
  };

  return (
    <section id="iniciacao">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>O Caminho da Iniciação</div>
          <h2>Como se tornar um Maçom</h2>
          <div className="divider" style={{ margin: '16px auto 0' }}></div>
        </div>

        <div className="ini-grid">
          {/* FAQ exclusiva */}
          <div className="ini-faq reveal">
            {faqItems.map((item, i) => (
              <div className={`ini-faq-item${active === i ? ' active' : ''}`} key={i}>
                <button
                  type="button"
                  className="ini-faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={active === i}
                >
                  <span>{item.q}</span>
                  <div className="ini-faq-icon">{active === i ? '−' : '+'}</div>
                </button>
                <div
                  className="ini-faq-a"
                  style={{ maxHeight: active === i ? `${answerRefs.current[i]?.scrollHeight || 0}px` : 0 }}
                >
                  <p ref={(el) => (answerRefs.current[i] = el)} className="ini-faq-a-inner">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulário — Declaração de Interesse */}
          <div className="ini-form-col reveal reveal-d1">
            <div className="ini-form-card">
              <div className="ini-form-head">
                <div className="section-label" style={{ justifyContent: 'flex-start' }}>Declaração de Interesse</div>
                <h3 className="ini-form-title">Como se tornar um Maçom</h3>
              </div>

              <div className="ini-important">
                <strong>⚠ Importante:</strong> caso se identifique com os princípios, lema, objetivos e
                funcionamento da Maçonaria e com os requisitos básicos descritos ao lado, preencha a
                Declaração de Interesse — ciente de que o simples preenchimento <em>não</em> é garantia de
                ingresso na sublime Ordem. Aguarde um contato posterior da nossa Grande Loja.
              </div>

              {status === 'success' ? (
                <div className="ini-success">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12 11 15 16 9" />
                  </svg>
                  <h4>Declaração recebida</h4>
                  <p>Obrigado pelo seu interesse. Sua manifestação foi enviada à Grande Loja. Em breve entraremos em contato.</p>
                </div>
              ) : (
                <form
                  className="ini-form"
                  name={FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  <p className="ini-hp" hidden>
                    <label>Não preencha: <input name="bot-field" /></label>
                  </p>

                  <label className="ini-field">
                    <span>Nome completo *</span>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange} autoComplete="name" />
                  </label>

                  <label className="ini-field">
                    <span>Endereço</span>
                    <input type="text" name="endereco" value={form.endereco} onChange={handleChange} autoComplete="street-address" />
                  </label>

                  <div className="ini-field-row">
                    <label className="ini-field">
                      <span>Telefone *</span>
                      <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} autoComplete="tel" placeholder="(92) 90000-0000" />
                    </label>
                    <label className="ini-field">
                      <span>Mídia social</span>
                      <input type="text" name="midia-social" value={form['midia-social']} onChange={handleChange} placeholder="@seu_perfil" />
                    </label>
                  </div>

                  <label className="ini-field">
                    <span>Por que deseja se tornar um Maçom? *</span>
                    <textarea
                      name="motivacao"
                      value={form.motivacao}
                      onChange={handleChange}
                      rows={5}
                      maxLength={MAX_MOTIVACAO}
                    />
                    <span className="ini-counter">{form.motivacao.length}/{MAX_MOTIVACAO}</span>
                  </label>

                  {error && <p className="ini-error">{error}</p>}

                  <button className="ini-submit" type="submit" disabled={status === 'sending'}>
                    <span>{status === 'sending' ? 'Enviando…' : 'Enviar Declaração'}</span>
                  </button>
                  <p className="ini-privacy">Seus dados são enviados em sigilo à Grande Loja Maçônica do Amazonas.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
