"use client";

import React, {useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import pizzaIcon from '@/../public/assets/images/pizza-icon.png';


function Navbar() {
  const [ open, setOpen ] = useState<boolean>(false);
  const user = localStorage.getItem('user');

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
      return;
    }
    setOpen(open);
  };
  
  const pathname = usePathname();
  console.log("Path:", pathname);

  return (
    <div className='relative flex justify-between mt-5 mx-3 h-20 font-sans'>
      <div className='flex items-center mr-12'>
        <Image src={pizzaIcon} alt='pizza slice icon' className='w-8 md:w-10 mr-1' />
        <h1 className='text-xl md:text-3xl text-orange1 font-semibold'>Pizza</h1>
      </div>

      <div className="md:hidden flex justify-end w-[70%] ml-10 text-gray1">
        <Button onClick={toggleDrawer(true)}><MenuIcon className='text-black w-10 h-8'/></Button>
      </div>

      <div className='absolute right-5 md:flex justify-around items-center w-[500px] text-gray1 hidden'>
        <Link href="/" className={`${pathname === "/" ? "text-orange2" : ""} text-lg md:text-xl`}>Home</Link>
        <Link href={user ? `/history`: '/login'} className={`${pathname === "/history" ? "text-orange2" : ""} text-lg md:text-xl`}>Orders</Link>
        <Link href="#" className={` ${pathname === "/#" ? "text-orange2" : ""} text-lg md:text-xl`}>Who we are</Link>

        
        <Button variant="contained" sx={{
            backgroundColor: "#ff8100",
            padding: 2,
            marginRight: '-45px',
            fontWeight: '700',
          }}
        >
          <Link href='/register'>Register</Link>
        </Button>

        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              className="flex flex-col justify-top items-center w-64 h-full shadow-lg mt-5 bg-custom-gradient" // Tailwind classes for styling
            >
              <Link href="/" className={`${pathname === "/" ? "text-orange2" : ""} text-xl md:text-2xl lg:text-3xl`}>Home</Link>
              <Link href={user ? `/history`: '/login'} className={`${pathname === "/history" ? "text-orange2" : ""} text-xl md:text-2xl lg:text-3xl`}>Orders</Link>
              <Link href="#" className={`${pathname === "/#" ? "text-orange2" : ""} text-xl md:text-2xl lg:text-3xl`}>Who we are</Link> 
            </div>
            <Button variant="contained" sx={{
                backgroundColor: "#ff8100",
                padding: 2,
                fontWeight: '700',
              }}
            >
              <Link href='/register'>Register</Link>
            </Button>

          </Drawer>
      </div>

      <div className="flex"></div>
    </div>
  )
}

export default Navbar;
