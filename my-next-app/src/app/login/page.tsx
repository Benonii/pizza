"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from "zod";

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import OrangeCheckbox from '@/components/OrangeCheckbox';


function Page() {
  const label = { inputProps: { 'aria-label': 'Remomber me' } };
  const router = useRouter();

  const [formData, setFormData ] = useState({
    email: '',
    password: '',
  });
  const [ errors, setErrors ] = useState<{ [key: string]: string }>({});

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = loginSchema.safeParse(formData);
    if(!validation.success) {
      console.error("Form data is invalid:", validation.error.errors);

      const errorMap: { [key: string]: string } = validation.error.errors.reduce((acc: any, error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        acc[error.path[0]] = error.message;
        return acc;
      }, {});

      setErrors(errorMap);
      return;
    }

    setErrors({});

    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const resJSON = await res.json();
    if (!res.ok) {
      console.error('Error logging in', resJSON);   
    } else {
       localStorage.setItem('user', JSON.stringify(resJSON.user));
       console.log('Log in successful', resJSON);
       router.push('/');
    }
  }

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
            <form className="flex flex-col gap-3 mr-10" onSubmit={handleSubmit}>
              {errors.email && <p className='text-red-500 text-sm mb-0 ml-2'>{errors.email}</p>}
              <TextField
                name="email"
                value={formData.email}
                label="Email address"
                onChange={handleChange}
               />
              {errors.password && <p className='text-red-500 text-sm mb-0 ml-2'>{errors.password}</p>}
              <TextField
                name="password"
                value={formData.password}
                type="password"
                label="Password"
                onChange={handleChange}
               />
              <FormControlLabel
                  label="Remember me"
                  control={
                      <OrangeCheckbox {...label} />
                  }
                  className='font-sans'
              />
              <div className="mt-5 flex justify-center">
                  <Button 
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#FF8100',
                      width: '100%',
                      fontWeight: '700',
                    }}
                  >
                      Login
                  </Button>
              </div>
            </form>
            <p className='text-center mt-5'>Don&apos;t have an account? <span className='text-orange2 underline'><Link href="/signup">Sign up</Link></span></p>
        </div>
      
    </div>
  )
}

export default Page;