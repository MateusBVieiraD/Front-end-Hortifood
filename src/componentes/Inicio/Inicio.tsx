import './Inicio.css'
function Inicio(){
    return(
    <>
        <div className="container">
            <div className="inicio-intro">
            <div className="imagem-inicio">
                <img src="src\img\vecteezy_cartoon-vegetables-and-fruits_10283782.png" alt="" />
            </div>
            <div className="texto">
            <h2>Olá seja bem-vindo(a) ao Hortifood! 
                <br />Aqui separamos as melhores frutas, legumes e verduras dos mercados pra vocês!</h2>
            </div>
            </div>
            <div className="inicio-botoes">
            <div className="botoes">
                <h3>Cadastre-se como</h3>
                <button>Cliente</button>
                <button>Loja</button>
                <button>Entregador</button>
                <a href="">Já tenho conta</a>
            </div>
            </div>
        </div>
    </>)
}

export default Inicio 