import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/produtos/ler")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find(item => item.produto.nome === produto.nome);
    
    if (itemExistente) {
      const novoCarrinho = carrinho.map(item => 
        item.produto.nome === produto.nome 
          ? { ...item, quantidade: item.quantidade + 1 } 
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
    
    setTotalItens(totalItens + 1);
  };

  const removerDoCarrinho = (produtoNome) => {
    const itemExistente = carrinho.find(item => item.produto.nome === produtoNome);
    
    if (itemExistente) {
      if (itemExistente.quantidade > 1) {
        const novoCarrinho = carrinho.map(item => 
          item.produto.nome === produtoNome 
            ? { ...item, quantidade: item.quantidade - 1 } 
            : item
        );
        setCarrinho(novoCarrinho);
      } else {
        const novoCarrinho = carrinho.filter(item => item.produto.nome !== produtoNome);
        setCarrinho(novoCarrinho);
      }
      
      setTotalItens(totalItens - 1);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + (item.produto.valor * item.quantidade);
    }, 0);
  };

  const toggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  return (
    <div className="produtos-container">
      
      <div className="produtos-grid">
        {produtos.map((produto, index) => (
          <div className="produto-card" key={index}>
            <div className="produto-imagem">
              <img src={produto.imagem} alt={produto.nome} />
            </div>
            <h3 className="produto-nome">{produto.nome}</h3>
            <p className="produto-preco">R$ {produto.valor.toFixed(2)}</p>
            <button 
              className="botao-adicionar" 
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <div className={`carrinho ${carrinhoAberto ? 'aberto' : ''}`}>
        <div className="cabecalho">
          <h2>
            Seu carrinho tem <span className="destaque">{totalItens} itens</span>
          </h2>
          <button className="botao-fechar" onClick={toggleCarrinho}>×</button>
        </div>

        <div className="itens">
          {carrinho.map((item, index) => (
            <div className="item" key={index}>
              <div className="imagem-item">
                <img src={item.produto.imagem} alt={item.produto.nome} />
              </div>
              <div className="detalhes-item">
                <h3>{item.produto.nome}</h3>
                <p className="preco">R$ {item.produto.valor.toFixed(2)}</p>
              </div>
              <div className="controle-quantidade">
                <button 
                  className="menos" 
                  onClick={() => removerDoCarrinho(item.produto.nome)}
                >
                  -
                </button>
                <span className="quantidade">{item.quantidade}</span>
                <button 
                  className="mais" 
                  onClick={() => adicionarAoCarrinho(item.produto)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rodape">
          <div className="total">
            <span>Total:</span>
            <span className="valor-total">R$ {calcularTotal().toFixed(2)}</span>
          </div>
          <div className="cupom">
            <i className="fas fa-tag"></i>
            <span>Adicionar cupom</span>
          </div>
          <button className="finalizar-compra">Finalizar compra</button>
        </div>
      </div>

      {!carrinhoAberto && (
        <div className="carrinho-toggle" onClick={toggleCarrinho}>
          <span className="carrinho-icone">🛒</span>
          <span className="carrinho-contador">{totalItens}</span>
        </div>
      )}
    </div>
  );
}
