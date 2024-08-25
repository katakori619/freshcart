import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export let WishlistContext = createContext()

export default function WishlistContextProvider({children}){
    const[loading , setLoading] = useState(false)
    const { userData } = useContext(UserContext);
    // let headers = {
    //     token: localStorage.getItem('userToken')
    // }
    let headers = {
        token: userData,
    };
    const [wish, setWish] = useState(null)
    async function addProductToWishlist(productId){
        try{
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},
                {headers}
            )
            toast.success('Added to wishlist Successfully',{duration: 1000})
            setWish(data)
            setLoading(false)
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
        }
    }
    async function deleteProductFromWishlist(productId){
        try{
            setLoading(true)
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {headers}
            )
            setWish(data)
            toast.success('Removed from Wishlist successfully',{duration: 1000})
            console.log(data);
            setLoading(false)
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
        }
    }

    async function getWishlist(){
        try{
            setLoading(true)
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
                headers
            })
            setWish(data)
            setLoading(false)
            console.log(data);
        }
        catch(err){
            setLoading(true)
            console.log(err);
            setLoading(false)
        }
    }
    useEffect(() => {
        if (userData) {
            getWishlist();
        }
    }, [userData]);
    return <WishlistContext.Provider value={{addProductToWishlist , getWishlist , wish , setWish , deleteProductFromWishlist , loading , setLoading}}>
        {children}
    </WishlistContext.Provider>
}