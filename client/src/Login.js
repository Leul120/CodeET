import { yupResolver } from '@hookform/resolvers/yup'
// import {AppContext} from './App'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { FaRegEye } from 'react-icons/fa6'

import { AppContext } from './App';
import {useNavigate} from 'react-router-dom'
import {message} from 'antd'


const Login = () => {
    const [types,setTypes]=useState('password')
    const [errored,setErrored]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    // let {user,setUser}=useContext(AppContext)
    const navigate=useNavigate()
     const user=JSON.parse(window.localStorage.getItem('user'))
    useEffect(()=>{
      
      if(user){
        navigate('/')
      }
    },[])
    // const history=useHistory()
    // const [email,setEmail]=useState('')
    // const [password,setPassword]=useState('')
    // const setAuthorizationCookie =  (minutes) => {
    // //   if(data?.status==='success'){
    // //   const expirationDate = new Date();
    // //   expirationDate.setTime(expirationDate.getTime() + minutes * 60 * 1000);
    // //   console.log(data?.token)
    // //  Cookies.set('authorization',data?.token, {
    // //     expires: expirationDate,
    // //   });
    // //   console.log('Cookie set!');
    // //   console.log(expirationDate)
      
    // };
    const loginSchema=yup.object().shape({
        email:yup.string().email('Please Provide A Valid Email').required("Email Required"),
        password:yup.string().required().min(8)
    
    }) 
      const dataPost=async (value)=>{
        try{
          setIsLoading(true)
        const response=await axios.post(`${process.env.URL}/users/login`,value)
        if(response?.data.status==='success'){
          setErrored("")
          setIsLoading(false)
         message.success('Logged In Successfully')
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);
          console.log(response.data.token)
          const custom=btoa(response.data.token)
          // Cookies.set('authorization',response.data.token)
          window.localStorage.setItem('token',custom)
          // setName(response.data.user.name)
          console.log(response.data.user)
          // setUser(response?.data.user)
          window.localStorage.setItem('user',JSON.stringify(response.data.user))
         navigate(-1)
        }
        // setUser(response?.data.user)
      }catch(error){
          setErrored("Incorrect Email or Password!")
        }}
    const {handleSubmit,formState:{errors},register}=useForm({
        resolver:yupResolver(loginSchema)
    })
    const submitData=async (value)=>{
        console.log(value)
        dataPost(value)
        
        
    }

  return (<>
    <div className='justify-center flex items-center pt-10 bg-gradient-to-t from-slate-950 to-slate-100 h-screen'>
        <form onSubmit={handleSubmit(submitData)} className='border  rounded-lg p-10 flex flex-col shadow-slate-800 shadow-lg border-border bg-gradient-to-t from-slate-200 to-slate-600'>
        
          <p className='text-red-800 '>{errored}</p>
        <label htmlFor="email" className='text-slate-200'>Email</label>
        <input type='text' className='rounded-lg' placeholder='email@gmail.com '{...register('email')}/>
        <p className='text-red-400 text-sm'>{errors.email?.message}</p>
        <label htmlFor="password" className='text-slate-200'>Password</label>
        <div className='border bg-white border-border flex justify-between items-center   rounded-lg'>
      <input type={types} className=' border-white text-black pl-2 h-10 w-full  focus:ring-0 focus-visible:ring-0 ring-0 rounded-lg ' placeholder='Eg. okrior349340930' {...register("password")}/> <button onClick={(e)=>{
        e.preventDefault();
        if (types === 'text') {
          setTypes('password');
        } else if (types === 'password') {
          setTypes('text');
        }
    
    }} className='pr-2 bg-white text-black pl-2'><FaRegEye /></button></div>
        <p className='text-red-400 text-sm'>{errors.password?.message}</p>
        <Link to='/forget-Password' className='text-blue-600 text-end p-2'>Forget Password</Link>
        <input type="submit"  value="Log In" className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  xs:w-full dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5  h-10    me-2 mt-7 w-full xs:text-center xs:text-nowrap overflow-hidden"/>
        <Link to='/signup'><input type='button' value='Sign Up' className="text-white mb-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  xs:w-full  flex items-center justify-center dark:focus:ring-cyan-800 text-xs xs:font-medium xs:rounded-lg rounded-md px-5  h-10    me-2 mt-7 w-full xs:text-center xs:text-nowrap overflow-hidden"/></Link>
        
        </form>
        
    </div></>
  )
}

export default Login