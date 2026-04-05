import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Brandbook.css';

/* ── Dados ── */
const COLORS = [
  { name: 'Gold', var: '--gold', hex: '#b4975a', use: 'Destaque primário, CTAs, ornamentos' },
  { name: 'Gold Light', var: '--gold-light', hex: '#d4b87a', use: 'Gradientes, hovers claros' },
  { name: 'Gold Dark', var: '--gold-dark', hex: '#8a7040', use: 'Gradientes, sombras douradas' },
  { name: 'Slate', var: '--slate', hex: '#1a2332', use: 'Texto principal, seções escuras' },
  { name: 'Slate Mid', var: '--slate-mid', hex: '#2c3e50', use: 'Texto secundário, efeitos' },
  { name: 'Background', var: '--bg', hex: '#f0ede8', use: 'Fundo geral da aplicação' },
  { name: 'Ice', var: '--ice', hex: '#edf2f7', use: 'Fundos alternativos claros' },
  { name: 'White', var: '--white', hex: '#ffffff', use: 'Fundos de cards, destaque' },
];

const FONTS = [
  { family: 'Cinzel', weights: [400, 600, 700], role: 'Headings & Identidade', sample: 'GLOMAM — Grande Loja Maçônica do Amazonas', class: 'cinzel' },
  { family: 'Cinzel Decorative', weights: [400, 700], role: 'Títulos Especiais & Numerais Ornamentais', sample: 'Ad Gloriam et Honorem — 1904', class: 'cinzel-deco' },
  { family: 'Cormorant Garamond', weights: [300, 400, 500], role: 'Subtítulos, Citações & Descrições', sample: 'Arquitetura Social da Virtude — Tradição, Regularidade e Progresso', class: 'cormorant' },
  { family: 'Montserrat', weights: [200, 300, 400, 500, 600], role: 'Corpo, UI, Formulários & Labels', sample: 'A excelência na comunicação institucional reflete a tradição da Ordem.', class: 'montserrat' },
];

const COMPONENTS_UI = [
  { name: 'Botão Primário', class: 'bb-demo-btn-primary' },
  { name: 'Botão Outline', class: 'bb-demo-btn-outline' },
  { name: 'Botão CTA Nav', class: 'bb-demo-btn-cta' },
  { name: 'Label de Seção', class: 'bb-demo-label' },
  { name: 'Card Pilar', class: 'bb-demo-card' },
  { name: 'Input Field', class: 'bb-demo-input' },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96, 120];

export default function Brandbook() {
  const [activeTab, setActiveTab] = useState('logo');
  const [copiedColor, setCopiedColor] = useState(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/Opresida/glomam.git');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const tabs = [
    { id: 'logo', label: 'Logo' },
    { id: 'cores', label: 'Cores' },
    { id: 'tipografia', label: 'Tipografia' },
    { id: 'ui', label: 'UI System' },
    { id: 'materiais', label: 'Materiais' },
    { id: 'guidelines', label: 'Diretrizes' },
  ];

  return (
    <div className="bb">
      {/* ── Header ── */}
      <header className="bb-header">
        <div className="bb-header-inner">
          <Link to="/" className="bb-back" aria-label="Voltar ao site">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
          </Link>
          <div className="bb-header-brand">
            <span className="bb-header-logo">GLOMAM</span>
            <span className="bb-header-sep">|</span>
            <span className="bb-header-title">Brandbook & UI System</span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bb-hero">
        <div className="bb-hero-ornament">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#b4975a" strokeWidth="0.6">
            <circle cx="30" cy="30" r="28" strokeDasharray="4 4"/>
            <path d="M30 4L18 52M30 4L42 52M14 38H46" />
            <circle cx="30" cy="22" r="6" />
          </svg>
        </div>
        <p className="bb-hero-tag">Manual de Identidade Visual</p>
        <h1 className="bb-hero-h1">
          Brand<span className="gold">book</span>
        </h1>
        <p className="bb-hero-sub">
          Grande Loja Maçônica do Amazonas — Guia completo de identidade,
          componentes e diretrizes de aplicação visual.
        </p>
        <div className="bb-hero-stats">
          <div><span className="bb-stat-num">8</span><span className="bb-stat-label">Cores</span></div>
          <div><span className="bb-stat-num">4</span><span className="bb-stat-label">Fontes</span></div>
          <div><span className="bb-stat-num">6+</span><span className="bb-stat-label">Componentes</span></div>
          <div><span className="bb-stat-num">3</span><span className="bb-stat-label">Materiais</span></div>
        </div>
      </section>

      {/* ── Tabs ── */}
      <nav className="bb-tabs">
        <div className="bb-tabs-inner">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`bb-tab${activeTab === t.id ? ' active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >{t.label}</button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════ LOGO ══════════════════════ */}
      {activeTab === 'logo' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">00 — Logotipo</span>
              <h2>Marca & Aplicabilidade</h2>
              <p className="bb-desc">O brasão oficial da GLOMAM é um símbolo centenário que carrega a tradição e os valores da Ordem. Sua aplicação deve seguir regras rígidas para preservar a integridade visual.</p>
            </div>

            {/* Versões principais */}
            <h3 className="bb-h3">Versões Principais</h3>
            <div className="bb-logo-main-grid">
              <div className="bb-logo-display bb-logo-bg-original">
                <img src="/logo-glomam-original.svg" alt="Logo GLOMAM Original" className="bb-logo-img" />
                <span className="bb-logo-caption">Original — Fundo Índigo #2e2f98</span>
              </div>
              <div className="bb-logo-display" style={{ background: '#f0ede8', border: '1px solid rgba(44,62,80,.06)' }}>
                <img src="/logo-glomam-slate.svg" alt="Logo GLOMAM Slate" className="bb-logo-img" />
                <span className="bb-logo-caption">Slate — Monocromática #1a2332</span>
              </div>
              <div className="bb-logo-display" style={{ background: '#1a2332' }}>
                <img src="/logo-glomam-gold.svg" alt="Logo GLOMAM Gold" className="bb-logo-img" />
                <span className="bb-logo-caption" style={{ color: 'rgba(255,255,255,.5)' }}>Gold — Monocromática #b4975a</span>
              </div>
            </div>

            {/* Aplicabilidade sobre fundos */}
            <h3 className="bb-h3">Aplicabilidade sobre Fundos</h3>
            <p className="bb-desc" style={{ marginBottom: 24 }}>Cada variante da marca é projetada para um contexto específico de aplicação.</p>
            <div className="bb-logo-variants">
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: '#1a2332' }}>
                  <img src="/logo-glomam-original.svg" alt="Original sobre Slate" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Original sobre Slate</span>
                <code>Versão preferencial</code>
                <span className="bb-logo-variant-use">Seções escuras, footer, convites</span>
              </div>
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: '#f0ede8' }}>
                  <img src="/logo-glomam-slate.svg" alt="Slate sobre Background" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Slate sobre Claro</span>
                <code>#1a2332 sobre #f0ede8</code>
                <span className="bb-logo-variant-use">Header, documentos, site</span>
              </div>
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: '#ffffff' }}>
                  <img src="/logo-glomam-slate.svg" alt="Slate sobre Branco" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Slate sobre Branco</span>
                <code>#1a2332 sobre #fff</code>
                <span className="bb-logo-variant-use">Impressos, papel timbrado</span>
              </div>
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: '#080f1c' }}>
                  <img src="/logo-glomam-gold.svg" alt="Gold sobre Dark" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Gold sobre Escuro</span>
                <code>#b4975a sobre #080f1c</code>
                <span className="bb-logo-variant-use">Materiais premium, certificados</span>
              </div>
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: '#b4975a' }}>
                  <img src="/logo-glomam-slate.svg" alt="Slate sobre Gold" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Slate sobre Gold</span>
                <code>#1a2332 sobre #b4975a</code>
                <span className="bb-logo-variant-use">Convites especiais</span>
              </div>
              <div className="bb-logo-variant-card">
                <div className="bb-logo-variant-preview" style={{ background: 'linear-gradient(135deg, #1a2332, #2c3e50)' }}>
                  <img src="/logo-glomam-original.svg" alt="Original sobre Gradiente" className="bb-logo-img-sm" />
                </div>
                <span className="bb-logo-variant-name">Gradiente Institucional</span>
                <code>slate → slate-mid</code>
                <span className="bb-logo-variant-use">Apresentações formais</span>
              </div>
            </div>

            {/* Tamanhos mínimos */}
            <h3 className="bb-h3">Tamanhos Mínimos</h3>
            <div className="bb-logo-sizes">
              <div className="bb-logo-size-item">
                <div className="bb-logo-size-preview" style={{ width: 120, height: 120 }}>
                  <img src="/logo-glomam-original.svg" alt="120px" style={{ width: '100%', height: '100%' }} />
                </div>
                <span>120px — Digital padrão</span>
              </div>
              <div className="bb-logo-size-item">
                <div className="bb-logo-size-preview" style={{ width: 80, height: 80 }}>
                  <img src="/logo-glomam-original.svg" alt="80px" style={{ width: '100%', height: '100%' }} />
                </div>
                <span>80px — Mínimo digital</span>
              </div>
              <div className="bb-logo-size-item">
                <div className="bb-logo-size-preview" style={{ width: 48, height: 48 }}>
                  <img src="/logo-glomam-original.svg" alt="48px" style={{ width: '100%', height: '100%' }} />
                </div>
                <span>48px — Favicon / ícone</span>
              </div>
              <div className="bb-logo-size-item">
                <div className="bb-logo-size-preview" style={{ width: 32, height: 32 }}>
                  <img src="/logo-glomam-original.svg" alt="32px" style={{ width: '100%', height: '100%' }} />
                </div>
                <span>32px — Mínimo absoluto</span>
              </div>
            </div>

            {/* Área de proteção */}
            <h3 className="bb-h3">Área de Proteção</h3>
            <div className="bb-logo-clearspace">
              <div className="bb-logo-clearspace-box">
                <div className="bb-logo-clearspace-inner">
                  <img src="/logo-glomam-original.svg" alt="Área de proteção" className="bb-logo-clearspace-img" />
                </div>
                <div className="bb-logo-clearspace-label-top">X</div>
                <div className="bb-logo-clearspace-label-bottom">X</div>
                <div className="bb-logo-clearspace-label-left">X</div>
                <div className="bb-logo-clearspace-label-right">X</div>
              </div>
              <p className="bb-logo-note">A área de proteção mínima ao redor do brasão equivale a <strong>1X</strong>, onde X = 25% do diâmetro do brasão. Nenhum elemento gráfico ou textual deve invadir esta área.</p>
            </div>

            {/* Uso incorreto */}
            <h3 className="bb-h3">Usos Incorretos</h3>
            <div className="bb-logo-donts">
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#fff' }}>
                  <img src="/logo-glomam-original.svg" alt="Não distorcer" className="bb-logo-img-sm" style={{ transform: 'scaleX(0.6)' }} />
                </div>
                <span>Não distorcer proporções</span>
              </div>
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#fff' }}>
                  <img src="/logo-glomam-original.svg" alt="Não rotacionar" className="bb-logo-img-sm" style={{ transform: 'rotate(25deg)', opacity: 0.8 }} />
                </div>
                <span>Não rotacionar</span>
              </div>
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#fff' }}>
                  <img src="/logo-glomam-original.svg" alt="Não alterar cores" className="bb-logo-img-sm" style={{ filter: 'hue-rotate(90deg) saturate(3)' }} />
                </div>
                <span>Não alterar cores</span>
              </div>
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#fff' }}>
                  <img src="/logo-glomam-original.svg" alt="Não aplicar sombra" className="bb-logo-img-sm" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))' }} />
                </div>
                <span>Não aplicar sombras</span>
              </div>
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#ff0000' }}>
                  <img src="/logo-glomam-original.svg" alt="Não usar em fundo colorido" className="bb-logo-img-sm" />
                </div>
                <span>Não usar sobre cores vibrantes</span>
              </div>
              <div className="bb-logo-dont-item">
                <div className="bb-logo-dont-preview" style={{ background: '#fff' }}>
                  <img src="/logo-glomam-original.svg" alt="Não reduzir opacidade" className="bb-logo-img-sm" style={{ opacity: 0.3 }} />
                </div>
                <span>Não reduzir opacidade</span>
              </div>
            </div>

            {/* Composição com texto */}
            <h3 className="bb-h3">Composição Logo + Texto</h3>
            <div className="bb-logo-compositions">
              <div className="bb-logo-comp-item" style={{ background: '#1a2332' }}>
                <img src="/logo-glomam-original.svg" alt="Logo" style={{ width: 80, height: 80 }} />
                <div className="bb-logo-comp-text">
                  <span className="bb-logo-comp-title" style={{ color: '#fff' }}>GLOMAM</span>
                  <span className="bb-logo-comp-sub" style={{ color: 'rgba(255,255,255,.4)' }}>Grande Loja Maçônica do Amazonas</span>
                </div>
              </div>
              <div className="bb-logo-comp-item" style={{ background: '#f0ede8' }}>
                <img src="/logo-glomam-original.svg" alt="Logo" style={{ width: 80, height: 80 }} />
                <div className="bb-logo-comp-text">
                  <span className="bb-logo-comp-title" style={{ color: '#1a2332' }}>GLOMAM</span>
                  <span className="bb-logo-comp-sub" style={{ color: '#9ca3af' }}>Grande Loja Maçônica do Amazonas</span>
                </div>
              </div>
              <div className="bb-logo-comp-item bb-logo-comp-vertical" style={{ background: '#1a2332' }}>
                <img src="/logo-glomam-original.svg" alt="Logo" style={{ width: 100, height: 100 }} />
                <span className="bb-logo-comp-title" style={{ color: '#b4975a' }}>GLOMAM</span>
                <span className="bb-logo-comp-sub" style={{ color: 'rgba(255,255,255,.35)' }}>Grande Loja Maçônica do Amazonas</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '.6rem', color: 'rgba(180,151,90,.5)', marginTop: 4 }}>Est. 1904</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ CORES ══════════════════════ */}
      {activeTab === 'cores' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">01 — Paleta de Cores</span>
              <h2>Sistema Cromático</h2>
              <p className="bb-desc">A paleta foi concebida para transmitir <strong>tradição, elegância e autoridade</strong>. O ouro representa a luz e o conhecimento; o slate, a solidez institucional.</p>
            </div>

            {/* Paleta principal */}
            <div className="bb-colors-hero">
              <div className="bb-color-hero-main" style={{ background: '#b4975a' }}>
                <span className="bb-ch-name">Gold</span>
                <span className="bb-ch-hex">#b4975a</span>
                <span className="bb-ch-role">Cor primária de destaque</span>
              </div>
              <div className="bb-color-hero-main" style={{ background: '#1a2332' }}>
                <span className="bb-ch-name" style={{ color: '#fff' }}>Slate</span>
                <span className="bb-ch-hex" style={{ color: 'rgba(255,255,255,.6)' }}>#1a2332</span>
                <span className="bb-ch-role" style={{ color: 'rgba(255,255,255,.4)' }}>Cor institucional de base</span>
              </div>
              <div className="bb-color-hero-main" style={{ background: '#f0ede8', border: '1px solid rgba(44,62,80,.08)' }}>
                <span className="bb-ch-name">Background</span>
                <span className="bb-ch-hex">#f0ede8</span>
                <span className="bb-ch-role">Fundo geral</span>
              </div>
            </div>

            {/* Grid completo */}
            <h3 className="bb-h3">Paleta Completa</h3>
            <div className="bb-colors-grid">
              {COLORS.map(c => (
                <div key={c.hex} className="bb-color-card" onClick={() => copyHex(c.hex)}>
                  <div className="bb-color-swatch" style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid rgba(44,62,80,.1)' : 'none' }} />
                  <div className="bb-color-info">
                    <strong>{c.name}</strong>
                    <code>{c.hex}</code>
                    <code className="bb-color-var">var({c.var})</code>
                    <span className="bb-color-use">{c.use}</span>
                  </div>
                  {copiedColor === c.hex && <span className="bb-copied">Copiado!</span>}
                </div>
              ))}
            </div>

            {/* Gradientes */}
            <h3 className="bb-h3">Gradientes</h3>
            <div className="bb-gradients">
              <div className="bb-gradient-card">
                <div className="bb-gradient-bar" style={{ background: 'linear-gradient(135deg, #8a7040, #b4975a, #d4b87a)' }} />
                <span>Gold Gradient</span>
                <code>linear-gradient(135deg, #8a7040, #b4975a, #d4b87a)</code>
              </div>
              <div className="bb-gradient-card">
                <div className="bb-gradient-bar" style={{ background: 'linear-gradient(135deg, #1a2332, #2c3e50)' }} />
                <span>Slate Gradient</span>
                <code>linear-gradient(135deg, #1a2332, #2c3e50)</code>
              </div>
              <div className="bb-gradient-card">
                <div className="bb-gradient-bar" style={{ background: 'linear-gradient(90deg, #8a7040, #b4975a, #d4b87a)' }} />
                <span>Progress Bar</span>
                <code>linear-gradient(90deg, gold-dark → gold → gold-light)</code>
              </div>
            </div>

            {/* Contraste */}
            <h3 className="bb-h3">Acessibilidade — Contraste</h3>
            <div className="bb-contrast-grid">
              <div className="bb-contrast-item" style={{ background: '#1a2332', color: '#b4975a' }}>
                <span>Gold sobre Slate</span><span className="bb-contrast-ratio">AA ✓ — 4.8:1</span>
              </div>
              <div className="bb-contrast-item" style={{ background: '#1a2332', color: '#ffffff' }}>
                <span>White sobre Slate</span><span className="bb-contrast-ratio">AAA ✓ — 14.5:1</span>
              </div>
              <div className="bb-contrast-item" style={{ background: '#f0ede8', color: '#1a2332' }}>
                <span>Slate sobre Background</span><span className="bb-contrast-ratio">AAA ✓ — 12.1:1</span>
              </div>
              <div className="bb-contrast-item" style={{ background: '#f0ede8', color: '#b4975a' }}>
                <span>Gold sobre Background</span><span className="bb-contrast-ratio">AA Large ✓ — 3.2:1</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ TIPOGRAFIA ══════════════════════ */}
      {activeTab === 'tipografia' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">02 — Tipografia</span>
              <h2>Hierarquia Tipográfica</h2>
              <p className="bb-desc">Quatro famílias tipográficas cuidadosamente selecionadas para equilibrar <strong>tradição e legibilidade</strong>.</p>
            </div>

            <div className="bb-fonts-list">
              {FONTS.map(f => (
                <div key={f.family} className="bb-font-card">
                  <div className="bb-font-header">
                    <h3 className="bb-font-family" style={{ fontFamily: `'${f.family}', serif` }}>{f.family}</h3>
                    <span className="bb-font-role">{f.role}</span>
                  </div>
                  <p className={`bb-font-sample ${f.class}`}>{f.sample}</p>
                  <div className="bb-font-weights">
                    {f.weights.map(w => (
                      <span key={w} className="bb-font-weight" style={{ fontFamily: `'${f.family}', serif`, fontWeight: w }}>
                        {w} — Aa Bb Cc
                      </span>
                    ))}
                  </div>
                  <div className="bb-font-alphabet" style={{ fontFamily: `'${f.family}', serif` }}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
                    abcdefghijklmnopqrstuvwxyz<br/>
                    0123456789 !@#$%&*()
                  </div>
                </div>
              ))}
            </div>

            {/* Escala tipográfica */}
            <h3 className="bb-h3">Escala Tipográfica</h3>
            <div className="bb-type-scale">
              <div className="bb-scale-row">
                <code>h1</code>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(2rem,5.5vw,3.4rem)', lineHeight: 1.06 }}>A Perfeição na Medida</span>
              </div>
              <div className="bb-scale-row">
                <code>h2</code>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', lineHeight: 1.15 }}>Iluminando o Passado</span>
              </div>
              <div className="bb-scale-row">
                <code>h3</code>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(.82rem,2vw,1.1rem)', letterSpacing: '.17em', textTransform: 'uppercase' }}>Galeria de Grão-Mestres</span>
              </div>
              <div className="bb-scale-row">
                <code>subtitle</code>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 300 }}>Arquitetura Social da Virtude</span>
              </div>
              <div className="bb-scale-row">
                <code>body</code>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 'clamp(.88rem,1.4vw,1rem)' }}>A excelência na comunicação institucional reflete a tradição da Ordem.</span>
              </div>
              <div className="bb-scale-row">
                <code>label</code>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '.55rem', letterSpacing: '.44em', textTransform: 'uppercase', color: '#b4975a', fontWeight: 600 }}>Seção Label</span>
              </div>
              <div className="bb-scale-row">
                <code>small</code>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '.5rem', letterSpacing: '.2em', textTransform: 'uppercase' }}>Texto auxiliar e metadados</span>
              </div>
            </div>

            {/* Letter Spacing */}
            <h3 className="bb-h3">Letter Spacing</h3>
            <div className="bb-spacing-demo">
              <div><code>0.06em</code><span style={{ letterSpacing: '0.06em' }}>Texto de corpo padrão</span></div>
              <div><code>0.14em</code><span style={{ letterSpacing: '0.14em', fontFamily: "'Cinzel',serif" }}>Títulos intermediários</span></div>
              <div><code>0.24em</code><span style={{ letterSpacing: '0.24em', textTransform: 'uppercase', fontSize: '.7rem' }}>Navegação e links</span></div>
              <div><code>0.44em</code><span style={{ letterSpacing: '0.44em', textTransform: 'uppercase', fontSize: '.6rem', color: '#b4975a', fontWeight: 600 }}>Section labels</span></div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ UI SYSTEM ══════════════════════ */}
      {activeTab === 'ui' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">03 — UI System</span>
              <h2>Componentes & Padrões</h2>
              <p className="bb-desc">Biblioteca de componentes reutilizáveis que compõem a interface da GLOMAM.</p>
            </div>

            {/* Botões */}
            <h3 className="bb-h3">Botões</h3>
            <div className="bb-ui-row">
              <div className="bb-ui-demo">
                <button className="bb-btn-primary"><span>Ver Princípios</span></button>
                <code>.btn-primary</code>
                <span className="bb-ui-note">Background slate, hover revela ouro via scaleX. Cinzel, uppercase, 0.2em spacing.</span>
              </div>
              <div className="bb-ui-demo">
                <button className="bb-btn-outline">Localização</button>
                <code>.btn-outline</code>
                <span className="bb-ui-note">Borda sutil, hover muda para gold. Sem preenchimento.</span>
              </div>
              <div className="bb-ui-demo">
                <button className="bb-btn-cta">Login</button>
                <code>.nav-cta</code>
                <span className="bb-ui-note">Borda gold, hover preenche gold com texto branco.</span>
              </div>
            </div>

            {/* Cards */}
            <h3 className="bb-h3">Cards</h3>
            <div className="bb-ui-cards-demo">
              <div className="bb-demo-pilar">
                <div className="bb-dp-num">01</div>
                <div className="bb-dp-icon">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M17 2L2 32h30L17 2z"/></svg>
                </div>
                <h4>A Maçonaria</h4>
                <p>Construção simbólica do caráter humano, alicerçada em princípios éticos universais.</p>
              </div>
              <div className="bb-demo-pilar bb-demo-pilar-dark">
                <div className="bb-dp-num">02</div>
                <div className="bb-dp-icon">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#b4975a" strokeWidth="1.5"><circle cx="17" cy="10" r="6"/><path d="M5 30c0-7 5-12 12-12s12 5 12 12"/></svg>
                </div>
                <h4>Ser Maçom</h4>
                <p>Compromisso diário com virtude, fraternidade e aperfeiçoamento moral contínuo.</p>
              </div>
            </div>

            {/* Inputs */}
            <h3 className="bb-h3">Formulários</h3>
            <div className="bb-ui-form-demo">
              <div className="bb-form-group">
                <label>Email institucional</label>
                <input type="email" placeholder="irmao@glomam.org.br" readOnly />
              </div>
              <div className="bb-form-group">
                <label>Mensagem</label>
                <textarea placeholder="Sua mensagem..." rows="3" readOnly />
              </div>
              <div className="bb-form-group">
                <button className="bb-btn-primary"><span>Enviar</span></button>
              </div>
            </div>

            {/* Spacing */}
            <h3 className="bb-h3">Espaçamento</h3>
            <div className="bb-spacing-scale">
              {SPACING.map(s => (
                <div key={s} className="bb-space-item">
                  <div className="bb-space-bar" style={{ width: s, height: s > 32 ? 16 : s }} />
                  <code>{s}px</code>
                </div>
              ))}
            </div>

            {/* Ícones / SVG */}
            <h3 className="bb-h3">Iconografia (SVG Inline)</h3>
            <p className="bb-desc" style={{ marginBottom: 24 }}>Todos os ícones são SVG inline com stroke <code>var(--gold)</code>, strokeWidth <code>1.5</code>, fill <code>none</code>.</p>
            <div className="bb-icons-grid">
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 34 34" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M17 2L2 32h30L17 2z"/></svg>
                <span>Triângulo</span>
              </div>
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 34 34" fill="none" stroke="#b4975a" strokeWidth="1.5"><circle cx="17" cy="10" r="6"/><path d="M5 30c0-7 5-12 12-12s12 5 12 12"/></svg>
                <span>Pessoa</span>
              </div>
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>
                <span>Grid</span>
              </div>
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Localização</span>
              </div>
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>Email</span>
              </div>
              <div className="bb-icon-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b4975a" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Documento</span>
              </div>
            </div>

            {/* Animações */}
            <h3 className="bb-h3">Animações & Transições</h3>
            <div className="bb-anim-grid">
              <div className="bb-anim-card">
                <code>var(--ease)</code>
                <div className="bb-anim-preview bb-anim-ease" />
                <span>cubic-bezier(0.19, 1, 0.22, 1)</span>
              </div>
              <div className="bb-anim-card">
                <code>fadeUp</code>
                <div className="bb-anim-preview bb-anim-fadeup" />
                <span>opacity 0→1, translateY 28px→0</span>
              </div>
              <div className="bb-anim-card">
                <code>scaleX hover</code>
                <div className="bb-anim-preview bb-anim-scalex" />
                <span>Background reveal via scaleX(0→1)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ MATERIAIS ══════════════════════ */}
      {activeTab === 'materiais' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">04 — Materiais Institucionais</span>
              <h2>Aplicações da Marca</h2>
              <p className="bb-desc">Modelos prontos para impressão e uso digital, mantendo a identidade visual da GLOMAM em todos os pontos de contato.</p>
            </div>

            {/* ── CARTÃO DE VISITA ── */}
            <h3 className="bb-h3">Cartão de Visita</h3>
            <p className="bb-desc">Formato 90×50mm — Frente e verso.</p>
            <div className="bb-material-wrap">
              {/* Frente */}
              <div className="bb-card-visita bb-card-frente">
                <div className="bb-cv-border">
                  <div className="bb-cv-corner bb-cv-tl" /><div className="bb-cv-corner bb-cv-tr" />
                  <div className="bb-cv-corner bb-cv-bl" /><div className="bb-cv-corner bb-cv-br" />
                  <div className="bb-cv-content">
                    <div className="bb-cv-top">
                      <svg className="bb-cv-symbol" width="32" height="32" viewBox="0 0 60 60" fill="none" stroke="#b4975a" strokeWidth="0.8">
                        <path d="M30 4L18 52M30 4L42 52M14 38H46" /><circle cx="30" cy="22" r="6" />
                      </svg>
                      <div className="bb-cv-brand">
                        <span className="bb-cv-logo">GLOMAM</span>
                        <span className="bb-cv-sub">Grande Loja Maçônica do Amazonas</span>
                      </div>
                    </div>
                    <div className="bb-cv-line" />
                    <div className="bb-cv-person">
                      <span className="bb-cv-name">Tufi Salim Jorge Filho</span>
                      <span className="bb-cv-cargo">Grão-Mestre · CIM 8023</span>
                    </div>
                    <div className="bb-cv-contacts">
                      <span>secretaria@glomam.org.br</span>
                      <span>Av. Prof. Nilton Lins, 1655 — Manaus, AM</span>
                      <span>CNPJ 04.405.007/0001-44</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Verso */}
              <div className="bb-card-visita bb-card-verso">
                <div className="bb-cv-border bb-cv-dark">
                  <div className="bb-cv-corner bb-cv-tl" /><div className="bb-cv-corner bb-cv-tr" />
                  <div className="bb-cv-corner bb-cv-bl" /><div className="bb-cv-corner bb-cv-br" />
                  <div className="bb-cv-back-content">
                    <svg width="56" height="56" viewBox="0 0 60 60" fill="none" stroke="#b4975a" strokeWidth="0.6">
                      <circle cx="30" cy="30" r="28" strokeDasharray="4 4"/>
                      <path d="M30 4L18 52M30 4L42 52M14 38H46" /><circle cx="30" cy="22" r="6" />
                    </svg>
                    <span className="bb-cv-back-logo">GLOMAM</span>
                    <span className="bb-cv-back-motto">Ad Gloriam et Honorem</span>
                    <span className="bb-cv-back-year">Est. 1904</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PAPEL TIMBRADO ── */}
            <h3 className="bb-h3">Papel Timbrado</h3>
            <p className="bb-desc">Formato A4 — Cabeçalho e rodapé institucional.</p>
            <div className="bb-letterhead">
              <div className="bb-lh-page">
                {/* Header */}
                <div className="bb-lh-header">
                  <div className="bb-lh-header-left">
                    <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="#b4975a" strokeWidth="0.8">
                      <path d="M30 4L18 52M30 4L42 52M14 38H46" /><circle cx="30" cy="22" r="6" />
                    </svg>
                    <div>
                      <span className="bb-lh-logo">GLOMAM</span>
                      <span className="bb-lh-sub">Grande Loja Maçônica do Amazonas</span>
                    </div>
                  </div>
                  <div className="bb-lh-header-right">
                    <span>Av. Prof. Nilton Lins, 1655</span>
                    <span>Flores — Manaus, AM</span>
                    <span>secretaria@glomam.org.br</span>
                  </div>
                </div>
                <div className="bb-lh-line" />

                {/* Body */}
                <div className="bb-lh-body">
                  <p className="bb-lh-date">Manaus, 05 de abril de 2026</p>
                  <p className="bb-lh-greeting">Ilustríssimo Irmão,</p>
                  <p className="bb-lh-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="bb-lh-text">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                  </p>
                  <div className="bb-lh-signature">
                    <div className="bb-lh-sig-line" />
                    <span className="bb-lh-sig-name">Tufi Salim Jorge Filho</span>
                    <span className="bb-lh-sig-cargo">Grão-Mestre</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="bb-lh-footer">
                  <div className="bb-lh-footer-line" />
                  <div className="bb-lh-footer-content">
                    <span>CNPJ 04.405.007/0001-44</span>
                    <span>Tradição · Regularidade · Progresso</span>
                    <span>www.glomam.org.br</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ASSINATURA DE EMAIL ── */}
            <h3 className="bb-h3">Assinatura de Email</h3>
            <p className="bb-desc">Template HTML inline-styled para compatibilidade universal com clientes de email.</p>
            <div className="bb-email-sig-wrap">
              <div className="bb-email-sig">
                <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "'Montserrat', Arial, sans-serif", maxWidth: 520 }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: 20, borderRight: '2px solid #b4975a', verticalAlign: 'top' }}>
                        <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#1a2332', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          <svg width="32" height="32" viewBox="0 0 60 60" fill="none" stroke="#b4975a" strokeWidth="0.8">
                            <path d="M30 4L18 52M30 4L42 52M14 38H46" /><circle cx="30" cy="22" r="6" />
                          </svg>
                        </div>
                      </td>
                      <td style={{ paddingLeft: 20, verticalAlign: 'top' }}>
                        <p style={{ margin: 0, fontFamily: "'Cinzel', Georgia, serif", fontSize: 15, fontWeight: 700, color: '#1a2332', letterSpacing: '0.08em' }}>
                          Tufi Salim Jorge Filho
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: 11, color: '#b4975a', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                          Grão-Mestre · CIM 8023
                        </p>
                        <div style={{ width: '100%', height: 1, background: 'rgba(180,151,90,0.2)', margin: '10px 0' }} />
                        <p style={{ margin: 0, fontSize: 11, color: '#6b7280', lineHeight: '1.6' }}>
                          GLOMAM — Grande Loja Maçônica do Amazonas<br/>
                          Av. Prof. Nilton Lins, 1655 — Manaus, AM<br/>
                          secretaria@glomam.org.br
                        </p>
                        <p style={{ margin: '8px 0 0', fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 12, color: '#b4975a', opacity: 0.7 }}>
                          Ad Gloriam et Honorem
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Código da assinatura */}
            <details className="bb-code-toggle">
              <summary>Ver código HTML da assinatura</summary>
              <pre className="bb-code-block">{`<table cellpadding="0" cellspacing="0" style="font-family:'Montserrat',Arial,sans-serif;max-width:520px">
  <tr>
    <td style="padding-right:20px;border-right:2px solid #b4975a;vertical-align:top">
      <div style="width:70px;height:70px;border-radius:50%;background:#1a2332;text-align:center;line-height:70px">
        <img src="LOGO_URL" alt="GLOMAM" width="32" style="vertical-align:middle"/>
      </div>
    </td>
    <td style="padding-left:20px;vertical-align:top">
      <p style="margin:0;font-family:'Cinzel',Georgia,serif;font-size:15px;font-weight:700;color:#1a2332;letter-spacing:0.08em">
        Nome do Irmão
      </p>
      <p style="margin:2px 0 0;font-size:11px;color:#b4975a;letter-spacing:0.15em;text-transform:uppercase;font-weight:600">
        Cargo · CIM 0000
      </p>
      <div style="width:100%;height:1px;background:rgba(180,151,90,0.2);margin:10px 0"></div>
      <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6">
        GLOMAM — Grande Loja Maçônica do Amazonas<br/>
        Av. Prof. Nilton Lins, 1655 — Manaus, AM<br/>
        secretaria@glomam.org.br
      </p>
      <p style="margin:8px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:12px;color:#b4975a;opacity:0.7">
        Ad Gloriam et Honorem
      </p>
    </td>
  </tr>
</table>`}</pre>
            </details>
          </div>
        </section>
      )}

      {/* ══════════════════════ GUIDELINES ══════════════════════ */}
      {activeTab === 'guidelines' && (
        <section className="bb-section">
          <div className="bb-section-inner">
            <div className="bb-section-head">
              <span className="bb-label">05 — Diretrizes de Uso</span>
              <h2>Regras de Aplicação</h2>
              <p className="bb-desc">Normas para manter a integridade visual da marca em todas as plataformas.</p>
            </div>

            <div className="bb-guidelines-grid">
              <div className="bb-guideline-card bb-do">
                <h4>✓ Fazer</h4>
                <ul>
                  <li>Manter proporções do símbolo maçônico</li>
                  <li>Usar ouro (#b4975a) como cor de destaque principal</li>
                  <li>Cinzel para headings, Montserrat para corpo</li>
                  <li>Manter letter-spacing mínimo de 0.06em</li>
                  <li>Respeitar área de respiro ao redor do logo</li>
                  <li>Usar backgrounds escuros para seções de destaque</li>
                  <li>Manter contraste WCAG AA mínimo</li>
                </ul>
              </div>
              <div className="bb-guideline-card bb-dont">
                <h4>✗ Não Fazer</h4>
                <ul>
                  <li>Alterar as cores da paleta institucional</li>
                  <li>Distorcer ou rotacionar o símbolo</li>
                  <li>Usar fontes não autorizadas</li>
                  <li>Aplicar efeitos de sombra no logo</li>
                  <li>Usar ouro sobre fundo claro sem contraste</li>
                  <li>Reduzir o logo abaixo de 24px de altura</li>
                  <li>Combinar com cores vibrantes ou neon</li>
                </ul>
              </div>
            </div>

            {/* Logo specs */}
            <h3 className="bb-h3">Logo — Área de Proteção</h3>
            <div className="bb-logo-protection">
              <div className="bb-logo-area">
                <div className="bb-logo-safe">
                  <span className="bb-logo-x">X</span>
                  <div className="bb-logo-center">
                    <span className="bb-logo-text">GLOMAM</span>
                    <span className="bb-logo-subtext">Grande Loja Maçônica do Amazonas</span>
                  </div>
                  <span className="bb-logo-x">X</span>
                </div>
                <p className="bb-logo-note">Área mínima de proteção = 1X em todos os lados, onde X = altura da letra "G" do logotipo.</p>
              </div>
            </div>

            {/* Tom de voz */}
            <h3 className="bb-h3">Tom de Voz</h3>
            <div className="bb-voice-grid">
              <div className="bb-voice-card">
                <strong>Institucional</strong>
                <p>Comunicação formal, respeitosa, que reflete a tradição centenária. Vocabulário elevado sem ser inacessível.</p>
              </div>
              <div className="bb-voice-card">
                <strong>Acolhedor</strong>
                <p>Fraternal e inclusivo. Transmite pertencimento sem exclusividade. Convida ao conhecimento.</p>
              </div>
              <div className="bb-voice-card">
                <strong>Elegante</strong>
                <p>Minimalismo visual e textual. Menos é mais. Cada palavra e elemento carrega propósito.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ GITHUB CARD ══════════════════════ */}
      <section className="bb-github-section">
        <div className="bb-section-inner">
          <div className="bb-github-card">
            <div className="bb-gh-left">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b4975a" strokeWidth="1.2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              <div>
                <h3>Repositório do Projeto</h3>
                <p>Acesse o código-fonte completo da GLOMAM no GitHub.</p>
              </div>
            </div>
            <a
              href={githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`bb-gh-btn${!githubUrl ? ' disabled' : ''}`}
              onClick={(e) => { if (!githubUrl) e.preventDefault(); }}
            >
              <span>{githubUrl ? 'Abrir Repositório' : 'Link em breve'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m0 0l-7-7m7 7l-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bb-footer">
        <span>GLOMAM — Brandbook & UI System · 2026</span>
        <span className="bb-footer-motto">Ad Gloriam et Honorem</span>
      </footer>
    </div>
  );
}
