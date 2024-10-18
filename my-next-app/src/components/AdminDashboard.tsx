"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png'; // Adjust the path

const AdminDashboard = ({children}: { children: React.ReactNode }) => {
  const pathname= usePathname();
  const router = useRouter();

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
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-2/5 bg-sidebarBg shadow-lg bg-white">
        <div className="flex justify-between items-center mt-4 mb-4 mx-1 bg-[#F3F3F340]">
          <h1 className="text-xl ml-2">Pizza</h1>
          <MenuOpenOutlinedIcon />
        </div>
        <hr className='border-1'/>
        <div className="p-4 flex flex-col items-center bg-orange6">
          <Image src={pizzaIcon} alt="Pizza Logo" width={50} height={50} className='mt-5 mb-5' />
        </div>

        {/* Navigation Links */}
        <nav className=" space-y-4 font-sans">
          <Link href="/dashboard/orders">
            <div className="flex items-center space-x-2 p-3 rounded-lg mx-4 hover:bg-gray-100">
              <ShoppingCartOutlinedIcon />
              <p>Orders</p>
            </div>
          </Link>
          <Link href="/dashboard/menu">
            <div className="flex items-center space-x-2 text-gray1 p-3 hover:bg-gray-100 rounded-lg mx-4">
              <LocalPizzaIcon />
              <p>Add menu</p>
            </div>
          </Link>
          <Link href="/dashboard/role">
            <div className="flex items-center space-x-2 text-gray1 p-3 hover:bg-gray-100 rounded-lg mx-4">
              <PersonOutlineOutlinedIcon />
              <p>Role</p>
            </div>
          </Link>
          <Link href="/dashboard/user">
            <div className="flex items-center space-x-2 text-gray1 p-3 hover:bg-gray-100 rounded-lg mx-4">
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
      <div className="w-fit flex flex-col bg-gray5">
        {/* Top Navbar */}
        <div className="flex items-center justify-between p-4 shadow-lg bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">{pageTitle}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationsNoneOutlinedIcon />
            <AccountCircleIcon />
          </div>
        </div>

        {/* Main Content */}
        <div className=" bg-gray-50 flex">
           {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
