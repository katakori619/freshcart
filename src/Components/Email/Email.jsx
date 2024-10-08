import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Email() {
  window.document.title = "reset pass"
    const [loading, setLoading] = useState(false)
    const [apiError,setApiError] = useState(null)
    let navigate = useNavigate()
    let validationSchema = Yup.object().shape({
        email: Yup.string().email('email is invalid').required('email is required'),
      })
      let formik = useFormik({
        initialValues:{
          email:'',
        },
        validationSchema:validationSchema,
        onSubmit:SendingEmail
      })
    async function SendingEmail(values){
        try{
          setLoading(true)
          let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , values)
          console.log(data);
          setApiError(null)
          setLoading(false)
          navigate('/code')
        }
        catch(err){
            setApiError(err.message)
            console.log(err);
            setLoading(false)
        }
      }
  return <>
    <div className='mx-auto mt-20 md:mt-0 w-1/2 mb-[132px]'>
      <h2 className='text-3xl font-bold py-6 text-main'>Enter your Email</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>}
          {!loading ? <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>
          : <button type="button" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg w-full sm:w-auto px-3 py-1.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mx-2">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button>}
        </form>
      </div>
  </>
}