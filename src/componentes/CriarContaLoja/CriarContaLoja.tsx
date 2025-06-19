import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CriarContaLoja.css";

const CriarContaLoja: React.FC = () => {
  const [form, setForm] = useState({
    nomeLoja: "",
    cnpjLoja: "",
    emailLoja: "",
    senhaLoja: "",
    telefoneLoja: "",
    descricaoLoja: "",
    ativo: false,
    horarioAbertura: "",
    horarioFechamento: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    data_distribuicao: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");
    try {
      const res = await fetch(
        "http://localhost:8080/api/lojacontroller/criarLoja",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Erro ao criar conta");
      setSucesso("Conta criada com sucesso!");
      setForm({
        nomeLoja: "",
        cnpjLoja: "",
        emailLoja: "",
        senhaLoja: "",
        telefoneLoja: "",
        descricaoLoja: "",
        ativo: false,
        horarioAbertura: "",
        horarioFechamento: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        data_distribuicao: "",
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
    <div className="container-form-loja">
      <form onSubmit={handleSubmit} className="formulario">
        <div className="texto">
          <h2>Crie sua conta de Loja</h2>
        </div>
        <div className="campo-form">
          <label>
            Nome da Loja
            <input
              type="text"
              name="nomeLoja"
              value={form.nomeLoja}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            CNPJ
            <input
              type="text"
              name="cnpjLoja"
              value={form.cnpjLoja}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            E-mail
            <input
              type="email"
              name="emailLoja"
              value={form.emailLoja}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Senha
            <input
              type="password"
              name="senhaLoja"
              value={form.senhaLoja}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Telefone
            <input
              type="text"
              name="telefoneLoja"
              value={form.telefoneLoja}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Descrição
            <textarea
              name="descricaoLoja"
              value={form.descricaoLoja}
              onChange={handleChange}
              required
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "150px",
                border: "none",
                borderRadius: "10px",
                outline: "none",
                padding: "10px",
              }}
            />
          </label>
        </div>
        <div
          className="campo-form"
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <label>
            Ativo
            <input
              type="checkbox"
              name="ativo"
              checked={form.ativo}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Horário de Abertura
            <input
              type="time"
              name="horarioAbertura"
              value={form.horarioAbertura}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Horário de Fechamento
            <input
              type="time"
              name="horarioFechamento"
              value={form.horarioFechamento}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            CEP
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Rua
            <input
              type="text"
              name="rua"
              value={form.rua}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Número
            <input
              type="text"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Complemento
            <input
              type="text"
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Bairro
            <input
              type="text"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Cidade
            <input
              type="text"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Estado
            <input
              type="text"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Data de Distribuição
            <input
              type="datetime-local"
              name="data_distribuicao"
              value={form.data_distribuicao}
              onChange={handleChange}
            />
          </label>
        </div>
        {erro && <div style={{ color: "red", marginBottom: 8 }}>{erro}</div>}
        {sucesso && (
          <div style={{ color: "green", marginBottom: 8 }}>{sucesso}</div>
        )}
        <button
          className="btn texto"
          type="submit"
          disabled={loading}
          style={{ marginTop: 12 }}
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>
    </div>
  );
};

export default CriarContaLoja;
