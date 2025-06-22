import React, { useState, useEffect } from "react";
import "../Inicio/Inicio.css";
import "./AlterarLoja.css";

const AlterarLoja: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({
    nomeLoja: "",
    cnpjLoja: "",
    emailLoja: "",
    senhaLoja: "",
    telefoneLoja: "",
    descricaoLoja: "",
    ativo: true,
    horarioAbertura: "",
    horarioFechamento: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [enderecoId, setEnderecoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || !email) return;

    fetch(`http://localhost:8080/api/lojacontroller/acharLoja?emailLoja=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados da loja");
        const text = await res.text();
        let data;
        let endereco;
        try {
          data = JSON.parse(text);
          endereco = data.enderecoLoja || {};
        } catch {
          data = {};
          endereco = {};
        }
        setForm({
          nomeLoja: data.nomeLoja || "",
          cnpjLoja: data.cnpjLoja || "",
          emailLoja: data.emailLoja || email || "",
          senhaLoja: "",
          telefoneLoja: data.telefoneLoja || "",
          descricaoLoja: data.descricaoLoja || "",
          ativo: data.ativo ?? true,
          horarioAbertura: data.horarioAbertura || "",
          horarioFechamento: data.horarioFechamento || "",
          cep: endereco.cep || "",
          rua: endereco.rua || "",
          numero: endereco.numero || "",
          complemento: endereco.complemento || "",
          bairro: endereco.bairro || "",
          cidade: endereco.cidade || "",
          estado: endereco.estado || "",
        });
        setEnderecoId(endereco.id || null);
      })
      .catch((err) => setErro(err.message));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      // Envie todos os campos no mesmo nível, igual ao JSON que funcionou
      const bodyLoja = {
        nomeLoja: form.nomeLoja,
        cnpjLoja: form.cnpjLoja,
        emailLoja: form.emailLoja,
        senhaLoja: form.senhaLoja,
        telefoneLoja: form.telefoneLoja,
        descricaoLoja: form.descricaoLoja,
        ativo: form.ativo,
        horarioAbertura: form.horarioAbertura,
        horarioFechamento: form.horarioFechamento,
        cep: form.cep,
        rua: form.rua,
        numero: form.numero,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        // cardapio e historicos só se você quiser enviar, normalmente não precisa para update simples
      };

      await fetch("http://localhost:8080/api/lojacontroller/alterarLoja", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyLoja),
      });

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
          <h2>Alterar dados da loja</h2>
        </div>
        <div className="campo-form">
          <label>Nome
            <input type="text" name="nomeLoja" value={form.nomeLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>CNPJ
            <input type="text" name="cnpjLoja" value={form.cnpjLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>E-mail
            <input type="email" name="emailLoja" value={form.emailLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Senha
            <input type="password" name="senhaLoja" value={form.senhaLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Telefone
            <input type="text" name="telefoneLoja" value={form.telefoneLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Descrição
            <textarea name="descricaoLoja" value={form.descricaoLoja} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>
            Ativo
            <input
              type="checkbox"
              name="ativo"
              checked={form.ativo}
              onChange={handleChange}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div className="campo-form">
          <label>Horário de Abertura
            <input type="time" name="horarioAbertura" value={form.horarioAbertura} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Horário de Fechamento
            <input type="time" name="horarioFechamento" value={form.horarioFechamento} onChange={handleChange} required />
          </label>
        </div>
        <hr />
        <div className="campo-form">
          <label>CEP
            <input type="text" name="cep" value={form.cep} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Rua
            <input type="text" name="rua" value={form.rua} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Número
            <input type="text" name="numero" value={form.numero} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Complemento
            <input type="text" name="complemento" value={form.complemento} onChange={handleChange} />
          </label>
        </div>
        <div className="campo-form">
          <label>Bairro
            <input type="text" name="bairro" value={form.bairro} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Cidade
            <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required />
          </label>
        </div>
        <div className="campo-form">
          <label>Estado
            <input type="text" name="estado" value={form.estado} onChange={handleChange} required />
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

export default AlterarLoja;