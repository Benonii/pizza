"use client";

import React, { useState } from 'react';

import Image from 'next/image';
import TextField from '@mui/material/TextField';
import UploadFile from '@/components/UploadFile';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const label = { inputProps: { 'aria-label': 'Terms and conditions' } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    console.log(formData);

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

    // const res = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     admin_name: formData.admin_name,
    //     email: formData.email,
    //     password: formData.password,
    //     phone_number: formData.phone_number,
    //     name: formData.name, 
    //     location: formData.location
    //   })
    // });

    // const data = await res.json();
    // if (data.success) {
    //   const { restaurantId } = data;
    //   setSuccess(data.message);
    //   // router.push('/register/add-admin?retaurantId=${restaurantId}');
    // } else {
    //   setError(data.error);
    // }
    console.log(error);
    console.log(success);

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
                <TextField
                  label="Admin Name"
                  name="admin_name"
                  onChange={handleChange}
                 />
                <TextField
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                 />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                 />
                <TextField
                  label="Confirm Password"
                  name='confirm_password'
                  type='password'
                  onChange={handleChange}
                 />
                <TextField
                  label="Phone number"
                  name='phone_number'
                  onChange={handleChange}
                 />
                <TextField
                  label="Restaurant Name"
                  name='name'
                  onChange={handleChange}
                 />
                <TextField
                  label="Location"
                  name='location'
                  onChange={handleChange}
                 />
                <UploadFile />
                <FormControlLabel
                    label="I accept the Terms and Conditions"
                    control={
                        <OrangeCheckbox {...label} />
                    }
                    className='font-sans'
                />
                <div className="mt-5 flex justify-center">
                    <Button variant="contained" type='submit'
                      sx={{
                        backgroundColor: '#FF8100',
                        width: '100%',
                        font: '700',
                      }}
                    >
                      Sign up
                    </Button>
                </div>

                <p className='text-center'>Already have an account? <span className='text-orange2 underline'><Link href="/login">Log in</Link></span></p>
            </form>
            
        </div>
    </div>
  )
}

export default Page
