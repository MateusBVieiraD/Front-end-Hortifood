import './HomeEntregador.css';
import React, { useEffect, useState } from 'react';

const HomeEntregador: React.FC = () => {
    const [nome, setNome] = useState<string>("Entregador");

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
          </div>
        </div>
      </div>
    </div>
    );
};

export default HomeEntregador;