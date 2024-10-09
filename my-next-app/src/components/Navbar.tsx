"use client";

import React, {useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer, Button } from '@mui/material';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';


function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
      return;
    }
    setOpen(open);
  };
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
        <Link href="#" className={`hidden ${pathname === "/#" ? "text-orange2" : ""} text-sm md:block`}>Who we are</Link>

        
        <Button variant="contained" sx={{
          backgroundColor: "#ff8100",
          padding: 2,
          marginTop: 2
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
              className="flex flex-col justify-center items-center bg-white w-64 h-full shadow-lg" // Tailwind classes for styling
            >
              <Link href="/" className={`${pathname === "/" ? "text-orange2" : ""} text-sm`}>Home</Link>
              <Link href="/history" className={`${pathname === "/history" ? "text-orange2" : ""} text-sm`}>Orders</Link>
              <Link href="#" className={`hidden ${pathname === "/#" ? "text-orange2" : ""} text-sm md:block`}>Who we are</Link> 
            </div>
          </Drawer>
      </div>

      <div className="flex"></div>
    </div>
  )
}

export default Navbar;
