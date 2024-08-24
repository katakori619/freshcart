import React, { createContext, useContext, useEffect } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'

export default function Wishlist() {
    window.document.title = "Wishlist"
    let {addProductToWishlist , getWishlist , wish , setWish , deleteProductFromWishlist , loading , setLoading} = useContext(WishlistContext)
    let {addProductToCart} =  useContext(CartContext)
    useEffect(()=>{
        getWishlist()
    },[])
    const handleRemoveFromWishlist = async (productId) => {
        await deleteProductFromWishlist(productId)
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
        delete likedProducts[productId];
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    
        // Optionally, you can remove the product from the state here if needed
        const updatedWishList = wish?.data?.filter(product => product.id !== productId);
        setWish(prevWish => ({ ...prevWish, data: updatedWishList }));
      };
  return <>
    {loading? <div className='mt-20'><Loading/></div> :
    <div className="wishcontainer bg-gray-100 rounded-md p-5 mx-12 my-28 md:m-12">
    <h2 className='text-3xl font-semibold'>My Wish List</h2>
    <div className="wishproducts">
        {wish?.data?.map((product)=>
        <div>
            <div className='flex justify-between my-3 items-center flex-wrap'>
                <div className='w-full sm:w-1/2 flex items-center'>
                    <div className="image w-2/3 sm:w-1/2 md:w-1/3 me-6">
                        <img src={product?.imageCover} className='w-full' alt="" />
                    </div>
                    <div className="caption w-1/3 sm:w-1/2 md:w-2/3">
                        <p className='text-sm sm:text-md md:text-2xl font-semibold'>{product?.title}</p>
                        <p className='sm:text-md text-main font-semibold mb-3'>{product?.price} EGP</p>
                        <button className='text-red-600' onClick={()=>{
                            handleRemoveFromWishlist(product?.id);
                            }}><i className='fas fa-trash'></i> remove</button>
                    </div>
                </div>
                <div className="w-full sm:w-1/3 flex justify-end">
                    <button className='cartbutton border p-5 rounded-md mt-6' onClick={()=>{addProductToCart(product?.id)}}>Add To Cart</button>
                </div>
            </div>
            <div className='h-[1px] w-full bg-gray-300'></div>
        </div>
        )}
    </div>
</div>
    }
  </>
}