'use client';

import ProductCard from '@/components/product-card';
import { useCallback, useEffect, useState, useMemo, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryProducts = {
  electronics: [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.5
    },
    {
      id: '2', 
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.1
    },
    {
      id: '4',
      name: 'Wireless Earbuds',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.3
    },
    {
      id: '5',
      name: '4K Smart TV',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.5
    },
    {
      id: '6',
      name: 'Gaming Laptop',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.4
    },
    {
      id: '7',
      name: 'Wireless Keyboard',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1558040456-fbf8c0f1c24a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.2
    },
    {
      id: '8',
      name: 'Noise Cancelling Headphones',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.5
    },
    {
      id: '9',
      name: 'Smartphone',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.4
    },
    {
      id: '10',
      name: 'Tablet',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.3
    },
    {
      id: '11',
      name: 'Wireless Charger',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.2
    },
    {
      id: '12',
      name: 'Fitness Tracker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.1
    },
    {
      id: '13',
      name: 'Portable Power Bank',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.2
    },
    {
      id: '14',
      name: 'Smart Speaker',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.3
    },
    {
      id: '15',
      name: 'Gaming Console',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.5
    },
    {
      id: '16',
      name: 'Wireless Mouse',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1558040456-fbf8c0f1c24a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.1
    },
    {
      id: '17',
      name: 'Smart Thermostat',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.4
    },
    {
      id: '18',
      name: 'Virtual Reality Headset',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.5
    },
    {
      id: '19',
      name: 'Smart Lock',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.3
    },
    {
      id: '20',
      name: 'Wireless Security Camera',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'electronics',
      rating: 4.2
    },
    {
      id: '21',
      name: 'Modern Sofa',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'home-living',
      rating: 4.5
    },
    // 9 more home items...
  ],
  fashion: [
    {
      id: '11',
      name: 'Men\'s Casual Shirt',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'fashion',
      rating: 4.2
    },
    {
      id: '12',
      name: 'Women\'s Summer Dress',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'fashion',
      rating: 4.3
    },
    // 8 more fashion items...
  ],
  'home-living': [
    // 9 more home items...
  ],
  beauty: [
    {
      id: '31',
      name: 'Skincare Set',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'beauty',
      rating: 4.5
    },
    // 9 more beauty items...
  ],
  groceries: [
    {
      id: '41',
      name: 'Organic Fruits Basket',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'groceries',
      rating: 4.3
    },
    // 9 more grocery items...
  ],
  toys: [
    {
      id: '51',
      name: 'Building Blocks Set',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1594787319145-948a441a6fad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'toys',
      rating: 4.5
    },
    // 9 more toy items...
  ]
};

// Type for product data
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
};

// Animation configurations
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0 }
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 }
  }
};



export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortOption, setSortOption] = useState('default');

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const categoryData = categoryProducts[category as keyof typeof categoryProducts] || [];
        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const newProducts = categoryData.slice(startIdx, endIdx);
        setProducts(newProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, page, itemsPerPage]);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  // Memoize sorted products to prevent unnecessary recalculations
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, sortOption]);

  // Calculate total pages
  const totalProducts = categoryProducts[category as keyof typeof categoryProducts]?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Memoized handlers
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  }, []);

  const handleItemsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  // Format category name for display
  const formattedCategory = category.replace(/-/g, ' ');
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="container mx-auto px-4 py-6"
    >
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-10 bg-white py-4 border-b shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl font-semibold capitalize">{formattedCategory}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Sort By Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sortBy" className="text-sm text-gray-600">Sort by:</label>
                <div className="relative">
                  <select
                    id="sortBy"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="text-sm text-gray-600">Show:</label>
                <div className="relative">
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-gray-600">items per page</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {sortedProducts.length > 0 ? (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={`${product.id}-${product.category}`}
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            {loading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-500">Loading products...</p>
              </div>
            ) : (
              <p className="text-gray-500">No products found in this category</p>
            )}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-8 mb-12"
      >
        <div className="flex items-center gap-2">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            disabled={page === 1}
            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
            onClick={handlePrevPage}
          >
            Previous
          </motion.button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
            if (pageNum > totalPages) return null;
            return (
              <motion.button
                key={pageNum}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${page === pageNum ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-100'}`}
              >
                {pageNum}
              </motion.button>
            );
          })}
          
          {totalPages > 5 && page < totalPages - 2 && (
            <span className="px-2">...</span>
          )}
          
          {totalPages > 5 && page < totalPages - 1 && (
            <motion.button
              whileHover="hover"
              whileTap="tap"
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
            >
              {totalPages}
            </motion.button>
          )}
          
          <motion.button
            whileHover="hover"
            whileTap="tap"
            disabled={page >= totalPages}
            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 transition-colors"
            onClick={handleNextPage}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}