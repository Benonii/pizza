import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png';


function Navbar() {
  return (
    <div className='flex justify-between mt-5 mx-3 font-sans'>
      <div className='flex items-center'>
        <Image src={pizzaIcon} alt='pizza slice icon' className='w-10 h-10 mr-1' />
        <h1 className='text-xl text-orange1 font-semibold'>Pizza</h1>
      </div>

      <div className='flex justify-around items-center w-[70%] ml-5 text-gray1'>
        <Link href="/">Home</Link>
        <Link href="/">Orders</Link>

        <MenuIcon />
      </div>

      <div className="flex"></div>
    </div>
  )
}

export default Navbar;
