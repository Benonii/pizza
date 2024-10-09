"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Order from '@/components/Order';
import React, { useState, useEffect } from 'react';

type OrderType = {
  id: number;
  price: string;
  quantity: number;
  restaurantId: number;
  status: 'Ordered' | 'Delivered';
  toppings: string[] | [];
  user_id: number;
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
      <div className="flex-grow">
        <h3 className='text-gray3 ml-3 mt-14 font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
          Order History
        </h3>

        {/* Orders Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4 sm:px-8 lg:px-16 mb-[300px]'>
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
