import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';

export default function ProductDetails() {
  window.document.title = "Product details"
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    autoplaySpeed:1500
  };
  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    autoplaySpeed:1500
  };
  let {id} = useParams()
  const [details, setDetails] = useState({})
  const [recommended, setRecommended] = useState([])
  let{addProductToCart ,loading , setLoading} = useContext(CartContext)
  async function getProductDetails(id){
    setLoading(true)
    let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    getRecommended(data.data.category._id);
    setDetails(data.data)
    setLoading(false)
    console.log(data.data);
  }
  async function getRecommended(id){
    let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
    setRecommended(data.data)
  }
  useEffect(()=>{
    getProductDetails(id)
  },[id])
  console.log(recommended);
  return <>
    {loading? <Loading/> :
    <>
    <h1 className='text-5xl'>Product Details</h1>
    <div className="flex items-center mx-5 py-20 flex-wrap sm:flex-nowrap">
      <div className="w-full sm:w-1/4 p-4">
      {details.images?.length > 1 ? <Slider {...settings}>
      {details.images?.map((image , index)=> <img src={image} key={index} className='w-full' alt="" />)}
    </Slider> : <img src={details.imageCover} className='w-full'/>}
      </div>
      <div className="w-full sm:w-3/4">
        <div>
          <h2>{details.title}</h2>
          <p className='my-6 text-gray-500'>{details.description}</p>
          <h3>{details.category?.name}</h3>
          <div className="flex justify-between my-2">
            <h3>{details.price} EGP</h3>
            <h3><i className='fas fa-star rating-color'></i>{details.ratingsAverage}</h3>
          </div>
          <button onClick={()=> addProductToCart(details.id)} className='btn w-full bg-main text-white rounded py-1'>Add to cart</button>
        </div>
      </div>
    </div>
    <h2 className='text-2xl text-emerald-600'>You May Like:</h2>
    <div className="recommended my-10 flex justify-center">
      <div className="w-full">
      <Slider {...settings2}>
      {recommended.map((reco , index)=><Link to={`/productdetails/${reco.id}`}>
        <div key={index}>
          <img src={reco.images[0]} key={index} className='w-full' alt="" />
          <h3 className='text-[10px] sm:text-lg'>{reco.title.split(' ').slice(0,2).join(' ')}</h3>
        </div>
      </Link>)}
      </Slider>
      </div>
    </div>
    </>
    }
  </>
}
