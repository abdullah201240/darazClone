'use client';

import ProductCard from "./product-card";
import { products } from "@/data/products";
import { motion } from 'framer-motion';

export default function FlashSale() {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Flash Sale</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Ends in</span>
          <div className="flex space-x-2">
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium">12</div>
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium">34</div>
            <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium">56</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {products.slice(0, 6).map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard product={{
              ...product,
              id: product.id.toString(), // Convert id to string
              reviewCount: product.reviewCount || 0 // Ensure reviewCount exists
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}