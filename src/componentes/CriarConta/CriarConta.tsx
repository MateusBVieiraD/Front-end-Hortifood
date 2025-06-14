import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Inicio/Inicio.css";
import './CriarConta.css'

const CriarConta: React.FC = () => {
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErro("");
        setSucesso("");
        try {
            const res = await fetch("http://localhost:8080/api/clientcontroller/criarcliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Erro ao criar conta");
            setSucesso("Conta criada com sucesso!");
            setForm({
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
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
  };



  return (
    <div className="container-form">
          <form onSubmit={handleSubmit} className="formulario">
        <div className="texto">
            <h2>
                Crie sua conta
            </h2>
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
            <button className="btn texto" type="submit" disabled={loading} style={{ marginTop: 12 }}>
              {loading ? "Criando..." : "Criar Conta"}
            </button>
          </form>
    </div>
  );
};

export default CriarConta;