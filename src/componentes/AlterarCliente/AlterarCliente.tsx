import React, { useState, useEffect } from "react";
import "../Inicio/Inicio.css";
import "./AlterarCliente.css";

const AlterarCliente: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    emailCliente: "",
    senhaCliente: "",
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    casa: "",
    cep: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Busca os dados atuais do cliente ao abrir o modal
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) return;

    fetch(`http://localhost:8080/api/clientcontroller/buscarcliente?emailCliente=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados do cliente");
        const text = await res.text();
        let data;
        let endereco;
        try {
          data = JSON.parse(text);
          endereco = Array.isArray(data.clienteEndereco) && data.clienteEndereco.length > 0
            ? data.clienteEndereco[0]
            : {};
        } catch {
          data = {};
          endereco = {};
        }
        setForm({
          nome: data.nome || "",
          telefone: data.telefone || "",
          emailCliente: data.emailCliente || email || "",
          senhaCliente: "",
          estado: endereco.estado || "",
          cidade: endereco.cidade || "",
          bairro: endereco.bairro || "",
          logradouro: endereco.logradouro || "",
          casa: endereco.casa || "",
          cep: endereco.cep || "",
          cpf: data.cpf || "",
        });
      })
      .catch((err) => setErro(err.message));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");
      const res = await fetch("http://localhost:8080/api/clientcontroller/alterarcliente", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao alterar dados");
      setSucesso("Dados alterados com sucesso!");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit} className="formulario-alterar">
        <div className="texto">
          <h2>Alterar dados do cliente</h2>
        </div>
        <div className="campo-form">
          <label>Nome
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Telefone
            <input type="text" name="telefone" value={form.telefone} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>E-mail
            <input type="email" name="emailCliente" value={form.emailCliente} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Senha
            <input type="password" name="senhaCliente" value={form.senhaCliente} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Estado
            <input type="text" name="estado" value={form.estado} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Cidade
            <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Bairro
            <input type="text" name="bairro" value={form.bairro} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Logradouro
            <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Casa
            <input type="text" name="casa" value={form.casa} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>CEP
            <input type="text" name="cep" value={form.cep} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>CPF
            <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
          </label>
        </div>
        {erro && <div style={{ color: "red", marginBottom: 8 }}>{erro}</div>}
        {sucesso && <div style={{ color: "green", marginBottom: 8 }}>{sucesso}</div>}
        <div className="botoes" style={{ justifyContent: "center" }}>
          <button
            className="btn texto"
            type="button"
            onClick={onClose}
            style={{ marginRight: 8 }}
          >
            Cancelar
          </button>
          <button className="btn texto" type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlterarCliente;