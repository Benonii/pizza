"use client";

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png'

function Page() {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.message);
      router.push('/')
    } else {
      console.error(data.error);
    }
  };
  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };
  return (
    <div className='h-screen w-screen bg-white border border-red-500 flex justify-center'>
      <div className="max-w-[411px] flex flex-col">
        <div className='flex items-center mt-20'>
          <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
          <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
        </div>

        <form onSubmit={handleSubmit} className=''>
          <h2 className='font-sans mt-3 text-2xl'>Sign in</h2>
          <hr className='mt-2 mb-5 border '/>
          <div className="flex flex-col gap-3">
            <TextField
              label="Email address"
              name='email'
              onChange={handleChange}
             />
            <TextField
              label="Password"
              name='password'
              type='password'
              onChange={handleChange}
             />
          </div>
          <FormControlLabel
            label="Remember me"
            control={
                <Checkbox {...label} />
            }
            className='font-sans'
          />

          <div className="mt-5 flex justify-center">
            <Button variant="contained" type='submit' className='bg-orange2 w-[100%] font-semibold'>Sign in</Button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default Page
