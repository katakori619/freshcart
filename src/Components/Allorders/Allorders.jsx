import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function Allorders() {
  window.document.title = "Orders"
  let {deleteCart} = useContext(CartContext)
  useEffect(()=>{
    deleteCart()
  },[])
  return (
    <div className='mt-28'>
      <h2 className='text-2xl text-main font-semibold text-center'>Thanks for your visit</h2>
    </div>
  )
}
