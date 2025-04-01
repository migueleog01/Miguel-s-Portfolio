'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pre-defined responses for the chatbot
const botResponses: Record<string, string> = {
  greeting: "Hello! I'm MiguelBot, a digital version of Miguel. Feel free to ask me about Miguel's skills, experience, projects, or interests!",
  fallback: "I don't have specific information about that yet. Feel free to ask about Miguel's skills, experience, projects, or education!",
  skills: "Miguel is proficient in JavaScript, TypeScript, React, Next.js, Node.js, Python, and SQL. He also has experience with Tailwind CSS, MongoDB, Firebase, and AWS.",
  experience: "Miguel has worked as a Software Engineer Intern at Tech Company A and as a Frontend Developer Intern at Design Agency B. He also has experience with university projects and hackathons.",
  education: "Miguel holds a B.S. in Computer Science from the University of California, where he graduated in 2023.",
  projects: "Miguel has worked on various projects including an e-commerce platform, task management app, data visualization dashboard, and more. Check out the Projects page for more details!",
  interests: "Outside of coding, Miguel enjoys hiking, reading science fiction books, experimenting with new recipes, and contributing to open-source projects.",
  contact: "You can reach Miguel through email, LinkedIn, or GitHub. Check the About page for specific contact information.",
};

// Helper function to get a bot response based on keywords in the user's message
const getBotResponse = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
    return botResponses.greeting;
  } else if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('tech') || lowerCaseMessage.includes('stack')) {
    return botResponses.skills;
  } else if (lowerCaseMessage.includes('experience') || lowerCaseMessage.includes('work') || lowerCaseMessage.includes('job')) {
    return botResponses.experience;
  } else if (lowerCaseMessage.includes('education') || lowerCaseMessage.includes('study') || lowerCaseMessage.includes('university') || lowerCaseMessage.includes('degree')) {
    return botResponses.education;
  } else if (lowerCaseMessage.includes('project')) {
    return botResponses.projects;
  } else if (lowerCaseMessage.includes('hobby') || lowerCaseMessage.includes('interest')) {
    return botResponses.interests;
  } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('reach')) {
    return botResponses.contact;
  }

  return botResponses.fallback;
};

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function MiguelBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: botResponses.greeting,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    
    // Show bot typing indicator
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              MiguelBot
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Chat with this AI version of me to learn more about my background, skills, and interests.
          </p>
        </motion.div>
        
        {/* Chat interface */}
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl overflow-hidden shadow-xl">
          {/* Chat header */}
          <div className="bg-zinc-900 p-4 border-b border-zinc-700 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg mr-3">
              🤖
            </div>
            <div>
              <h2 className="font-semibold">MiguelBot</h2>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          
          {/* Messages container */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                      🤖
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-700 text-gray-100'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-sm ml-2 flex-shrink-0">
                      👤
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-zinc-700 text-gray-100 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSendMessage} className="border-t border-zinc-700 p-4">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask MiguelBot something..."
                className="flex-1 bg-zinc-700 text-white rounded-l-full py-3 px-4 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-full py-3 px-6 hover:opacity-90 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        
        {/* Suggestions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Suggested questions:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "What are Miguel's skills?",
              "Tell me about his experience",
              "What projects has he worked on?",
              "What are his interests?",
              "How can I contact Miguel?",
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(question);
                }}
                className="bg-zinc-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-zinc-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 