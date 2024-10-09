"use client";

import React, { useState, useEffect, Suspense } from 'react';
import OrderPizza from '@/components/OrderPizza';
import { useSearchParams } from 'next/navigation';

function OrderPizzaWrapper() {
  const [name, setName] = useState<string>("");

  const searchParams = useSearchParams();

  // Use useEffect to safely get searchParams on the client side
  useEffect(() => {
    const fetchedName = searchParams.get('name') || "";
    setName(fetchedName);
  }, [searchParams]);

  return (
    <div className="bg-background">
      <OrderPizza name={name} />
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
