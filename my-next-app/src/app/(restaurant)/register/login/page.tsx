import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from 'next/link';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
function Page() {
  const label = { inputProps: { 'aria-label': 'Remomber me' } };
  return (
    <div className='flex'>
        <div className="w-[50vw] h-[900px]">
            <Image src={pizzaBanner} alt="A pizza slice with orange background" className='w-full h-full'/>
        </div>

        <div className='ml-5 w-[50vw]'>
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
                  label="Password"
                 />
                <FormControlLabel
                    label="Remember me"
                    control={
                        <Checkbox {...label} />
                    }
                    className='font-sans'
                />
                <div className="mt-5 flex justify-center">
                    <Button variant="contained" className='bg-orange2 w-[100%] font-semibold'><Link href="/dashboard">Login</Link></Button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Page;