import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Order from '@/components/Order'
import React from 'react'

function page() {
  return (
    <div className='bg-background'>
      <Navbar />
      <h3 className='text-gray3 ml-3 mt-14 font-sans'>Order History</h3>
      <div className='grid place-items-center mb-20'>
        <Order status="Ordered"/>
        <Order status="Delivered" />
      </div>
      <Footer />
    </div>
  )
}

export default page
