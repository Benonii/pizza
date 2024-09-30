import React from 'react';
import Image from 'next/image';

import pizzaPic from '@/../public/assets/images/pizza-4.png';

function RelatedPizza() {
  return (
    <div className='relative flex flex-col mt-3 shadow-lg rounded-3xl min-w-[340px] bg-white mb-12 mx-1'>
        <div className='flex justify-center items-center h-56 mt-3'>
            <Image src={pizzaPic} alt="A pizza" className='h-56 w-56'/>
        </div>
        <div className='text-center mb-7'>
            <h4 className='mt-3 ml-5 text-lg font-bold font-sans'>Margherita</h4>
            <p className='font-thin text-xs ml-5'>Tomato, Mozzarella, Beef Peppers, Onions, Olives</p>
        </div>     
    </div>
  )
}

export default RelatedPizza
