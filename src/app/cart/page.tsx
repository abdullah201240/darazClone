'use client';
import { ShoppingCart, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartCount
  } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    exit: { opacity: 0, x: -50 }
  };

  const buttonHover = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  const buttonTap = {
    scale: 0.98
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      <main className="flex-1 container mx-auto px-4 py-8 pb-24">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold mb-8 flex items-center gap-3"
        >
          <ShoppingCart className="h-8 w-8 text-orange-500" />
          Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </motion.h1>

        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
              <h2 className="mt-6 text-xl font-semibold text-gray-800">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Start shopping to add items to your cart</p>
              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="mt-8"
              >
                <Link href="/categories">
                  <Button className="px-8 py-4 text-lg bg-orange-500 hover:bg-orange-600">
                    Continue Shopping
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="mt-4"
              >

              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      layout
                      exit="exit"
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex gap-6"
                    >
                      <div className="flex-shrink-0 h-28 w-28 rounded-lg overflow-hidden border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={112}
                          height={112}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              {item.category}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 h-8 w-8 flex items-center justify-center"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </motion.button>
                        </div>

                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <motion.button
                              whileHover={{ backgroundColor: "#f3f4f6" }}
                              whileTap={buttonTap}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.button>
                            <span className="px-3 text-center min-w-[2rem]">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ backgroundColor: "#f3f4f6" }}
                              whileTap={buttonTap}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="lg:sticky lg:top-8 h-fit">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t font-semibold text-lg">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    className="mt-6"
                  >
                    <Link href="/checkout">

                      <Button
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-lg"
                        aria-label="Proceed to checkout"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </motion.div>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    By placing your order, you agree to our{' '}
                    <Link href="#" className="text-orange-500 hover:underline">
                      Terms of Use
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}