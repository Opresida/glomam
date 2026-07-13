import React, { useEffect, useState } from 'react';

/**
 * Spinner próprio da rota /damasdafraternidade — temático (creme + gold),
 * independente do Loader global (não reutiliza o id #loader). Auto-dismiss
 * no evento `load` da janela, com fallback de 2.5s.
 */
export default function DamasLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let timeoutId;
    let done = false;

    const hide = () => {
      if (done) return;
      done = true;
      clearTimeout(timeoutId);
      window.removeEventListener('load', hide);
      setFading(true);
      setTimeout(() => setVisible(false), 700);
    };

    if (document.readyState === 'complete') {
      timeoutId = setTimeout(hide, 500); // dá tempo de a animação aparecer
    } else {
      window.addEventListener('load', hide);
      timeoutId = setTimeout(hide, 2500);
    }

    return () => {
      window.removeEventListener('load', hide);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`damas-loader${fading ? ' fade' : ''}`} aria-hidden="true">
      <div className="damas-loader-mark">
        <svg viewBox="0 0 64 64" width="60" height="60">
          {/* anel externo girando */}
          <circle className="dl-ring" cx="32" cy="32" r="28" />
          {/* coração/acácia estilizado ao centro */}
          <path
            className="dl-heart"
            d="M32 44s-12-7.4-12-16a7 7 0 0 1 12-4.9A7 7 0 0 1 44 28c0 8.6-12 16-12 16z"
          />
        </svg>
      </div>
      <div className="damas-loader-text">CHÁ DAS ACÁCIAS</div>
    </div>
  );
}
