import React from "react";
import { Routes, Route } from "react-router-dom";
import Produtos from "../Produtos/Produtos";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import CriarLogin from "../../pages/criarlogin/criarLogin";
import GerenciarProdutos from "../../pages/gerenciar/GerenciarProdutos";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criar-login" element={<CriarLogin />} />
      <Route path="/gerenciar" element={<GerenciarProdutos />} />
    </Routes>
  );
}
