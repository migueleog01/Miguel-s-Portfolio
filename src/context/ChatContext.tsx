'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ChatState, ChatMessage } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType extends ChatState {
  addMessage: (content: string, type: 'user' | 'bot') => void;
  setIsTyping: (value: boolean) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((content: string, type: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        addMessage,
        setIsTyping,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 