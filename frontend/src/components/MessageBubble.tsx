import styles from "../styles/MessageBubble.module.css";

interface MessageBubbleProps {
  texto: string;
  autor: "user" | "bot";
  nomeBot?: string;
}

export function MessageBubble({ texto, autor, nomeBot }: MessageBubbleProps) {
  return (
    <div className={`${styles.bubbleWrapper} ${autor === "user" ? styles.userWrapper : styles.botWrapper}`}>
      {autor === "bot" && nomeBot && (
        <span className={styles.botLabel}>{nomeBot}</span>
      )}
      <div className={`${styles.bubble} ${autor === "user" ? styles.userBubble : styles.botBubble}`}>
        {texto}
      </div>
    </div>
  );
}
