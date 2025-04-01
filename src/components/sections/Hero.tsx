'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  // Animation variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15 + 0.5, // Start after text animation
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  // Local images from public directory
  const images = [
    '/images/hero/graduation.jpg',
    '/images/hero/stadium.jpg',
    '/images/hero/tokyo.jpg',
    '/images/hero/houston.jpg'
  ];

  return (
    <section className="w-full min-h-screen pt-32 pb-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content - Centered in left half */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start justify-center space-y-4">
            <div className="text-center lg:text-left">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                Miguel
              </motion.div>
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                Garcia
              </motion.div>
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-xl text-zinc-400 mt-4"
              >
                /muh·gel/
              </motion.div>
            </div>
          </div>

          {/* Image Grid - 3 columns with last column stacked */}
          <div className="w-full lg:w-7/12 grid grid-cols-6 gap-3 md:gap-4">
            {/* Column 1 - Single image */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="col-span-2 relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                src={images[0]}
                alt="Hero image 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </motion.div>

            {/* Column 2 - Single image */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="col-span-2 relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                src={images[1]}
                alt="Hero image 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </motion.div>

            {/* Column 3 - Stacked images */}
            <div className="col-span-2 flex flex-col gap-3 md:gap-4">
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900"
              >
                <Image
                  src={images[2]}
                  alt="Hero image 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900"
              >
                <Image
                  src={images[3]}
                  alt="Hero image 4"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 