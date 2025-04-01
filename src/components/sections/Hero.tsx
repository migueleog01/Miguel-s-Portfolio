'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  // Animation variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section className="w-full min-h-screen py-20 bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Use flex-col for mobile, but revert to original layout for larger screens */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
          {/* Left side - Text - Centered on mobile, left-aligned on lg */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start pt-10 lg:ml-[120px] lg:mt-[100px] mb-16 lg:mb-0">
            <div className="text-center lg:text-left">
              <motion.h1 
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2"
              >
                Miguel
              </motion.h1>
              <div className="flex flex-col sm:flex-row items-center">
                <motion.h1 
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
                >
                  Garcia
                </motion.h1>
                <motion.p 
                  custom={1}
                  initial="hidden"
                  animate="visible" 
                  variants={textVariants}
                  className="text-xl text-zinc-400 sm:ml-8 sm:self-end sm:mb-3 mt-2 sm:mt-0"
                >
                  /muh·gel/
                </motion.p>
              </div>
            </div>
          </div>

          {/* Right side - Grid for images - Original layout for md and larger */}
          <div className="w-full lg:w-3/5 mt-8 lg:mt-0">
            <div className="grid grid-cols-3 gap-4 md:gap-10 h-full">
              {/* Column 1 - Image 1 */}
              <div className="col-span-1">
                <motion.div 
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[90px] h-[100px] sm:w-[120px] sm:h-[130px] md:w-[40vw] md:max-w-[173px] lg:max-w-[220px] md:h-[187px] lg:h-[240px] bg-zinc-900 overflow-hidden mt-[20px] sm:mt-[30px] md:mt-[20vh] lg:mt-[285px] ml-0 md:ml-[2vw] lg:ml-[5px]"
                >
                  <Image 
                    src="/images/hero/tokyo.jpeg" 
                    alt="Tokyo cityscape" 
                    fill 
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 173px"
                  />
                </motion.div>
              </div>

              {/* Column 2 - Image 2 */}
              <div className="col-span-1">
                <motion.div 
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[110px] h-[170px] sm:w-[150px] sm:h-[230px] md:w-[45vw] md:max-w-[227px] lg:max-w-[280px] md:h-[357px] lg:h-[420px] bg-zinc-900 rounded-lg overflow-hidden mt-[10px] sm:mt-[20px] md:mt-[10vh] lg:mt-[80px] ml-[-10px] sm:ml-[-15px] md:ml-[-5vw] lg:ml-[-50px] mr-[5px]"
                >
                  <Image 
                    src="/images/hero/graduation.jpeg" 
                    alt="Graduation celebration" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 110px, (max-width: 768px) 150px, 227px"
                  />
                </motion.div>
              </div>

              {/* Column 3 - Stacked Images 3 and 4 */}
              <div className="col-span-1 flex flex-col gap-3 md:gap-6">
                {/* Image 3 */}
                <motion.div 
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[100px] h-[115px] sm:w-[140px] sm:h-[160px] md:w-[40vw] md:max-w-[208px] lg:max-w-[260px] md:h-[237px] lg:h-[300px] bg-zinc-900 rounded-lg overflow-hidden mt-[10px] sm:mt-[20px] md:mt-[8vh] lg:mt-[60px] ml-[-15px] sm:ml-[-20px] md:ml-[-5vw] lg:ml-[-45px]"
                >
                  <Image 
                    src="/images/hero/stadium.jpeg" 
                    alt="Stadium view" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, 208px"
                  />
                </motion.div>

                {/* Image 4 */}
                <motion.div 
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[90px] h-[75px] sm:w-[130px] sm:h-[110px] md:w-[35vw] md:max-w-[200px] lg:max-w-[240px] md:h-[169px] lg:h-[220px] bg-zinc-900 rounded-lg overflow-hidden ml-[-15px] sm:ml-[-20px] md:ml-[-5vw] lg:ml-[-45px]"
                >
                  <Image 
                    src="/images/hero/houston.jpeg" 
                    alt="Houston skyline" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 90px, (max-width: 768px) 130px, 200px"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 