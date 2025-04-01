'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Gallery items - replace with your own images later
const galleryItems = [
  {
    id: 1,
    title: 'Web App Interface',
    description: 'UI design for a task management application',
    type: 'UI/UX',
  },
  {
    id: 2,
    title: 'Mobile App Prototype',
    description: 'React Native application for health tracking',
    type: 'Mobile',
  },
  {
    id: 3,
    title: 'Dashboard Design',
    description: 'Interactive analytics dashboard with customizable widgets',
    type: 'UI/UX',
  },
  {
    id: 4,
    title: 'E-commerce Website',
    description: 'Full-stack online shopping platform',
    type: 'Web',
  },
  {
    id: 5,
    title: 'Data Visualization',
    description: 'Interactive charts using D3.js',
    type: 'Data',
  },
  {
    id: 6,
    title: 'Portfolio Design',
    description: 'Personal portfolio website showcasing projects',
    type: 'Web',
  },
  {
    id: 7,
    title: 'Social Media App',
    description: 'Interface design for a photo sharing application',
    type: 'Mobile',
  },
  {
    id: 8,
    title: 'Landing Page',
    description: 'Product launch page with animations',
    type: 'Web',
  },
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Create a horizontal scroll effect with parallax
  const translateX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  
  // Generate placeholder SVG images dynamically
  useEffect(() => {
    const createPlaceholderImage = (index: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return '';
      
      // Generate a unique color based on index
      const hue = (index * 40) % 360;
      ctx.fillStyle = `hsl(${hue}, 70%, 15%)`;
      ctx.fillRect(0, 0, 600, 400);
      
      // Add some visual elements
      ctx.fillStyle = `hsl(${hue}, 70%, 25%)`;
      ctx.fillRect(50, 50, 500, 300);
      
      ctx.font = '24px Arial';
      ctx.fillStyle = '#ffffff44';
      ctx.textAlign = 'center';
      ctx.fillText(`Project ${index + 1}`, 300, 200);
      
      return canvas.toDataURL();
    };
    
    // This would normally be replaced with real project images
    const placeholders = document.querySelectorAll('.gallery-image');
    placeholders.forEach((placeholder, index) => {
      const img = placeholder as HTMLImageElement;
      img.src = createPlaceholderImage(index);
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Visual Gallery
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              A collection of visual elements from my projects. Scroll down to explore horizontally.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Gallery section with horizontal scroll */}
      <div 
        ref={containerRef}
        className="relative h-[300vh]" // Make this section taller for scrolling
      >
        {/* Fixed container that will move horizontally as user scrolls vertically */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            className="flex gap-8 px-4 py-16"
            style={{ translateX }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-[600px] h-[400px] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1
                }}
              >
                <div className="group relative w-full h-full">
                  {/* Placeholder image */}
                  <img
                    className="gallery-image object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    alt={item.title}
                  />
                  
                  {/* Overlay with text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-sm font-medium text-blue-400 mb-2">
                      {item.type}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Information section at the bottom */}
      <div className="bg-zinc-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Behind the Scenes
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These visuals showcase my approach to design and development. Each project
              represents a unique challenge and solution, demonstrating my ability to create
              engaging user experiences across different platforms and technologies.
            </p>
            
            <div className="mt-12 flex justify-center gap-4">
              <a 
                href="/projects" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                View Complete Projects
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-zinc-800 text-gray-200 rounded-full font-medium transition-all duration-300 hover:bg-zinc-700"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 