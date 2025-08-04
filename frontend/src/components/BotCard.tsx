import { Link } from "react-router-dom";
import styles from "../styles/BotCard.module.css";

interface BotCardProps {
  id: number;
  nome: string;
  descricao: string;
}

export function BotCard({ id, nome, descricao }: BotCardProps) {
  return (
    <Link to={`/chat/${id}`} className={styles.link}>
      <div className={styles.card}>
        <h2>{nome}</h2>
        <p>{descricao}</p>
      </div>
    </Link>
  );
}
