"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';

type Admin = {
  admin_name: string
  email: string
  phone_number: string
  password: string
}

type Restaurant = {
  admin_name: string
  email: string
  password: string
  phone_number: string
  name: string
  location: string
  admin: Admin
}

function page() {
  const router = useRouter();
  const [ formData, setFormData ] = useState<Admin>({
    admin_name: '',
    email: '',
    phone_number: '',
    password: ''

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const data = searchParams.get('data') || "";

  // Safely parse the restaurant data
  const restaurant: Restaurant = JSON.parse(decodeURIComponent(data));

  console.log("Full restaurant", restaurant)

  const restaurantWithAdmin = {
      admin_name: restaurant.admin_name,
      email: restaurant.email,
      password: restaurant.password,
      phone_number: restaurant.phone_number,
      name: restaurant.name, 
      location: restaurant.location,
      admin: {
        admin_name: formData.admin_name,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password
      }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);


    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_name: restaurant.admin_name,
          email: restaurant.email,
          password: restaurant.password,
          phone_number: restaurant.phone_number,
          name: restaurant.name, 
          location: restaurant.location,
          admin: {
            admin_name: formData.admin_name,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password
          }
        })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.success) {
          const { restaurantId } = data;
          setSuccess(data.message);
          localStorage.setItem('restaurantId', restaurantId);
          router.push('/dashboard/orders');
        }
      } else {
          setError(data.error);
      }
    };

    console.log('Admin:', formData)

  
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

            <h1 className='font-sans text-2xl mt-5'>Add Admin</h1>
            <hr className='mr-2 mt-1 mb-5'/>
            {error && <p className="text-green-600">Restaurant registered successfully</p>}
            {success && <p className="text-red-600">Failed to register restaurant</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mr-10">
                <TextField
                  label="Admin Name"
                  name='admin_name'
                  onChange={handleChange}
                 />
                <TextField
                  label="Email address"
                  name='email'
                  onChange={handleChange}

                 />
                <TextField
                  label="Phone number"
                  name='phone_number'
                  onChange={handleChange}

                 />
                <TextField
                  label="Password"
                  name='password'
                  type='password'
                  onChange={handleChange}

                 />
                <TextField
                  label="Confirm Password"
                  name='confirm_password'
                  type='password'
                  onChange={handleChange}
                 />
                <div className="mt-5 flex justify-center">
                    <Button type='submit' variant="contained" className='bg-orange2 w-[100%] font-semibold'>Continue</Button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default page
