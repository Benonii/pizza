"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter, useSearchParams } from 'next/navigation';

import pizzaBanner from '@/../public/assets/images/pizza-banner.jpg';
import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import { z } from 'zod';

type Admin = {
  admin_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
};

type Restaurant = {
  admin_name: string;
  email: string;
  password: string;
  phone_number: string;
  name: string;
  location: string;
  admin: Admin;
};

function AddAdminForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<Admin>({
    admin_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [ errors, setErrors ] = useState<{[key: string]: string}>({});

  const adminSchema = z.object({
    admin_name: z.string().min(2, "Admin name too short"),
    email: z.string().email(),
    phone_number: z.string().min(10, 'Phone number too short').max(10, 'Phone number too long'),
    password: z.string().regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
                        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                        .regex(/[0-9]/, { message: "Password must contain at least one number" })
                        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
                        .min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string(),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

  const searchParams = useSearchParams();
  
  useEffect(() => {
    const data = searchParams.get('data') || '';
    try {
      const parsedData: Restaurant = JSON.parse(decodeURIComponent(data));
      setRestaurant(parsedData);
    } catch (error) {
      console.log(error);
      setError('Failed to parse restaurant data');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = adminSchema.safeParse(formData);
    
    if (!validation.success) {
      console.log('Form is invalid:', validation.error.errors);

      const errorMap: { [key: string]: string} = validation.error.errors.reduce((acc: any, error: any) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {})

      setErrors(errorMap);
      return;
    }

    setErrors({});
    setError("");
    setSuccess(null);

    if (!restaurant) {
      setError('No restaurant data available');
      return;
    }

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
          password: formData.password,
        },
      }),
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


  return (
    <div className="flex">
      <div className="hidden w-[50vw] h-[900px] md:block">
        <Image
          src={pizzaBanner}
          alt="A pizza slice with orange background"
          className="w-full h-full"
        />
      </div>

      <div className="ml-5 w-screen md:w-[50vw]">
        <div className="flex items-center mt-7 mb-3">
          <Image src={pizzaIcon} alt="A slice of pizza" className="w-14" />
          <h1 className="font-sans text-orange1 text-2xl font-semibold ml-2">
            Pizza
          </h1>
        </div>

        <h1 className="font-sans text-2xl mt-5">Add Admin</h1>
        <hr className="mr-2 mt-1 mb-5" />
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[75%] mx-2">
          {errors.admin_name && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.admin_name}</p>}
          <TextField label="Admin Name" name="admin_name" value={formData.admin_name} onChange={handleChange} />
          {errors.email && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.email}</p>}
          <TextField label="Email address" name="email" value={formData.email} onChange={handleChange} />
          {errors.phone_number && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.phone_number}</p>}
          <TextField label="Phone number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          {errors.password && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.password}</p>}
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            type="password"
            onChange={handleChange}
          />
          {errors.confirm_password && <p className='text-red-500 text-sm mt-0 ml-2'>{errors.confirm_password}</p>}
          <TextField
            label="Confirm Password"
            name="confirm_password"
            value={formData.confirm_password}
            type="password"
            onChange={handleChange}
          />
          <div className="mt-5 flex justify-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#FF8100',
                width: '100%',
                fontWeight: '700',

              }}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddAdminForm />
    </Suspense>
  );
}
