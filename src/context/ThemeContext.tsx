'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeContextType = {
  isMoonlightMode: boolean;
  toggleMoonlightMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isMoonlightMode, setIsMoonlightMode] = useState(false);

  // Toggle theme function
  const toggleMoonlightMode = () => {
    setIsMoonlightMode((prev) => !prev);
  };

  // Set up key listener for Ctrl+M to toggle theme
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+M (or Cmd+M on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
        event.preventDefault();
        toggleMoonlightMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply theme classes when moonlight mode changes
  useEffect(() => {
    if (isMoonlightMode) {
      document.documentElement.classList.add('moonlight-mode');
    } else {
      document.documentElement.classList.remove('moonlight-mode');
    }
  }, [isMoonlightMode]);

  return (
    <ThemeContext.Provider value={{ isMoonlightMode, toggleMoonlightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 