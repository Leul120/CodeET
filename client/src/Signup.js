import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';


function Signup() {
  const navigate=useNavigate()
    let [type,setType]=useState("password")
    let [types,setTypes]=useState("password")
    let [errored,setErrored]=useState([false,""])
     const [loading,setLoading]=useState(false)
    const user=JSON.parse(window.localStorage.getItem('user'))
 
    useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[navigate,user])
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
    className='pt-20 h-screen bg-stone-100'>
    
        

    <form className="max-w-sm mx-auto border mt-10 text-white bg-white p-10  rounded-3xl shadow-lg" onSubmit={handleSubmit(submitForm)}>
    <h1 className='text-green-700 pb-3 font-bold ' >Sign Up</h1>
        <div className='flex flex-col py-1'>
          <p className='text-red-950'>{errored[1]}</p>
      <input type="text" className='rounded-3xl text-black focus:border-green-200 ' placeholder='Full Name' {...register("name")} />
      <p className='text-red-400 text-sm '>{errors.name?.message}</p>
      </div>
      <div className='flex flex-col py-1'>
      <input type="text" className='rounded-3xl text-black focus:border-green-200 ' placeholder='Email' {...register("email")}/>
      <p className='text-red-400 text-sm'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col py-1'>
      <div className='border bg-white border-border flex justify-between items-center   rounded-3xl'>
      <input type={type} className=' border-white focus:border-0 text-black pl-2 h-10 w-full  focus:outline-0 ring-0 rounded-3xl ' placeholder='password' {...register("password")}/> <button onClick={clicker} className='pr-2 mr-1 bg-white text-black pl-2'><FaRegEye /></button></div>
      <p className='text-red-400 text-sm'>{errors.password?.message}</p></div>
      <div className='flex flex-col py-1'>
      <div className='border border-border flex  bg-white justify-between items-center   rounded-3xl'>
      <input type={types}  className=' border-white text-black focus:border-0  pl-2 h-10 w-full   rounded-3xl ' placeholder='Confirm Password' {...register("passwordConfirm")}/> <button onClick={(e)=>{
        e.preventDefault();
        if (types === 'text') {
          setTypes('password');
        } else if (types === 'password') {
          setTypes('text');
        }
    
    }} className='pr-2 pl-2 mr-1 bg-white   text-black'><FaRegEye /></button></div>
    <p className='text-red-400 text-sm'>{errors.passwordConfirm?.message}</p>
      </div>
      {loading && <button type='submit' disabled className="w-full mt-3 h-9 rounded-3xl p-1 text-white flex gap-2 items-center justify-center bg-purple-700 text-sm"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/> Sign Up</button>}
            {!loading && <button type='submit' className="w-full mt-3 h-9 rounded-3xl p-1 text-white flex items-center justify-center bg-purple-700 text-sm">Sign Up</button> }
      <p className='text-slate-500 text-sm pt-1 pl-1'>By clicking sign up you agree to our user <em className='underline underline-offset-2'>Terms of Service</em> and <em className='underline underline-offset-2'>Privacy Policy</em></p>
    </form>
    <div className='text-white'>{poster}</div>
    </div>
  )
}
export default Signup