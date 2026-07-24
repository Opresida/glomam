import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Imprensa from './pages/Imprensa.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminIntranet from './pages/AdminIntranet.jsx';
import BrandbookGate from './components/BrandbookGate.jsx';
import Principios from './pages/Principios.jsx';
import Judiciario from './pages/Judiciario.jsx';
import Legislativo from './pages/Legislativo.jsx';
import Lojas from './pages/Lojas.jsx';
import DispensarioQuemSomos from './pages/DispensarioQuemSomos.jsx';
import DamasDaFraternidade from './pages/DamasDaFraternidade.jsx';
import NoticiasInstitucionais from './pages/NoticiasInstitucionais.jsx';
import NoticiaInstitucional from './pages/NoticiaInstitucional.jsx';
import Revistas from './pages/Revistas.jsx';
import Galeria from './pages/Galeria.jsx';
import AlbumGaleria from './pages/AlbumGaleria.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprensa" element={<Imprensa />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/intranet" element={<AdminIntranet />} />
        <Route path="/brandbook" element={<BrandbookGate />} />
        <Route path="/principios" element={<Principios />} />
        <Route path="/judiciario" element={<Judiciario />} />
        <Route path="/legislativo" element={<Legislativo />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="/dispensario/quem-somos" element={<DispensarioQuemSomos />} />
        <Route path="/damasdafraternidade" element={<DamasDaFraternidade />} />
        <Route path="/noticiasinstitucionais" element={<NoticiasInstitucionais />} />
        <Route path="/noticiasinstitucionais/:id" element={<NoticiaInstitucional />} />
        <Route path="/revistas" element={<Revistas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:id" element={<AlbumGaleria />} />
      </Routes>
    </BrowserRouter>
  );
}
