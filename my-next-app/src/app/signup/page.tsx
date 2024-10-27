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
import pizzaIcon from '@/../public/assets/images/pizza-icon.png'
import OrangeCheckbox from '@/components/OrangeCheckbox';

function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    location: '',
    phoneNumber: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [ termsAccepted, setTermsAccepted ] = useState<boolean>(false);

  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };
  const router = useRouter();

  const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
                        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                        .regex(/[0-9]/, { message: "Password must contain at least one number" })
                        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
                        .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    location: z.string().min(2, 'Location too short'),
    phoneNumber: z.string().min(10, 'Phone number too short').max(10, 'Phone number too long'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      console.log('Form is invalid:', validation.error.errors);

      const errorMap: { [key: string]: string} = validation.error.errors.reduce((acc: any, error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        acc[error.path[0]] = error.message;
        return acc;
      }, {})

      setErrors(errorMap);
      return;
    }

    setErrors({});

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
      if (data.message === 'User already exists') {
        setErrors(prev => ({...prev, userExists: data.message}))
      }
      console.error('Network error:', data);
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
          {success && <p className='text-green-600'>{success}</p>}

          <div className="flex flex-col gap-3">
            {errors.userExists && <p className='text-red-500 text-sm ml-2'>{errors.userExists}</p>}
            {errors.email && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.email}</p>}
            <TextField
              label="Email address"
              onChange={handleChange}
              name="email"
             />
            {errors.password && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.password}</p>}
            <TextField
              label="Password"
              type="password"
              name='password'
              onChange={handleChange}
             />
            {errors.confirmPassword && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.confirmPassword}</p>}
            <TextField
              label="Confirm Password"
              type="password"
              name='confirmPassword'
              onChange={handleChange}
             />
            {errors.location && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.location}</p>}
            <TextField
              label="Location"
              name='location'
              onChange={handleChange}
             />
             {errors.phoneNumber && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.phoneNumber}</p>}
            <TextField
              label="Phone number"
              name='phoneNumber'
              onChange={handleChange}
             />
          </div>
          <FormControlLabel
            label="I accept the Terms and Conditions"
            control={
                <OrangeCheckbox
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(prev => !prev)}
                  {...label} />
            }
            className='font-sans'
          />

          <div className="mt-5 flex justify-center">
            <Button variant="contained" 
              type='submit'
              disabled={!termsAccepted}
              sx={{
                backgroundColor: '#FF8100',
                width: '100%',
                fontWeight: '700',
              }}
            >
              Signup
            </Button>
          </div>

        </form>
        <p className='text-center mt-5'>Already have an account? <span className='text-orange2 underline'><Link href="/login">Log in</Link></span></p>
      </div>

      
    </div>
  )
}

export default Page
