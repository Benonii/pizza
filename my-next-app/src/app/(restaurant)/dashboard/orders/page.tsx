"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import OrderDetailsModal from '@/components/OrderDetailsModal';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import StatusDropdown from '@/components/StatusDropdown';

type Order = {
    id: number
    name: string;
    toppings: string[];
    quantity: number;
    customerNumber: string;
    createdAt: string;
    status: 'Ordered' | 'Preparing' | 'Ready' | 'Delivered';
}

function Page() {
    const [ orders , setOrders ] = useState<Order[]>([]);
    const [restaurantId, setRestaurantId] = React.useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedRestaurantId = localStorage.getItem('restaurantId');
        setRestaurantId(storedRestaurantId);
      }
    }, [restaurantId]);

    useEffect(() => {
      const getOrders = async () => {
        try {
          const response = await fetch('/api/orders/');
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const orders = await response.json();
          setOrders(orders);
        } catch (error) {
          console.error('Error fetching pizzas:', error);
          setOrders([]);
        }
      };

      getOrders();
    }, [restaurantId]);

    console.log("Orders", orders)
    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                Cell: ({ row }: {row: { original: Order}}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row.original.name}
                    </Box>
                ),
            },
            {
                header: 'Toppings',
                accessorKey: 'toppings',
                Cell: ({/* { row }: {row: { original: Order}} */}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        <OrderDetailsModal />
                        {/* <span>{row.original.toppings}</span> */}
                    </Box>
                ),
            },
            {
                header: 'Quantity',
                accessorKey: 'quantity',
                Cell: ({ row }: {row: { original: Order}}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row.original.quantity}
                    </Box>
                ),
            },
            {
                header: 'Customer No',
                accessorKey: 'customer_no',
                Cell: ({ row }: {row: { original: Order}}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row.original.customerNumber}
                    </Box>
                ),
            },
            {
                header: 'Created at',
                accessorKey: 'created_at',
                Cell: ({ row }: { row: { original: Order } }) => {
                    const date = new Date(row.original.createdAt);
                    
                    // Format the date to "2:44 PM 8/14/24"
                    const formattedDate = date.toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        month: 'numeric',
                        day: 'numeric',
                        year: '2-digit',
                    });
                    
                    return (
                        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                            {formattedDate}
                        </Box>
                    );
                }
            },
            {
                header: 'Status',
                accessorKey: 'status',
                Cell: ({ row }: {row: { original: Order}}) => (
                    <StatusDropdown 
                        status={row.original.status}
                        id={row.original.id}
                        onStatusChange={(newStatus: "Ordered" | 'Preparing' | 'Ready' | 'Delivered') => {
                            row.original.status = newStatus;
                        }}
                    />
                ),
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data: orders ?? [],
        enableGlobalFilter: true,
    });
  return (
    <div className='bg-white'>
        <div className='absolute border w-[90%]'>
            <MaterialReactTable
                table={table} 
            />
        </div>
    </div>
    
  )
}

export default Page
