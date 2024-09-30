import React from 'react';
import Image from 'next/image';
import SearchComponent from './SearchComponent';

import leaf1 from '@/../public/assets/images/leaf-1.png';
import leaf2 from '@/../public/assets/images/leaf-2.png';
import pizzaImg from '@/../public/assets/images/pizza-2.png';


function Hero() {
  return (
    <div className='flex mt-20 font-sans relative'>
        <div className="mx-4 flex flex-col">
            <div className="w-[60vw]">
                <h1 className='text-4xl text-orange2 font-bold mt-10'>Order Us</h1>
                <p className='mt-3 text-xs text-gray2 font-sans font-extralight'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                </p>
            </div>
            <div className="">
                <SearchComponent />
            </div>
        </div>
        <div className="">
            <Image src={leaf1} alt="A leaf" className='w-16 absolute top-2 right-24' />
            <Image src={leaf2} alt="A leaf" className='w-14 absolute bottom-4'/>
            <Image src={pizzaImg} alt="A pizza" />
        </div>
    </div>
  )
}

export default Hero
