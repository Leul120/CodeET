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


const Login = () => {
    const [types,setTypes]=useState('password')
    const [errored,setErrored]=useState("")
    const [hide,setHide]=useState(false)
    // let {user,setUser}=useContext(AppContext)
    const navigate=useNavigate()
     const user=JSON.parse(window.localStorage.getItem('user'))
     
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
     
        const response=await axios.post(`${process.env.REACT_APP_URL}/users/login`,value)
        if(response?.data.status==='success'){
          setErrored("")
         
         message.success('Logged In Successfully')
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);
          
          const custom=btoa(response.data.token)
          
          window.localStorage.setItem('token',custom)
          window.localStorage.setItem('user',JSON.stringify(response.data.user))
         navigate(-1)
        }
      }catch(error){
        console.log(error.response.data.message)
          setErrored(error.response.data.message)
        }}
    const {handleSubmit,formState:{errors},register}=useForm({
        resolver:yupResolver(loginSchema)
    })
    const submitData=async (value)=>{
        console.log(value)
        dataPost(value)
        
        
    }

  return (<>
    <div className='justify-center flex items-center bg-gradient-to-t from-slate-950 to-slate-100 h-screen flex-col'>
    <div className={`bg-gradient-to-r  mt-24 backdrop-blur-2xl h-full from-green-300 to-green-700 ${hide? "hidden":""}`}>
    <p className={`text-black p-3 `}>
    <p className='text-red-600 shadow-md shadow-red-600'>VERY CRUCIAL CONTENT.PLEASE READ IT CAREFULLY!!! </p>
    <br />
Access Policy <br />
Welcome to our website. To ensure a secure and fair experience for all users, please adhere to the following access policies: <br /><br />

Single Device Usage: <br />

Please log in using the device you intend to use for watching the courses. Logging in on multiple devices is not permitted to prevent unauthorized sharing of purchased content. Access to the courses is limited to the device used to make the purchase. <br /><br />

Avoid Logging Out: <br />

Once you log out of your account, you will need to contact our support team to regain access. This process may take some time, so we strongly recommend that you do not log out. You will remain logged in on this device to avoid any interruptions. <br /><br />

Maintaining Integrity: <br />

These policies are in place to protect the integrity of our courses and to ensure that only paying users have access to the content. <br /><br />

Support and Assistance: <br />

If you have any questions or concerns regarding your access or encounter any issues, please do not hesitate to reach out to our support team. We are here to help you and ensure a smooth experience. <br /><br />

We appreciate your understanding and cooperation in adhering to these policies. Thank you for helping us maintain a fair and secure learning environment.</p>
<button className='bg-white rounded-2xl shadow-lg shadow-slate-800 float-end mr-16 mb-4 p-1' onClick={()=>{
  setHide(true)
}}>Accept</button>
</div>
        <form onSubmit={handleSubmit(submitData)} className={`border  rounded-lg p-10 flex flex-col shadow-slate-800 shadow-lg border-border bg-gradient-to-t from-slate-200 to-slate-600 ${!hide? "hidden":""}`}>
        
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
        <button type="submit" className="w-full h-8 text-white flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log In</button>
        <Link to='/signup'><button type='button' value='Sign Up' className="w-full h-8 text-white flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button></Link>
        
        </form>
        
    </div></>
  )
}

export default Login