"use client";

import React from 'react';
import Image from 'next/image';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import RelatedPizza from './RelatedPizza';
import OrderCompleteModal from './OrderCompleteModal';


import pizzaImg1 from '@/../public/assets/images/pizza-1.png';
import pizzaImg2 from '@/../public/assets/images/pizza-5.png';

const OrangeCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
        color: '#FF8100',
    },
});

function OrderPizza() {
    const label = { inputProps: { 'aria-label': 'Toppings' } };
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
        <h1 className='font-sans text-3xl font-semibold'>Margherita</h1>
        <div className="mx-4 font-sans ">
            <FormControlLabel
                label="Mozzarella"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Tomato"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Bell Peppers"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Onions"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
            <FormControlLabel
                label="Olives"
                control={
                    <OrangeCheckbox {...label} />
                }
            />
        </div>
      </div>
      <div className="reltaive flex w-full justify-center items-center mt-5">
        <OrderCompleteModal />
      </div>
      <div className="flex mx-2 mt-10 overflow-x-scroll">
        <RelatedPizza />
        <RelatedPizza />
        <RelatedPizza />
      </div>
    </div>
  )
}

export default OrderPizza
