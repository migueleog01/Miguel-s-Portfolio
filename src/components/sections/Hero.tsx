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
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Left side - Text */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start pt-10 lg:ml-[8vw] xl:ml-[120px] mt-[10vh] lg:mt-[100px]">
            <div className="text-center lg:text-left">
              <motion.h1 
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2"
              >
                Miguel
              </motion.h1>
              <div className="flex items-center">
                <motion.h1 
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
                >
                  Garcia
                </motion.h1>
                <motion.p 
                  custom={1}
                  initial="hidden"
                  animate="visible" 
                  variants={textVariants}
                  className="text-lg md:text-xl text-zinc-400 ml-4 md:ml-8 self-end mb-3"
                >
                  /muh·gel/
                </motion.p>
              </div>
            </div>
          </div>

          {/* Right side - Image grid layout with responsive sizing */}
          <div className="w-full lg:w-3/5 mt-10 lg:mt-0">
            <div className="grid grid-cols-3 gap-4 md:gap-10 h-full">
              {/* Column 1 - Image 1 */}
              <div className="col-span-1">
                <motion.div 
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative lg:w-[173px] lg:h-[187px] xl:w-[calc(173px*1.2)] xl:h-[calc(187px*1.2)] 2xl:w-[calc(173px*1.4)] 2xl:h-[calc(187px*1.4)] w-[120px] h-[130px] bg-zinc-900 overflow-hidden mt-[20vh] lg:mt-[285px]"
                >
                  <Image 
                    src="/images/hero/tokyo.jpeg" 
                    alt="Tokyo cityscape" 
                    fill 
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 173px, (max-width: 1280px) 208px, 242px"
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
                  className="relative lg:w-[227px] lg:h-[357px] xl:w-[calc(227px*1.2)] xl:h-[calc(357px*1.2)] 2xl:w-[calc(227px*1.4)] 2xl:h-[calc(357px*1.4)] w-[160px] h-[250px] bg-zinc-900 rounded-lg overflow-hidden mt-[5vh] lg:mt-[80px] lg:-ml-[50px] -ml-[30px]"
                >
                  <Image 
                    src="/images/hero/graduation.jpeg" 
                    alt="Graduation celebration" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 227px, (max-width: 1280px) 272px, 318px"
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
                  className="relative lg:w-[208px] lg:h-[237px] xl:w-[calc(208px*1.2)] xl:h-[calc(237px*1.2)] 2xl:w-[calc(208px*1.4)] 2xl:h-[calc(237px*1.4)] w-[140px] h-[170px] bg-zinc-900 rounded-lg overflow-hidden mt-[3vh] lg:mt-[60px] lg:-ml-[45px] -ml-[25px]"
                >
                  <Image 
                    src="/images/hero/stadium.jpeg" 
                    alt="Stadium view" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 208px, (max-width: 1280px) 250px, 291px"
                  />
                </motion.div>

                {/* Image 4 */}
                <motion.div 
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative lg:w-[200px] lg:h-[169px] xl:w-[calc(200px*1.2)] xl:h-[calc(169px*1.2)] 2xl:w-[calc(200px*1.4)] 2xl:h-[calc(169px*1.4)] w-[140px] h-[120px] bg-zinc-900 rounded-lg overflow-hidden lg:-ml-[45px] -ml-[25px]"
                >
                  <Image 
                    src="/images/hero/houston.jpeg" 
                    alt="Houston skyline" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, (max-width: 1280px) 240px, 280px"
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