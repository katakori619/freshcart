import { createContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
export let CartContext = createContext()

export default function CartContextProvider({children}){
    const[loading , setLoading] = useState(false)
    let headers = {
        token: localStorage.getItem('userToken')
    }
    const [cart, setCart] = useState(null)
    async function checkout(shippingAddress){
        try{
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
                {shippingAddress},
                {headers}
            )
            console.log(data);
            window.location.href = data.session.url
            setLoading(false)
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
        }
    }
    async function addProductToCart(productId){
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},
                {headers}
            )
            toast.success('Added to cart successfully',{duration: 1000})
            setCart(data)
        }
        catch(err){
            console.log(err);
        }
    }
    async function deleteCart(productId){
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {headers}
            )
            setCart(null)
        }
        catch(err){
            console.log(err);
        }
    }
    async function deleteProductFromCart(productId){
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {headers}
            )
            toast.success('Deleted from cart successfully',{duration: 1000})
            setCart(data)
        }
        catch(err){
            console.log(err);
        }
    }
    async function updateProductCount(productId , count){
        if(count>0){
            try{
                let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},
                    {headers}
                )
                toast.success('Number of product is updated successfully',{duration: 1000})
                setCart(data)
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            deleteProductFromCart(productId)
        }
    }
    async function getCart(){
        try{
            setLoading(true)
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
                headers
            })
            setCart(data)
            setLoading(false)
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
        }
    }
    useEffect(()=>{
        getCart()
    },[])
    return <CartContext.Provider value={{checkout,deleteCart ,addProductToCart , getCart , cart , setCart , updateProductCount , deleteProductFromCart , loading , setLoading}}>
        {children}
    </CartContext.Provider>
}