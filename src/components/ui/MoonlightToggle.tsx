'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function MoonlightToggle() {
  const { isMoonlightMode, toggleMoonlightMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // Show the notification when moonlight mode changes
  useEffect(() => {
    if (isMoonlightMode) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMoonlightMode]);

  return (
    <>
      {/* Fixed toggle button */}
      <button 
        onClick={toggleMoonlightMode}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors shadow-lg"
        aria-label="Toggle Moonlight Mode"
      >
        {isMoonlightMode ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
      
      {/* Moonlight mode notification */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-20 right-6 bg-purple-800 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <span className="mr-2">✨</span>
              <p>Moonlight Mode Activated!</p>
            </div>
            <p className="text-xs mt-1 text-purple-200">
              Press Ctrl+M (or Cmd+M) to toggle
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 