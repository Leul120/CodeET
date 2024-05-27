import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { LoadingOutlined } from '@ant-design/icons';

import { AppContext } from './App'

const Payment = () => {
    let load=`<LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/>`
    const navigate=useNavigate()
    const {course,user}=useContext(AppContext)
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[])
    const paymentSchema=yup.object().shape({
        first_name:yup.string().required(),
        last_name:yup.string().required(),
        email:yup.string().email().required(),
        amount:yup.string().required()
        })
        
        const {handleSubmit,register}=useForm({
            resolver:yupResolver(paymentSchema)
        })
const {courseID}=useParams()
let {userID}=useParams()


const paymentData=async (data)=>{
 setLoading(true)
    await axios.post(`${process.env.REACT_APP_URL}/api/pay/${courseID}/${userID}`,data).then(async (response)=>{
        setLoading(false)
        console.log(response.data)
        window.open(response.data.responsed.data.checkout_url, '_blank');
        
    }).catch((err)=>{
        console.log(err)
       setLoading(false)
    }) 
}
  return (
    <div className='flex justify-center pt-44 bg-gradient-to-b from-slate-200 to-slate-700 h-screen pb-44'>
        <form onSubmit={handleSubmit(paymentData)} className='flex flex-col justify-center bg-gradient-to-t from-slate-200 to-slate-500 rounded-md  p-10 mt-3 w-72 items-center gap-3 shadow-lg shadow-slate-800'>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='First Name' {...register('first_name')}/>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='Last Name' {...register('last_name')}/>
            <input type='text' className="text-black h-9 mt-1 pl-2 rounded-md " placeholder='email' {...register('email')}/>
            <div className='border flex flex-row items-center h-9 bg-white w-56 rounded-lg'>
            <p className=' text-black h-full rounded-lg pl-2 bg-white flex items-center'>Amount :</p>
            <input type='text' className="text-black h-9   w-16 border-0 ring-0 outline-0 rounded-md "  {...register('amount')} placeholder='amount' prefix="amount : " value={course.Price}/>
            </div>
            {loading && <button type='submit' className="w-full h-20 rounded-lg p-1 text-white flex items-center justify-center bg-blue-600"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black"}}/></button>}
            {!loading && <button type='submit' className="w-full h-20 rounded-lg p-1 text-white flex items-center justify-center bg-blue-600">pay</button> }
        </form>
    </div>
  )
}

export default Payment