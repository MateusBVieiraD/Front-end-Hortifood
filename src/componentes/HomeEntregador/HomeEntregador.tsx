import './HomeEntregador.css';
import React, { useEffect, useState } from 'react';
import ModalAlterarEntregador from '../ModalAlterarEntregador/ModalAlterarEntregador';

const HomeEntregador: React.FC = () => {
    const [nome, setNome] = useState<string>("Entregador");
    const [showAlterarModal, setShowAlterarModal] = useState(false);

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

    useEffect(() => {
        fetchNome();
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
            {/* Modal para alterar informações do entregador */}
            {showAlterarModal && (
                <ModalAlterarEntregador onClose={() => setShowAlterarModal(false)} />
            )}
        </div>
    );
};

export default HomeEntregador;