import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {message,notification} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';


function Signup() {
  const navigate=useNavigate()
    let [type,setType]=useState("password")
    let [types,setTypes]=useState("password")
    let [errored,setErrored]=useState([false,""])
    const {setNewID}=useContext(AppContext)
     const [loading,setLoading]=useState(false)
     const [api, contextHolder] = notification.useNotification();
    let load= `<LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/>`
    const user=JSON.parse(window.localStorage.getItem('user'))
 
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
     console.log(Math.floor(Math.random()*100000))
const poster=async (data)=>{
  try{
    setLoading(true)
    data.verificationCode=Math.floor(Math.random()*100000)
    console.log(Math.floor(Math.random()*100000))
    console.log(data)
    const response=await axios.post(`${process.env.REACT_APP_URL}/users/signup`,data)
    console.log(response.data)
    // setNewID(response.data.newUser._id)
    navigate(`/verifyEmail/${response.data.newUser._id}`)
    if(response.data.status===200){
      setLoading(false)
      
       api.open({
      message: 'Email sent',
      description:response.data.message,
      duration: 0,
    });
    
}}catch(error){
  setLoading(false)
  console.log(error)
  setErrored([true,"Email already exists. Please try again!"])
}}
const submitForm=async (value)=>{
    
  poster(value)
    

}

  return (
    <div
    className='pt-20 h-screen bg-slate-200'>
    {contextHolder}
        <h1 className='text-green-700 text-center ' >Sign-Up</h1>

    <form className="max-w-sm mx-auto border text-white border-border bg-slate-300 p-10 shadow-blue-700 rounded-lg shadow-lg" onSubmit={handleSubmit(submitForm)}>
        <div className='flex flex-col py-1'>
          <p className='text-red-950'>{errored[1]}</p>
      <input type="text" className='rounded-lg text-black focus:border-green-200 ' placeholder='Full Name' {...register("name")} />
      <p className='text-red-400 text-sm '>{errors.name?.message}</p>
      </div>
      <div className='flex flex-col py-1'>
      <input type="text" className='rounded-lg text-black focus:border-green-200 ' placeholder='email' {...register("email")}/>
      <p className='text-red-400 text-sm'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col py-1'>
      <div className='border bg-white border-border flex justify-between items-center   rounded-lg'>
      <input type={type} className=' border-white text-black pl-2 h-10 w-full focus:ring-0 focus-visible:ring-0 ring-0 rounded-lg ' placeholder='password' {...register("password")}/> <button onClick={clicker} className='pr-2 bg-white text-black pl-2'><FaRegEye /></button></div>
      <p className='text-red-400 text-sm'>{errors.password?.message}</p></div>
      <div className='flex flex-col py-1'>
      <div className='border border-border flex  bg-white justify-between items-center   rounded-lg'>
      <input type={types}  className=' border-white text-black focus:ring-0 focus-visible:ring-0 ring-0 pl-2 h-10 w-full   rounded-lg ' placeholder='confirm password' {...register("passwordConfirm")}/> <button onClick={(e)=>{
        e.preventDefault();
        if (types === 'text') {
          setTypes('password');
        } else if (types === 'password') {
          setTypes('text');
        }
    
    }} className='pr-2 pl-2 bg-white   text-black'><FaRegEye /></button></div>
    <p className='text-red-400 text-sm'>{errors.passwordConfirm?.message}</p>
      </div>
      {loading && <button type='submit' disabled className="w-full h-8 rounded-lg p-1 text-white flex gap-2 items-center justify-center bg-blue-600 text-sm"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black"}}/> Sign Up</button>}
            {!loading && <button type='submit' className="w-full my-1 h-8 rounded-lg p-1 text-white flex items-center justify-center bg-blue-600 text-sm">Sign Up</button> }
      {/* <input type="submit" className='text-white' /> */}
    </form>
    <div className='text-white'>{poster}</div>
    </div>
  )
}
export default Signup