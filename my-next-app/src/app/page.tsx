"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import TopRestaurant from "@/components/TopRestaurant";
import Pizza from "@/components/Pizza";
import Link from "next/link";
import { TextField, InputAdornment, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type PizzaType = {
  id: number
  name: string
  toppings: string[]
  price: string | number
  restaurantId: number
}
export default function Home() {
  const [ pizzas, setPizzas ] = useState<PizzaType[]>([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await fetch('/api/pizzas');
        if (!response.ok) {
          throw new Error('Failed to fetch pizzas');
        }
        const pizzas = await response.json();
        setPizzas(pizzas);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
        return [];
      }
    };

    getPizzas();
  }, []);

  console.log('Pizzas:', pizzas);

  return (
    <div className="bg-background">
      <div className="bg-custom-gradient">
        <Navbar />
        <Hero />
      </div>

        <h3 className='text-gray3 ml-3'>Featured pizzas</h3>
        <Featured />

        <h3 className="text-gray3 mt-10 ml-3">Top Restaurants</h3>
        <div className="flex overflow-scroll bg-custom-gradient mb-20">
          <TopRestaurant />
          <TopRestaurant />
          <TopRestaurant />
          <TopRestaurant />
        </div>

        <h3 className="text-gray3 mt-10 ml-3">Popular pizzas</h3>
        <div className="grid place-items-center gap-1">
            {pizzas.length > 0 && pizzas.map(pizza => (
                <Pizza key={pizza.id} pizza={pizza} />
            ))}
        </div>

        
        <h3 className="text-gray3 mt-10 ml-3">Fasting pizzas</h3>
        <div className="flex justify-center ml-5 gap-3 overflow-auto">
            {pizzas.length > 0 && pizzas.map(pizza => (
                <Pizza key={pizza.id} pizza={pizza} />
            ))}
        </div>

        <div className="mt-20 bg-[#CCB691] flex">
          <div className="flex flex-col w-[50vw] ml-7 mt-7">
            <Link href="/" className="p-1 font-sans font-semibold">Home</Link>
            <Link href="/history" className="p-1 font-sans font-semibold">Order</Link>
            <Link href="#" className="p-1 font-sans font-semibold">About us</Link>
          </div>
          <div>
            <div className="flex mt-7 justify-center items-center">
              <Image src={pizzaIcon} alt="Pizza slice icon" className="w-10"/>
              <p className="font-sans text-orange1 font-bold ml-1">Pizza</p>
            </div>
            <div className="mr-5 bg-white rounded-2xl mt-2 mb-12">
              <TextField
                placeholder="Your feedback..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        >
                          <SendIcon style={{ color: '#FF6F00' }} />
                        </IconButton>
                    </InputAdornment>
                  )
                }}
              >
              </TextField>
            </div>
          </div>
        </div>

        <Footer />
        
      </div>
  )
}
