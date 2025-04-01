'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const routeToSection: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/skills': 'Skills',
  '/tokyo-skills': 'Tokyo-Skills',
  '/about': 'About',
  '/experience': 'Experience',
  '/gallery': 'Gallery',
  '/miguelbot': 'MiguelBot',
};

const sections = Object.entries(routeToSection);

export default function SqlNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set current section based on pathname
  useEffect(() => {
    const section = routeToSection[pathname] || 'Home';
    setCurrentSection(section);
  }, [pathname]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSectionChange = (route: string) => {
    router.push(route);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.div
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto my-4 max-w-5xl px-4">
        <div className="rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left: Profile */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
                <img 
                  src="/profile.jpg" 
                  alt="Miguel Garcia"
                  className="w-full h-full object-cover scale-[1.15] object-[50%_65%]"
                />
              </div>
              <div>
                <h1 className="text-white/90 font-medium">Miguel Garcia</h1>
                <p className="text-white/50 text-sm">Software Engineer</p>
              </div>
            </Link>

            {/* Center: SQL Query - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2 text-sm font-mono" ref={dropdownRef}>
              <span className="text-blue-400">SELECT</span>
              <span className="text-white/80">*</span>
              <span className="text-blue-400">WHERE</span>
              
              {/* Pill Selector */}
              <div className="relative inline-flex items-center">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-3 py-1.5 rounded-full bg-zinc-800/50 border border-white/10 cursor-pointer hover:bg-zinc-800/80 transition-all duration-300"
                >
                  <span className="text-white/80">{currentSection}</span>
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    className="ml-2 opacity-50"
                  >
                    ▼
                  </motion.span>
                </div>
                
                {/* Dropdown */}
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute top-full right-0 mt-2 py-2 bg-zinc-900/90 border border-white/10 rounded-xl shadow-xl backdrop-blur-md min-w-[140px]"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sections.map(([route, name]) => (
                      <div 
                        key={route}
                        className={`px-4 py-2 text-sm cursor-pointer transition-all duration-200 ${
                          pathname === route 
                            ? 'text-blue-400 bg-white/5' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => handleSectionChange(route)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => e.key === 'Enter' && handleSectionChange(route)}
                      >
                        {name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              
              <span className={`ml-1 w-1.5 h-4 bg-blue-400/90 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
            </div>

            {/* Right: External Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="https://linkedin.com/in/your-linkedin" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm"
              >
                LinkedIn
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
              <Link 
                href="https://github.com/your-github" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm"
              >
                Github
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
              <Link 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm"
              >
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-white/10"
              >
                <div className="px-6 py-4 space-y-4">
                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {sections.map(([route, name]) => (
                      <div
                        key={route}
                        className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          pathname === route
                            ? 'text-blue-400 bg-white/5'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => handleSectionChange(route)}
                      >
                        {name}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile External Links */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <Link
                      href="https://linkedin.com/in/your-linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/5"
                    >
                      LinkedIn
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </Link>
                    <Link
                      href="https://github.com/your-github"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/5"
                    >
                      Github
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </Link>
                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/5"
                    >
                      Resume
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
} 