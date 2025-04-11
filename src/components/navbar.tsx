'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, User, Menu, ChevronDown, Shield, Headphones, Gift, Star, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCategoriesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const categories = [
        { name: 'Electronics', icon: <Headphones className="h-4 w-4" />, slug: 'electronics' },
        { name: 'Fashion', icon: <User className="h-4 w-4" />, slug: 'fashion' },
        { name: 'Home & Living', icon: <Shield className="h-4 w-4" />, slug: 'home-living' },
        { name: 'Beauty', icon: <Gift className="h-4 w-4" />, slug: 'beauty' },
        { name: 'Top Deals', icon: <Star className="h-4 w-4" />, slug: 'top-deals' },
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
                        {/* Logo - Only shown once */}
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Daraz
                            </span>
                        </Link>

                        {/* Mobile Search */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                className="p-2 rounded-full hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menu"
                            >
                            </button>
                            <div className="relative">
                                <Input
                                    placeholder="Search..."
                                    className="rounded-full pl-12 pr-4 py-4 border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-orange-500 text-base"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 focus-visible:text-orange-500 transition-colors" />
                            </div>
                            <Link
                                href="/orders"
                                className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-sm transition-colors"
                            >
                                <Package className="h-5 w-5 text-orange-500 text-xl" />
                            </Link>
                        </div>

                        {/* Desktop elements */}
                        <div className="hidden md:flex items-center gap-6">
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
                                            ref={dropdownRef}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-100 py-2"
                                        >
                                            {categories.map((category) => (
                                                <Link
                                                    key={category.name}
                                                    href={`/categories/${category.slug}`}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-sm transition-colors"
                                                    onClick={() => setIsCategoriesOpen(false)}
                                                >
                                                    <span className="text-orange-500">{category.icon}</span>
                                                    <span className="text-gray-800">{category.name}</span>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-6">
                            <div className="relative flex-1 group">
                                <Input
                                    placeholder="Search products, brands and categories..."
                                    className="rounded-full pl-12 pr-6 py-5 border-2 border-gray-200 focus-visible:ring-0 focus-visible:border-orange-500 focus:shadow-md transition-all"
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                </div>
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                                    aria-label="Search"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
                                <User className="h-5 w-5" />
                            </Link>
                            <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-full">
                                <Package className="h-5 w-5" />
                            </Link>
                            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative flex items-center">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </Link>
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
                                            <Link
                                                key={category.name}
                                                href={`/categories/${category.slug}`}
                                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-100 pt-2">
                                        <Button variant="ghost" className="w-full justify-start gap-3 px-6 py-3 rounded-none">
                                            <User className="h-5 w-5" />
                                            <span>My Account</span>
                                        </Button>
                                        <Button asChild variant="ghost" className="w-full justify-start gap-3 px-6 py-3 rounded-none">
                                            <Link href="/orders">
                                                <Package className="h-5 w-5" />
                                                <span>My Orders</span>
                                            </Link>
                                        </Button>
                                        <Button asChild variant="ghost" className="w-full justify-start gap-3 px-6 py-3 rounded-none">
                                            <Link href="/cart">
                                                <ShoppingCart className="h-5 w-5" />
                                                <span>My Cart</span>
                                            </Link>
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