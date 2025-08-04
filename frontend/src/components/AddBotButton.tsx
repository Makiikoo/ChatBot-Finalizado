import { useNavigate } from "react-router-dom";
import styles from "../styles/AddBotButton.module.css";

export function AddBotButton() {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate("/criar")}>
      + Adicionar Bot
    </button>
  );
}
