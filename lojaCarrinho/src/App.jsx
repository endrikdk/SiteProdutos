import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Produtos from './components/Produtos/Produtos';
import CriarLogin from './pages/criarlogin/criarLogin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Produtos" element={<Produtos />} />
      <Route path="/criarLogin" element={<CriarLogin />} />

    </Routes>
  );
}
