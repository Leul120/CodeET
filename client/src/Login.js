import { yupResolver } from '@hookform/resolvers/yup'
// import {AppContext} from './App'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { FaRegEye } from 'react-icons/fa6'
import {useNavigate} from 'react-router-dom'
import {message} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';


const Login = () => {
    const [types,setTypes]=useState('password')
    const [errored,setErrored]=useState("")
    // let {user,setUser}=useContext(AppContext)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
     const user=JSON.parse(window.localStorage.getItem('user'))
    let load= `<LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/>`
     
    useEffect(()=>{
      
      if(user){
        navigate('/')
      }
    },[])
    
    const loginSchema=yup.object().shape({
        email:yup.string().email('Please Provide A Valid Email').required("Email Required"),
        password:yup.string().required().min(8)
    
    }) 
      const dataPost=async (value)=>{
        try{
     setLoading(true)
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/login`,value)
        if(response?.data.status==='success'){
          setErrored("")
         setLoading(false)
         message.success('Logged In Successfully')
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);
          
          const custom=btoa(response.data.token)
          
          window.localStorage.setItem('token',custom)
          window.localStorage.setItem('user',JSON.stringify(response.data.user))
         navigate(-1)
        }
      }catch(error){
        console.log(error.response)
          setErrored(error.response.data.message)
          setLoading(false)
        }}
    const {handleSubmit,formState:{errors},register}=useForm({
        resolver:yupResolver(loginSchema)
    })
    const submitData=async (value)=>{
        console.log(value)
        dataPost(value)
        
        
    }

  return (<>
    <div className='justify-center flex items-center bg-gradient-to-t from-slate-950 to-slate-100 h-screen'>
        <form onSubmit={handleSubmit(submitData)} className={`border  rounded-lg p-10 flex flex-col shadow-slate-800 shadow-lg border-border bg-gradient-to-t from-slate-200 to-slate-600`}>
        
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
        {loading && <button type='submit' className="w-full h-8 rounded-lg p-1 text-white flex gap-2 items-center justify-center bg-blue-600"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black"}}/>Login</button>}
            {!loading && <button type='submit' className="w-full my-1 h-8 rounded-lg p-1 text-white flex items-center justify-center bg-blue-600">Log In</button> }
        <Link to='/signup'><button type='button' value='Sign Up' className="w-full h-8 text-white rounded-lg my-1 bg-blue-600">Sign Up</button></Link>
        
        </form>
        
    </div></>
  )
}

export default Login