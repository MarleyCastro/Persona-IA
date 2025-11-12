
import React, { useState } from 'react';
import type { ChatMessage } from './types';
import { MessageAuthor } from './types';
import PersonaDisplay from './components/PersonaDisplay';
import ChatInterface from './components/ChatInterface';
import { getChatResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: MessageAuthor.ASSISTANT,
      content: "Olá! Sou seu Assistente de Produtividade. Vamos fazer um *check-in* rápido. Qual foi a última tarefa que você deixou pendente? Vamos começar por aí."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userMessage: string) => {
    setIsLoading(true);
    const newMessages: ChatMessage[] = [
      ...messages,
      { author: MessageAuthor.USER, content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const assistantResponse = await getChatResponse(userMessage);
      setMessages([
        ...newMessages,
        { author: MessageAuthor.ASSISTANT, content: assistantResponse },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { author: MessageAuthor.ASSISTANT, content: "Houve um problema ao conectar. Por favor, tente novamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-900 overflow-hidden">
      <PersonaDisplay />
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
