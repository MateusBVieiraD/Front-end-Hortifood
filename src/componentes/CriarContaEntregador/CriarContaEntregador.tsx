import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CriarContaEntregador.css";

const CriarContaEntregador: React.FC = () => {
  const [form, setForm] = useState({
    status: 0,
    nomeEntregador: "",
    cpfEntregador: "",
    email: "",
    senhaEntregador: "",
    dataNascimento: "",
    tipoVeiculo: "",
    totalEntregas: 0,
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    casa: "",
    cep: "",
    tipoDocumento: "",
    dataEnvio: "",
    statusValidacao: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");
    try {
      const res = await fetch("http://localhost:8080/api/entregadorcontroller/criarentregador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao criar conta");
      setSucesso("Conta criada com sucesso!");
      setForm({
        status: 0,
        nomeEntregador: "",
        cpfEntregador: "",
        email: "",
        senhaEntregador: "",
        dataNascimento: "",
        tipoVeiculo: "",
        totalEntregas: 0,
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        casa: "",
        cep: "",
        tipoDocumento: "",
        dataEnvio: "",
        statusValidacao: "",
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
    <div className="container-form-entregador">
      
          <form onSubmit={handleSubmit} className="formulario">
          <div className="texto">
            <h2>Crie sua conta de Entregador</h2>
          </div>
            <div className="campo-form">
              <label>Nome
                <input type="text" name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>CPF
                <input type="text" name="cpfEntregador" value={form.cpfEntregador} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>E-mail
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>Senha
                <input type="password" name="senhaEntregador" value={form.senhaEntregador} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>Data de Nascimento
                <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>Tipo de Veículo
                <select name="tipoVeiculo" value={form.tipoVeiculo} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="MOTO">Moto</option>
                  <option value="CARRO">Carro</option>
                  <option value="BICICLETA">Bicicleta</option>
                </select>
              </label>
            </div>
            <div className="campo-form">
              <label>Total de Entregas
                <input type="number" name="totalEntregas" value={form.totalEntregas} onChange={handleChange} min={0} required />
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
              <label>Tipo de Documento
                <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="CNH">CNH</option>
                  <option value="RG">RG</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </label>
            </div>
            <div className="campo-form">
              <label>Data de Envio
                <input type="date" name="dataEnvio" value={form.dataEnvio} onChange={handleChange} required />
              </label>
            </div>
            <div className="campo-form">
              <label>Status de Validação
                <input type="text" name="statusValidacao" value={form.statusValidacao} onChange={handleChange} required />
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

export default CriarContaEntregador;
