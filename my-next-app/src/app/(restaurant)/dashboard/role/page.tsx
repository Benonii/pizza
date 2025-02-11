"use client";

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Box from '@mui/material/Box';
import ActiveRoleToggle from '@/components/ActiveRoleToggle';
import AddRoleModal from '@/components/AddRoleModal';

type Role = {
  id: number
  name: string
  created_at: string
  status: true | false
  actions: string[]
}

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRestaurantId = localStorage.getItem('restaurantId');
      setRestaurantId(storedRestaurantId);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/roles');
      if (!response.ok) {
        throw new Error('Failed to fetch roles');
      }
      const data = await response.json();
      setData(data.roles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (restaurantId) {
      fetchRoles();
    }
  }, [restaurantId, fetchRoles]);

  const deleteRole = useCallback(async (id: number) => {
    const res = await fetch('/api/roles/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    })

    const resJSON = await res.json();
    if(!res.ok) {
      console.error("Failed to delete Role", resJSON);
    }
    fetchRoles();
  }, []);

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
      Cell: ({ row }: { row: { original: Role }}) => (
        <ActiveRoleToggle
          status={true}
          id={row.original.id}
          handleDelete={deleteRole}
          onStatusChange={(newStatus: boolean) => {
            row.original.status = newStatus;
          }}
        />
      ),
    },
  ],
  [deleteRole],
);

const table = useMaterialReactTable({
  columns,
  data,
  enableGlobalFilter: true,
});

console.log(loading);

  return (
    <div className="justify-between absolute  bg-white w-[90%]">
      {/* Add Role Button */}
      <AddRoleModal id={restaurantId || ""}/>
      <MaterialReactTable table={table} />
    </div>
  )
}

export default Page;

