"use client";

import React from 'react';
import Image from 'next/image';
import FormControlLabel from '@mui/material/FormControlLabel';
import RelatedPizza from './RelatedPizza';
import OrderCompleteModal from './OrderCompleteModal';
import OrangeCheckbox from './OrangeCheckbox';

import pizzaImg1 from '@/../public/assets/images/pizza-1.png';
import pizzaImg2 from '@/../public/assets/images/pizza-5.png';

interface OrderPizzaProps {
    name: string
}

function OrderPizza({ name  }: OrderPizzaProps) {
    const [ toppings, setToppings ] = React.useState<string[]>([]);
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
    <div>
      <div className='flex mt-5 mx-3'>
        <Image src={pizzaImg1} alt="A pizza" className='w-72 mr-6' />
        <div className="flex flex-col gap-5 justify-center items-center">
            <Image src={pizzaImg1} alt="A smaller pizza"  className='w-36'/>
            <Image src={pizzaImg2} alt="Next pizza" className='w-36 after:' />
        </div>
      </div>
            <div className="mt-3 ml-3">
              <h1 className='font-sans text-3xl font-semibold'>{name}</h1>
              <form onSubmit={handleSubmit} className="mx-4 font-sans ">
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
              <div className="reltaive flex w-full justify-center items-center mt-5">
                <OrderCompleteModal />
              </div>
            </form>
            <div className="flex mx-2 mt-10 overflow-x-scroll">
              <RelatedPizza />
              <RelatedPizza />
              <RelatedPizza />
            </div>
        </div>
    </div>
  )
}

export default OrderPizza
