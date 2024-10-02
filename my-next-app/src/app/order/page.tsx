"use client";

import React from 'react';
import OrderPizza from '@/components/OrderPizza';
import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "";
  
  return (
    <div className='bg-background'>
      <OrderPizza name={name} />
    </div>
  )
}

export default page
