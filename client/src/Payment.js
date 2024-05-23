import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { AppContext } from './App'

const Payment = () => {
    const navigate=useNavigate()
    const {course,user}=useContext(AppContext)
    // useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    // },[])
    const paymentSchema=yup.object().shape({
        first_name:yup.string().required(),
        last_name:yup.string().required(),
        email:yup.string().email().required(),
        amount:yup.string().required()
        })
        
        const {handleSubmit,register}=useForm({
            resolver:yupResolver(paymentSchema)
        })
// console.log(data)
console.log("heloo")
const {courseID}=useParams()
let {userID}=useParams()
// userID=userID.userID
console.log(userID)
console.log(courseID)
const paymentData=async (data)=>{
    console.log(data)
    await axios.post(`${process.env.URL}/api/pay/${courseID}/${userID}`,data).then(async (response)=>{
        console.log(response.data)
        window.open(response.data.responsed.data.checkout_url, '_self');
        
    }).catch((err)=>{
        console.log(err)
    }) 
}
console.log(course)
  return (
    <div className='flex justify-center pt-44 bg-gradient-to-b from-slate-200 to-slate-950 h-screen pb-44'>
        <form onSubmit={handleSubmit(paymentData)} className='flex flex-col justify-center bg-gradient-to-t rounded-md  p-10 mt-3 w-72 items-center gap-3'>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='First Name' {...register('first_name')}/>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='Last Name' {...register('last_name')}/>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='email' {...register('email')}/>
            <div className='border flex flex-row items-center h-9 bg-white w-56 rounded-lg'>
            <p className=' text-black h-full rounded-lg pl-2 bg-white flex items-center'>Amount :</p>
            <input type='text' className="text-black h-9  w-16 border-0 ring-0 outline-0 rounded-md "  {...register('amount')} placeholder='amount' prefix="amount : " value={course.Price}/>
            </div>
            <input type="submit" value="submit"  className=' bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-md h-8 focus:ring-green-300 focus:ring-4 focus:outline-none hover:ring-white w-full'/>
            
        </form>
    </div>
  )
}

export default Payment