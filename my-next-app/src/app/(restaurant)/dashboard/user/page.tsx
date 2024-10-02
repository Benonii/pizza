"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";
import AddUserModal from '@/components/AddUserModal';


type User = {
  name: string
  phone_number: string
  email: string
  actions: string[]
}


function page() {
  const [data, setData ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantId, setRestaurantId] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRestaurantId = localStorage.getItem('restaurantId');
      setRestaurantId(storedRestaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Make the fetch request
        const response = await fetch(`/api/admins/?restaurantId=${restaurantId}`);
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }

        // Parse the JSON data
        const data = await response.json();
        console.log("Data:",data.users)
        setData(data.users); // Set the roles state
      } catch (err: any) {
        setError(err.message); // Set the error state
      } finally {
        setLoading(false); // Set loading to false
      }
      console.log("Roles:", data)
    };

    fetchUsers();  // Call the fetch function
  }, [restaurantId]);

  console.log("Users:", data);

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
          {row.original.phone_number}
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
        <AddUserModal />
        <div className=" mb-10 mx-5">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  )
}

export default page
