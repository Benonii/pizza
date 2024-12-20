import React from 'react';
import Image from 'next/image';

import pizzaPic from '@/../public/assets/images/pizza-4.png';

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

interface OrderProps {
    order: OrderType
}
function Order({ order }: OrderProps) {
    if (order.status === "Preparing" || order.status === "Ready") {
        order.status = "Ordered";
    }
  return (
    <div className='relative flex flex-col mt-3 shadow-lg rounded-3xl min-w-[340px] bg-white'>
        <div className='flex justify-center items-center h-56 mt-3'>
            <Image src={pizzaPic} alt="A pizza" className='h-56 w-56'/>
        </div>
        <div>
            <h4 className='mt-3 ml-5 text-lg font-bold font-sans'>Margharitta</h4>
            <p className='font-thin text-xs ml-5'>Tomato, Mozzarella, Beef Peppers, Onions, Olives</p>
        </div>

        <div className="mx-5 mt-2 flex justify-between mb-5">
            <div className="flex">
                <p className='text-4xl mr-1 text-[#01C550] font-semibold'>{order.price}</p>
                <p className='text-sm'>Birr</p>
            </div>

            <p className={`font-sans text-4xl mr-3 font-bold ${order.status === "Ordered" ? "text-orange5" : "text-green3"}`}>{order.status}</p>

        </div>
        {/* <hr className='mx-5 mt-3'/>
        <div className="flex justify-evenly items-center mx-5 mt-3 mb-5">
            <Image src={profilePic} alt="Profile" />
            <h4 className='ml-1 font-semibold font-sans'>Azmera Pizza</h4>
        </div> */}
    </div>
  )
}

export default Order;
