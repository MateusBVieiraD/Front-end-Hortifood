import { useEffect, useState } from 'react';
import './HomeLoja.css';
import ModalAlterarLoja from '../ModalAlterarLoja/ModalAlterarLoja';
import ModalAdicionarProduto from '../ModalAdicionarProduto/ModalAdicionarProduto';

const HomeLoja: React.FC = () => {
    const [nome, setNome] = useState<string>("Loja");
    const [showAlterarModal, setShowAlterarModal] = useState(false);
    const [produtos, setProdutos] = useState<any[]>([]);
    const [showAdicionarProduto, setShowAdicionarProduto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState<any | null>(null);

    // Busca todos os produtos por id até retornar null
    const fetchTodosProdutos = async () => {
        const produtos: any[] = [];
        let id = 1;

        while (true) {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/produtocontroller/buscarproduto/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (!res.ok) break;
                const text = await res.text();
                if (!text || text === "null") break;
                let prod;
                try {
                    prod = JSON.parse(text);
                } catch {
                    console.warn("Resposta não é JSON válido para id", id, ":", text);
                    break;
                }
                if (!prod || !prod.idProduto) break;
                produtos.push(prod);
                id++;
            } catch (e) {
                console.error("Erro ao buscar produto id", id, e);
                break;
            }
        }
        setProdutos(produtos);
    };

    useEffect(() => {
        fetchTodosProdutos();
    }, []);

    // Atualiza a lista local de produtos
    const handleSalvarProduto = (novoProduto: any) => {
        setProdutos(prev => ([...prev, novoProduto]));
    };

    return (
        <div className="container">
            <div className="inicio-intro">
                <div className="inicio">
                    <div className="texto">
                        <h1>
                            Bem-vindo(a) ao mercado {nome}!
                        </h1>
                        <button
                            onClick={() => setShowAlterarModal(true)}
                            style={{
                                position: "absolute",
                                top: "30px",
                                right: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#4CAF50",
                                color: "#000",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}>
                            Alterar Informações
                        </button>
                    </div>
                </div>
            </div>

            {/* Quadro dos produtos */}
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
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                    }}
                >
                    <h2 style={{ margin: 0, fontWeight: "bold", color: "#222" }}>
                        Produtos
                    </h2>
                    <button
                        onClick={() => setShowAdicionarProduto(true)}
                        style={{
                            background: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            fontSize: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            marginLeft: "auto"
                        }}
                        title="Adicionar Produto"
                    >
                        +
                    </button>
                </div>
                <div
                    style={{
                        marginTop: 16,
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        maxHeight: 350 // Limite de altura para ativar o scroll
                    }}
                >
                    {(!produtos || produtos.length === 0) ? (
                        <div style={{
                            color: "#888",
                            fontStyle: "italic",
                            fontSize: 20,
                            textAlign: "center",
                            width: "100%"
                        }}>
                            Ainda não há produtos cadastrados.
                        </div>
                    ) : (
                        <ul style={{
                            padding: 0,
                            margin: 0,
                            listStyle: "none",
                            width: "100%"
                        }}>
                          {produtos.map((produto) => (
                            <li key={produto.idProduto} style={{
                              padding: "12px 0",
                              borderBottom: "1px solid #eee",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}>
                              <span>
                                <strong>{produto.nome}</strong> - R$ {produto.preco?.toFixed(2)}
                              </span>
                              <button
                                onClick={() => setProdutoEditando(produto)}
                                style={{
                                  background: "#FFC107",
                                  color: "#222",
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
                                title="Editar Produto"
                              >
                                ✏️
                              </button>
                            </li>
                          ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Modal para alterar informações da loja */}
            {showAlterarModal && (
                <ModalAlterarLoja onClose={() => setShowAlterarModal(false)} />
            )}

            {/* Modal para adicionar produto */}
            {showAdicionarProduto && (
                <ModalAdicionarProduto
                    onClose={() => setShowAdicionarProduto(false)}
                    onSalvar={(produto) => {
                        handleSalvarProduto(produto);
                        setShowAdicionarProduto(false); // Fecha o modal após salvar
                    }}
                />
            )}

            {produtoEditando && (
              <ModalAdicionarProduto
                onClose={() => setProdutoEditando(null)}
                onSalvar={(produtoEditado) => {
                  setProdutos(produtos.map(p =>
                    p.id === produtoEditando.id ? { ...p, ...produtoEditado } : p
                  ));
                  setProdutoEditando(null);
                }}
                produto={produtoEditando}
              />
            )}
        </div>
    );
}

export default HomeLoja;