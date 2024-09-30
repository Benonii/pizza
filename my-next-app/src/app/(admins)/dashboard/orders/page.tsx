"use client";

import React, { useMemo } from 'react';
import { MRT_Cell, MRT_ColumnDef } from 'material-react-table';
import { Select, MenuItem } from '@mui/material';
import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';

type Order = {
    name: string
    toppings: string[]
    quantity: number
    customerNumber: string
    createdAt: string
    status: "Preparing" | "Ready" | "Delivered"
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
        status: "Preparing",
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
        status: "Preparing",
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
        status: "Preparing",
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
        status: "Preparing",
    },
]

function page() {
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
                Cell: ({ row }: {row: { original: Order}}) => (
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        <IconButton size="small" className="text-orange2">
                            <VisibilityIcon fontSize="small" />
                            <p className='text-sm ml-1'>Toppings</p>
                        </IconButton>
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
                    <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
                        {row.original.status}
                    </Box>
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
        <div className='border mt-10 mb-10 mx-5'>
            <MaterialReactTable
            table={table} 
    />
        </div>
    </div>
    
  )
}

export default page
