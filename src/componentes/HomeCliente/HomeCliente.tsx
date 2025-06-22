import React, { useEffect, useState } from "react";
import "./HomeCliente.css";
import ModalAlterarCliente from "../ModalAlterarCliente/ModalAlterarCliente";

// Modal para escolher método de pagamento
const ModalPagamento: React.FC<{
  produto: any;
  onClose: () => void;
}> = ({ produto, onClose }) => {
  const [metodo, setMetodo] = useState<string>("PIX");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [numero, setNumero] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [dataVencimento, setDataVencimento] = useState<string>("");

  const handleComprar = async () => {
    setLoading(true);
    setMensagem(null);
    try {
      // Ajusta dataVencimento para o formato "yyyy-MM-dd" (LocalDate)
      let dataVenc = dataVencimento;
      if (dataVencimento && /^\d{4}-\d{2}$/.test(dataVencimento)) {
        // Se vier "2026-08", transforma para "2026-08-01"
        dataVenc = `${dataVencimento}-01`;
      }

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/metodopagamento/criarmetodopagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          numero,
          cvv,
          dataVencimento: dataVenc
        })
      });
      if (res.ok) {
        setMensagem("Compra registrada com sucesso!");
      } else {
        setMensagem("Erro ao registrar compra.");
      }
    } catch {
      setMensagem("Erro ao registrar compra.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} title="Fechar">
          ×
        </button>
        <h2 style={{ color: "#000" }}>Comprar: {produto.nome}</h2>
        <div style={{ margin: "16px 0" }}>
          <label style={{ color: "#000" }}>
            Método de pagamento:
            <select
              value={metodo}
              onChange={e => setMetodo(e.target.value)}
              style={{ marginLeft: 8, color: "#000" }}
              disabled // Apenas cartão, então desabilita o select
            >
              <option value="Cartão">Cartão</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div>
            <label style={{ color: "#000" }}>
              Número do cartão:
              <input
                type="text"
                value={numero}
                onChange={e => setNumero(e.target.value)}
                style={{ marginLeft: 8, color: "#000" }}
                maxLength={16}
                placeholder="Número"
              />
            </label>
          </div>
          <div>
            <label style={{ color: "#000" }}>
              CVV:
              <input
                type="text"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
                style={{ marginLeft: 8, width: 50, color: "#000" }}
                maxLength={4}
                placeholder="CVV"
              />
            </label>
          </div>
          <div>
            <label style={{ color: "#000" }}>
              Data de vencimento:
              <input
                type="month"
                value={dataVencimento}
                onChange={e => setDataVencimento(e.target.value)}
                style={{ marginLeft: 8, color: "#000" }}
                placeholder="MM/AAAA"
              />
            </label>
          </div>
        </div>
        <button
          onClick={handleComprar}
          disabled={loading}
          style={{
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          {loading ? "Processando..." : "Confirmar Compra"}
        </button>
        {mensagem && (
          <div style={{ marginTop: 16, color: mensagem.includes("sucesso") ? "green" : "red" }}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [nome, setNome] = useState<string>("Usuário");
  const [showAlterarModal, setShowAlterarModal] = useState(false);
  const [lojas, setLojas] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoComprando, setProdutoComprando] = useState<any | null>(null);

  // Função para buscar o nome do usuário
  const fetchNome = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      setNome("Usuário");
      return;
    }

    let url = `http://localhost:8080/api/clientcontroller/buscarcliente?emailCliente=${encodeURIComponent(email)}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setNome("Usuário");
        return;
      }

      const text = await res.text();
      let nomeUsuario = "Usuário";
      try {
        const data = JSON.parse(text);
        if (typeof data === "object" && data !== null && data.nome) {
          nomeUsuario = data.nome;
        } else if (typeof data === "string") {
          nomeUsuario = data.replace(/^"|"$/g, "");
        }
      } catch {
        nomeUsuario = text || "Usuário";
      }
      setNome(nomeUsuario || "Usuário");
    } catch {
      setNome("Usuário");
    }
  };

  // Buscar todas as lojas
  const fetchLojas = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/lojacontroller/listarTodos");
      if (!res.ok) return;
      const data = await res.json();
      setLojas(Array.isArray(data) ? data : []);
    } catch {
      setLojas([]);
    }
  };

  // Buscar todos os produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/produtocontroller/listarTodosProdutos");
      if (!res.ok) return;
      const data = await res.json();
      setProdutos(Array.isArray(data) ? data : []);
    } catch {
      setProdutos([]);
    }
  };

  useEffect(() => {
    fetchNome();
    fetchLojas();
    fetchProdutos();
  }, []);

  const alterarCliente = () => {
    setShowAlterarModal(true);
  };

  // Função para pegar produtos de uma loja pelo id da loja
  const getProdutosDaLoja = (idLoja: number) => {
    if (lojas.length > 0 && lojas[0].idLoja === idLoja) {
      return produtos; // Todos os produtos vão para a primeira loja
    }
    return [];
  };

  return (
    <div className="container">
      <div className="inicio-intro">
        <div className="inicio">
          <div className="texto">
            <h1>
              Bem-vindo(a), {nome}!
            </h1>
            <button onClick={alterarCliente}
              style={{ position: "absolute",
                      top: "30px",
                      right: "20px",
                      padding: "10px 20px",
                      backgroundColor: "#4CAF50",
                      color: "#000",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer" }}>
              Alterar Informações
            </button>
          </div>
        </div>
      </div>

      {/* Quadro das lojas e produtos */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "40px",
          margin: "40px auto",
          maxWidth: "1000px",
          minWidth: "600px",
          minHeight: 350,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold", color: "#222" }}>
          Lojas disponíveis
        </h2>
        <div
          style={{
            marginTop: 16,
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxHeight: 350
          }}
        >
          {(!lojas || lojas.length === 0) ? (
            <div style={{
              color: "#888",
              fontStyle: "italic",
              fontSize: 20,
              textAlign: "center",
              width: "100%"
            }}>
              Ainda não há lojas disponíveis.
            </div>
          ) : (
            <ul style={{
              padding: 0,
              margin: 0,
              listStyle: "none",
              width: "100%"
            }}>
              {lojas.map((loja) => (
                <li key={loja.idLoja} style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #eee"
                }}>
                  <strong>{loja.nomeLoja}</strong>
                  <ul style={{ marginTop: 8, marginLeft: 24 }}>
                    {getProdutosDaLoja(loja.idLoja).length === 0 ? (
                      <li style={{ color: "#888", fontStyle: "italic" }}>Nenhum produto cadastrado.</li>
                    ) : (
                      getProdutosDaLoja(loja.idLoja).map((produto) => (
                        <li key={produto.idProduto} style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <span>
                            {produto.nome} - R$ {produto.preco?.toFixed(2)}
                          </span>
                          <button
                            onClick={() => setProdutoComprando(produto)}
                            style={{
                              background: "#4CAF50",
                              color: "#fff",
                              border: "none",
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                              fontSize: 18,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginLeft: 8,
                              cursor: "pointer"
                            }}
                            title="Comprar Produto"
                          >
                            🛒
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal para alterar informações do cliente */}
      {showAlterarModal && (
        <ModalAlterarCliente onClose={() => setShowAlterarModal(false)} />
      )}

      {/* Modal de compra */}
      {produtoComprando && (
        <ModalPagamento
          produto={produtoComprando}
          onClose={() => setProdutoComprando(null)}
        />
      )}
    </div>
  );
};

export default Home;