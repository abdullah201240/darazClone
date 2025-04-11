'use client';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';

type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'delivered';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  statusIndex: number;
  items: Product[];
  total: number;
}

export default function OrdersPage() {
  const { orders } = useOrders();

  const statusStages = [
    { id: 'processing', label: 'Processing', icon: <Clock className="h-5 w-5" /> },
    { id: 'confirmed', label: 'Confirmed', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 'shipped', label: 'Shipped', icon: <Truck className="h-5 w-5" /> },
    { id: 'delivered', label: 'Delivered', icon: <Package className="h-5 w-5" /> },
  ];

  // Sample last order status for animation
  const lastOrderStatus = 'shipped' as OrderStatus;

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Animated Order Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Your Last Order Status</h2>
          <div className="flex items-center justify-between relative">
            {statusStages.map((stage) => (
              <div key={stage.id} className="flex flex-col items-center z-10">
                <motion.div
                  animate={{
                    scale: lastOrderStatus === stage.id ? 1.1 : 1,
                    backgroundColor: lastOrderStatus === stage.id ? '#f97316' : '#e5e7eb'
                  }}
                  className={`p-3 rounded-full mb-2 ${lastOrderStatus === stage.id ? 'bg-orange-500' : 'bg-gray-200'}`}
                >
                  {stage.icon}
                </motion.div>
                <span className={`text-sm font-medium ${lastOrderStatus === stage.id ? 'text-orange-600' : 'text-gray-500'}`}>
                  {stage.label}
                </span>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: lastOrderStatus === 'delivered' ? '100%' : 
                        lastOrderStatus === 'shipped' ? '66%' : 
                        lastOrderStatus === 'confirmed' ? '33%' : '0%'
                }}
                className="h-full bg-orange-500"
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 'DAR-2023-001',
                date: 'April 10, 2023',
                status: 'delivered' as OrderStatus,
                statusColor: 'text-green-600',
                products: [
                  {
                    id: '1',
                    name: 'Wireless Bluetooth Headphones',
                    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
                    price: 59.99,
                    quantity: 1
                  }
                ],
                total: 59.99,
                statusIndex: 3
              },
              {
                id: 'DAR-2023-002',
                date: 'March 28, 2023',
                status: 'shipped' as OrderStatus,
                statusColor: 'text-blue-600',
                products: [
                  {
                    id: '2',
                    name: 'Smart Watch Series 5',
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                    price: 129.99,
                    quantity: 1
                  }
                ],
                total: 129.99,
                statusIndex: 2
              }
            ].map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Package className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                    </div>
                    <span className={`font-medium ${order.statusColor}`}>{order.status}</span>
                  </div>
                  
                  {order.products.map((product) => (
                    <div key={product.id} className="flex gap-4 border-t pt-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image 
                          src={product.image} 
                          width={80} 
                          height={80} 
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                        <p className="text-orange-500 font-medium mt-1">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">Track Order</Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-gray-500 text-sm">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>

                {/* Status Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    {statusStages.map((stage) => (
                      <div key={stage.id} className="text-center w-full">
                        <div className={`mx-auto flex items-center justify-center h-10 w-10 rounded-full ${
                          order.status === stage.id ? 'bg-orange-500 text-white' : 
                          order.statusIndex >= statusStages.findIndex(s => s.id === stage.id) ? 'bg-gray-200' : 'bg-gray-100'
                        }`}>
                          {stage.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative pt-2">
                    <div className="flex mb-2 items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`${styles.progressBar} ${styles[`progressBar_${Math.floor((statusStages.findIndex(s => s.id === order.status) + 1) / statusStages.length * 100)}`]}`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      {statusStages.map((stage) => (
                        <span key={stage.id}>{stage.label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover"
                            width={500}
                            height={300}
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium">${item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}