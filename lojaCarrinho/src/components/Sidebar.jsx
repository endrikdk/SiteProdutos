import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/produtos">Ver Produtos</Link></li>
        <li><Link to="/produtos/criar">Criar Produto</Link></li>
        <li><Link to="/produtos/remover">Remover Produto</Link></li>
        <li><Link to="/produtos/atualizar">Atualizar Produto</Link></li>
      </ul>
    </div>
  );
}
