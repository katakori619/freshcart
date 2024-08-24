import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, createHashRouter, RouterProvider} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout'
import Allorders from './Components/Allorders/Allorders'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import Email from './Components/Email/Email'
import Code from './Components/Code/Code'
import NewPassword from './Components/NewPassword/NewPassword'
let routers = createHashRouter([
  {path:'' , element: <Layout/> , children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'checkout' , element: <ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders' , element: <ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'wishlist' , element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'email' , element: <Email/>},
    {path:'code' , element: <Code/>},
    {path:'newpassword' , element: <NewPassword/>},
    {path:'login' , element: <Login/>},
    {path:'register' , element: <Register/>},
    {path:'*' , element: <NotFound/>},
  ]}
])
let query = new QueryClient()
function App() {
  return <QueryClientProvider client={query}>
    <WishlistContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster/>
          <ReactQueryDevtools/>
        </UserContextProvider>
      </CartContextProvider>
    </WishlistContextProvider>
  </QueryClientProvider>
}

export default App
