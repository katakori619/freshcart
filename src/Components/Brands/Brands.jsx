import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useBrands from '../../Hooks/useBrands';
import Loading from '../Loading/Loading';

export default function Brands() {
  window.document.title = "Brands"
  let {data , isFetching , isLoading , isError , error} = useBrands()
  const [isClicked, setIsClicked] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [name, setName] = useState(null)
  const [slug, setSlug] = useState(null)
  async function getBrand(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setImageUrl(data.data.image)
    setName(data.data.name)
    setSlug(data.data.slug)
    console.log(data.data);
  }
  return <>
    {!isLoading ? <>
      {isClicked ? <div className="alert fixed left-0 w-screen h-screen z-10 flex justify-center" onClick={()=>{setIsClicked(false)}}>
        <div className="content bg-white absolute text-black py-2 h-fit rounded-md top-24 md:top-7">
          <div className="flex justify-end">
            <button className='close my-3 pe-4' onClick={()=>{setIsClicked(false)}}><i className='fas fa-close fa-2xl'></i></button>
          </div>
          <div className="line w-full h-[1px] bg-gray-300"></div>
          <div className='flex justify-between p-6 items-center'>
            <div className="caption w-1/3">
              <p className='text-2xl sm:text-4xl text-main font-semibold'>{name}</p>
              <p className='my-2'>{slug}</p>
            </div>
            <div className="image w-1/2">
              <img src={imageUrl} className='w-full' alt="" />
            </div>
          </div>
          <div className="line w-full h-[1px] bg-gray-300"></div>
          <div className="flex justify-end pe-4">
            <button className='close my-3 bg-gray-600 text-white p-3 rounded-md' onClick={()=>{setIsClicked(false)}}>close</button>
          </div>
        </div>
      </div> : ''}
      <h2 className='text-main text-4xl text-center font-semibold mb-6 mt-24'>All Brands</h2>
    <div className="flex flex-wrap justify-center mb-10">
      {data?.map((brand , index)=> <div key={index} className="w-full md:w-1/4 p-3">
        <div className="p-2 border rounded-md border-gray-300 card" onClick={async()=>{
          await setIsClicked(true)
          getBrand(brand._id)
          }}>
          <div className="image">
            <img src={brand.image} className='w-full mb-4' alt="" />
          </div>
          <p className='text-center mb-6'>{brand.name}</p>
        </div>
      </div>)}
    </div>
    </> : <div className="flex justify-center w-full text-center py-16">
      <Loading/>
    </div>}
  </>
}
