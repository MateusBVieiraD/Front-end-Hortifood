import React, { useState } from "react";

interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  tipoProduto: string;
}

const CriarProduto: React.FC<{ onSalvar: (produto: Produto) => void; produto?: Produto }> = ({ onSalvar, produto }) => {
  const [nome, setNome] = useState(produto?.nome || "");
  const [descricao, setDescricao] = useState(produto?.descricao || "");
  const [preco, setPreco] = useState<number | "">(produto?.preco ?? "");
  const [tipoProduto, setTipoProduto] = useState(produto?.tipoProduto || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !descricao || preco === "" || Number(preco) <= 0 || !tipoProduto) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/produtocontroller/criarproduto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          tipoProduto
        }),
      });
      if (res.ok) {
        let novoProduto: Produto = { nome, descricao, preco: Number(preco), tipoProduto };
        // Tenta pegar o retorno do backend, se houver
        try {
          const data = await res.json();
          novoProduto = { ...novoProduto, ...data };
        } catch {
          // Se não houver JSON, segue com os dados do formulário
        }
        onSalvar(novoProduto);
        setNome("");
        setDescricao("");
        setPreco("");
        setTipoProduto("");
      } else {
        alert("Erro ao adicionar produto!");
      }
    } catch {
      alert("Erro ao adicionar produto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        style={{ color: "#000" }}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        required
        style={{ color: "#000" }}
        disabled={loading}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={e => setPreco(e.target.value === "" ? "" : Number(e.target.value))}
        required
        style={{ color: "#000" }}
        disabled={loading}
      />
      <select
        value={tipoProduto}
        onChange={e => setTipoProduto(e.target.value)}
        required
        style={{ color: "#000", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        disabled={loading}
      >
        <option value="">Selecione o tipo do produto</option>
        <option value="Hortalica">Hortaliça</option>
        <option value="Legume">Legume</option>
        <option value="Fruta">Fruta</option>
        <option value="Verdura">Verdura</option>
      </select>
      <button
        type="submit"
        style={{
          background: "#388e3c",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 0",
          marginTop: 12,
          fontSize: "1rem",
          width: "100%",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
        }}
        disabled={loading}
      >
        {loading ? "Salvando..." : "Adicionar Produto"}
      </button>
    </form>
  );
};

export default CriarProduto;