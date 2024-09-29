import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';

import pizzaPic from '@/../public/assets/images/pizza-4.png';
import profilePic from '@/../public/assets/images/profile.jpg';

function Pizza() {
  return (
    <div className='relative flex flex-col mt-3 shadow-lg rounded-3xl min-w-[340px] bg-white'>
        <div className='flex justify-center items-center h-56 mt-3'>
            <Image src={pizzaPic} alt="A pizza" className='h-56 w-56'/>
        </div>
        <div>
            <h4 className='mt-3 ml-5 text-lg font-bold font-sans'>Margherita</h4>
            <p className='font-thin text-xs ml-5'>Tomato, Mozzarella, Beef Peppers, Onions, Olives</p>
        </div>

        <div className="mx-5 mt-2 flex justify-between">
            <div className="flex">
                <p className='text-2xl mr-1 text-[#01C550] font-semibold'>150</p>
                <p className='text-sm'>Birr</p>
            </div>

            <Button variant='contained' className='bg-[#FF8100] px-8'>Order</Button>
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
