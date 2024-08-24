import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
export default function NewPassword() {
    window.document.title = "reset pass"
    const [loading, setLoading] = useState(false)
    const [apiError,setApiError] = useState(null)
    let navigate = useNavigate()
    let {setUserData} = useContext(UserContext)
    let validationSchema = Yup.object().shape({
        email: Yup.string().email('email is invalid').required('email is required'),
        newPassword: Yup.string().matches(/^[A-Z]\w{5,10}/ , 'Password is invalid ex(Ahmed123)').required('Password is required'),
      })
      let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema:validationSchema,
        onSubmit:Newpass
      })
      async function Newpass(values){
        try{
          setLoading(true)
          let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , values)
          localStorage.setItem('userToken', data.token)
          setUserData(data.token)
          setApiError(null)
          console.log(data);
          navigate('/')
          setLoading(false)
        }
        catch(err){
          setApiError(err.message)
          setLoading(false)
        }
      }
  return <>
  <div className='mx-auto mt-20 md:mt-0 w-1/2 my-10'>
      <h2 className='text-3xl font-bold py-6 text-main'>Write Your New Password</h2>
        <form className="" onSubmit={formik.handleSubmit}>
            {apiError && <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 block' role="alert">
              {apiError}
            </div>}
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>}
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword:</label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.newPassword}
            </div>}
          {!loading ? <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
          : <button type="button" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg w-full sm:w-auto px-3 py-1.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mx-2">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button>}
        </form>
      </div>
  </>
}
