import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Imprensa from './pages/Imprensa.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminIntranet from './pages/AdminIntranet.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprensa" element={<Imprensa />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/intranet" element={<AdminIntranet />} />
      </Routes>
    </BrowserRouter>
  );
}
