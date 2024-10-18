"use client";

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import OrangeCheckbox from '@/components/OrangeCheckbox';
import UploadButton from '@/components/UploadFile';
// import Button from '@mui/material/Button';
import PizzaUploadedModal from '@/components/PizzaUploadedModal';


function Page() {
  const [ formData, setFormData ] = useState({
    name: '',
    price: '',
  });

  const availableToppings = ['Mozzarella', 'Tomato', 'Bell Peppers', 'Onions', 'Olives']
  const [ toppings, setToppings ] = useState<string[]>([]);

  const [ success, setSuccess ] = useState<string | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const label = { inputProps: { 'aria-label': 'Toppings' } };



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRestaurantId = localStorage.getItem('restaurantId');
      setRestaurantId(storedRestaurantId);
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleCheckboxChange = (topping: string) => () => {
    if (!toppings.includes(topping)) {
      setToppings(prevState => ([...prevState, topping]))
    } else {
      setToppings( prevState => (prevState.filter(value => value !== topping)))
    }
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData, toppings, restaurantId })
    })

    const data = await res.json()
    if (res.ok) {
      if (data.success) {
        setSuccess('Pizza Created Successfully');
        setFormData({ name: '', price: '' });
        setToppings([]);
      } else {
        setError("Failed to create Pizza");
      }
    } else {
      console.log("Network error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-screen h-screen bg-white'>
      <div>
        <h1 className='font-sans text-2xl text-gray6 text-center mt-10 mb-5'>Add Menu</h1>
        <TextField
          label="Name"
          name="name"
          onChange={handleChange}
          sx={{
            width: '50vw',
            minWidth: 250,
          }}
        />

      </div>
      <div className='mt-5  w-[50vw] min-w-64'>
        <h2 className='font-sans text-xl text-gray3 mt-2 mb-2'>Toppings</h2>
        <div className="flex  flex-wrap mb-5">
          {availableToppings.map((topping) => (
            <FormControlLabel
              key={topping}
              label={topping}
              control={
                  <OrangeCheckbox 
                    checked={toppings.includes(topping)}
                    {...label} 
                    onChange={handleCheckboxChange(topping)}
                  />
              }
            />
          ))}
          
        </div>
      </div>
      
      <TextField
        label="Price"
        name="price"
        onChange={handleChange}
        sx={{
          width: '50vw',
          minWidth: 250,
        }}
        />
        <div className="w-[35vw] max-w-72 mt-5">
          <UploadButton />
        </div>
        <div className='flex justify-center items-center w-full mt-5'>
          <PizzaUploadedModal />
        </div>
        {error && (<p className='text-red-600'>{error}</p>)}
        {success && (<p className='text-green-600'>{success}</p>)}
    </form>
  )
}

export default Page;
