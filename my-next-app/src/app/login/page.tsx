import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png'

function page() {
  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };
  return (
    <div className='h-screen w-screen bg-white border border-red-500 flex justify-center'>
      <div className="max-w-[411px] flex flex-col">
        <div className='flex items-center mt-20'>
          <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
          <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
        </div>

        <div className=''>
          <h2 className='font-sans mt-3 text-2xl'>Sign in</h2>
          <hr className='mt-2 mb-5 border '/>
          <div className="flex flex-col gap-3">
            <TextField
              label="Email address"
             />
            <TextField
              label="Password"
             />
          </div>
          <FormControlLabel
            label="I accept the Terms and Conditions"
            control={
                <Checkbox {...label} />
            }
            className='font-sans'
          />

          <div className="mt-5 flex justify-center">
            <Button variant="contained" className='bg-orange2 w-[100%] font-semibold'>Sign in</Button>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default page
