import React, { useState } from 'react';
import { Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface ActiveRoleToggleProps {
    status: boolean
    onStatusChange: (newStatus: boolean) => void
}
function ActiveRoleToggle({ status }: ActiveRoleToggleProps) {
    const [ checked, setChecked ] =useState(status);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }
  return (
    <div className='flex items-center space-x-2'>
        <div className='flex items-center bg-green3 rounded-full px-2 py-1'>
            <p className='text-green3'>{checked ? 'Active': 'Inactive'}</p>
        </div>

        <Switch
            checked={checked}
            onChange={handleChange}
            sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'green',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'green',
                },
            }}
        />
        <IconButton aria-label="delete">
            <DeleteIcon />
        </IconButton>
    </div>
  )
}

export default ActiveRoleToggle;
