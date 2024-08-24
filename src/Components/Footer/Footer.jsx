import React from 'react'
import amazon from '../../assets/images/amazon-pay.png'
import express from '../../assets/images/american-express.png'
import card from '../../assets/images/card.png'
import paypal from '../../assets/images/paypal.png'
import appstore from '../../assets/images/app-store-logo.png'
import googleplay from '../../assets/images/google-play-icon.png'
export default function Footer() {
  return <>
    <footer className="parent pt-7 pb-12 px-8">
      <h1 className='text-3xl my-2'>Get the FreshCart app</h1>
      <p className='text-lg sm:text-2xl my-2 text-slate-500'>We will send you a link, open it on your phone to download the app</p>
      <div className="links flex flex-wrap justify-center px-3 space-x-3 relative my-4">
        <input type="email" className='w-full sm:w-4/5 py-1 px-2 rounded-md' placeholder='Email...' />
        <button className='text-white w-full sm:w-1/6 py-1 rounded-md mt-3'>Share App Link</button>
      </div>
      <div className='line h-[1px] w-full bg-gray-300'></div>
      <div className="payment flex m-8 justify-between relative flex-wrap">
        <div className="methods my-6 md:my-0 w-full md:w-[40%] flex">
          <p className='text-lg sm:text-2xl me-2'>Payment Partners</p>
            <div className="flex flex-wrap">
              <img src={amazon} className='w-10 h-10 mx-2' alt="" />
              <img src={express} className='w-10 h-10 mx-2' alt="" />
              <img src={card} className='w-10 h-10 mx-2' alt="" />
              <img src={paypal} className='w-10 h-10 mx-2' alt="" />
            </div>
        </div>
        <div className="apps w-full md:w-[40%] flex justify-center">
          <p className='text-lg md:text-2xl'>Get deliveries with FreshCart</p>
          <div className="flex flex-wrap">
            <img src={appstore} className='w-24 h-8 mx-2' alt="" />
            <img src={googleplay} className='w-24 h-10 mt-[-4px] mx-2' alt="" />
          </div>
        </div>
      </div>
      <div className='line h-[1px] w-full bg-gray-300'></div>
    </footer>
  </>
}
