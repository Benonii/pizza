import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Review from "@/components/Review";
import Pizza from "@/components/Pizza";
import Link from "next/link";
import { TextField, InputAdornment, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import pizzaIcon from '@/../public/assets/images/pizza-icon.png';
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="bg-[#FFF8F1]">
      <div className="bg-custom-gradient">
        <Navbar />
        <Hero />
      </div>

        <h3 className='text-gray3 ml-'>Featured pizzas</h3>
        <Featured />

        <h3 className="text-gray3 mt-10 ml-3">Top Restaurants</h3>
        <div className="flex overflow-scroll bg-custom-gradient mb-20">
          <Review />
          <Review />
          <Review />
          <Review />
        </div>

        <h3 className="text-gray3 mt-10 ml-3">Popular pizzas</h3>
        <div className="grid place-items-center gap-1">
          <Pizza />
          <Pizza />
          <Pizza />
        </div>

        <h3 className="text-gray3 mt-10 ml-3">Fasting pizzas</h3>
        <div className="flex ml-5 gap-3 overflow-scroll">
          <Pizza />
          <Pizza />
          <Pizza />
          <Pizza />
          <Pizza /> 
        </div>

        <div className="mt-20 bg-[#CCB691] flex">
          <div className="flex flex-col w-[50vw] ml-7 mt-7">
            <Link href="#" className="p-1 font-sans font-semibold">Home</Link>
            <Link href="#" className="p-1 font-sans font-semibold">Order</Link>
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
                        edge="end"
                        // color="primary"
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
