"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import TopRestaurant from "@/components/TopRestaurant";
import Pizza from "@/components/Pizza";
import Link from "next/link";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import pizzaIcon from "@/../public/assets/images/pizza-icon.png";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type PizzaType = {
  id: number;
  name: string;
  toppings: string[];
  price: string | number;
  restaurantId: number;
};

export default function Home() {
  const [pizzas, setPizzas] = useState<PizzaType[]>([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await fetch("/api/pizzas");
        if (!response.ok) {
          throw new Error("Failed to fetch pizzas");
        }
        const pizzas = await response.json();
        setPizzas(pizzas);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        return [];
      }
    };

    getPizzas();
  }, []);

  return (
    <div className="relative bg-background">
      <div className="bg-custom-gradient w-full">
        <Navbar />
        <Hero />
      </div>

      {/* Featured Section */}
      <section className="px-3 py-6">
        <h3 className="text-gray3 text-xl md:text-2xl">Featured pizzas</h3>
        <Featured />
      </section>

      {/* Top Restaurants */}
      <section className="px-3 py-6">
        <h3 className="text-gray3 text-xl md:text-2xl">Top Restaurants</h3>
        <div className="flex overflow-x-auto gap-4 bg-custom-gradient py-4">
          <TopRestaurant />
          <TopRestaurant />
          <TopRestaurant />
          <TopRestaurant />
        </div>
      </section>

      {/* Popular Pizzas */}
      <section className="px-3 py-6">
        <h3 className="text-gray3 text-xl md:text-2xl">Popular pizzas</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {pizzas.length > 0 &&
            pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />)}
        </div>
      </section>

      {/* Fasting Pizzas */}
      <section className="px-3 py-6">
        <h3 className="text-gray3 text-xl md:text-2xl">Fasting pizzas</h3>
        <div className="flex justify-start gap-4 overflow-x-auto">
          {pizzas.length > 0 &&
            pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />)}
        </div>
      </section>

      {/* Footer Links & Feedback */}
      <div className="mt-10 bg-[#CCB691] flex flex-col md:flex-row p-4">
        <div className="flex flex-col w-full md:w-[50vw] mb-6 md:mb-0">
          <Link href="/" className="p-1 font-sans font-semibold">
            Home
          </Link>
          <Link href="/history" className="p-1 font-sans font-semibold">
            Order
          </Link>
          <Link href="#" className="p-1 font-sans font-semibold">
            About us
          </Link>
        </div>

        {/* Feedback Form */}
        <div className="flex flex-col justify-center items-center w-full md:w-[50vw]">
          <div className="flex items-center">
            <Image src={pizzaIcon} alt="Pizza slice icon" className="w-10" />
            <p className="font-sans text-orange1 font-bold ml-2 text-lg">
              Pizza
            </p>
          </div>
          <div className="bg-white rounded-2xl mt-4 w-[90%] sm:w-[70%] md:w-[50%]">
            <TextField
              fullWidth
              placeholder="Your feedback..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SendIcon style={{ color: "#FF6F00" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
