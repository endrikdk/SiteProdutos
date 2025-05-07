import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function home() {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate("/login");
    };
    const irParaProdutos = () => {
        navigate("/produtos");
        };

        const irParaCadastro = () => {
          navigate("/criarLogin");
          };

  return (
    <div className="home-container">
        <h1>Bem-vindo a loja!</h1>
        <div className="button-group">
        <button onClick={irParaLogin} className="botao-home">Login</button>
        <button onClick={irParaCadastro} className="botao-home">Cadastre-se</button>
        <button onClick={irParaProdutos} className="botao-home">Cheque os produtos</button>
      </div>
    </div>  
  );
}
