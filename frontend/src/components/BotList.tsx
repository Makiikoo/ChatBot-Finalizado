import { useEffect, useState } from 'react';
import api from '../services/api';

interface Mensagem {
  id: number;
  pergunta: string;
  resposta: string;
}

interface Bot {
  id: number;
  nome: string;
  descricao: string;
  mensagens: Mensagem[];
}

export default function BotList() {
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    api.get<Bot[]>('/bots')
      .then(res => setBots(res.data))
      .catch(err => console.error('Erro ao buscar bots: ', err));
  }, []);
  return (
    <div>
      <h1>Lista de Bots</h1>
      <ul>
        {bots.map(bot => (
          <li key={bot.id}>
            <strong>{bot.nome}</strong>: {bot.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}