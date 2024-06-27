import { yupResolver } from '@hookform/resolvers/yup'
// import {AppContext} from './App'
import axios from 'axios'
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
    
     
    useEffect(()=>{
      
      if(user){
        navigate('/')
      }
    },[navigate,user])
    
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
         navigate('/')
        }
      }catch(error){
          setErrored(error.response.data.message)
          setLoading(false)
        }}
    const {handleSubmit,formState:{errors},register}=useForm({
        resolver:yupResolver(loginSchema)
    })
    const submitData=async (value)=>{
        dataPost(value)
        
        
    }

  return (<>
    <div className=' pt-20 bg-stone-100 h-screen'>
        <form onSubmit={handleSubmit(submitData)} className={`max-w-sm mx-auto border mt-10  bg-white p-10  rounded-3xl shadow-lg `}>
        <h1 className='text-green-700 pb-3 font-bold ' >Log In</h1>
          <p className='text-red-800 '>{errored}</p>
        <input type='text' className='rounded-3xl my-1 w-full' placeholder='Email '{...register('email')}/>
        <p className='text-red-400 text-sm'>{errors.email?.message}</p>
        <div className='border bg-white border-border flex justify-between items-center   rounded-3xl mt-1'>
      <input type={types} className=' border-white text-black pl-2 h-10 w-full  focus:outline-none rounded-3xl focus:border-0' placeholder='password' {...register("password")}/> <button onClick={(e)=>{
        e.preventDefault();
        if (types === 'text') {
          setTypes('password');
        } else if (types === 'password') {
          setTypes('text');
        }
    
    }} className='pr-2 mr-1 bg-white text-black pl-2'><FaRegEye /></button></div>
        <p className='text-red-400 text-sm'>{errors.password?.message}</p>
        
        {loading && <button type='submit' disabled className="w-full h-9 mt-3 rounded-3xl p-1 text-white flex gap-2 text-sm items-center justify-center bg-purple-500"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>Login</button>}
            {!loading && <button type='submit' className="w-full mt-3 h-9 rounded-3xl p-1 text-white flex items-center hover:bg-white hover:text-purple-700 hover:border justify-center bg-purple-700 text-sm">Log In</button> }
        <Link to='/signup'><button type='button' value='Sign Up' className="w-full h-9  rounded-3xl mt-3 mb-5 text-purple-700 text-sm hover:underline">Sign Up</button></Link>
        <Link to='/forget-Password' className='text-blue-600  text-center p-2 pl-24 hover:underline'>Forget Password</Link>
        </form>
        
    </div></>
  )
}

export default Login

// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
// import { FaRegEye } from 'react-icons/fa6';
// import { message } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';

// const Login = () => {
//   const [passwordType, setPasswordType] = useState('password');
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const user = JSON.parse(window.localStorage.getItem('user'));

//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [navigate, user]);

//   const loginSchema = yup.object().shape({
//     email: yup.string().email('Please provide a valid email').required('Email is required'),
//     password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
//   });

//   const { handleSubmit, formState: { errors }, register } = useForm({
//     resolver: yupResolver(loginSchema)
//   });

//   const handlePasswordVisibility = () => {
//     setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
//   };

//   const submitData = async (value) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_URL}/users/login`, value);
//       if (response.data.status === 'success') {
//         setError("");
//         setLoading(false);
//         message.success('Logged in successfully');
//         const token = btoa(response.data.token);
//         window.localStorage.setItem('token', token);
//         window.localStorage.setItem('user', JSON.stringify(response.data.user));
//         navigate('/');
//       }
//     } catch (error) {
//       setError(error.response.data.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='pt-20 bg-stone-100 h-screen'>
//       <form onSubmit={handleSubmit(submitData)} className='max-w-sm mx-auto mt-10 bg-white p-10 rounded-3xl shadow-lg'>
//         <h1 className='text-green-700 pb-3 font-bold'>Log In</h1>
//         {error && <p className='text-red-800'>{error}</p>}
//         <input 
//           type='text' 
//           className='rounded-3xl my-1 w-full' 
//           placeholder='Email' 
//           {...register('email')} 
//         />
//         {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
//         <div className='flex justify-between items-center border border-border bg-white rounded-3xl mt-1'>
//           <input 
//             type={passwordType} 
//             className='border-white border-none  text-black pl-2 h-10 w-full focus:outline-none rounded-3xl' 
//             placeholder='Password' 
//             {...register("password")} 
//           />
//           <button 
//             onClick={handlePasswordVisibility} 
//             className='pr-2 mr-1 bg-white text-black pl-2'
//           >
//             <FaRegEye />
//           </button>
//         </div>
//         {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}
//         {loading ? (
//           <button type='submit' disabled className="w-full h-9 mt-3 rounded-3xl p-1 text-white flex gap-2 text-sm items-center justify-center bg-purple-500">
//             <LoadingOutlined style={{ color: "white" }} /> Login
//           </button>
//         ) : (
//           <button type='submit' className="w-full mt-3 h-9 rounded-3xl p-1 text-white flex items-center justify-center bg-purple-700 text-sm hover:bg-white hover:text-purple-700 hover:border">
//             Log In
//           </button>
//         )}
//         <Link to='/signup'>
//           <button type='button' className="w-full h-9 mt-3 mb-5 rounded-3xl text-purple-700 text-sm hover:underline">Sign Up</button>
//         </Link>
//         <Link to='/forget-password' className='text-blue-600 text-center p-2 pl-24 hover:underline'>
//           Forget Password
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Login;
