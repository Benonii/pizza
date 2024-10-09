import React from 'react';
import Image from 'next/image';
import SearchComponent from './SearchComponent';

import leaf1 from '@/../public/assets/images/leaf-1.png';
import leaf2 from '@/../public/assets/images/leaf-2.png';
import pizzaImg from '@/../public/assets/images/pizza-2.png';


function Hero() {
  return (
    <div className='flex mt-20 font-sans relative'>
        <div className="ml-[3vw] flex flex-col w-screen">
            <div className="w-[60vw] mt-6">
                <h1 className='text-4xl md:text-6xl text-orange2 font-bold mt-10'>Order Us</h1>
                <p className='mt-3 text-xs md:text-lg text-gray2 font-sans font-extralight'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                </p>
            </div>
            <div className="">
                <SearchComponent />
            </div>
        </div>
        <div className="relative">
            <Image src={leaf1} alt="A leaf" className='w-[16vw] absolute top-3 right-[22vw]' />
            <Image src={leaf2} alt="A leaf" className='w-[16vw] absolute bottom-4 right-[16vw]'/>
            <Image src={pizzaImg} alt="A pizza" className='w-[50vw]'/>
        </div>
    </div>
  )
}

export default Hero
