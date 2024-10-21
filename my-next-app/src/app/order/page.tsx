"use client";

import React, { useState, useEffect, Suspense } from 'react';
import OrderPizza from '@/components/OrderPizza';
import { useSearchParams } from 'next/navigation';

function OrderPizzaWrapper() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const searchParams = useSearchParams();

  // Use useEffect to safely get searchParams on the client side
  useEffect(() => {
    const fetchedName = searchParams.get('name') || "";
    const fethcedPrice = searchParams.get('price') || "";

    setName(fetchedName);
    setPrice(fethcedPrice);
  }, [searchParams]);

  return (
    <div className="bg-background">
      <OrderPizza name={name} price={price}/>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPizzaWrapper />
    </Suspense>
  );
}
