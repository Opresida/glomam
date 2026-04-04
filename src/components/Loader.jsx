import React, { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let timeoutId;
    let done = false;

    const hideLoader = () => {
      if (done) return;
      done = true;
      clearTimeout(timeoutId);
      window.removeEventListener('load', hideLoader);
      setFading(true);
      setTimeout(() => setVisible(false), 850);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      timeoutId = setTimeout(hideLoader, 3000);
    }

    return () => {
      window.removeEventListener('load', hideLoader);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" className={fading ? 'fade' : ''}>
      <svg className="loader-symbol" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" />
      </svg>
      <div className="loader-text">GLOMAM</div>
    </div>
  );
}
