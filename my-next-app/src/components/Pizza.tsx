"use client";

import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';

import pizzaPic from '@/../public/assets/images/pizza-4.png';
import profilePic from '@/../public/assets/images/profile.jpg';
import { useRouter } from 'next/navigation';

type Pizza = {
    id: number
    name: string
    toppings: string[]
    price: string | number
    restaurantId: number
  }

interface PizzaProps {
    pizza: Pizza
}
function Pizza({ pizza }: PizzaProps ) {
    const router = useRouter();
  return (
    <div className='relative flex flex-col mt-3 shadow-lg rounded-xl min-w-[340px] bg-white'>
        <div className='flex justify-center items-center h-56 mt-3'>
            <Image src={pizzaPic} alt="A pizza" className='h-56 w-56'/>
        </div>
        <div>
            <h4 className='mt-3 ml-5 text-lg font-bold font-sans'>{pizza.name}</h4>
            <div className="flex ml-5">
            {pizza.toppings.length > 0 && pizza.toppings.map(topping => (
                <p className='font-thin text-xs ml-1' key={topping}>{topping},</p>
            ))}
            </div>
            
        </div>

        <div className="mx-5 mt-2 flex justify-between">
            <div className="flex">
                <p className='text-2xl mr-1 text-[#01C550] font-semibold'>pizza.price</p>
                <p className='text-sm'>Birr</p>
            </div>

            <Button 
                size='large'
                variant='contained'
                sx={{
                    backgroundColor:'#FF8100',
                    paddingInline: '2rem',
                    fontFamily: 'font-sans',
                    fontWeight: '700',
                }}
                onClick={() => {router.push(`/order/?name=${pizza.name}`)}}>
                Order</Button>
        </div>
        <hr className='mx-5 mt-3'/>
        <div className="flex justify-evenly items-center mx-5 mt-3 mb-5">
            <Image src={profilePic} alt="Profile" />
            <h4 className='ml-1 font-semibold font-sans'>Azmera Pizza</h4>
        </div>
    </div>
  )
}

export default Pizza;
