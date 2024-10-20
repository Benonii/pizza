import React, { useState } from 'react';
import { Menu, MenuItem, Radio,
         RadioGroup, FormControlLabel 
       } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // For a dropdown arrow



interface StatusDropdownProps {
    status: string
    onStatusChange: (newStatus: 'Preparing' | 'Ready' | 'Delivered') => void;
}

function StatusDropdown({ status }: StatusDropdownProps) {
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const [ currentStatus, setCurrentStatus ] = useState(status);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentStatus(event.target.value);
        handleClose();
    };
  return (
    <div>
        <div
            onClick={handleClick}
            className={`flex justify-between  ${
                currentStatus=== 'Preparing' ? 'text-white bg-orange5' : currentStatus === 'Ready' ? 'text-white bg-green3': 'text-green3' 
            }  text-lg font-medium px-4 py-2 rounded-lg`}
        >
            {currentStatus}
            {currentStatus === 'Delivered' ? <CheckIcon /> : <ArrowDropDownIcon />}
        </div>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <RadioGroup value={currentStatus} onChange={handleStatusChange}>
                <MenuItem>
                    <FormControlLabel value="Preparing" control={<Radio />} label="Preparing" />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel value="Ready" control={<Radio />} label="Ready" />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel value="Delivered" control={<Radio />} label="Delivered" />
                </MenuItem>
            </RadioGroup>
        </Menu>
      
    </div>
  )
}

export default StatusDropdown
