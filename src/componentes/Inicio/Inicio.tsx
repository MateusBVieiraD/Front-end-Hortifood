import "./Inicio.css";


function Inicio() {
  return (
    <>
      <div className="container">
        <div className="inicio-intro">
          <div className="imagem-inicio">
            <img
              src="src\img\estilo-de-desenho-animado-da-loja-de-carrinho-de-frutas-isolado.png"
              alt=""
            />
          </div>
          <div className="inicio">
            <div className="texto">
              <h2>
                Olá seja bem-vindo(a) ao Hortifood!
                <br />
                Aqui separamos as melhores frutas, legumes e verduras dos
                mercados pra vocês!
              </h2>
            </div>
            <div className="inicio-botoes">
              <h3 className="texto">Cadastre-se como</h3>
              <div className="botoes">
                <button className="btn texto"><i className="fa-solid fa-user"></i>Cliente</button>
                <button className="btn texto"><i className="fa-solid fa-store"></i>Loja</button>
                <button className="btn texto"><i className="fa-solid fa-motorcycle"></i>Entregador</button>
              </div>
              <div className="link">
                <a href="" className="texto">
                  Já tenho conta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
