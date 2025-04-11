
'use client'
import { motion } from 'framer-motion';

const categories = [
  { name: 'Electronics', icon: '🖥️' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home & Living', icon: '🏠' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Groceries', icon: '🛒' },
  { name: 'Toys', icon: '🧸' },
];

export default function CategoryGrid() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <p className="font-medium">{category.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
