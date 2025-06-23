import './HomeEntregador.css';
import React, { useEffect, useState } from 'react';
import ModalAlterarEntregador from '../ModalAlterarEntregador/ModalAlterarEntregador';

const HomeEntregador: React.FC = () => {
    const [nome, setNome] = useState<string>("Entregador");
    const [showAlterarModal, setShowAlterarModal] = useState(false);
    const [entregas, setEntregas] = useState<any[]>([]);

    const fetchNome = async () => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (!token || !email) {
            setNome("Entregador");
            return;
        }

        let url = "";
        url = `http://localhost:8080/api/entregadorcontroller/buscarentregador?email=${encodeURIComponent(email)}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setNome("Entregador");
                return;
            }

            const text = await res.text();
            let nomeEntregador = "Entregador";
            try {
                const data = JSON.parse(text);
                if (typeof data === "object" && data !== null && data.nomeEntregador) {
                    nomeEntregador = data.nomeEntregador;
                } else if (typeof data === "string") {
                    nomeEntregador = data.replace(/^"|"$/g, "");
                }
            } catch {
                nomeEntregador = text || "Entregador";
            }
            setNome(nomeEntregador || "Entregador");
        } catch {
            setNome("Entregador");
        }
    };

    // Buscar entregas (simulação: pega um cliente do banco e busca o endereço pelo endpoint correto)
    const fetchEntregas = async () => {
        try {
            // Buscar cliente
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            let clienteEndereco = "";
            let clienteNome = "";
            let clienteId = null;
            if (token && email) {
                const resCliente = await fetch(`http://localhost:8080/api/clientcontroller/buscarcliente?emailCliente=${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (resCliente.ok) {
                    const text = await resCliente.text();
                    try {
                        let data = JSON.parse(text);
                        if (typeof data === "string") data = JSON.parse(data);
                        if (typeof data === "object" && data !== null) {
                            clienteNome = data.nome || "";
                            clienteId = data.idCliente || data.id || null;
                        }
                    } catch {
                        // fallback
                    }
                }
            }
            // Buscar endereço pelo id do cliente
            if (token && clienteId) {
                const resEndereco = await fetch(`http://localhost:8080/api/clienteendereco/buscarEnderecoSingular/${clienteId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (resEndereco.ok) {
                    let enderecoData: any = await resEndereco.text();
                    try {
                        // Se vier como string JSON, faz o parse e tipa como any
                        enderecoData = JSON.parse(enderecoData);
                    } catch {
                        // Se não for JSON, mantém como string
                    }
                    if (typeof enderecoData === "object" && enderecoData !== null) {
                        clienteEndereco = `${enderecoData.logradouro || ''}, ${enderecoData.casa || ''} - ${enderecoData.bairro || ''}, ${enderecoData.cidade || ''} - ${enderecoData.estado || ''}, CEP: ${enderecoData.cep || ''}`;
                    } else if (typeof enderecoData === "string") {
                        clienteEndereco = enderecoData;
                    }
                }
            }
            // Buscar produto real (exemplo: id 1)
            let produtoNome = "";
            try {
                const resProduto = await fetch("http://localhost:8080/api/produtocontroller/buscarproduto/1");
                if (resProduto.ok) {
                    const produtoData = await resProduto.json();
                    produtoNome = produtoData.nome || "Produto Exemplo";
                } else {
                    produtoNome = "Produto Exemplo";
                }
            } catch {
                produtoNome = "Produto Exemplo";
            }
            setEntregas([
                {
                    produto: produtoNome,
                    endereco: clienteEndereco,
                    cliente: clienteNome
                }
            ]);
        } catch {
            setEntregas([]);
        }
    };

    useEffect(() => {
        fetchNome();
        fetchEntregas();
    }, []);

    return (
        <div className="container">
            <div className="inicio-intro">
                <div className="inicio">
                    <div className="texto">
                        <h1>
                            Bem-vindo(a), {nome}!
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
                    Entregas pendentes
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
                    {(!entregas || entregas.length === 0) ? (
                        <div style={{
                            color: "#888",
                            fontStyle: "italic",
                            fontSize: 20,
                            textAlign: "center",
                            width: "100%"
                        }}>
                            Nenhuma entrega pendente.
                        </div>
                    ) : (
                        <ul style={{
                            padding: 0,
                            margin: 0,
                            listStyle: "none",
                            width: "100%"
                        }}>
                            {entregas.map((entrega, idx) => (
                                <li key={idx} style={{
                                    padding: "12px 0",
                                    borderBottom: "1px solid #eee"
                                }}>
                                    <strong>Produto:</strong> {entrega.produto} <br />
                                    <strong>Endereço:</strong> {entrega.endereco}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Modal para alterar informações do entregador */}
            {showAlterarModal && (
                <ModalAlterarEntregador onClose={() => setShowAlterarModal(false)} />
            )}
        </div>
    );
};

export default HomeEntregador;