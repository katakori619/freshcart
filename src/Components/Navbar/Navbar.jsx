import React , {useContext, useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
export default function Navbar() {
  let{userData , setUserData} = useContext(UserContext)
  let {cart} = useContext(CartContext)
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <>
    <nav className='bg-gray-200 py-2 text-slate-500 text-center fixed top-0 inset-x-0 z-30'>
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 flex-col md:flex-row">
          <img src={logo} width={120} alt="" />
          <button className='md:hidden text-black text-3xl border rounded-md py-1 px-4 border-black mx-24' onClick={toggleMenu}>
            ☰
          </button>
          {userData && 
          <ul className={`md:flex flex space-x-2 flex-col md:flex-row ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <li><NavLink to=''>Home</NavLink></li>
          <li><NavLink to='products'>Products</NavLink></li>
          <li><NavLink to='categories'>Categories</NavLink></li>
          <li><NavLink to='brands'>Brands</NavLink></li>
          <li><NavLink to='wishlist'>Wishlist</NavLink></li>
        </ul>}
        </div>
        <div className="flex justify-between flex-col">
          <ul className={`md:flex flex-col md:flex-row space-x-2 items-center ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            {userData?<>
              <li className='relative'><NavLink to='cart'><i className='fa-solid fa-2x text-main fa-cart-shopping'></i></NavLink><span className='text-white absolute -top-[3px] left-1/2'>{cart? cart.numOfCartItems : 0}</span></li>
              <li><span className='cursor-pointer' onClick={()=> logout()}>Logout</span></li>
            </>
            :
            <>
              <li><NavLink to='login'>Login</NavLink></li>
              <li><NavLink to='register'>Register</NavLink></li>
            </>}
            <li className='space-x-2 text-black'>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}