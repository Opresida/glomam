import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    function reveal() {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add('active');
        }
      });
      document.querySelectorAll('.tl-item').forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
          setTimeout(() => el.classList.add('active'), i * 130);
        }
      });
    }
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);
}
