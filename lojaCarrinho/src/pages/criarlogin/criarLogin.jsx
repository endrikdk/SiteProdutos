import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./criarLogin.css"

export default function CriarLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate(); 

  const handleCriarConta = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert(`Conta criada!\nEmail: ${email}`);
    navigate("/");
  };

  return (
    <div className="criarlogin-container">
      <h2>Criar Conta</h2>
      <div className="button-group">
      <form onSubmit={handleCriarConta}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="botao-criarlogin">Criar Conta</button>
      </form>
      </div>
    </div>
  );
}
