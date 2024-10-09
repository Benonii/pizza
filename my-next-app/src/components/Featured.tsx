import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

import pizzaImg from '@/../public/assets/images/pizza-3.png';

function Featured() {
  const router = useRouter();
  return (
    <div className='mt-2'>
      <div className='flex justify-center font-sans'>
        <div className="relative mx-2 flex rounded-xl bg-gray4">
            <div className="w-[60vw] max-w-[500px] mt-7 mx-4 mr-0">
                <h2 className='text-xl text-white font-bold'>
                    Make your first order and get <span className='text-orange3'>50% off</span>.
                </h2>
                <p className='mt-3 text-xs text-white text-justify font-sans font-thin'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                </p>
                <Button variant="contained" size="small"
                  sx={{
                    backgroundColor: "#ff9921",
                    marginTop: 2,
                    padding: 1,
                  }}
                  onClick={() => {router.push(`/order/?name=Margharita`)}}
                >Order now</Button>
            </div>
            <div className='relative w-[32vw]'>
                <Image src={pizzaImg} alt="A pizza" className='h-full rounded-tr-md rounded-br-md' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Featured;
