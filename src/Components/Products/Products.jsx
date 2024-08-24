import React, { useEffect, useState } from 'react'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import Brands from '../Brands/Brands'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../Loading/Loading'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { useQuery } from '@tanstack/react-query'
import useProduct from '../../Hooks/useProduct'
export default function Product() {
  window.document.title = "Products"
  const [products,setProducts] = useState([])
  let {data , isFetching , isLoading , isError , error} = useProduct()
  return <>
    
    {!isLoading?
    <>
    <div className="flex flex-wrap justify-center my-10">{data.map((product , index)=><RecentProducts key={index} product={product}/>)}</div> 
    </>
    :
    <div className="flex justify-center text-center py-16">
      <Loading/>
    </div>}
  </>
}
