import { useState } from "react";
import "../Inicio/Inicio.css";
import "./ModalLogin.css";

type UserType = "entregador" | "cliente" | "loja" | null;

const ModalLogin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const getLoginEndpoint = (type: UserType) => {
    switch (type) {
      case "cliente":
        return "/api/clientAuthcontroller/validarLoginCliente";
      case "loja":
        return "/api/lojaAuthcontroller/validarLoginLoja";
      case "entregador":
        return "/api/entregadorAuthcontroller/validarLoginEntregador";
      default:
        return "";
    }
  };

  const body =
    userType === "loja"
      ? { emailLoja: email, senhaLoja: senha }
      : userType === "cliente"
      ? { emailCliente: email, senhaCliente: senha }
      : userType === "entregador"
      ? { email: email, senhaEntregador: senha }
      : {};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const endpoint = getLoginEndpoint(userType);

      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Login inválido");

      const contentType = res.headers.get("content-type");

      let token = "";

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        token = data.token;
      } else {
        token = await res.text(); 
      }

      console.log("Token JWT gerado:", token);
      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
      onClose();
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 320,
          position: "relative",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
          }}
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        {!userType ? (
          <>
            <h2 className="texto" style={{ textAlign: "center" }}>
              Escolha o tipo de usuário
            </h2>
            <div
              className="botoes"
              style={{
                justifyContent: "center",
                flexDirection: "column",
                gap: "15px",
                padding: "20px",
              }}
            >
              <button
                className="btn texto"
                onClick={() => setUserType("cliente")}
              >
                <i className="fa-solid fa-user"></i>Cliente
              </button>
              <button
                className="btn texto"
                onClick={() => setUserType("loja")}
              >
                <i className="fa-solid fa-store"></i>Loja
              </button>
              <button
                className="btn texto"
                onClick={() => setUserType("entregador")}
              >
                <i className="fa-solid fa-motorcycle"></i>Entregador
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="texto" style={{ textAlign: "center" }}>
              Login {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="texto"
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="texto"
              />
              {erro && (
                <div style={{ color: "red", marginBottom: 8 }}>{erro}</div>
              )}
              <div className="botoes" style={{ justifyContent: "center" }}>
                <button
                  className="btn texto"
                  type="button"
                  onClick={() => setUserType(null)}
                >
                  Voltar
                </button>
                <button className="btn texto" type="submit" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
