"use client";

import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import OrangeCheckbox from '@/components/OrangeCheckbox';
import UploadButton from '@/components/UploadFile';
import Button from '@mui/material/Button';


function page() {
  const label = { inputProps: { 'aria-label': 'Toppings' } };
  return (
    <div className='flex flex-col items-center w-full  h-screen bg-white'>
      <div>
        <h1 className='font-sans text-2xl text-gray6 text-center mt-10 mb-5'>Add Menu</h1>
        <TextField
          label="Name"
          className='w-[50vw] max-w-96'/>
      </div>
      <div className='mx-24 mt-5'>
        <h2 className='font-sans text-xl text-gray3 mt-2 mb-2'>Toppings</h2>
        <div className="flex flex-wrap mb-5">
          <FormControlLabel
                label="Mozzarella"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Tomato"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Bell Peppers"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Onions"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Olives"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <Button variant='contained' size='small' className='bg-orange2'>+ Add</Button>
        </div>
      </div>
      
      <TextField
        label="Price"
        className='w-[50vw] max-w-96'
        />
        <div className="w-[35vw] max-w-72 mt-5">
          <UploadButton />
        </div>

      <Button variant='contained' className='bg-orange2 mt-5 w-[30vw] max-w-64 pt-5 pb-5 rounded-xl font-semibold'>Submit</Button>
    </div>
  )
}

export default page
