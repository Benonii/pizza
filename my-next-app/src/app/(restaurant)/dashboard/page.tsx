"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/dashbard') {
      router.push('/dashboard/orders');
    }
  }, [pathname, router]);
  
  return (
    <div className=''>
    </div>
  )
}

export default Page
