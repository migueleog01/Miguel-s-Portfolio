'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useChatContext } from '@/context/ChatContext';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FloatingMiguelBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, isTyping } = useChatContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Auto-popup effect with welcome message - ONCE PER SITE VISIT
  useEffect(() => {
    // Check if we've already shown the greeting this session
    const hasGreeted = typeof window !== 'undefined' 
      ? sessionStorage.getItem('miguelbot_has_greeted') 
      : null;
    
    if (!hasGreeted) {
      console.log('Setting up auto-popup timer...');
      const timer = setTimeout(() => {
        console.log('Auto-popup timer fired!');
        setIsOpen(true);
        if (messages.length === 0) {
          console.log('Adding welcome message...');
          addMessage('👋 Hi there! I\'m MiguelBot, Miguel\'s digital assistant. Feel free to ask me questions about Miguel\'s experience, projects, or skills!', 'bot');
        }
        
        if (typeof window !== 'undefined') {
          // Use sessionStorage instead of localStorage to reset when browser is closed
          sessionStorage.setItem('miguelbot_has_greeted', 'true');
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [addMessage, messages.length]);

  // When chat is opened (either automatically or manually), scroll to the bottom
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the chat is fully rendered
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard shortcut for toggling chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, 'user');

    // TODO: Implement actual bot response logic
    setTimeout(() => {
      addMessage('This is a placeholder response. The actual bot integration will be implemented soon!', 'bot');
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-16 right-0 bg-zinc-900 text-white text-sm py-2 px-3 rounded-lg shadow-lg whitespace-nowrap"
              style={{ pointerEvents: 'none', display: 'none' }}
            >
              Press Ctrl+M to toggle chat
              <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-zinc-900 rotate-45"></div>
            </motion.div>
          )}
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-zinc-900/80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden z-50 border border-zinc-800"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-semibold">MiguelBot</h3>
              </div>
            </div>

            <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4 gap-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex gap-2 text-zinc-500">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 