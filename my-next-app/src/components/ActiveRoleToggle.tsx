import React, { useState } from 'react';
import { Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface ActiveRoleToggleProps {
    status: boolean
    id: number
    onStatusChange: (newStatus: boolean) => void
    handleDelete: (id: number) => void
}
function ActiveRoleToggle({ status, handleDelete, id }: ActiveRoleToggleProps) {
    const [ checked, setChecked ] =useState(status);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    console.log(open);
  return (
    <div className='flex items-center space-x-1'>
        <div className={`flex items-center ${checked ? 'bg-green1 text-green3' : 'bg-gray-400 text-gray5'} rounded-full px-2 py-1`}>
            <p className=''>{checked ? 'Active': 'Inactive'}</p>
            <Switch
                checked={checked}
                onChange={handleChange}
                sx={{
                    // Scale the entire switch to make it smaller
                    transform: 'scale(0.7)',
                
                    // Customize the switch thumb (the circle that moves)
                    '& .MuiSwitch-thumb': {
                      width: 20,   // Make the thumb smaller
                      height: 20,  // Make the thumb smaller
                    },
                
                    // Customize the switch track (the background)
                    '& .MuiSwitch-track': {
                      borderRadius: 16,   // Keep the track rounded
                      height: 14,         // Make the track smaller
                    },
                
                    // Checked state thumb color
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#008000',
                    },
                
                    // Checked state track color
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#008000',
                    },
                  }}
                />
        </div>

        <IconButton size="small" onClick={handleOpen}>
            <VisibilityIcon sx={{
              fontSize: 23,
            }} fontSize="small" />
        </IconButton>

        <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
            <DeleteIcon className='hover:text-red-500' />
        </IconButton>
    </div>
  )
}

export default ActiveRoleToggle;
