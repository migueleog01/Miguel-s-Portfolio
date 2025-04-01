'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Experience data
const experiences = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    company: 'Qualcomm',
    period: 'May 2025 - Aug 2025',
    location: 'San Diego, CA',
    bullets: [
      // Left blank for future accomplishments
    ],
    skills: ['React', 'JavaScript', 'Python', 'Flask', 'Docker', 'Kubernetes'],
    logo: '/logos/qualcomm.png'
  },
  {
    id: 2,
    title: 'Software Engineer Intern',
    company: 'Qualcomm',
    period: 'May 2024 - Aug 2024',
    location: 'San Diego, CA',
    bullets: [
      'Developed a web app using React (JavaScript), Python, and Flask for 1000+ users, reducing errors by 30%',
      'Streamlined 10K+ Jenkins jobs monthly, saving 50+ hours by implementing SQL to detect duplicates',
      'Deployed the app using Docker and Drekar, automating updates with Kubernetes for seamless integration',
      'Utilized RESTful APIs to retrieve inputs and implemented threading for concurrent submissions'
    ],
    skills: ['React', 'JavaScript', 'Python', 'Flask', 'SQL', 'Docker', 'Kubernetes', 'RESTful APIs'],
    logo: '/logos/qualcomm.png'
  },
  {
    id: 3,
    title: 'Software Engineer Intern',
    company: 'Hewlett Packard Enterprise',
    period: 'May 2023 - Aug 2023',
    location: 'San Jose, CA',
    bullets: [
      'Automated 100+ WPA3 test cases with Python, boosting testing efficiency for access point certifications',
      'Optimized network settings for Intel, Broadcom, and others, ensuring high performance across Windows and Linux',
      'Developed a search tool during an Aruba hackathon, improving bug troubleshooting efficiency by 80%'
    ],
    skills: ['Python', 'Automation', 'Windows', 'Linux', 'Networking'],
    logo: '/logos/hpe.png'
  },
  {
    id: 4,
    title: 'Millworks Associate',
    company: 'The Home Depot',
    period: 'Aug 2019 - May 2024',
    location: 'Pearland, TX',
    bullets: [
      'Generated $27,000 in a single sale by providing tailored design solutions and expert advice',
      'Cross-trained up to 10 associates, ensuring seamless operations for 300+ customers daily',
      'Streamlined inventory management for 500+ tools and materials, improving fulfillment efficiency',
      'Resolved technical issues for 100+ customers by troubleshooting garage door openers'
    ],
    skills: ['Customer Service', 'Technical Support', 'Inventory Management', 'Training'],
    logo: '/logos/home-depot.png'
  }
];

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  // We'll use this to animate the progress line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Work Experience
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            My professional journey from study to industry, presented as a creative timeline with key achievements and skills.
          </p>
        </motion.div>
        
        {/* Timeline container */}
        <div ref={containerRef} className="relative ml-4 md:ml-0">
          {/* Vertical progress line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-700 z-10">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-purple-600"
              style={{ 
                height: scaleY, 
                originY: 0,
              }}
            />
          </div>
          
          {/* Timeline entries */}
          <div className="space-y-16 md:space-y-24 relative">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className={`relative flex flex-col md:items-center md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center z-20">
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/90 border-2 border-zinc-700 overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {exp.logo ? (
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        width={64}
                        height={64}
                        className={`w-full h-full object-contain ${exp.company === 'The Home Depot' ? 'p-0 scale-125' : 'p-1'}`}
                        style={{ zIndex: 30 }}
                      />
                    ) : (
                      <span className="text-2xl">💼</span>
                    )}
                  </motion.div>
                </div>
                
                {/* Content card */}
                <div 
                  className={`ml-24 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800 transition-all duration-300">
                    <span className="text-sm font-medium text-blue-400">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-1 mb-1">{exp.title}</h3>
                    <h4 className="text-gray-400 mb-3">
                      {exp.company} • {exp.location}
                      {exp.id === 1 && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          Upcoming
                        </span>
                      )}
                    </h4>
                    
                    <ul className="list-disc pl-5 text-gray-300 mb-4 space-y-2">
                      {exp.bullets && exp.bullets.length > 0 ? (
                        exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-sm">{bullet}</li>
                        ))
                      ) : (
                        <li className="text-sm italic text-gray-400">Looking forward to making an impact in this role!</li>
                      )}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="bg-zinc-700/50 text-blue-300 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}