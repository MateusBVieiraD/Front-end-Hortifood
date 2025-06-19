import "./App.css";
import Header from "./componentes/header/Header";
import Inicio from "./componentes/Inicio/Inicio";
import Footer from "./componentes/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriarConta from "./componentes/CriarConta/CriarConta";
import CriarContaEntregador from "./componentes/CriarContaEntregador/CriarContaEntregador";
import CriarContaLoja from "./componentes/CriarContaLoja/CriarContaLoja";
import HomeCliente from "./componentes/HomeCliente/HomeCliente";
import HomeLoja from "./componentes/HomeLoja/HomeLoja";
import HomeEntregador from "./componentes/HomeEntregador/HomeEntregador";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/criarCliente" element={<CriarConta />} />
        <Route path="/criarEntregador" element={<CriarContaEntregador />} />
        <Route path="/criarLoja" element={<CriarContaLoja />} />
        <Route path="/HomeCliente" element={<HomeCliente />} />
        <Route path="/HomeLoja" element={<HomeLoja/>}/>
        <Route path="/HomeEntregador" element={<HomeEntregador/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;