
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chat: Chat | null = null;

const initializeChat = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const getChatResponse = async (message: string): Promise<string> => {
  if (!chat) {
    initializeChat();
  }

  if (!chat) {
      throw new Error("Chat session could not be initialized.");
  }

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Invalidate chat session on error to re-initialize next time
    chat = null;
    return "Desculpe, ocorreu um erro ao me comunicar com a IA. Por favor, tente novamente.";
  }
};
