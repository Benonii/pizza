"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";
import AddRoleModal from '@/components/AddRoleModal';

type Role = {
  name: string
  created_at: string
  actions: string[]
}

// const data: Role[] = [
//   {
//     name: "Kitchen Manager",
//     createdAt: "8/14/24",
//     actions: [
//       "Update Order Status",
//       "See Orders",
//       "Add Users",
//       "See Customers",
//       "Create Roles"
//     ]
//   },
//   {
//     name: "Casher",
//     createdAt: "8/14/24",
//     actions: [
//       "Update Order Status",
//       "See Orders",
//       "Add Users",
//       "See Customers",
//       "Create Roles"
//     ]
//   },
//   {
//     name: "Branch Manager",
//     createdAt: "8/14/24",
//     actions: [
//       "Update Order Status",
//       "See Orders",
//       "Add Users",
//       "See Customers",
//       "Create Roles"
//     ]
//   }
// ]


function Page() {
  const [data, setData ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRestaurantId = localStorage.getItem('restaurantId');
      setRestaurantId(storedRestaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        // Make the fetch request
        const response = await fetch('/api/roles');
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }

        // Parse the JSON data
        const data = await response.json();
        console.log("Data:",data.roles)
        setData(data.roles); // Set the roles state
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false
      }
      console.log("Roles:", data)
    };

    fetchRoles();  // Call the fetch function
  }, [restaurantId, data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`;
  };

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
          {formatDate(row.original.created_at)}
        </Box>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ /*{ row }: { row: { original: Role }} */}) => (
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
      {loading ? (
      <div>Loading...</div>
      ) : (
      <div className="justify-between mt-10 mx-5 bg-white border">
        {/* Add Role Button */}
        <AddRoleModal />
        <MaterialReactTable table={table} />
      </div>
      )}
    </div>
  )
}

export default Page;

