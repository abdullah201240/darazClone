'use client';
import { createContext, useContext, useState } from 'react';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  statusIndex: number;
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'statusIndex'>) => void;
};

const OrderContext = createContext<OrderContextType>({
  orders: [],
  addOrder: () => {},
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Omit<Order, 'id' | 'date' | 'status' | 'statusIndex'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing',
      statusIndex: 0,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Simulate order status updates
    const timers = [
      setTimeout(() => updateOrderStatus(newOrder.id, 'confirmed', 1), 3000),
      setTimeout(() => updateOrderStatus(newOrder.id, 'shipped', 2), 8000),
      setTimeout(() => updateOrderStatus(newOrder.id, 'delivered', 3), 15000),
    ];
    
    return () => timers.forEach(t => clearTimeout(t));
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], statusIndex: number) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status, statusIndex } 
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
