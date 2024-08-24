import React from 'react'
import error from '../../assets/images/error.svg'
export default function NotFound() {
  window.document.title = "Not Found"
  return <>
    <div className="flex justify-center">
      <div className="image mt-20 mb-10 mx-10 w-2/3">
        <img src={error} className='w-full' alt="" />
      </div>
    </div>
  </>
}
