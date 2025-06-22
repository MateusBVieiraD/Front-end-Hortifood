import AlterarCliente from "../AlterarCliente/AlterarCliente";
import "./ModalAlterarCliente.css";

const ModalAlterarCliente: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="modal-overlay"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
    >
      <AlterarCliente onClose={onClose} />
  </div>
);

export default ModalAlterarCliente;