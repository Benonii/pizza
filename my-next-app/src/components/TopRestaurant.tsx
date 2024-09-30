import React from 'react';
import Image from 'next/image';

import profilePic from '@/../public/assets/images/profile.jpg';
import batteryIcon from '@/../public/assets/images/icon-1.png'

function TopRestaurant() {
  return (
    <div className='relative flex shadow-md rounded-2xl bg-white mx-3 min-w-[340px] max-h-[160px]'>
      <div className='w-[60%]'>
        <div className="flex items-center mt-3 ml-3">
          <Image src={profilePic} alt="Profile" />
          <h2 className='font-semibold ml-1'>Azmera Pizza</h2>
        </div>
        <p className='mt-3 ml-3 text-sm'>
        In publishing and graphic design, Lorem ipsum is a placeholder text...
        </p>
      </div>
      <div className='flex justify-between rounded-md items-center bg-green1 mt-7 mb-7 mr-5'>
        <Image src={batteryIcon} alt='Battery' className='h-fit ml-3' />
        <div className="ml-2">
            <p className='text-xs text-gray3'>Number of orders</p>
            <p className='text-4xl text-[#FF8100]'>2K</p>
        </div>
      </div>
    </div>
  )
}

export default TopRestaurant;
