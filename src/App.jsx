import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Imprensa from './pages/Imprensa.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminIntranet from './pages/AdminIntranet.jsx';
import Brandbook from './pages/Brandbook.jsx';
import Principios from './pages/Principios.jsx';
import Judiciario from './pages/Judiciario.jsx';
import Legislativo from './pages/Legislativo.jsx';
import Lojas from './pages/Lojas.jsx';
import DispensarioQuemSomos from './pages/DispensarioQuemSomos.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprensa" element={<Imprensa />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/intranet" element={<AdminIntranet />} />
        <Route path="/brandbook" element={<Brandbook />} />
        <Route path="/principios" element={<Principios />} />
        <Route path="/judiciario" element={<Judiciario />} />
        <Route path="/legislativo" element={<Legislativo />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="/dispensario/quem-somos" element={<DispensarioQuemSomos />} />
      </Routes>
    </BrowserRouter>
  );
}
