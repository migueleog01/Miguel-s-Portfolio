'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus,
  SiPhp, SiMysql, SiHtml5, SiCss3, SiSwift,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlask,
  SiDocker, SiAmazon, SiGit, SiJenkins,
  SiR, SiJest, SiKubernetes, SiPostgresql,
  SiJira, SiMongodb
} from '@icons-pack/react-simple-icons';

// Type for Icon components
type IconComponent = React.ComponentType<{ size?: number; color?: string; title?: string }>;

// All available skill icons
const allIcons: IconComponent[] = [
  // Row 1
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiR, SiPhp, SiMysql,
  // Row 2
  SiHtml5, SiCss3, SiSwift, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlask,
  // Row 3 
  SiMongodb, SiPostgresql, SiJest, SiDocker, SiKubernetes, SiJenkins, SiAmazon, SiGit,
  // Row 4
  SiJira, SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiGit, SiDocker,
];

// Define skill names corresponding to the icons
const skillNames: string[] = [
  // Row 1
  'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'R', 'PHP', 'SQL',
  // Row 2
  'HTML', 'CSS', 'Swift', 'React', 'Next.js', 'Node.js', 'Express', 'Flask',
  // Row 3
  'MongoDB', 'PostgreSQL', 'Jest', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Git',
  // Row 4
  'Agile/Jira', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'Docker',
];

export default function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, 800]);

  // Define icon components for each row
  const row1Icons = allIcons.slice(0, 8);
  const row2Icons = allIcons.slice(8, 16);
  const row3Icons = allIcons.slice(16, 24);
  const row4Icons = allIcons.slice(24, 32);

  return (
    <div ref={containerRef} className="w-full h-full py-10 overflow-hidden flex flex-col justify-center">
      <div className="space-y-12 my-auto">
        {/* Row 1 - scrolls left */}
        <motion.div className="flex gap-8" style={{ x: x1 }}>
          {row1Icons.map((Icon, index) => (
            <div
              key={`row1-${index}`}
              className="relative flex-shrink-0 w-[150px] h-[150px] rounded-xl overflow-hidden bg-transparent"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon size={48} />
                <span className="text-xs text-white mt-2">{skillNames[index]}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - scrolls right */}
        <motion.div className="flex gap-8" style={{ x: x2 }}>
          {row2Icons.map((Icon, index) => (
            <div
              key={`row2-${index}`}
              className="relative flex-shrink-0 w-[150px] h-[150px] rounded-xl overflow-hidden bg-transparent"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon size={48} />
                <span className="text-xs text-white mt-2">{skillNames[index + 8]}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 3 - scrolls left */}
        <motion.div className="flex gap-8" style={{ x: x3 }}>
          {row3Icons.map((Icon, index) => (
            <div
              key={`row3-${index}`}
              className="relative flex-shrink-0 w-[150px] h-[150px] rounded-xl overflow-hidden bg-transparent"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon size={48} />
                <span className="text-xs text-white mt-2">{skillNames[index + 16]}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 4 - scrolls right */}
        <motion.div className="flex gap-8" style={{ x: x4 }}>
          {row4Icons.map((Icon, index) => (
            <div
              key={`row4-${index}`}
              className="relative flex-shrink-0 w-[150px] h-[150px] rounded-xl overflow-hidden bg-transparent"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Icon size={48} />
                <span className="text-xs text-white mt-2">{skillNames[index + 24]}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
