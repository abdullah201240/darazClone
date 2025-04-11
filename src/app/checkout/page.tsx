'use client';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { ShoppingCart, ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cartItems, cartCount } = useCart();
  const { addOrder } = useOrders();
  const router = useRouter();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 60;
  const total = subtotal + deliveryFee;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    area: 'Mohammadpur',
    postalCode: '',
    paymentMethod: 'cash'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    addOrder({
      items: cartItems,
      total,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
    });
    
    // Redirect to orders page
    router.push('/orders');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="text-orange-500 hover:text-orange-600">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Checkout ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery and Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Delivery Address</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                    rows={3}
                    placeholder="House #, Road #, Area"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select 
                      id="city-select"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      aria-label="Select city"
                      className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500">
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="area-select" className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <select 
                      id="area-select"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      aria-label="Select area"
                      className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500">
                      <option>Mohammadpur</option>
                      <option>Dhanmondi</option>
                      <option>Mirpur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="1207"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-md">
                  <input 
                    type="radio" 
                    id="cash-on-delivery" 
                    name="paymentMethod" 
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="cash-on-delivery" className="block text-sm font-medium text-gray-700">Cash on Delivery</label>
                </div>
                
                <div className="flex items-center gap-3 p-4 border rounded-md">
                  <input 
                    type="radio" 
                    id="credit-card" 
                    name="paymentMethod" 
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    disabled
                  />
                  <label htmlFor="credit-card" className="block text-sm font-medium text-gray-400">Credit/Debit Card (Coming Soon)</label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">৳{deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">৳{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}