import { useEffect, useState } from 'react';
import './HomeLoja.css';

const HomeLoja: React.FC = () => {
    const [nome, setNome] = useState<string>("Loja");
    
    const fetchNome = async () => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
    
        if (!token || !email) {
        setNome("Loja");
        return;
        }
    
        let url = "";
        url = `http://localhost:8080/api/lojacontroller/acharLoja?emailLoja=${encodeURIComponent(email)}`;
    
        try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
    
        if (!res.ok) {
            setNome("Loja");
            return;
        }
    
        const text = await res.text();
        let nomeLoja = "Loja";
        try {
            const data = JSON.parse(text);
            if (typeof data === "object" && data !== null && data.nomeLoja) {
            nomeLoja = data.nomeLoja;
            } else if (typeof data === "string") {
            nomeLoja = data.replace(/^"|"$/g, "");
            }
        } catch {
            nomeLoja = text || "Loja";
        }
        setNome(nomeLoja || "Loja");
        } catch {
        setNome("Loja");
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
}

export default HomeLoja;