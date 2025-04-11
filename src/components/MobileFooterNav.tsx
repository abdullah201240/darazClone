'use client';

import { Home, Search, ShoppingCart, Grid, User, ChevronUp, Headphones, Shirt, Home as HomeIcon, Gift, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileFooterNav() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { name: 'Electronics', icon: <Headphones className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" /> },
    { name: 'Fashion', icon: <Shirt className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" /> },
    { name: 'Home & Living', icon: <HomeIcon className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" /> },
    { name: 'Beauty', icon: <Gift className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" /> },
    { name: 'Top Deals', icon: <Star className="h-5 w-5 text-gray-600 group-hover:text-orange-500 transition-colors" /> },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      {/* Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="absolute bottom-full left-0 right-0 bg-white shadow-lg rounded-t-lg p-4"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Panel */}
      <AnimatePresence>
        {isCategoriesOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="absolute bottom-full left-0 right-0 bg-white shadow-lg rounded-t-lg overflow-hidden"
          >
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={`/categories/${category.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                  className="group flex items-center gap-3 p-3 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  {category.icon}
                  <span className="text-gray-700 group-hover:text-orange-600 transition-colors">{category.name}</span>
                </Link>
              ))}
            </div>
            <button 
              className="w-full p-3 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => setIsCategoriesOpen(false)}
            >
              <ChevronUp className="h-4 w-4" />
              <span>Close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Navigation */}
      <div className="flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center text-xs hover:text-orange-500 transition-colors">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <button 
          className="flex flex-col items-center text-xs hover:text-orange-500 transition-colors"
          onClick={() => {
            setIsSearchOpen(false);
            setIsCategoriesOpen(!isCategoriesOpen);
          }}
        >
          <Grid className="h-5 w-5" />
          <span>Categories</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-xs hover:text-orange-500 transition-colors"
          onClick={() => {
            setIsCategoriesOpen(false);
            setIsSearchOpen(!isSearchOpen);
          }}
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
        
        <Link href="/cart" className="flex flex-col items-center text-xs hover:text-orange-500 transition-colors">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center text-xs hover:text-orange-500 transition-colors">
          <User className="h-5 w-5" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
