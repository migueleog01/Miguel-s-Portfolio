'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with product catalog, cart functionality, and payment processing.',
    tags: ['React', 'Next.js', 'MongoDB', 'Stripe'],
    image: '/placeholder-project1.jpg',
    links: {
      github: 'https://github.com/username/project1',
      live: 'https://project1.demo.com',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Productivity application for managing tasks with drag-and-drop interface and collaboration features.',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'DnD Kit'],
    image: '/placeholder-project2.jpg',
    links: {
      github: 'https://github.com/username/project2',
      live: 'https://project2.demo.com',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard displaying data visualizations with filtering and export capabilities.',
    tags: ['React', 'D3.js', 'Express', 'MongoDB'],
    image: '/placeholder-project3.jpg',
    links: {
      github: 'https://github.com/username/project3',
    },
    featured: false,
  },
  {
    id: 4,
    title: 'Weather App',
    description: 'Real-time weather application with location search and 5-day forecast.',
    tags: ['JavaScript', 'API Integration', 'CSS'],
    image: '/placeholder-project4.jpg',
    links: {
      github: 'https://github.com/username/project4',
      live: 'https://project4.demo.com',
    },
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Interactive portfolio website built with Next.js and Framer Motion.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/placeholder-project5.jpg',
    links: {
      github: 'https://github.com/username/portfolio',
    },
    featured: true,
  },
  {
    id: 6,
    title: 'Algorithm Visualizer',
    description: 'Web application for visualizing common algorithms like sorting and pathfinding.',
    tags: ['React', 'JavaScript', 'Algorithms'],
    image: '/placeholder-project6.jpg',
    links: {
      github: 'https://github.com/username/algo-visualizer',
      live: 'https://algo-viz.demo.com',
    },
    featured: false,
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'featured'
    ? projects.filter(project => project.featured)
    : projects;
    
  // Create a list of unique tags from all projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))];
  
  // Filter projects by tag
  const projectsByTag = activeFilter !== 'all' && activeFilter !== 'featured'
    ? projects.filter(project => project.tags.includes(activeFilter))
    : filteredProjects;
    
  const displayedProjects = activeFilter === 'all' || activeFilter === 'featured'
    ? filteredProjects
    : projectsByTag;
  
  // For Canvas magic cursor effect
  const handleMouseEnter = (id: number) => {
    setHoveredProject(id);
  };
  
  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore my portfolio of work, from web applications to interactive experiences.
            Hover over each project to see more details.
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          className="mb-12 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {['all', 'featured', ...allTags].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl overflow-hidden h-full hover:border-blue-500/50 transition-all duration-300">
                  {/* Project image */}
                  <div className="relative h-56 bg-zinc-700 overflow-hidden">
                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10" />
                    
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900" />
                    
                    {/* Project title overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <h3 className="text-xl font-bold text-center">{project.title}</h3>
                    </div>
                  </div>
                  
                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-zinc-700/50 text-blue-300 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Special effect for hovered project */}
                {hoveredProject === project.id && (
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-50 blur-sm -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {displayedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No projects found with the selected filter.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full"
            >
              Show all projects
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 