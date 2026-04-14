import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppBtn from '../components/WhatsAppBtn.jsx';
import useReveal from '../hooks/useReveal.js';
import { findPhoto } from '../data/photoDirectory.js';

export default function DispensarioQuemSomos() {
  useReveal();
  const tufiFoto = findPhoto('Tufi Salim Jorge Filho');

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="disp-hero">
        <div className="disp-hero-bg" aria-hidden="true" />
        <div className="section-inner disp-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Dispensário Maçônico · Quem Somos</div>
            <h1 className="disp-hero-title">Um atendimento justo<br/><em>é a razão de nosso trabalho.</em></h1>
            <div className="jud-divider" style={{ margin: '28px auto 28px' }} />
            <p className="disp-hero-sub">
              O Dispensário Maçônico da GLOMAM nasceu para informar, orientar e acompanhar
              Obreiros e seus Dependentes na correta utilização dos benefícios disponibilizados
              pela Ordem — com humanidade, transparência e fraternidade.
            </p>
          </div>
        </div>
      </section>

      {/* Carta de apresentação */}
      <section className="disp-carta">
        <div className="section-inner">
          <div className="disp-carta-wrap reveal">
            <p className="disp-saudacao">Prezados,</p>

            <p>
              É com grande satisfação que apresentamos o novo portal do <strong>Dispensário Maçônico</strong>,
              construído especialmente para informar e orientar os Obreiros e seus Dependentes na correta
              utilização dos benefícios disponibilizados.
            </p>

            <blockquote className="disp-citacao">
              <span className="disp-aspas" aria-hidden="true">“</span>
              Um atendimento justo e perfeito é a razão de nosso trabalho.
            </blockquote>

            <p>
              Com base nesta filosofia, a administração da GLOMAM está permanentemente em busca de benefícios
              que proporcionem uma real melhoria na qualidade de vida dos Obreiros e seus Dependentes.
            </p>

            <p>
              Na área de <strong>saúde</strong>, os Obreiros e seus Dependentes contam com o
              <strong> Hospital da Beneficente Portuguesa</strong>, que disponibiliza uma gama de serviços
              médicos, hospitalares e diagnósticos — com custos especiais, sem emissão de guias, sem
              burocracia, sem carência e sem limite de idade.
            </p>

            <div className="disp-info-grid">
              <div className="disp-info-card">
                <div className="disp-info-label">Quem pode utilizar</div>
                <p>
                  Obreiros e Dependentes <strong>cadastrados no sistema da GLOMAM</strong> e que estejam
                  regulares em suas Lojas e na Grande Loja.
                </p>
              </div>
              <div className="disp-info-card">
                <div className="disp-info-label">Como utilizar</div>
                <p>
                  Apresentação da <strong>Carteira do Obreiro</strong> ou do <strong>número do CIM</strong>
                  do titular. Dependentes devem apresentar documento que comprove sua identidade.
                </p>
              </div>
              <div className="disp-info-card">
                <div className="disp-info-label">Pagamento</div>
                <p>
                  À vista, diretamente ao Hospital, conforme <strong>tabela especial para a GLOMAM</strong>.
                </p>
              </div>
            </div>

            <p>
              Em caso de dúvida ou necessidade de melhores informações e orientação sobre a utilização dos
              serviços disponíveis, entre em contato pelos canais abaixo.
            </p>

            <div className="disp-contato">
              <div className="disp-contato-item">
                <div className="disp-contato-label">Telefone</div>
                <a href="tel:+559236220034" className="disp-contato-valor">(92) 3622-0034</a>
              </div>
              <div className="disp-contato-item">
                <div className="disp-contato-label">Horário</div>
                <p className="disp-contato-valor">14h00 às 18h00<br/><span>Segunda a Sexta · exceto feriados</span></p>
              </div>
            </div>

            <p className="disp-despedida">
              Na certeza de que estes benefícios serão de muita utilidade,
            </p>
            <p className="disp-abraco">Um fraternal abraço.</p>

            {tufiFoto && (
              <div className="disp-foto-presidente">
                <div className="disp-foto-moldura">
                  <img src={tufiFoto} alt="Tufi Salim Jorge Filho" loading="lazy" />
                </div>
                <span className="disp-foto-caption">Tufi Salim Jorge Filho · Grão-Mestre</span>
              </div>
            )}

            <div className="disp-assinatura">
              <div className="disp-assinatura-linha" />
              <p className="disp-assinatura-entidade">GLOMAM — Grande Loja Maçônica do Amazonas</p>
              <p className="disp-assinatura-cargo"><strong>Grão-Mestre:</strong> Tufi Salim Jorge Filho</p>
              <p className="disp-assinatura-cargo"><strong>Presidente do Dispensário Maçônico:</strong> Costa Filho</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="jud-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="jud-divider" style={{ margin: '0 auto 28px' }} />
          <p className="jud-cta-eyebrow">Dispensário Maçônico</p>
          <h3 className="jud-cta-title">Precisa de atendimento ou orientação?</h3>
          <p className="jud-cta-text">
            Nossa equipe está à disposição para esclarecer dúvidas sobre benefícios, cadastros e
            utilização dos serviços disponibilizados pela GLOMAM.
          </p>
          <a
            href="https://www.glomamdispensario.org/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ marginTop: 'clamp(24px,4vw,40px)', padding: 'clamp(14px,2vw,18px) clamp(42px,6vw,72px)' }}
          >
            <span>Acessar Portal do Dispensário</span>
          </a>
          <div style={{ width: '44px', height: '1px', background: 'var(--gold)', margin: 'clamp(28px,4vw,44px) auto 0', opacity: '.3' }} />
        </div>
      </section>

      <Footer />
      <WhatsAppBtn />
    </>
  );
}
