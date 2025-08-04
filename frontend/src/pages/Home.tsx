import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/Home.module.css";
import type { Bot } from "../types/Bot";

export function Home() {
  const navigate = useNavigate();
  const [bots, setBots] = useState<Bot[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchBots() {
      try {
        const response = await api.get("/Bots");
        setBots(response.data || []);
      } catch (err) {
        console.error("Erro ao carregar bots:", err);
        setErro("Ops! Algo deu errado ao buscar os bots. Verifique sua conexão.");
      }
    }

    fetchBots();
  }, []);

  const deletarBot = async (id: number) => {
    try {
      await api.delete(`/Bots/${id}`);
      setBots((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Erro ao deletar bot:", err);
      setErro("Não foi possível remover este bot.");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={() => navigate("/create")}>
        + Adicionar Bot
      </button>

      <h1 className={styles.title}>Lista de Bots</h1>

      {erro && <div className={styles.error}>{erro}</div>}

      <div className={styles.botList}>
        {bots.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhum bot encontrado.</p>
        ) : (
          bots.map((bot) => (
            <div key={bot.id} className={styles.botCard}>
              <h3>{bot.nome}</h3>
              <p>{bot.descricao}</p>
              <div className={styles.actions}>
                <button
                  className={styles.chatButton}
                  onClick={() => navigate(`/chat/${bot.id}`)}
                >
                  Conversar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deletarBot(bot.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
