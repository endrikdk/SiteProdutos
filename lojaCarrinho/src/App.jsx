import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import CriarLogin from "./pages/criarlogin/criarLogin";
import ProdutosLayout from "./components/layouts/ProdutosLayout";
import VerProdutos from "./pages/produtos/VerProdutos";
import CriarProduto from "./pages/produtos/CriarProduto";
import RemoverProduto from "./pages/produtos/RemoverProduto";
import AtualizarProduto from "./pages/produtos/AtualizarProduto";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criarLogin" element={<CriarLogin />} />

        {/* Rotas privadas */}
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <ProdutosLayout />
            </PrivateRoute>
          }
        >
          {/* Rota padrão que abre a lista de produtos */}
          <Route index element={<VerProdutos />} />
          <Route path="criar" element={<CriarProduto />} />
          <Route path="remover" element={<RemoverProduto />} />
          <Route path="atualizar" element={<AtualizarProduto />} />
        </Route>

        {/* Redirecionar qualquer outra rota para home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
