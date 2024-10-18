"use client";

import React from 'react';
import Image from 'next/image';
import FormControlLabel from '@mui/material/FormControlLabel';
import RelatedPizza from './RelatedPizza';
import OrderCompleteModal from './OrderCompleteModal';
import OrangeCheckbox from './OrangeCheckbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField } from '@mui/material';


import pizzaImg1 from '@/../public/assets/images/pizza-1.png';
import pizzaImg2 from '@/../public/assets/images/pizza-5.png';

interface OrderPizzaProps {
    name: string
}

function OrderPizza({ name  }: OrderPizzaProps) {
    const [ toppings, setToppings ] = React.useState<string[]>([]);
    const [ quantity, setQuantity ]  =  React.useState(0);
    const [restaurantId, setRestaurantId] = React.useState<string | null>(null);

    const label = { inputProps: { 'aria-label': 'Toppings' } };

    // const handleCheckboxChange = (topping: string) => () => {
    //     if (!topping.includes(topping)) {
    //         setToppings(prevState => ([...prevState, topping]))
    //     } else {
    //       setToppings( prevState => (prevState.filter(value => value !== topping)))
    //     }
    // }

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
          const storedRestaurantId = localStorage.getItem('restaurantId');
          setRestaurantId(storedRestaurantId);
        }
      }, []);
    
    const addQuantity = () => {
      setQuantity(prev => prev + 1);
    }
    const reduceQuantitiy = () => {
      if (quantity > 0) {
        setQuantity(prev => prev - 1);
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1,
            restaurantId,
            status:"Ordered",
            toppings,
            quantity: 1,
            price: 150.0,
          }),
        })
    
        const data = await res.json()
        if (res.ok) {
          if (data.success) {
            setToppings([]);
          }
        } else {
          console.log("Network error")
        }
      }
    return (
      <div className="w-screen h-screen flex flex-col items-center">
        <div className="md:grid grid-cols-2 justify-around items-center lg:w-[80%]">
          <div className='flex mt-5 mx-3 justify-center'>
            <Image src={pizzaImg1} alt="A pizza" className='w-72 mr-6' />
            <div className="flex flex-col gap-5 justify-center items-center">
              <Image src={pizzaImg1} alt="A smaller pizza"  className='w-36 min-w-[144px]'/>
              <Image src={pizzaImg2} alt="Next pizza" className='w-36' />
            </div>
          </div>
          <div className="mt-3 ml-9">
            <h1 className='font-sans text-3xl md:text-4xl font-semibold'>{name}</h1>
            <form onSubmit={handleSubmit} className="mr-4 font-sans ">
                <FormControlLabel
                    label="Mozzarella"
                    value="Mozzarella"
                    control={
                      <OrangeCheckbox {...label} />
                    }
                />
                <FormControlLabel
                    label="Tomato"
                    value="Tomato"
                    control={
                        <OrangeCheckbox {...label} />
                    }
                />
                <FormControlLabel
                    label="Bell Peppers"
                    value="Bell Peppers"
                    control={
                        <OrangeCheckbox {...label} />
                    }
                />
                <FormControlLabel
                  label="Onions"
                  value="Onions"
                  control={
                    <OrangeCheckbox {...label} />
                  }
               />
               <FormControlLabel
                  label="Olives"
                  value="Olives"
                  control={
                     <OrangeCheckbox {...label} />
                  }
                />
                <div className="flex items-center">
                  <RemoveIcon className="text-4xl border-2 border-orange2 bg-white rounded-md w-12 h-10"
                              onClick={reduceQuantitiy}
                />

                <TextField 
                  variant="outlined"
                  placeholder="Quantity"
                  inputProps={{
                    sx: {
                      textAlign: "center",
                      fontSize: 23,
                      border: 'none',
                    }
                  }}
                  value={quantity}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',  // Remove the border
                      },
                      borderRadius: '50%',  // Set the border-radius for the outer wrapper
                      width: 80,
                      height: 40,
                    }
                  }}
                />
                <AddIcon className="text-4xl border-2 border-orange2 bg-white rounded-md w-12 h-10"
                         onClick={addQuantity}
                />

                <p className="text-green2 ml-5 text-3xl font-bold">150</p>
                <p className='align-top mb-3 ml-1'>Birr</p>
            </div>
            <div className="reltaive flex w-full justify-center items-center mt-5">
              <OrderCompleteModal />
            </div>
          </form>
        </div>
      </div>
      <h3 className="mt-10 ml-3 self-start text-gray3 font-[550] font-sans text-xl md:text-3xl">Related</h3>
      <div className="flex justify-start mx-2 overflow-x-scroll w-screen lg:w-[80%]">
        <RelatedPizza />
        <RelatedPizza />
        <RelatedPizza />
        <RelatedPizza />
        <RelatedPizza />


      </div>
    </div>
  )
}

export default OrderPizza
