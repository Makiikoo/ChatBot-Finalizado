#  Chatbot AI - HighCapital Desafio Técnico

Este é um projeto Full Stack de um chatbot com inteligência artificial, desenvolvido com **.NET 6 (C#)** no backend e **ReactJS + Vite** no frontend. O sistema permite que o usuário crie bots com um contexto personalizado e interaja com eles, com respostas geradas pela **API da OpenAI (ChatGPT)**.

---

##  Funcionalidades

###  Backend (.NET 6)
- Criar bots com nome e contexto personalizado
- Enviar perguntas e receber respostas geradas com base no contexto do bot
- Salvar e consultar histórico das conversas no banco de dados SQLite
- Deletar o histórico de mensagens de um bot
- Integração com **OpenAI GPT-3.5 Turbo**

###  Frontend (React + Vite)
- Interface amigável para criar e visualizar bots
- Tela de chat com envio e exibição de mensagens em tempo real
- Scroll automático, mensagens separadas por autor (usuário/bot)
- Loading de "bot está digitando..." para melhor UX

---

##  Integração com OpenAI

Este projeto usa a API `https://api.openai.com/v1/chat/completions` com o modelo `gpt-3.5-turbo`.  
A chave de API é usada no backend com `HttpClient` para se comunicar com o serviço da OpenAI.

---

##  Configuração da API Key

### 1. Crie o arquivo `appsettings.json` com o seguinte conteúdo:

```json
{
  "OpenAI": {
    "ApiKey": "sua-chave-da-openai-aqui"
  }
}
```



##  Tecnologias Utilizadas

- **Back-end:**
  - .NET 6
  - Entity Framework Core + SQLite
  - AutoMapper
  - Swashbuckle (Swagger)
  - API da OpenAI (via `HttpClient`)

- **Front-end:**
  - React + Vite
  - TypeScript
  - Axios

---

##  Como Rodar o Projeto

###  Pré-requisitos
- [.NET 6 ou superior](https://dotnet.microsoft.com/)
- [Node.js + NPM](https://nodejs.org/)

###  Clonar o repositório

```bash
git clone https://github.com/Makiikoo/ChatBot-Finalizado.git
cd Chatbot-AI
```

###  Backend (API)

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

A API estará disponível em: `https://localhost:5166/swagger`

###  Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em: `http://localhost:5173`

---

##  Contato do Desenvolvedor

**Ewerton Campos Junior**  
 juniorbio20@gmail.com  
 [LinkedIn](https://www.linkedin.com/in/juniorcamposdev/)  
 [GitHub](https://github.com/Makiikoo)
