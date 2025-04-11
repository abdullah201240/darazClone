'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, User, Menu, ChevronDown, Shield, Headphones, Gift, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Electronics', icon: <Headphones className="h-4 w-4" /> },
    { name: 'Fashion', icon: <User className="h-4 w-4" /> },
    { name: 'Home & Living', icon: <Shield className="h-4 w-4" /> },
    { name: 'Beauty', icon: <Gift className="h-4 w-4" /> },
    { name: 'Top Deals', icon: <Star className="h-4 w-4" /> },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white text-xs py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Daraz MART</span>
            <span>Daraz Fashion</span>
            <span>Daraz Pay</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Daraz Donates</span>
            <span>Help & Support</span>
            <span>Sell on Daraz</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Categories */}
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Daraz
                </span>
              </Link>

              <div className="hidden md:flex items-center relative">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  <Menu className="h-5 w-5" />
                  <span>Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-100"
                    >
                      {categories.map((category) => (
                        <Link 
                          key={category.name} 
                          href="#" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-sm"
                        >
                          {category.icon}
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-6">
              <div className="relative flex-1">
                <Input 
                  placeholder="Search in Daraz..." 
                  className="rounded-sm pl-10 pr-6 py-2 border-orange-500 focus-visible:ring-orange-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 h-10 px-6">
                SEARCH
              </Button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex flex-col items-center gap-0 h-auto p-2 group">
                <User className="h-5 w-5 text-gray-600 group-hover:text-orange-500" />
                <span className="text-xs font-medium">Account</span>
              </Button>
              
              <Button variant="ghost" className="hidden md:flex flex-col items-center gap-0 h-auto p-2 group">
                <Headphones className="h-5 w-5 text-gray-600 group-hover:text-orange-500" />
                <span className="text-xs font-medium">Help</span>
              </Button>
              
              <Button variant="ghost" className="flex flex-col items-center gap-0 h-auto p-2 group relative">
                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-orange-500" />
                <span className="text-xs font-medium">Cart</span>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden border-t border-gray-100"
              >
                <div className="py-2 space-y-1">
                  <div className="relative px-4 py-2">
                    <Input 
                      placeholder="Search in Daraz..." 
                      className="rounded-sm pl-10"
                    />
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="border-t border-gray-100 pt-2">
                    {categories.map((category) => (
                      <Button 
                        key={category.name} 
                        variant="ghost" 
                        className="w-full justify-start gap-3 px-6 py-3 rounded-none"
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 px-6 py-3 rounded-none">
                      <User className="h-5 w-5" />
                      <span>My Account</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 px-6 py-3 rounded-none">
                      <Headphones className="h-5 w-5" />
                      <span>Help Center</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
}