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
        <div className="flex flex-col lg:flex-row items-start justify-between ">
          {/* Left side - Text */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start pt-10 ml-[120px] mt-[100px]">
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
              <div className="flex items-center">
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
                  className="text-xl text-zinc-400 ml-8 self-end mb-3"
                >
                  /muh·gel/
                </motion.p>
              </div>
            </div>
          </div>

          {/* Right side - 3-column grid layout */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-3 gap-10 h-full">
              {/* Column 1 - Image 1 */}
              <div className="col-span-1">
                <motion.div 
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[173px] h-[187px] bg-zinc-900 overflow-hidden mt-[285px] ml-[5px] "
                >
                  <Image 
                    src="/images/hero/tokyo.jpeg" 
                    alt="Tokyo cityscape" 
                    fill 
                    className="object-cover transition-opacity duration-300"
                    sizes="173px"
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
                  className="relative w-[227px] h-[357px] bg-zinc-900 rounded-lg overflow-hidden mt-[80px] ml-[-50px] mr-[5px]"
                >
                  <Image 
                    src="/images/hero/graduation.jpeg" 
                    alt="Graduation celebration" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="227px"
                  />
                </motion.div>
              </div>

              {/* Column 3 - Stacked Images 3 and 4 */}
              <div className="col-span-1 flex flex-col gap-6">
                {/* Image 3 */}
                <motion.div 
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[208px] h-[237px] bg-zinc-900 rounded-lg overflow-hidden mt-[60px] ml-[-45px]"
                >
                  <Image 
                    src="/images/hero/stadium.jpeg" 
                    alt="Stadium view" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="208px"
                  />
                </motion.div>

                {/* Image 4 */}
                <motion.div 
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="relative w-[200px] h-[169px] bg-zinc-900 rounded-lg overflow-hidden ml-[-45px]"
                >
                  <Image 
                    src="/images/hero/houston.jpeg" 
                    alt="Houston skyline" 
                    fill 
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                    sizes="200px"
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