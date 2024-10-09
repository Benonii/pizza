"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import successIcon from '@/../public/assets/images/success-icon.png';

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

export default function OrderCompleteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.push('/history');
    }, 3000)
  }

  const router = useRouter();

  return (
    <div className='w-[90%]'>
      <Button type="submit" variant='contained' sx={{
        backgroundColor: '#FF8100',
        width: '100%',
      }}
      onClick={handleOpen}>
        Order
      </Button>      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='border-white rounded-lg'>
            <div className='rounded-xl shadow-lgw-[336px] h-[266px] flex flex-col justify-center items-center'>
                <Image src={successIcon} alt="A success icon" className='w-28'/>
                <p className='text-center font-sans '>Your order has been successfully completed</p>
            </div>
        </Box>
      </Modal>
    </div>
  );
}