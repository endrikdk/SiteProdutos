import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from "../Produtos/Produtos";
import CriarLogin from '../../pages/criarlogin/criarLogin';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criarLogin" element={<criarLogin />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}
