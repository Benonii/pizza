import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

interface CardProps {
  // title: string;
  // description: string;
  // discount: string;
  bgColor: string;
  imgSrc: StaticImageData
}

function Featured({ bgColor, imgSrc }: CardProps) {
  const router = useRouter();

  return (
    <div className='mt-2'>
      <div className='flex justify-center font-sans'>
        <div 
          className={`relative mx-2 flex rounded-xl h-[350px]`}
          style={{ backgroundColor: bgColor }}
        >
            <div className="mt-7 mx-4 w-[60vw] lg:w-[40vw]">
                <h2 className='text-xl md:text-2xl lg:text-3xl text-white font-bold'>
                    Make your first order and get <span className='text-orange3'>50% off</span>.
                </h2>
                <p className='mt-3 text-xs md:text-sm lg:text-lg text-white text-justify font-sans font-thin'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                </p>
                <Button variant="contained"
                  sx={{
                    backgroundColor: "#ff9921",
                    marginTop: 2,
                    padding: 2,
                  }}
                  onClick={() => {router.push(`/order/?name=Margharita`)}}
                >Order now</Button>
            </div>
            <div className='relative w-[32vw]'>
                <Image src={imgSrc} alt="A pizza" className='absolute right-0 h-full rounded-tr-md rounded-br-md' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Featured;
