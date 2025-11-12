
export enum MessageAuthor {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
}

export interface PersonaSection {
  title: string;
  content: string | string[];
}

export interface Persona {
  role: string;
  sections: PersonaSection[];
}
