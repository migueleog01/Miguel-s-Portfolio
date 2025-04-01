'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              About Me
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            My journey, values, and what drives me as a developer.
          </p>
        </motion.div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile section - 1 column on mobile, 1 column on desktop */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-6 sticky top-24">
              {/* Profile picture placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-center mb-3">Miguel Garcia</h2>
              <p className="text-blue-400 text-center mb-6">Software Engineer</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm uppercase text-gray-500 mb-2">Location</h3>
                  <p className="text-gray-300">San Francisco, CA</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 mb-2">Education</h3>
                  <p className="text-gray-300">B.S. Computer Science</p>
                  <p className="text-gray-400 text-sm">University of California, 2023</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Web Development', 'UI/UX', 'AI', 'Open Source'].map((interest, i) => (
                      <span 
                        key={i} 
                        className="bg-zinc-700/50 text-gray-300 px-2 py-1 rounded-md text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Story section - 1 column on mobile, 2 columns on desktop */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-12">
              <section>
                <motion.h2 
                  className="text-2xl font-semibold mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-blue-400 mr-2">01.</span> My Story
                </motion.h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    Hello! I'm Miguel, a software engineer passionate about creating engaging digital experiences. 
                    My journey into coding began during my freshman year of college, where I was immediately drawn to 
                    the creative possibilities of web development.
                  </p>
                  <p>
                    What started as curiosity quickly grew into a passion as I discovered the joy of bringing ideas 
                    to life through code. I've since worked on projects ranging from interactive websites to data 
                    visualization tools, always focusing on creating intuitive and visually appealing interfaces.
                  </p>
                  <p>
                    I thrive in collaborative environments where I can combine my technical skills with creative 
                    problem-solving to build applications that positively impact users' lives.
                  </p>
                </div>
              </section>
              
              <section>
                <motion.h2 
                  className="text-2xl font-semibold mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="text-blue-400 mr-2">02.</span> My Approach
                </motion.h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    I approach development with a focus on both functionality and aesthetics. I believe that the 
                    best software not only works flawlessly but also delights users with its design and interactions.
                  </p>
                  <p>
                    My process typically involves:
                  </p>
                  <ul>
                    <li>Understanding user needs thoroughly before writing a single line of code</li>
                    <li>Designing intuitive interfaces that guide users naturally</li>
                    <li>Building with performance and accessibility in mind</li>
                    <li>Continuously iterating based on feedback and new insights</li>
                  </ul>
                  <p>
                    This human-centered approach helps me create solutions that are not just technically sound but 
                    truly valuable to end users.
                  </p>
                </div>
              </section>
              
              <section>
                <motion.h2 
                  className="text-2xl font-semibold mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-blue-400 mr-2">03.</span> Beyond Coding
                </motion.h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    When I'm not coding, you'll find me exploring the outdoors, reading science fiction, or 
                    experimenting with new recipes in the kitchen. These activities help me maintain a balanced 
                    perspective and often inspire creative solutions to technical challenges.
                  </p>
                  <p>
                    I'm also an active member of several developer communities where I enjoy both learning from 
                    others and contributing my own knowledge through mentorship and open-source contributions.
                  </p>
                  <p>
                    I believe that continuous learning is essential in this field, and I'm always excited to 
                    explore new technologies and approaches that can enhance my work.
                  </p>
                </div>
              </section>
              
              <section>
                <motion.h2 
                  className="text-2xl font-semibold mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="text-blue-400 mr-2">04.</span> Let's Connect
                </motion.h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of 
                    inspiring initiatives. Feel free to reach out through any of the channels below!
                  </p>
                  
                  <div className="flex gap-4 mt-6 mb-4">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 