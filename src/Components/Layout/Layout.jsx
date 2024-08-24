import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
export default function Layout() {
  let {setUserData} = useContext(UserContext)
  let navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserData(localStorage.getItem('userToken'))
    }
  } ,[] )
  return <>
    <Navbar/>
    <div className="flex flex-col justify-between h-screen">
      <div className="container md:pt-12">
        <Outlet/>
      </div>
    <Footer/>
    </div>
      
  </>
}