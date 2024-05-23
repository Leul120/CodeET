import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {message} from 'antd'


function Signup() {
  const navigate=useNavigate()
    let [type,setType]=useState("password")
    let [types,setTypes]=useState("password")
    let [errored,setErrored]=useState([false,""])
    const user=JSON.parse(window.localStorage.getItem('user'))
    console.log(type)
    useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[])
    const clicker = (e) => {
        e.preventDefault();
        if (type === 'text') {
          setType('password');
        } else if (type === 'password') {
          setType('text');
        }
      };
        const userSchema=yup.object().shape({
            name:yup.string().required('Please Enter A Full Name'),
            email:yup.string().email('Please Enter A Valid Email').required('Please Enter An Email'),
            password:yup.string().min(8).required('Please Enter A Password'),
            passwordConfirm:yup.string().required('Please Confirm Your Password').oneOf([yup.ref("password"),null],'passwords Must Match')
        })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(userSchema)
    })
const poster=async (data)=>{
  try{
    const response=await axios.post(`${process.env.REACT_APP_URL}/users/signup`,data)
    console.log(response.data.data.user)
    if(response?.data.status==='success'){
      window.localStorage.setItem('user',JSON.stringify(response.data.data.user))
      message.success('Signed Up Successfully')
      const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);
  window.localStorage.setItem('token',btoa(response.data.token))
  navigate('/')
}
    return (
        <h1 className='white'>{console.log(response.data.status)}</h1>
    )

}catch(error){
  console.log(error)
  setErrored([true,'You have already registered!'])
}}
console.log(errored[0])
const submitForm=async (value)=>{
    console.log(value)
    // mutate(value)
    
    console.log(poster(value))
    

}

  return (
    <div
    className='pt-20 h-screen bg-gradient-to-t from-slate-950 to-slate-100'>
        <h1 className='text-green-700 text-center ' >Sign-Up</h1>

    <form className="max-w-sm mx-auto border text-white border-border bg-gradient-to-b from-slate-500 to-slate-100 p-10 shadow-slate-800 rounded-lg shadow-lg" onSubmit={handleSubmit(submitForm)}>
        <div className='flex flex-col'>
          <p className='text-red-950'>{errored[1]}</p>
      <label htmlFor="Full name">Full Name</label>
      <input type="text" className='rounded-lg text-black focus:border-green-200 ' placeholder='Eg. Full Name' {...register("name")} />
      <p className='text-red-400 text-sm '>{errors.name?.message}</p>
      </div>
      <div className='flex flex-col'>
      <label htmlFor="email" >Email</label>
      <input type="text" className='rounded-lg text-black focus:border-green-200 ' placeholder='Eg. email@gmail.com' {...register("email")}/>
      <p className='text-red-400 text-sm'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col'>
      <label htmlFor="Full name">Password</label>
      <div className='border bg-white border-border flex justify-between items-center   rounded-lg'>
      <input type={type} className=' border-white text-black pl-2 h-10 w-full focus:ring-0 focus-visible:ring-0 ring-0 rounded-lg ' placeholder='Eg. okrior349340930' {...register("password")}/> <button onClick={clicker} className='pr-2 bg-white text-black pl-2'><FaRegEye /></button></div>
      <p className='text-red-400 text-sm'>{errors.password?.message}</p></div>
      <div className='flex flex-col '>
      <label >Confirm Password</label>
      <div className='border border-border flex  bg-white justify-between items-center   rounded-lg'>
      <input type={types}  className=' border-white text-black focus:ring-0 focus-visible:ring-0 ring-0 pl-2 h-10 w-full   rounded-lg ' placeholder='Eg. okrior349340930' {...register("passwordConfirm")}/> <button onClick={(e)=>{
        e.preventDefault();
        if (types === 'text') {
          setTypes('password');
        } else if (types === 'password') {
          setTypes('text');
        }
    
    }} className='pr-2 pl-2 bg-white   text-black'><FaRegEye /></button></div>
    <p className='text-red-400 text-sm'>{errors.passwordConfirm?.message}</p>
      </div>
      <input type="submit" value='Sign Up' disabled={errored[0]} className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  xs:w-full dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto  me-2 mt-7 w-full xs:text-center xs:text-nowrap overflow-hidden"/>
      {/* <input type="submit" className='text-white' /> */}
    </form>
    <div className='text-white'>{poster}</div>
    </div>
  )
}
export default Signup