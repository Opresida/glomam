import React from 'react';

/**
 * Quebra um texto em <span> por caractere, aplicando um transition-delay
 * incremental. As letras entram (fade + subida) quando um ancestral com a
 * classe `.reveal` recebe `.active` (via hook useReveal no scroll) — integra
 * com o sistema de reveal já existente no projeto.
 *
 * Uso: colocar dentro de um container `.reveal` e envolver o texto do título.
 *   <h2 className="reveal"><LetrasReveal text="Chá das Acácias" /></h2>
 */
export default function LetrasReveal({ text, step = 38, baseDelay = 0, className = '' }) {
  const chars = [...String(text)];
  return (
    <span className={`letras-reveal ${className}`.trim()} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="letra"
          aria-hidden="true"
          style={{ transitionDelay: `${baseDelay + i * step}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
