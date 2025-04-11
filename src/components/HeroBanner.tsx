'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroBanner() {
  const banners = [
    {
      id: 1,
      image: 'https://picsum.photos/id/1018/1920/1080',
      title: 'Daraz Mega Sale',
      subtitle: 'Up to 70% off on all products',
      buttonText: 'Shop Now',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/1015/1920/1080',
      title: 'New Arrivals',
      subtitle: 'Discover our latest collection',
      buttonText: 'Explore',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 3,
      image: 'https://picsum.photos/id/1019/1920/1080',
      title: 'Limited Time Offer',
      subtitle: 'Special deals ending soon',
      buttonText: 'Grab Deal',
      color: 'bg-purple-500 hover:bg-purple-600'
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
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-xl shadow-xl bg-white"> {/* Debug background */}
    
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[currentBanner].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
         <Image
           src={banners[currentBanner].image}
           alt={banners[currentBanner].title}
           fill
           className="object-cover"
           onError={(e) => console.error('Image failed to load:', e)}
           sizes="100vw"
         />
          <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {banners[currentBanner].title}
                </h2>
                <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
                  {banners[currentBanner].subtitle}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${banners[currentBanner].color} text-white font-bold py-3 px-8 rounded-full transition-all`}
                >
                  {banners[currentBanner].buttonText}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentBanner === index ? 'bg-white w-4 md:w-6' : 'bg-white/50'}`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}