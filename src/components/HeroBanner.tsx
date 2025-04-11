'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/sale'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/electronics'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/fashion',
      fallback: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-xl mx-auto max-w-[1800px] shadow-lg">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentBanner}
          initial={{ x: 300, opacity: 0, scale: 0.95 }}
          animate={{ 
            x: 0, 
            opacity: 1, 
            scale: 1,
            transition: { 
              type: 'spring', 
              stiffness: 100, 
              damping: 20 
            }
          }}
          exit={{ 
            x: -300, 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Link href={banners[currentBanner].link}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.03 }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="w-full h-full"
            >
              <Image
                src={banners[currentBanner].image}
                alt="Special offer banner"
                fill
                className="object-cover rounded-xl"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                onError={(e) => {
                  if (banners[currentBanner].fallback) {
                    e.currentTarget.src = banners[currentBanner].fallback;
                  } else {
                    console.error('Image failed to load:', e);
                  }
                }}
              />
            </motion.div>
          </Link>
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 0.3 }
        }}
      >
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentBanner === index ? 'bg-orange-500' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              width: currentBanner === index ? 24 : 12
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </motion.div>
    </div>
  );
}