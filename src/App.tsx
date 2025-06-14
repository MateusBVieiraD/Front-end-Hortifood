import "./App.css";
import Header from "./componentes/header/Header";
import Inicio from "./componentes/Inicio/Inicio";
import Footer from "./componentes/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriarConta from "./componentes/CriarConta/CriarConta";
import CriarContaEntregador from "./componentes/CriarContaEntregador/CriarContaEntregador";
import CriarContaLoja from "./componentes/CriarContaLoja/CriarContaLoja";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/criarCliente" element={<CriarConta />} />
        <Route path="/criarEntregador" element={<CriarContaEntregador />} />
        <Route path="/criarLoja" element={<CriarContaLoja />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
