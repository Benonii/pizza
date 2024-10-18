"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png'
import OrangeCheckbox from '@/components/OrangeCheckbox';

function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    location: '',
    phoneNumber: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log('Form Data:', formData)

    
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        location: formData.location,
        phoneNumber: formData.phoneNumber
      })
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
      router.push('/login');
    } else {
      setError(data.error);
    }
  }

  return (
    <div className='flex'>
      <div className="hidden w-[50vw] h-[900px] md:block">
        <Image src={pizzaBanner} alt="A pizza slice with orange background" className='w-full h-full'/>
      </div>

      <div className="ml-5 w-screen md:w-[50vw]">
        <div className='flex items-center mt-20'>
          <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
          <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
        </div>

        <form className='flex flex-col gap-3 mr-10' onSubmit={handleSubmit}>
          <h2 className='font-sans mt-3 text-2xl'>Sign up</h2>
          <hr className='mt-2 mb-5 border '/>
          {error && <p className='text-red-600'>{error}</p>}
          {success && <p className='text-green-600'>{success}</p>}

          <div className="flex flex-col gap-3">
            <TextField
              label="Email address"
              onChange={handleChange}
              name="email"
             />
            <TextField
              label="Password"
              type="password"
              name='password'
              onChange={handleChange}
             />
            <TextField
              label="Confirm Password"
              type="password"
              name=''
              onChange={handleChange}
             />
            <TextField
              label="Location"
              name='location'
              onChange={handleChange}
             />
            <TextField
              label="Phone number"
              name='phoneNumber'
              onChange={handleChange}
             />
          </div>
          <FormControlLabel
            label="I accept the Terms and Conditions"
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
              Signup
            </Button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default Page
