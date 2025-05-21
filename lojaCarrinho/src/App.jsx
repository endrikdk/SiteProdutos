import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Produtos from './components/Produtos/Produtos';
import CriarLogin from './pages/criarlogin/criarLogin';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criarLogin" element={<CriarLogin />} />
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
