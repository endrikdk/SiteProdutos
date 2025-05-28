import React, { useState } from "react";
import "./ProdutoForm.css";

export default function CriarProduto() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const [mensagem, setMensagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !valor || !imagem) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const produto = {
      nome,
      valor: parseFloat(valor),
      imagem,
    };

    try {
      const response = await fetch("http://localhost:3000/produtos/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensagem(`Erro: ${errorData.erro || "Não foi possível criar o produto"}`);
      } else {
        setMensagem("Produto criado com sucesso!");
        setNome("");
        setValor("");
        setImagem("");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="produto-form-page">
      <div className="produto-form-container">
        <h2>Criar Produto</h2>
        <form onSubmit={handleSubmit} className="produto-form">
          <label>
            Nome do Produto:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </label>
          <label>
            Valor do Produto:
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor"
              required
            />
          </label>
          <label>
            URL da Imagem:
            <input
              type="url"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              required
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}
