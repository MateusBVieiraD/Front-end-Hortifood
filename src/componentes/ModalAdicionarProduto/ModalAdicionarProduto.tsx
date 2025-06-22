import React, { useState } from "react";
import "./ModalAdicionarProduto.css";
import CriarProduto from "../CriarProduto/CriarProduto";

const ModalAdicionarProduto: React.FC<{
  onClose: () => void;
  onSalvar: (produto: any) => void;
  produto?: any;
}> = ({ onClose, onSalvar, produto }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close-btn" onClick={onClose} title="Fechar">
        ×
      </button>
      <h2>{produto ? "Editar Produto" : "Adicionar Produto"}</h2>
      <CriarProduto onSalvar={onSalvar} produto={produto} />
    </div>
  </div>
);

export default ModalAdicionarProduto;