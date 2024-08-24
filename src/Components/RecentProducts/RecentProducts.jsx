import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'

export default function RecentProducts({product , onRemove}) {
  let {addProductToCart} =  useContext(CartContext)
  let {addProductToWishlist ,deleteProductFromWishlist} = useContext(WishlistContext)
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
    setIsLiked(!!likedProducts[product?.id]);
  }, [product?.id]);
  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
      if (newIsLiked) {
        likedProducts[product?.id] = true;
        addProductToWishlist(product?.id)
      } else {
        delete likedProducts[product?.id];
        deleteProductFromWishlist(product?.id)
        if (onRemove) onRemove(product?.id);
      }
      localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
      return newIsLiked;
    });
  };
  return <>
    <div className="w-full md:w-1/4 product p-2 cursor-pointer mt-10">
        <div className='p-6 card rounded-md'>
            <Link to={`/productdetails/${product?.id}`}>
              <img src={product?.imageCover} className='w-full' alt={product?.title} />
              <h2 className='text-main text-sm'>{product?.category?.name}</h2>
              <h2 className='font-medium'>{product?.title?.split(' ')?.slice(0,2)?.join(' ')}</h2>
              <div className="flex justify-between my-2">
                <h3>{product?.price} EGP</h3>
                <h3><i className='fas fa-star rating-color'></i>{product?.ratingsAverage}</h3>
              </div>
            </Link>
            <button onClick={()=> addProductToCart(product?.id)} className='btn w-full bg-main text-white rounded py-1'>Add to cart</button>
            <span className='heart'><i className={`fas fa-heart fa-2xl mt-5 ${isLiked ? 'text-red-700' : 'text-black-700'}`} onClick={()=>{
              handleLikeToggle()
            }}></i></span>
        </div>
    </div>
  </>
}
