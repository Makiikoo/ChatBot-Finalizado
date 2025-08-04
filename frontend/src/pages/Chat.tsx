import styles from "../styles/Chat.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Bot } from "../types/Bot";
import api from "../services/api";
import { MessageBubble } from "../components/MessageBubble";

interface Mensagem {
  id: number;
  pergunta: string;
  resposta: string;
}

export function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bot, setBot] = useState<Bot | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [pergunta, setPergunta] = useState("");
  const [digitando, setDigitando] = useState(false);
  const [erro, setErro] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);


  const inputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    if (!digitando && bot) {
      inputRef.current?.focus();
    }
  }, [digitando, bot]);

  useEffect(() => {
    async function fetchBot() {
      try {
        const response = await api.get("/Bots");
        const foundBot = response.data.find((bot: Bot) => bot.id === Number(id));
        setBot(foundBot);
        setMensagens(foundBot?.mensagens || []);
      } catch {
        setErro("Erro ao carregar dados. Verifique se o servidor está ativo.");
      }
    }

    fetchBot();
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, digitando]);

  const enviarMensagem = async () => {
    if (!pergunta.trim() || !bot) return;

    const novaPergunta: Mensagem = {
      id: Date.now(),
      pergunta,
      resposta: "",
    };

    setMensagens((prev) => [...prev, novaPergunta]);
    setPergunta("");
    setDigitando(true);
    setErro("");

    try {
      const response = await api.post("/Mensagens", {
        botId: bot.id,
        pergunta,
      });

      setTimeout(() => {
        setMensagens((prev) =>
          prev.map((msg) =>
            msg.id === novaPergunta.id ? response.data : msg
          )
        );
        setDigitando(false);
      }, 1500);
    } catch {
      setErro("Erro ao enviar a mensagem. Verifique a conexão.");
      setDigitando(false);
    }
  };

  const apagarHistorico = async () => {
    if (!bot) return;

    try {
      await api.delete(`/Mensagens/${bot.id}`);
      setMensagens([]);
      inputRef.current?.focus(); // ⬅️ Foca após apagar
    } catch {
      setErro("Não foi possível apagar o histórico.");
    }
  };

  if (!bot) return <div className={styles.chatContainer}>Carregando...</div>;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (pergunta.trim().length > 0) {
        enviarMensagem();
      } else {
        setErro("A mensagem não pode estar vazia.");
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>⬅ Voltar</button>
        <h2>Chat com {bot.nome}</h2>
        <button className={styles.clearButton} onClick={apagarHistorico}>🗑 Limpar histórico</button>
      </div>

      <div className={styles.chatMessages}>
        {mensagens.map((msg) => (
          <div key={msg.id}>
            <MessageBubble texto={msg.pergunta} autor="user" />
            {msg.resposta && (
              <MessageBubble texto={msg.resposta} autor="bot" nomeBot={bot.nome} />
            )}
          </div>
        ))}

        {digitando && (
          <MessageBubble texto={`${bot.nome} está digitando...`} autor="bot" nomeBot={bot.nome} />
        )}

        {erro && <div className={styles.error}>{erro}</div>}
        <div ref={chatEndRef} />
      </div>

      <div className={styles.chatInput}>
        <input
          ref={inputRef}
          type="text"
          value={pergunta}
          onChange={(e) => {
            setPergunta(e.target.value);
            if (erro) setErro("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta..."
          disabled={digitando}
        />
        <button
          disabled={!pergunta.trim()}
          onClick={() => {
            if (pergunta.trim()) {
              enviarMensagem();
            } else {
              setErro("A mensagem não pode estar vazia.");
            }
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
