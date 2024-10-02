"use client";

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Order from '@/components/Order'
import React, {useState, useEffect} from 'react'

type OrderType = {
  id: number
  price: string
  qunatity: number
  restaurantId: number
  status: "Ordered" | "Delivered"
  toppings: String[] | []
  user_id: number
}

function page() {
  const [ orders , setOrders ] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch pizzas');
        }
        const orders = await response.json();
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        return [];
      }
    };

    getOrders();
  }, []);
  console.log("Orders:", orders);
  return (
    <div className='bg-background'>
      <Navbar />
      <h3 className='text-gray3 ml-3 mt-14 font-sans'>Order History</h3>
      <div className='grid place-items-center mb-20'>
        {orders.length > 0 && orders.map(order => (
          <Order key={order.id} order={order}/>  
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default page
