import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import UploadFile from '@/components/UploadFile';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from 'next/link';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';

function page() {
  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };
  return (
    <div className='flex'>
        <div className="w-[50vw] h-[900px]">
            <Image src={pizzaBanner} alt="A pizza slice with orange background" className='w-full h-full'/>
        </div>

        <div className='ml-5 w-[50vw]'>
            <hr className='mx-2'/>
            <div className='flex items-center mt-7 mb-3'>
              <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
              <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
            </div>

            <div className="flex flex-col gap-3 mr-10">
                <TextField
                  label="Admin Name"
                 />
                <TextField
                  label="Email address"
                 />
                <TextField
                  label="Password"
                 />
                <TextField
                  label="Confirm Password"
                 />
                <TextField
                  label="Phone number"
                 />
                <TextField
                  label="Restaurant Name"
                 />
                <TextField
                  label="Addis Ababa"
                 />
                <UploadFile />
                <FormControlLabel
                    label="I accept the Terms and Conditions"
                    control={
                        <Checkbox {...label} />
                    }
                    className='font-sans'
                />
                <div className="mt-5 flex justify-center">
                    <Button variant="contained" className='bg-orange2 w-[100%] font-semibold'><Link href="/register/add-admin">Sign up</Link></Button>
                </div>

                <p className='text-center'>Already have an account? <span className='text-orange2 underline'><Link href="/login">Log in</Link></span></p>
            </div>
            
        </div>
    </div>
  )
}

export default page
