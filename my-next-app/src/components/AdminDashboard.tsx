"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Drawer, Button } from '@mui/material';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png'; // Adjust the path

const AdminDashboard = ({children}: { children: React.ReactNode }) => {
  const pathname= usePathname();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
      return;
    }
    setOpen(open);
  };

  // Function to map route to title
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard/orders':
        return 'Orders';
      case '/dashboard/menu':
        return 'Add Menu';
      case '/dashboard/role':
        return 'Role';
      case '/dashboard/user':
        return 'User';
      default:
        return 'Orders';
    }
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="flex h-screen w-screen lg:w-screen">
      {/* Sidebar */}
      <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: open ? 300: 0,
              transition: 'width 0.3s',
            }
          }}
      >
        <div className="w-full bg-sidebarBg shadow-lg bg-white">
          <div className="flex justify-between items-center mt-4 mb-4 mx-1 bg-[#F3F3F340]">
            <h1 className="text-xl ml-2">Pizza</h1>
            <MenuOpenOutlinedIcon onClick={toggleDrawer(false)}/>
          </div>
          <hr className='border-1'/>
          <div className="p-4 flex flex-col items-center bg-orange6">
            <Image src={pizzaIcon} alt="Pizza Logo" width={50} height={50} className='mt-5 mb-5' />
          </div>

          {/* Navigation Links */}
          <nav className=" space-y-4 font-sans">
            <Link href="/dashboard/orders">
              <div 
                className={`${pathname === '/dashboard/orders' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
              >
                <ShoppingCartOutlinedIcon />
                <p>Orders</p>
              </div>
            </Link>
            <Link href="/dashboard/menu">
              <div 
                className={`${pathname === '/dashboard/menu' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
              >
                <LocalPizzaIcon />
                <p>Add menu</p>
              </div>
            </Link>
            <Link href="/dashboard/role">
              <div 
                className={`${pathname === '/dashboard/role' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
              >
                <PersonOutlineOutlinedIcon />
                <p>Role</p>
              </div>
            </Link>
            <Link href="/dashboard/user">
              <div 
                className={`${pathname === '/dashboard/user' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
              >
                <AccountCircleOutlinedIcon />
                <p>User</p>
              </div>
            </Link>

            <hr />
          </nav>

          {/* Logout */}
          <div className="mt-auto p-4">
            <div className="flex items-center text-red-500 space-x-2 p-3 rounded-lg mx-4" onClick={() => {router.push('/register/login')}}>
              <LogoutIcon />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </Drawer>

      <div className="hidden w-1/5 bg-sidebarBg shadow-lg bg-white lg:block">
        <div className="flex justify-between items-center mt-4 mb-4 mx-1 bg-[#F3F3F340]">
          <h1 className="text-xl ml-2">Pizza</h1>
        </div>
        <hr className='border-1'/>
        <div className="p-4 flex flex-col items-center bg-orange6">
          <Image src={pizzaIcon} alt="Pizza Logo" width={50} height={50} className='mt-5 mb-5' />
        </div>

        {/* Navigation Links */}
        <nav className=" space-y-4 font-sans">
          <Link href="/dashboard/orders">
            <div 
              className={`${pathname === '/dashboard/orders' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
            >
              <ShoppingCartOutlinedIcon />
              <p>Orders</p>
            </div>
          </Link>
          <Link href="/dashboard/menu">
            <div 
              className={`${pathname === '/dashboard/menu' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
            >
              <LocalPizzaIcon />
              <p>Add menu</p>
            </div>
          </Link>
          <Link href="/dashboard/role">
            <div 
              className={`${pathname === '/dashboard/role' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
            >
              <PersonOutlineOutlinedIcon />
              <p>Role</p>
            </div>
          </Link>
          <Link href="/dashboard/user">
            <div 
              className={`${pathname === '/dashboard/user' ? "bg-orange8 text-orange2" : "bg-white"} flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 w-[100%]`}
            >
              <AccountCircleOutlinedIcon />
              <p>User</p>
            </div>
          </Link>

          <hr />
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4">
          <div className="flex items-center text-red-500 space-x-2 p-3 rounded-lg mx-4" onClick={() => {router.push('/register/login')}}>
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full lg:w-4/5 flex flex-col bg-gray5">
        {/* Top Navbar */}
        <div className="flex items-center justify-between p-4 shadow-lg bg-white">
         
          <div className="flex items-center space-x-4">
            <div className="lg:hidden flex justify-center text-gray1 h-10">
              <Button onClick={toggleDrawer(true)}><MenuIcon className='text-black w-10 h-8'/></Button>
            </div>
            <h1 className="text-xl font-bold">{pageTitle}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationsNoneOutlinedIcon />
            <AccountCircleIcon />
          </div>
        </div>

        {/* Main Content */}
        <div className=" bg-gray-50 flex w-50 mt-10 ml-10">
           {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
