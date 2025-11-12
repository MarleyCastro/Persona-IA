
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { MessageAuthor } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5 p-4">
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };
  
  const parseContent = (content: string) => {
    const bolded = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const italicized = bolded.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return { __html: italicized };
  };

  return (
    <main className="w-full lg:w-2/3 xl:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col h-full bg-slate-800/50 rounded-l-2xl">
      <div className="flex-1 overflow-y-auto mb-4 pr-4 chat-scrollbar">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.author === MessageAuthor.USER ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl px-5 py-3 rounded-2xl ${
                  msg.author === MessageAuthor.USER
                    ? 'bg-cyan-600 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={parseContent(msg.content)}></p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-slate-700 rounded-2xl rounded-bl-none">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto">
        <form onSubmit={handleSend} className="flex items-center space-x-4 p-2 bg-slate-900 rounded-xl border border-slate-700 focus-within:ring-2 focus-within:ring-cyan-500 transition-shadow duration-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual é a sua prioridade agora?"
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-400 p-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold p-2.5 rounded-lg transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatInterface;
