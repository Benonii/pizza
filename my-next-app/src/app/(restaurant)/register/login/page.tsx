"use client";

import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import OrangeCheckbox from '@/components/OrangeCheckbox';
function Page() {
  const label = { inputProps: { 'aria-label': 'Remomber me' } };
  const router = useRouter();
  return (
    <div className='flex'>
        <div className="hidden w-[50vw] h-[900px] md:block">
            <Image src={pizzaBanner} alt="A pizza slice with orange background" className='w-full h-full'/>
        </div>

        <div className='ml-5 w-screen md:w-[50vw]'>
            <div className='flex items-center mt-7 mb-3'>
              <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
              <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
            </div>

            <h1 className='font-sans text-2xl mt-5'>Login</h1>
            <hr className='mr-2 mt-1 mb-5'/>
            <div className="flex flex-col gap-3 mr-10">

                <TextField
                  label="Email address"
                 />
                <TextField
                  type="password"
                  label="Password"
                 />
                <FormControlLabel
                    label="Remember me"
                    control={
                        <OrangeCheckbox {...label} />
                    }
                    className='font-sans'
                />
                <div className="mt-5 flex justify-center">
                    <Button variant="contained" 
                      sx={{
                        backgroundColor: '#FF8100',
                        width: '100%',
                        fontWeight: '700',
                      }}
                      onClick={() => {router.push('/dashboard/orders')}}
                      >
                        Login
                    </Button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Page;