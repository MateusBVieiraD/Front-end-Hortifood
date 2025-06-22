import React, { useState, useEffect } from "react";
import "../Inicio/Inicio.css";
import "./AlterarEntregador.css";

const AlterarEntregador: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({
    nomeEntregador: "",
    cpfEntregador: "",
    email: "",
    senhaEntregador: "",
    dataNascimento: "",
    tipoVeiculo: "",
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    casa: "",
    cep: "",
  });
  const [enderecoId, setEnderecoId] = useState<number | null>(null); // <-- Novo estado
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Busca os dados atuais do entregador ao abrir o modal
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) return;

    fetch(`http://localhost:8080/api/entregadorcontroller/buscarentregador?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados do entregador");
        const text = await res.text();
        let data;
        let endereco;
        try {
          data = JSON.parse(text);
          endereco = data.endereco || {};
        } catch {
          data = {};
          endereco = {};
        }
        setForm({
          nomeEntregador: data.nomeEntregador || "",
          cpfEntregador: data.cpfEntregador || "",
          email: data.email || email || "",
          senhaEntregador: "",
          dataNascimento: data.dataNascimento || "",
          tipoVeiculo: data.tipoVeiculo || "",
          estado: endereco.estado || "",
          cidade: endereco.cidade || "",
          bairro: endereco.bairro || "",
          logradouro: endereco.logradouro || "",
          casa: endereco.casa || "",
          cep: endereco.cep || "",
        });
        setEnderecoId(endereco.idEnderecoEntregador || null); // <-- Salva o id do endereço
      })
      .catch((err) => setErro(err.message));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      // Atualiza os dados do entregador (caso necessário)
      const bodyEntregador = {
        nomeEntregador: form.nomeEntregador,
        cpfEntregador: form.cpfEntregador,
        email: form.email,
        senhaEntregador: form.senhaEntregador,
        dataNascimento: form.dataNascimento,
        tipoVeiculo: form.tipoVeiculo,
      };
      await fetch("http://localhost:8080/api/entregadorcontroller/alterarentregador", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyEntregador),
      });

      // Atualiza o endereço do entregador
      if (enderecoId) {
        const bodyEndereco = {
          estado: form.estado,
          cidade: form.cidade,
          bairro: form.bairro,
          logradouro: form.logradouro,
          casa: form.casa,
          cep: form.cep,
        };
        const resEndereco = await fetch(
          `http://localhost:8080/api/entregadorendereco/atualizar/${enderecoId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyEndereco),
          }
        );
        if (!resEndereco.ok) throw new Error("Erro ao alterar endereço");
      }

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
          <h2>Alterar dados do entregador</h2>
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
            <select
              name="tipoVeiculo"
              value={form.tipoVeiculo}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">Selecione...</option>
              <option value="CARRO">Carro</option>
              <option value="MOTO">Moto</option>
              <option value="BICICLETA">Bicicleta</option>
            </select>
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

export default AlterarEntregador;