"use client";

import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";


type User = {
  name: string
  phoneNumber: string
  email: string
  actions: string[]
}

const data: User[] = [
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Abebe Bekele",
    phoneNumber: "+25115236454789",
    email: "thisis@gmail.com",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
]


function page() {
  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
      Cell: ({ row }: { row: { original: User }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          {row.original.name}
        </Box>
      ),
    },
    {
      header: 'Phone No',
      accessorKey: 'phone_number',
      Cell: ({ row }: { row: { original: User }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          {row.original.phoneNumber}
        </Box>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      Cell: ({ row }: { row: { original: User }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          {row.original.email}
        </Box>
      ), 
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }: { row: { original: User }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          <IconButton size="small" className="">
            <VisibilityIcon fontSize="small" />
          </IconButton>
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
    <div>
      <div className='bg-white h-full'>
        <div className="border mt-10 mb-10 mx-5">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  )
}

export default page
