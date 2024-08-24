import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useCategory() {
    function getCategory(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let response = useQuery({
        queryKey: ['recentCategories'],
        queryFn: getCategory,
        select:(data)=>data?.data.data
    })
    return response
}
