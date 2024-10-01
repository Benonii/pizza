"use client";

import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";


type Role = {
  name: string
  createdAt: string
  actions: string[]
}

const data: Role[] = [
  {
    name: "Kitchen Manager",
    createdAt: "8/14/24",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Casher",
    createdAt: "8/14/24",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  },
  {
    name: "Branch Manager",
    createdAt: "8/14/24",
    actions: [
      "Update Order Status",
      "See Orders",
      "Add Users",
      "See Customers",
      "Create Roles"
    ]
  }
]


function page() {
  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
      Cell: ({ row }: { row: { original: Role }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          {row.original.name}
        </Box>
      ),
    },
    {
      header: 'Created at',
      accessorKey: 'created_at',
      Cell: ({ row }: { row: { original: Role }}) => (
        <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
          {row.original.createdAt}
        </Box>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }: { row: { original: Role }}) => (
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
      <div className='bg-white'>
        <div className="border mt-10 mb-10 mx-5">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  )
}

export default page
