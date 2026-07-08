import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reseta o scroll para o topo a cada mudança de rota.
// Se a URL tiver âncora (#secao), respeita o comportamento de scroll até o elemento.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
