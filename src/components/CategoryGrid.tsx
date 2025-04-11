'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Electronics', icon: '🖥️', slug: 'electronics' },
  { name: 'Fashion', icon: '👕', slug: 'fashion' },
  { name: 'Home & Living', icon: '🏠', slug: 'home-living' },
  { name: 'Beauty', icon: '💄', slug: 'beauty' },
  { name: 'Groceries', icon: '🛒', slug: 'groceries' },
  { name: 'Toys', icon: '🧸', slug: 'toys' },
];

export default function CategoryGrid() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, i) => (
          <Link 
            key={i} 
            href={`/categories/${category.slug}`}
            className="block"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <p className="font-medium">{category.name}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}