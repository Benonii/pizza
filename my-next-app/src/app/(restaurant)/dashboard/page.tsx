"use client";

import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

function page() {
  const pathname = usePathname();
  const router = useRouter();

  pathname === '/dashbard' && router.push('/dashboard/orders');
  return (
    <div className=''>
    </div>
  )
}

export default page
