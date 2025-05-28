import React, { useEffect, useState } from "react";
import "./AtualizarProduto.css";

export default function AtualizarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3000/produtos/ler");
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      setMensagem("Erro ao carregar produtos.");
      console.error(error);
    }
  };

  const abrirModal = (produto) => {
    setProdutoEditando({ ...produto });
    setModalAberto(true);
    setMensagem(null);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoEditando(null);
    setMensagem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEditando((prev) => ({ ...prev, [name]: value }));
  };

  const salvarAlteracoes = async () => {
    if (!produtoEditando.nome || !produtoEditando.valor || !produtoEditando.imagem) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/produtos/atualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: produtoEditando.id,
          nome: produtoEditando.nome,
          valor: parseFloat(produtoEditando.valor),
          imagem: produtoEditando.imagem,
        }),
      });

      if (!res.ok) {
        const erro = await res.json();
        setMensagem(`Erro: ${erro.erro || "Não foi possível atualizar"}`);
        return;
      }

      setMensagem("Produto atualizado com sucesso!");
      fetchProdutos();
      fecharModal();
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  const removerProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este produto?")) return;

    try {
      const res = await fetch("http://localhost:3000/produtos/deletar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const erro = await res.json();
        setMensagem(`Erro: ${erro.erro || "Não foi possível deletar"}`);
        return;
      }

      setMensagem("Produto removido com sucesso!");
      fetchProdutos();
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="produto-form-container">
      <h2>Atualizar Produtos</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <div className="lista-produtos">
        {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-item">
            <img src={produto.imagem} alt={produto.nome} width={80} />
            <div className="info-produto">
              <h3>{produto.nome}</h3>
              <p>R$ {produto.valor.toFixed(2)}</p>
            </div>
            <div className="acoes-produto">
              <button onClick={() => abrirModal(produto)}>Editar</button>
              <button onClick={() => removerProduto(produto.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && produtoEditando && (
        <div className="modal">
          <div className="modal-conteudo">
            <h3>Editar Produto</h3>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={produtoEditando.nome}
                onChange={handleChange}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                step="0.01"
                name="valor"
                value={produtoEditando.valor}
                onChange={handleChange}
              />
            </label>
            <label>
              URL da Imagem:
              <input
                type="url"
                name="imagem"
                value={produtoEditando.imagem}
                onChange={handleChange}
              />
            </label>
            <div className="botoes-modal">
              <button onClick={salvarAlteracoes}>Salvar</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
            {mensagem && <p className="mensagem">{mensagem}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
