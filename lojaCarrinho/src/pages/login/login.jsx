import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const handleLogin = (e) => {
    e.preventDefault();

    const fakeUser = { email };
    login(fakeUser); 

    alert("Logado com sucesso!");
    navigate("/produtos"); 
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
