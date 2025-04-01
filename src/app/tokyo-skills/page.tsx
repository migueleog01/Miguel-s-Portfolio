'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillsApiDisplay from '@/components/ui/SkillsApiDisplay';

// Sample skills data
const skillsData = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: ['Git', 'Docker', 'AWS', 'Firebase', 'Jest', 'Cypress'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  other: ['RESTful APIs', 'GraphQL', 'Responsive Design', 'UX/UI Design'],
};

export default function TokyoSkillsPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Client-side effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simple placeholder for server-side rendering
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#24283b] text-[#a9b1d6] pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]">
                Technical Skills
              </span>
            </h1>
            <p className="text-xl text-[#9aa5ce] mb-8 max-w-3xl">
              Loading skills information...
            </p>
          </div>
          <div className="bg-[#1f2335] p-4 h-[400px] rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#24283b] text-[#a9b1d6] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]">
              Tokyo Night Storm
            </span>
          </h1>
          <p className="text-xl text-[#9aa5ce] mb-8 max-w-3xl">
            Exploring my technical skills through the beautiful Tokyo Night Storm theme - a dark, vibrant color scheme that enhances code readability.
          </p>
        </motion.div>

        {/* Main content - Skills grid on left, API on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills on the left */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#7aa2f7]">
                Tech Proficiency
              </h3>
              <p className="text-[#9aa5ce] mb-4">
                My skills span across multiple technologies and domains, with particular focus on frontend development.
              </p>
            </motion.div>
            
            {Object.entries(skillsData).slice(0, 4).map(([category, skills], index) => (
              <motion.div
                key={category}
                className="bg-[#1f2335] border border-[#3b4261] rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + 0.1 * index }}
              >
                <h3 className="text-xl font-semibold mb-4 capitalize text-[#7aa2f7]">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {skills.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-[#bb9af7] rounded-full mr-3"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* API Display on the right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#7aa2f7]">
              Skills API
            </h3>
            <p className="text-[#9aa5ce] mb-4">
              Toggle between formats to see my skills represented in different programming languages.
            </p>
            <SkillsApiDisplay 
              skills={skillsData} 
              theme="tokyo" 
              className="shadow-lg"
            />
          </motion.div>
        </div>

        {/* Visual skill meter */}
        <motion.div
          className="mt-12 bg-[#1f2335] border border-[#3b4261] rounded-xl p-6 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-[#7aa2f7]">
            Expertise Level
          </h3>
          <div className="space-y-4">
            {[
              { name: 'React', level: 90, color: '#7aa2f7' },
              { name: 'Next.js', level: 85, color: '#bb9af7' },
              { name: 'TypeScript', level: 80, color: '#9ece6a' },
              { name: 'Tailwind CSS', level: 85, color: '#7dcfff' },
              { name: 'Node.js', level: 75, color: '#e0af68' }
            ].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-[#2a2e3f] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 