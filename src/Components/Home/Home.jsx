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
export default function Home() {
  window.document.title = "Home"
  const [products,setProducts] = useState([])
  // async function getRecentProducts(){
  //   try{
  //     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     setProducts(data.data)
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  // useEffect(()=>{
  //   getRecentProducts()
  // }) 
  // function getProducts(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  // }
  // let {data , isFetching , isLoading , isError , error} = useQuery({
  //   queryKey: ['recentProducts'],
  //   queryFn: getProducts,
  //   select:(data)=>data?.data.data
  // })
  let {data , isFetching , isLoading , isError , error} = useProduct()
  return <>
    
    {!isLoading?
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <div className="flex flex-wrap justify-center">{data.map((product , index)=><RecentProducts key={index} product={product}/>)}</div> 
    </>
    :
    <div className="flex justify-center text-center py-16">
      <Loading/>
    </div>}
  </>
}
