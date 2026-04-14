import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useReveal from '../hooks/useReveal.js';

const sintese = [
  'A Maçonaria proclama, como sempre o fez, desde sua origem, a existência de um Princípio Criador, sob a denominação de GRANDE ARQUITETO DO UNIVERSO;',
  'É uma instituição filosófica, que proclama a liberdade de consciência como sacratíssimo direito humano;',
  'Não impõe limite à investigação da Verdade e é para garantir essa liberdade que exige de todos a maior tolerância;',
  'Honra o trabalho em suas formas honestas e o tem por dever, a que nenhuma pessoa válida pode fugir;',
  'Proscreve qualquer discussão sectária, de natureza política ou religiosa, dentro de seus Templos ou fora deles, em nome da Ordem;',
  'Condena o despotismo e trabalha, incessantemente, para unir a espécie humana pelos laços do amor fraternal;',
  'Impõe o culto à Pátria, exige respeito absoluto à família e não admite a menor ofensa nem a uma nem a outra;',
  'Cada Loja é um Templo sagrado, sob cuja abóboda os homens livres e de bons costumes devem reunir-se fraternalmente, procurando conseguir o bem da humanidade;',
  'Todo pensamento maçônico deve ser criador. Essa atitude mental engrandece o espírito e fortifica o coração. Cada maçom, parte viva dos irmãos, concorrerá para similar o ideal da Ordem e desenvolvê-lo na capacidade de sua inteligência;',
  'A Maçonaria é acessível aos de todas as classes, crenças religiosas e convicções políticas, com exceção daquelas que privem o homem da liberdade de consciência e exijam submissão incondicional a seus chefes;',
  'Em seus Templos aprende-se a amar e a respeitar tudo o que a virtude e a sabedoria consagram;',
  'Exige estudo meditado de seus rituais e a prática da solidariedade humana;',
  'A Maçonaria, por conseguinte, é uma instituição criada para combater tudo o que atente contra a razão e contra o espírito de fraternidade universal;',
  'Os ensinamentos maçônicos, realizados através de símbolos e de alegorias universais, induzem seus adeptos a dedicarem-se à felicidade a seus semelhantes, não porque a razão e a justiça lhe imponham esse dever, mas porque o sentimento é qualidade inata, que os faz filhos do Universo e amigos de todos os homens.',
];

const serMacom = [
  'Ser Maçom é ser amante da Virtude, da Sabedoria, da Justiça e da Humanidade;',
  'Ser Maçom é ser amigo dos pobres e desgraçados, dos que sofrem, dos que choram, dos que tem fome de justiça; é ter como única norma de conduta o bem de todos e o seu progresso e engrandecimento;',
  'Ser Maçom é querer a harmonia das famílias, a concórdia dos povos, a paz do gênero humano;',
  'Ser Maçom é derramar por todas as partes os esplendores divinos da instrução; é educar a inteligência para o bem, conceber os mais ideais do Direito, da moralidade e do amor, e praticá-los;',
  'Ser Maçom é levar à prática aquele formosíssimo preceito de todos os lugares e de todos os séculos, que diz, com infinita ternura aos seres humanos, indistintamente, do alto de uma Cruz e com os braços abertos ao mundo: "Amai-vos uns aos outros, formai uma única família, sede todos irmãos"!',
  'Ser Maçom é olvidar as ofensas que se nos fazem, ser bom, até mesmo para com os nossos adversários e inimigos, não odiar a ninguém, praticar a Virtude constantemente, pagar o mal com o bem;',
  'Ser Maçom é amar a luz e aborrecer as trevas; ser amigo da Ciência e combater a ignorância, render culto à Razão e à Sabedoria;',
  'Ser Maçom é praticar a Tolerância, exercer a Caridade, sem distinção de raças, crenças ou opiniões, lutar contra a hipocrisia e o fanatismo;',
  'Ser Maçom é realizar, enfim, o sonho áureo da Fraternidade universal entre os homens.',
];

const finalidades = [
  'Grandes vultos do passado e do presente pertenceram ou pertencem à Sublime Ordem Maçônica Universal, adotando esta filosofia de vida;',
  'A Maçonaria se preocupa com os problemas nacionais e internacionais, usando de sua influência para minorar o sofrimento dos povos, sem distinção de cor, raça ou religião;',
  'A Maçonaria é parte integrante da História Pátria e Universal, os maçons sempre estiveram presentes nos grandes eventos, defendendo a trilogia sagrada LIBERDADE, IGUALDADE E FRATERNIDADE;',
  'Assim lutaram e venceram os maçons que nos antecederam; assim lutamos hoje; assim lutarão amanhã nossos sucessores, empunhando esta mesma bandeira;',
  'Trabalhando pela felicidade do gênero humano, os maçons se consideram recompensados e realizados, pois servindo ao próximo, estão observando os ensinamentos da Sublime Instituição;',
  'Os que satisfizerem estes requisitos e desejarem cerrar fileiras com os Apóstolos da Liberdade e Sacerdotes do Direito, deverão se comprometer a trabalhar pelo bem-estar da Pátria e da Humanidade;',
  'Aquele que for convidado e aceito será considerado nosso irmão, passando a fazer parte da grande Família Maçônica Universal;',
  'Nossa Ordem deseja ardentemente que todos os homens de bem se unam numa cruzada mundial de recuperação dos valores morais da humanidade;',
  'DEUS, a quem denominamos GRANDE ARQUITETO DO UNIVERSO, conhece muito bem nossas intenções e penetra no mais recôndito de nossas almas, razão por que devemos ser sinceros em nossas atitudes.',
];

function Principio({ n, children, delay }) {
  const d = delay ? ` reveal-d${delay}` : '';
  return (
    <article className={`principio-card reveal${d}`}>
      <div className="principio-num">{String(n).padStart(2, '0')}</div>
      <p className="principio-text">{children}</p>
    </article>
  );
}

function Bloco({ label, titulo, epigrafe, items }) {
  return (
    <section className="principios-bloco">
      <div className="section-inner">
        <div className="principios-bloco-header reveal">
          <div className="section-label">{label}</div>
          <h2 className="principios-bloco-titulo">{titulo}</h2>
          <div className="principios-divider" />
          {epigrafe && <p className="principios-epigrafe">{epigrafe}</p>}
        </div>
        <div className="principios-grid">
          {items.map((t, i) => (
            <Principio key={i} n={i + 1} delay={(i % 3) + 1}>{t}</Principio>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Principios() {
  useReveal();

  return (
    <>
      <Header />

      <section className="principios-hero">
        <div className="principios-hero-bg" />
        <div className="section-inner principios-hero-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Maçonaria</div>
            <h1 className="principios-hero-title">Princípios</h1>
            <div className="principios-divider" style={{ margin: '24px auto 28px' }} />
            <p className="principios-hero-sub">
              Os fundamentos eternos que sustentam a Ordem — síntese da filosofia,
              da conduta e das finalidades que orientam todo Maçom em sua jornada
              pelo aprimoramento do homem e da humanidade.
            </p>
          </div>
        </div>
      </section>

      <Bloco
        label="Síntese"
        titulo="Síntese dos Princípios Maçônicos"
        epigrafe="Os quatorze pilares filosóficos que definem a essência de nossa Ordem."
        items={sintese}
      />

      <Bloco
        label="Identidade"
        titulo="Ser Maçom"
        epigrafe="Muito além de uma afiliação — um compromisso com a Virtude, a Sabedoria e a Fraternidade universal."
        items={serMacom}
      />

      <Bloco
        label="Missão"
        titulo="Nossas Finalidades"
        epigrafe="O propósito maior que nos une sob a luz do Grande Arquiteto do Universo."
        items={finalidades}
      />

      <section className="principios-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="principios-divider" style={{ margin: '0 auto 28px' }} />
          <p className="principios-cta-eyebrow">Faça parte desta irmandade</p>
          <h3 className="principios-cta-title">Você sente o chamado da Luz?</h3>
          <p className="principios-cta-text">
            Se os princípios acima ressoam em seu íntimo, talvez o Templo já tenha
            uma vaga reservada para você.
          </p>
          <a href="/#faq-section" className="btn-primary"><span>Quero Ser Maçom</span></a>
        </div>
      </section>

      <Footer />
    </>
  );
}
