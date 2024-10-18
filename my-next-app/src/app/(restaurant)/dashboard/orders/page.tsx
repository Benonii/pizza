"use client";

import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import OrderDetailsModal from '@/components/OrderDetailsModal';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import StatusDropdown from '@/components/StatusDropdown';

type Order = {
    name: string;
    toppings: string[];
    quantity: number;
    customerNumber: string;
    createdAt: string;
    status: 'Preparing' | 'Ready' | 'Delivered';
}
  
const data: Order[] = [
    {
        name: "Margherita",
        toppings: [
            "Mozzarella",
            "Tomato",
            "Bell Peppers",
            "Onions",
            "Olives"
        ],
        quantity: 3,
        customerNumber: "+2511523654789",
        createdAt: "2:44 PM 8/14/24",
        status: 'Preparing',
    },
    {
        name: "Margherita",
        toppings: [
            "Mozzarella",
            "Tomato",
            "Bell Peppers",
            "Onions",
            "Olives"
        ],
        quantity: 3,
        customerNumber: "+2511523654789",
        createdAt: "2:44 PM 8/14/24",
        status: 'Preparing',
    },
    {
        name: "Margherita",
        toppings: [
            "Mozzarella",
            "Tomato",
            "Bell Peppers",
            "Onions",
            "Olives"
        ],
        quantity: 3,
        customerNumber: "+2511523654789",
        createdAt: "2:44 PM 8/14/24",
        status: 'Preparing',
    },
    {
        name: "Margherita",
        toppings: [
            "Mozzarella",
            "Tomato",
            "Bell Peppers",
            "Onions",
            "Olives"
        ],
        quantity: 3,
        customerNumber: "+2511523654789",
        createdAt: "2:44 PM 8/14/24",
        status: 'Preparing',
    },
]

function Page() {
//   const [ orders , setOrders ] = useState<Order[]>([]);

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const response = await fetch('/api/orders');
//         if (!response.ok) {
//           throw new Error('Failed to fetch pizzas');
//         }
//         const orders = await response.json();
//         setOrders(orders);
//       } catch (error) {
//         console.error('Error fetching pizzas:', error);
//         return [];
//       }
//     };

//     getOrders();
//   }, []);
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
                Cell: ({ row }: {row: { original: Order}}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row.original.createdAt}
                    </Box>
                ),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                Cell: ({ row }: {row: { original: Order}}) => (
                    <StatusDropdown 
                        status={row.original.status}
                        onStatusChange={(newStatus: 'Preparing' | 'Ready' | 'Delivered') => {
                            row.original.status = newStatus;
                        }}
                    />
                    // <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                    //     {row.original.status}
                    // </Box>
                ),
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        
        columns,
        data,
        enableGlobalFilter: true,

        
    });
  return (
    <div className='bg-white'>
        <div className='border'>
            <MaterialReactTable
                table={table} 
            />
        </div>
    </div>
    
  )
}

export default Page
