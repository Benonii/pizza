"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OrderDetailsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='text-orange2'>
        <IconButton size="small" onClick={handleOpen}>
            <VisibilityIcon sx={{
              color: '#FF8100'
            }} fontSize="small" />
            <p className='text-sm text-orange2 ml-1'>Toppings</p>
        </IconButton>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='border-white rounded-lg'>
            <div className='rounded-xl shadow-lgw-[457px] h-[200px] flex flex-col'>
                <h1 className='font-sans text-xl text-center font-semibold'>Order Details</h1>
                <div className="flex items-center mt-3">
                    <p className='font-sans text-gray3 mr-5'>Name:</p>
                    <p className='font-sans text-lg'>Margherita</p>  
                </div>
                <div className='flex'>
                    <p className='font-sans text-gray3 mr-2'>Toppings:</p>
                    <div className="flex flex-wrap gap-2">
                        <p className='mr-1 bg-green2 rounded-3xl p-1 px-2 text-white text-sm'>Mozzarella</p>
                        <p className='mr-1 bg-[#C50101] rounded-3xl p-1 px-2 text-white text-sm'>Tomato</p>
                        <p className='mr-1 bg-green3 rounded-3xl p-1 px-2 text-white text-sm'>Bell Peppers</p>
                        <p className='mr-1 bg-[#008077] rounded-3xl p-1 px-2 text-white text-sm'>Onions</p>
                        <p className='mr-1 bg-orange7 rounded-3xl p-1 px-2 text-white text-sm'>Olives</p>
                    </div>
                </div>
                <div className="flex items-center mt-2">
                    <p className='font-sans text-gray3 mr-5'>Quantity:</p>
                    <p className='text-lg'>3</p>
                </div>
    </div>
        </Box>
      </Modal>
    </div>
  );
}