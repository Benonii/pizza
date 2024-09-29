import React from 'react';
import Image from 'next/image';

import pizzaImg from '@/../public/assets/images/pizza-2.png';
import SearchComponent from './SearchComponent';


function Hero() {
  return (
    <div className='flex mt-20 font-sans'>
        <div className="mx-4 flex flex-col">
            <div className="w-[60vw]">
                <h1 className='text-4xl text-orange1 font-bold mt-10'>Order Us</h1>
                <p className='mt-3 text-xs text-gray2 font-sans font-thin'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                </p>
            </div>
            <div className="">
                <SearchComponent />
            </div>
        </div>
        <div className="">
            <Image src={pizzaImg} alt="A pizza" />
        </div>
    </div>
  )
}

export default Hero
