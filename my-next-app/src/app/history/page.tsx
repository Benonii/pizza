"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Order from '@/components/Order';
import React, { useState, useEffect } from 'react';

type OrderType = {
  id: number;
  name: string;
  price: string;  // You can use string or Decimal depending on how you handle price
  quantity: number;
  restaurantId: number | null;  // It can be null since restaurantId is optional
  status: 'Ordered' | 'Delivered' | 'Preparing' | 'Ready';  // Add other possible statuses from the model
  toppings: string[];  // Array of strings, so no need for the empty array case
  user_id: number;
  createdAt: string;  // createdAt is a string in the Prisma model
  customerNumber: string;
};

function Page() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    };

    getOrders();
  }, []);

  console.log('Orders:', orders);

  return (
    <div className='bg-background min-h-screen flex flex-col relative'>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <h3 className='self-start text-gray3 ml-3 mt-14 font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
          Order History
      </h3>
      <div className="flex-grow">
        {/* Orders Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16 mb-[300px]'>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Order key={order.id} order={order} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No orders found</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Page;
