"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import TextField from '@mui/material/TextField';
import UploadFile from '@/components/UploadFile';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import OrangeCheckbox from '@/components/OrangeCheckbox';

function Page() {
  const [ formData, setFormData ] = useState({
    admin_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    name: '', // Restaurant name
    location: ''
  });
  const router = useRouter();
  const [ errors, setErrors ] = useState<{[key: string]: string}>({});
  const [ termsAccepted, setTermsAccepted ] = useState<boolean>(false);

  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };

  const registerSchema = z.object({
    admin_name: z.string().min(2, 'Admin name too short'),
    email: z.string().email(),
    password: z.string().regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
                        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                        .regex(/[0-9]/, { message: "Password must contain at least one number" })
                        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
                        .min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string(),
    name: z.string().min(2, 'Restaurant name too short'),
    location: z.string().min(2, 'Location too short'),
    phone_number: z.string().min(10, 'Phone number too short').max(10, 'Phone number too long'),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = registerSchema.safeParse(formData);

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

    const restaurant = {
      admin_name: formData.admin_name,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone_number,
      name: formData.name, 
      location: formData.location
    };
  
    // Encode and stringify the restaurant object
    const restaurantData = encodeURIComponent(JSON.stringify(restaurant));
    // Validate input before passing it on (later)
    router.push(`/register/add-admin?data=${restaurantData}`);
  };

  return (
    <div className='flex'>
        <div className="hidden w-[50vw] h-[900px] md:block">
            <Image src={pizzaBanner} alt="A pizza slice with orange background" className='w-full h-full'/>
        </div>

        <div className='ml-5 w-screen md:w-[50vw]'>
            <hr className='mx-2'/>
            
            <div className='flex items-center mt-7 mb-3'>
              <Image src={pizzaIcon} alt="A slice of pizza" className='w-14' />
              <h1 className='font-sans text-orange1 text-2xl font-semibold ml-2'>Pizza</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[75%] mx-2">
                {errors.admin_name && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.admin_name}</p>}
                <TextField
                  label="Admin Name"
                  name="admin_name"
                  onChange={handleChange}
                 />
                {errors.email && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.email}</p>}
                <TextField
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                 />
                {errors.password && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.password}</p>}
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                 />
                {errors.confirm_password && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.confirm_password}</p>}
                <TextField
                  label="Confirm Password"
                  name='confirm_password'
                  type='password'
                  onChange={handleChange}
                 />
                {errors.phone_number && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.phone_number}</p>}
                <TextField
                  label="Phone number"
                  name='phone_number'
                  onChange={handleChange}
                 />
                {errors.name && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.name}</p>}
                <TextField
                  label="Restaurant Name"
                  name='name'
                  onChange={handleChange}
                 />
                {errors.location && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.location}</p>}
                <TextField
                  label="Location"
                  name='location'
                  onChange={handleChange}
                 />
                <UploadFile />
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
                    <Button variant="contained" type='submit'
                      disabled={!termsAccepted}
                      sx={{
                        backgroundColor: '#FF8100',
                        width: '100%',
                        font: '700',
                      }}
                    >
                      Sign up
                    </Button>
                </div>

                <p className='text-center'>Already have an account? <span className='text-orange2 underline'><Link href="/register/login">Log in</Link></span></p>
            </form>
            
        </div>
    </div>
  )
}

export default Page
