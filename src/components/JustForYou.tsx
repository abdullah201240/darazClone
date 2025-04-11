'use client';

import ProductCard from './product-card';
import { Product } from './product-card';
import { motion } from 'framer-motion';

type JustForYouProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export default function JustForYou({ 
  products, 
  title = 'Just For You', 
  subtitle = 'Personalized recommendations based on your preferences' 
}: JustForYouProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-xl shadow-sm mb-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.slice(0, 5).map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
