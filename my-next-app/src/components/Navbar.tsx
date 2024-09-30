"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png';


function Navbar() {
  const pathname = usePathname();
  console.log("Path:", pathname);

  return (
    <div className='flex justify-between mt-5 mx-3 font-sans'>
      <div className='flex items-center mr-12'>
        <Image src={pizzaIcon} alt='pizza slice icon' className='w-8 mr-1' />
        <h1 className='text-xl text-orange1 font-semibold'>Pizza</h1>
      </div>

      <div className='flex justify-around items-center w-[70%] ml-5 text-gray1'>
        <Link href="/" className={`${pathname === "/" ? "text-orange2" : ""} text-sm`}>Home</Link>
        <Link href="/history" className={`${pathname === "/history" ? "text-orange2" : ""} text-sm`}>Orders</Link>

        <MenuIcon />
      </div>

      <div className="flex"></div>
    </div>
  )
}

export default Navbar;
