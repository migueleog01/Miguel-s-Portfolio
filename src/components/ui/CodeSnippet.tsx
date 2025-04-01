'use client';

import { useEffect, useState, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeSnippetProps {
  code?: string;
  language?: string;
  typingSpeed?: number;
  className?: string;
  showLineNumbers?: boolean;
}

export default function CodeSnippet({
  code = `// Miguel's Portfolio
const developer = {
  name: "Miguel Garcia",
  title: "Software Engineer",
  expertise: [
    "Frontend Development",
    "React & Next.js", 
    "TypeScript",
    "Responsive UI/UX"
  ],
  contact: {
    email: "contact@miguel-garcia.dev",
    linkedin: "linkedin.com/in/miguel-garcia",
    github: "github.com/miguel-garcia"
  },
  
  introduceSelf() {
    console.log(\`Hello! I'm \${this.name}, a \${this.title} passionate about building modern web applications.\`);
    return this;
  },
  
  listSkills() {
    console.log("My expertise includes:");
    this.expertise.forEach(skill => console.log(\` - \${skill}\`));
    return this;
  }
};

// Call methods
developer.introduceSelf().listSkills();`,
  language = 'javascript',
  typingSpeed = 30,
  className = '',
  showLineNumbers = true,
}: CodeSnippetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  
  const codeRef = useRef<HTMLElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mount state
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Clean up all intervals and timeouts
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isMounted) return;
    
    let currentIndex = 0;
    
    // Start typing animation
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayText(code.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Typing complete
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setTypingComplete(true);
        
        // Apply syntax highlighting after typing is complete
        highlightTimeoutRef.current = setTimeout(() => {
          if (codeRef.current) {
            try {
              Prism.highlightElement(codeRef.current);
            } catch (error) {
              console.error("Error applying syntax highlighting:", error);
            }
          }
        }, 100);
      }
    }, typingSpeed);
    
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [code, typingSpeed, isMounted]);

  // Cursor blinking
  useEffect(() => {
    if (!isMounted) return;
    
    // Only start cursor blinking animation once typing is complete
    if (typingComplete) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prevState => !prevState);
      }, 500);
    }
    
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [typingComplete, isMounted]);

  // Server-side rendering placeholder
  if (!isMounted) {
    return (
      <div className={`rounded-lg overflow-hidden bg-[#24283b] text-[#a9b1d6] p-4 font-mono text-sm leading-relaxed ${className}`}>
        <pre className="overflow-x-auto">Loading code snippet...</pre>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden bg-[#24283b] text-[#a9b1d6] p-4 font-mono text-sm leading-relaxed ${className}`}>
      {/* Tokyo Night Storm themed editor header */}
      <div className="flex justify-between items-center bg-[#1f2335] px-4 py-3 rounded-t-lg -mt-4 -mx-4 mb-3 border-b border-[#15171e]">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[#565f89] text-sm font-mono">
            {`${language === 'javascript' ? 'portfolio.js' : language === 'python' ? 'resume.py' : 'code.txt'}`}
          </div>
        </div>
      </div>
      
      <pre className="overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>
          {displayText}
          {!typingComplete && showCursor && (
            <span 
              className="inline-block w-2 h-4 bg-[#7aa2f7]" 
              style={{ verticalAlign: 'middle' }}
            ></span>
          )}
        </code>
      </pre>
      {typingComplete && showCursor && (
        <div 
          className="absolute inline-block w-2 h-4 bg-[#7aa2f7]" 
          style={{ 
            bottom: 'auto', 
            marginTop: '-1.1rem',
            marginLeft: '0.1rem'
          }}
        ></div>
      )}
    </div>
  );
} 