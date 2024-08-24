import React, { useState } from 'react'
import useCategory from '../../Hooks/useCategory'
import Loading from '../Loading/Loading'
import axios from 'axios'

export default function Categories() {
  window.document.title = "Categories"
  let {data , isFetching , isLoading , isError , error} = useCategory()
  const [categoryId, setCategoryId] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [subName, setSubName] = useState(null)
  const [subCategories, setSubCategories] = useState([])
  async function getSubcategory(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setSubCategories(data.data)
  }
  return <>
  {!isLoading ? <>
    <div className="flex flex-wrap mb-10 mt-5">
      {data?.map((category , index)=> <div key={index} className="w-full md:w-1/3 p-3">
        <div className="border rounded-md border-gray-300 card" onClick={async()=>{setCategoryId(category?._id)
          setIsClicked(true)
          getSubcategory(category?._id)
          setSubName(category?.name)
          }}>
          <div className="image rounded-md">
            <img src={category.image} className='w-full mb-4 h-[300px]' alt="" />
          </div>
          <p className='text-center text-main text-3xl font-semibold mb-6'>{category.name}</p>
        </div>
      </div>)}
    </div>
    </> : <div className="flex justify-center w-full text-center py-16">
      <Loading/>
    </div>}
    {isClicked? <>
      <p className='text-3xl font-bold text-main text-center'>{subName} subcategories</p>
      <div className='flex flex-wrap my-5'>
      {subCategories.map((sub,index)=><div className='w-full sm:w-1/3 p-3'>
        <div className='rounded-md border p-5 card'>
          <p className='text-2xl text-main font-semibold'>{sub.name}</p>
        </div>
      </div>)}
    </div>
    </> : ''}
  </>
}
