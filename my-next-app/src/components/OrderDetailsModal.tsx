"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import successIcon from '@/../public/assets/images/success-icon.png';

const style = {
  position: 'absolute' as 'absolute',
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
    <div className=''>
        <IconButton size="small" className="text-orange2" onClick={handleOpen}>
            <VisibilityIcon fontSize="small" />
            <p className='text-sm ml-1'>Toppings</p>
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