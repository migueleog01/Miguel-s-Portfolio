'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

// Skill data to display in different formats
const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: ['Git', 'Docker', 'AWS', 'Firebase', 'Jest', 'Cypress'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  other: ['RESTful APIs', 'GraphQL', 'Responsive Design', 'UX/UI Design'],
};

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('json');
  const [loading, setLoading] = useState(true);
  const [codeContent, setCodeContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Client-side only effect
  useEffect(() => {
    setIsMounted(true);
    
    // Clean up on unmount
    return () => {
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  // Generate different code formats
  const generateJsonContent = () => {
    return JSON.stringify(skills, null, 2);
  };

  const generatePythonContent = () => {
    return `# Miguel's Skills
skills = {
    "languages": [${skills.languages.map(skill => `"${skill}"`).join(', ')}],
    "frameworks": [${skills.frameworks.map(skill => `"${skill}"`).join(', ')}],
    "tools": [${skills.tools.map(skill => `"${skill}"`).join(', ')}],
    "databases": [${skills.databases.map(skill => `"${skill}"`).join(', ')}],
    "other": [${skills.other.map(skill => `"${skill}"`).join(', ')}]
}

# Function to get skill rating
def get_skill_proficiency(skill_name):
    proficiency_levels = {
        "JavaScript": "Advanced",
        "React": "Advanced",
        "Next.js": "Intermediate",
        "Python": "Intermediate",
        "SQL": "Intermediate"
    }
    return proficiency_levels.get(skill_name, "Learning")

# Print all skills with proficiency
for category, skill_list in skills.items():
    print(f"\\n{category.upper()}:")
    for skill in skill_list:
        print(f"  - {skill}: {get_skill_proficiency(skill)}")`;
  };

  const generateSqlContent = () => {
    return `-- Miguel's Skills Database Schema

CREATE TABLE skill_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INTEGER REFERENCES skill_categories(id),
  proficiency VARCHAR(20) CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced')),
  years_experience DECIMAL(3,1)
);

-- Insert sample data
INSERT INTO skill_categories (name) VALUES 
  ('Languages'),
  ('Frameworks'),
  ('Tools'),
  ('Databases'),
  ('Other');

-- Insert languages
INSERT INTO skills (name, category_id, proficiency, years_experience) VALUES
  ('JavaScript', 1, 'Advanced', 3.5),
  ('TypeScript', 1, 'Intermediate', 2.0),
  ('Python', 1, 'Intermediate', 2.5),
  ('SQL', 1, 'Intermediate', 2.0);

-- Query to fetch skills by category
SELECT c.name as category, s.name as skill, s.proficiency, s.years_experience
FROM skills s
JOIN skill_categories c ON s.category_id = c.id
ORDER BY c.name, s.proficiency DESC;`;
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    if (!isMounted) return;
    
    // Clear any existing timeouts
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    
    setActiveTab(tab);
    setLoading(true);
    
    // Add a delay to simulate loading
    loadingTimeoutRef.current = setTimeout(() => {
      let content = '';
      
      switch (tab) {
        case 'json':
          content = generateJsonContent();
          break;
        case 'python':
          content = generatePythonContent();
          break;
        case 'sql':
          content = generateSqlContent();
          break;
        default:
          content = generateJsonContent();
      }
      
      setCodeContent(content);
      setLoading(false);
      
      // Apply syntax highlighting
      highlightTimeoutRef.current = setTimeout(() => {
        try {
          if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
          }
        } catch (error) {
          console.error('Error highlighting code', error);
        }
      }, 50);
    }, 800);
  };

  // Set initial content
  useEffect(() => {
    if (isMounted) {
      handleTabChange('json');
    }
  }, [isMounted]);

  // Simple placeholder for server-side rendering
  if (!isMounted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Technical Skills
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Loading skills information...
            </p>
          </div>
          <div className="bg-zinc-800 p-4 h-[300px] rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Technical Skills
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            Here's a breakdown of my technical expertise. Toggle between formats to see my skills represented in different programming languages.
          </p>
        </motion.div>

        {/* Redesigned layout with API on right and skills on left */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills summary on the left */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 col-span-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              My Tech Stack
            </h3>
            
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + 0.1 * index }}
              >
                <h3 className="text-xl font-semibold mb-4 capitalize">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          {/* API Response Box on the right */}
          <motion.div
            className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Header with URL and tabs */}
            <div className="border-b border-zinc-700 p-4 flex justify-between items-center flex-wrap gap-3">
              <div className="bg-zinc-800 rounded-lg px-4 py-2 text-sm font-mono flex items-center">
                <span className="text-green-500 mr-2">GET</span>
                <span className="text-gray-400">/api/miguel/skills</span>
              </div>
              
              <div className="flex gap-2">
                {['json', 'python', 'sql'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content area */}
            <div className="relative min-h-[200px]">
              {/* Loading indicator */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {/* Code display */}
              <div className="p-4">
                <pre className="rounded">
                  <code 
                    ref={codeRef} 
                    className={`language-${activeTab}`}
                  >
                    {codeContent}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 