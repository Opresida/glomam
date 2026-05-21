import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Hero from '../components/Hero.jsx';
import NewsCards from '../components/NewsCards.jsx';
import WelcomeSection from '../components/WelcomeSection.jsx';
import Objetivos from '../components/Objetivos.jsx';
import VisitaVirtual from '../components/VisitaVirtual.jsx';
import Pilares from '../components/Pilares.jsx';
import Memorial from '../components/Memorial.jsx';
import NossaHistoria from '../components/NossaHistoria.jsx';
import Lideranca from '../components/Lideranca.jsx';
import Familias from '../components/Familias.jsx';
import MapaLojas from '../components/MapaLojas.jsx';
import FAQ from '../components/FAQ.jsx';
import Oriente from '../components/Oriente.jsx';
import useReveal from '../hooks/useReveal.js';
import WhatsAppBtn from '../components/WhatsAppBtn.jsx';

export default function Home() {
  useReveal();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let tries = 0;
    const maxTries = 40;
    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
      if (tries++ < maxTries) setTimeout(scrollToHash, 100);
    };
    setTimeout(scrollToHash, 200);
  }, []);

  return (
    <>
      <Loader />
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        <VisitaVirtual />
        <NossaHistoria />
        <NewsCards />
        <Objetivos />
        <Pilares />
        <Memorial />
        <Lideranca />
        <Familias />
        <MapaLojas />
        <FAQ />
        <Oriente />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
