import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useBrands() {
    function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let response = useQuery({
        queryKey: ['recentbrands'],
        queryFn: getBrands,
        select:(data)=>data?.data.data
    })
    return response
}
