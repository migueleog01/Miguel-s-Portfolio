'use client';

import { ChatMessage as ChatMessageType } from '@/types/chat';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <Avatar className="w-8 h-8">
        {isBot ? (
          <>
            <AvatarImage src="/miguelbot.png" alt="MiguelBot" />
            <AvatarFallback>MB</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/user.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </>
        )}
      </Avatar>
      <div
        className={`flex flex-col ${
          isBot ? 'items-start' : 'items-end'
        } max-w-[80%]`}
      >
        <div
          className={`rounded-lg px-4 py-2 ${
            isBot
              ? 'bg-zinc-800 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-zinc-500 mt-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </motion.div>
  );
} 