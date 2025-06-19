import "./HomeCliente.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [nome, setNome] = useState<string>("Usuário");

  // Função para buscar o nome do usuário
  const fetchNome = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      setNome("Usuário");
      return;
    }

    let url = "";
    url = `http://localhost:8080/api/clientcontroller/buscarcliente?emailCliente=${encodeURIComponent(email)}`;
    
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

export default Home;