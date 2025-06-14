import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";
import ModalLogin from "../ModalLogin/ModalLogin";

function Inicio() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="inicio-intro">
          <div className="imagem-inicio">
            <img
              src="public/img/estilo-de-desenho-animado-da-loja-de-carrinho-de-frutas-isolado.png"
              alt=""
            />
          </div>
          <div className="inicio">
            <div className="texto">
              <h2>
                Olá seja bem-vindo(a) ao Hortifood!
                <br />
                Aqui separamos as melhores frutas, legumes e verduras dos
                mercados pra você!
              </h2>
            </div>
            <div className="inicio-botoes">
              <h3 className="texto">Cadastre-se como</h3>
              <div className="botoes">
                <button className="btn texto" onClick={() => navigate("/criarCliente")}>
                  <i className="fa-solid fa-user"></i>Cliente
                </button>
                <button className="btn texto" onClick={() => navigate("/criarLoja")}>
                  <i className="fa-solid fa-store"></i>Loja
                </button>
                <button className="btn texto" onClick={() => navigate("/criarEntregador")}>
                  <i className="fa-solid fa-motorcycle"></i>Entregador
                </button>
              </div>
              <div className="link">
                <a
                  href="#"
                  className="texto"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Já tenho conta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ModalLogin onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Inicio;