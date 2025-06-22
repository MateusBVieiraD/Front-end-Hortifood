import AlterarLoja from '../AlterarLoja/AlterarLoja';
import "./ModalAlterarLoja.css";
const ModalAlterarLoja: React.FC<{ onClose: () => void }> = ({ onClose }) => (
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
    <AlterarLoja onClose={onClose} />
  </div>
);

export default ModalAlterarLoja;