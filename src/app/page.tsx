'use client';
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FlashSale from "@/components/FlashSale";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";

import { motion } from 'framer-motion';
import JustForYou from '@/components/JustForYou';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroBanner />
        <CategoryGrid />
        <FlashSale />

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {products.slice(6, 12).map((product) => (
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

        {/* Just For You Section */}
        <JustForYou products={products.map(product => ({
          ...product,
          id: product.id.toString(),
          reviewCount: product.reviewCount || 0
        }))} />

      </main>

    </div>
  );
}