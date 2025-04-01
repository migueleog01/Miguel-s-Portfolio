'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import HorizontalScrollGallery from '@/components/animations/HorizontalScrollGallery';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98],
      }
    },
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-20 py-16">
          <HorizontalScrollGallery />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.h1 
              variants={item}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Choose Your Journey
              </span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            >
              Explore my work, skills, and experiences through interactive interfaces.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="flex flex-wrap gap-4 justify-center pt-8"
            >
              {[
                { path: '/projects', label: 'View Projects', primary: true },
                { path: '/miguelbot', label: 'Chat with MiguelBot', primary: false },
                { path: '/skills', label: 'Explore Skills', primary: false },
              ].map((button, index) => (
                <Link 
                  key={index}
                  href={button.path}
                  className={`${
                    button.primary 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700'
                  } px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}
                >
                  {button.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* Feature Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Experience</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'MiguelBot',
                description: 'Chat with an AI version of me to learn more about my background and skills.',
                path: '/miguelbot',
                icon: '🧠',
              },
              {
                title: 'Interactive Projects',
                description: 'Explore my portfolio of work through engaging, interactive card displays.',
                path: '/projects',
                icon: '🧪',
              },
              {
                title: 'Skills & Expertise',
                description: 'View my technical skills formatted as API responses in multiple languages.',
                path: '/skills',
                icon: '📊',
              },
              {
                title: 'Visual Gallery',
                description: 'A visually engaging showcase of my work with parallax scrolling effects.',
                path: '/gallery',
                icon: '🛰️',
              },
              {
                title: 'Professional Experience',
                description: 'My work history presented in a creative, interactive timeline.',
                path: '/experience',
                icon: '💼',
              },
              {
                title: 'About Me',
                description: 'Learn about my journey, interests, and what drives me as a developer.',
                path: '/about',
                icon: '📂',
              },
            ].map((feature, index) => (
              <Link href={feature.path} key={index}>
                <motion.div 
                  className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 h-full hover:bg-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
