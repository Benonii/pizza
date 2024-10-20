import React, {useState, useEffect } from 'react';
import Featured from './Featured';
import pizzaImg2 from '@/../public/assets/images/pizza-2.png';
import pizzaImg3 from '@/../public/assets/images/pizza-3.png';
import pizzaImg6 from '@/../public/assets/images/pizza-6.png';


const cardData = [
    {
        bgColor: '#2F2F2F',
        imgSrc: pizzaImg2,
    },
    {
        bgColor: '#50482B',
        imgSrc: pizzaImg3,
    },
    {
        bgColor: '#296D60',
        imgSrc: pizzaImg6,
    },
]

function FeaturedSlider() {
  const [currentCard, setCurrentCard] = useState(0);

  useEffect (()=> {
    const intervalId = setInterval(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % cardData.length);
    }, 3000);

    return () => clearInterval(intervalId)
  }, []);

  return (
    <div className='relative w-full h-[350px] overflow-hidden'>
      <div 
        className="absolute w-full flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentCard * 100}%)` }}
      >
        {cardData.map((card, index) => (
          <div key={index} className="min-w-full">
            <Featured
              bgColor={card.bgColor}
              imgSrc={card.imgSrc}
            />
          </div>
        ))}
      </div>

      <div 
        className="absolute bottom-0 z-20 left-0 right-0 flex justify-center pb-4"
      >
        {cardData.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 mx-2 rounded-full ${
              currentCard === index ? 'bg-orange3' : 'bg-[#B6B6B6]'}`}
            style={{
              transform: `translateX(-${currentCard * 100}%)`
            }}
          />
        ))}
        </div>
      
    </div>
  )
}

export default FeaturedSlider;
