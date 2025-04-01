'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

type TabType = 'json' | 'python' | 'sql';

interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  other: string[];
}

interface SkillsApiDisplayProps {
  skills: Skills;
  className?: string;
  theme?: 'dark' | 'tokyo';
}

export default function SkillsApiDisplay({ 
  skills, 
  className = '',
  theme = 'dark'
}: SkillsApiDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabType>('json');
  const [loading, setLoading] = useState(true);
  const [codeContent, setCodeContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  const codeRef = useRef<HTMLElement>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Color schemes
  const colors = theme === 'tokyo' 
    ? {
        bg: 'bg-[#1f2335]',
        border: 'border-[#3b4261]',
        header: 'bg-[#24283b]',
        button: {
          active: 'bg-[#3d59a1] text-[#c0caf5]',
          inactive: 'bg-[#1a1b26] text-[#565f89] hover:bg-[#292e42]'
        },
        text: 'text-[#a9b1d6]',
        method: 'text-[#9ece6a]',
        path: 'text-[#7aa2f7]',
        loading: 'border-[#7aa2f7]'
      }
    : {
        bg: 'bg-zinc-900',
        border: 'border-zinc-700',
        header: 'bg-zinc-800',
        button: {
          active: 'bg-blue-600 text-white',
          inactive: 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
        },
        text: 'text-gray-300',
        method: 'text-green-500',
        path: 'text-gray-400',
        loading: 'border-blue-500'
      };

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
  const handleTabChange = (tab: TabType) => {
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

  // Server-side rendering placeholder or not mounted
  if (!isMounted) {
    return (
      <div className={`${colors.bg} ${colors.border} border rounded-xl overflow-hidden ${className}`}>
        <div className="p-4 h-[200px] flex items-center justify-center">
          <div className="text-center text-gray-500">Loading skills data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl overflow-hidden ${className}`}>
      {/* Header with URL and tabs */}
      <div className={`border-b ${colors.border} p-4 flex justify-between items-center flex-wrap gap-3`}>
        <div className={`${colors.header} rounded-lg px-4 py-2 text-sm font-mono flex items-center`}>
          <span className={`${colors.method} mr-2`}>GET</span>
          <span className={colors.path}>/api/miguel/skills</span>
        </div>
        
        <div className="flex gap-2">
          {['json', 'python', 'sql'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab as TabType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? colors.button.active
                  : colors.button.inactive
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
          <div className={`absolute inset-0 flex items-center justify-center ${colors.bg} z-10`}>
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${colors.loading}`}></div>
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
    </div>
  );
} 