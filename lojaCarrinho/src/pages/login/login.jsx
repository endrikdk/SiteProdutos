import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // <-- importe aqui
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- use o contexto de autenticação

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulando login com usuário fictício
    const fakeUser = { email };
    login(fakeUser); // <-- seta o usuário como autenticado

    alert("Logado com sucesso!");
    navigate("/produtos"); // <-- agora pode acessar a rota privada
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="button-group">
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="botao-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}
