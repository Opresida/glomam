import React from 'react';

/**
 * Quebra um texto em <span> por caractere, aplicando um transition-delay
 * incremental. As letras entram (fade + subida) quando um ancestral com a
 * classe `.reveal` recebe `.active` (via hook useReveal no scroll).
 *
 * As letras são agrupadas por PALAVRA (`.letras-palavra` com white-space:nowrap),
 * então a quebra de linha só acontece ENTRE palavras — nunca no meio de uma
 * palavra (evita o "s" de "Acácias" cair sozinho para a linha de baixo).
 *
 * Uso: dentro de um container `.reveal`.
 *   <h1 className="reveal"><LetrasReveal text="Chá das Acácias" /></h1>
 */
export default function LetrasReveal({ text, step = 38, baseDelay = 0, className = '' }) {
  const palavras = String(text).split(' ');
  let idx = 0;
  return (
    <span className={`letras-reveal ${className}`.trim()} aria-label={text}>
      {palavras.map((palavra, wi) => (
        <React.Fragment key={wi}>
          <span className="letras-palavra">
            {[...palavra].map((ch, ci) => {
              const delay = baseDelay + idx * step;
              idx += 1;
              return (
                <span key={ci} className="letra" aria-hidden="true" style={{ transitionDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < palavras.length - 1 && <span className="letra-espaco" aria-hidden="true"> </span>}
        </React.Fragment>
      ))}
    </span>
  );
}
