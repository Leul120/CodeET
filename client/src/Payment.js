// import { yupResolver } from '@hookform/resolvers/yup'
// import axios from 'axios'
// import React, { useContext, useEffect, useState} from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, useParams } from 'react-router-dom'
// import * as yup from 'yup'
// import { LoadingOutlined } from '@ant-design/icons';

// import { AppContext } from './App'

// const Payment = () => {
//     const navigate=useNavigate()
//     const {course,user}=useContext(AppContext)
//     const [loading,setLoading]=useState(false)
//     // useEffect(()=>{
//     //     if(!user){
//     //         navigate('/login')
//     //     }
//     // },[navigate,user])
//     const paymentSchema=yup.object().shape({
//         first_name:yup.string().required(),
//         last_name:yup.string().required(),
//         email:yup.string().email().required(),
//         amount:yup.string().required()
//         })
        
//         const {handleSubmit,register}=useForm({
//             resolver:yupResolver(paymentSchema)
//         })
// const {courseID}=useParams()
// let {userID}=useParams()


// const paymentData=async (data)=>{
//  setLoading(true)
//     await axios.post(`${process.env.REACT_APP_URL}/api/pay/${courseID}/${userID}`,data).then(async (response)=>{
//         setLoading(false)
//         window.open(response.data.responsed.data.checkout_url, '_blank');
        
//     }).catch((err)=>{
//        setLoading(false)
//     }) 
// }
//   return (
//     <div className='flex justify-center items-center bg-stone-100 h-screen pb-44'>
//         <form onSubmit={handleSubmit(paymentData)} className='flex flex-col justify-center bg-white rounded-3xl  p-10 mt-3  items-center gap-3 shadow-lg'>
//         <h1 className='text-serif font-bold text-sky-500'>Buy Course</h1>
//             <input type='text' className="text-black h-9 mt-1 pl-2 rounded-3xl " placeholder='First Name' {...register('first_name')}/>
//             <input type='text' className="text-black h-9 mt-1 pl-2 rounded-3xl " placeholder='Last Name' {...register('last_name')}/>
//             <input type='text' className="text-black h-9 mt-1 pl-2 rounded-3xl " placeholder='email' {...register('email')}/>
//             <div className='border border-sky-500 flex flex-row items-center h-9 bg-white  rounded-lg'>
//             <p className=' text-black h-full rounded-lg pl-2 bg-white flex items-center'>Amount :</p>
//             <input type='text' className="text-stone-400 h-6   w-16 border-0 ring-0 outline-0 rounded-3xl "  {...register('amount')}  prefix="amount : " defaultValue='500' value={course.Price? course.Price:"500"}/>
//             </div>
//             {loading && <button type='submit' disabled className="w-full h-9 text-sm rounded-3xl p-1 text-white flex items-center justify-center bg-blue-600"><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black"}}/></button>}
//             {!loading && <button type='submit' className="w-full h-9 rounded-3xl p-1 text-white flex items-center justify-center bg-blue-600 text-sm">Buy</button> }
//         </form>
//     </div>
//   )
// }

// export default Payment

// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import * as yup from 'yup';
// import { LoadingOutlined } from '@ant-design/icons';

// import { AppContext } from './App';

// const Payment = () => {
//   const navigate = useNavigate();
//   const { course, user } = useContext(AppContext);
//   const [loading, setLoading] = useState(false);

//   const paymentSchema = yup.object().shape({
//     first_name: yup.string().required('First name is required'),
//     last_name: yup.string().required('Last name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     amount: yup.string().required('Amount is required')
//   });

//   const { handleSubmit, register, formState: { errors } } = useForm({
//     resolver: yupResolver(paymentSchema)
//   });

//   const { courseID, userID } = useParams();

//   const paymentData = async (data) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_URL}/api/pay/${courseID}/${userID}`, data);
//       setLoading(false);
//       window.open(response.data.responsed.data.checkout_url, '_blank');
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-stone-100 h-screen pb-44">
//       <form onSubmit={handleSubmit(paymentData)} className="flex flex-col justify-center bg-white rounded-3xl p-10 mt-3 items-center gap-3 shadow-lg">
//         <h1 className="text-serif font-bold text-sky-500">Buy Course</h1>
//         <input
//           type="text"
//           className="text-black h-9 w-72 mt-1 pl-2 rounded-3xl"
//           placeholder="First Name"
//           {...register('first_name')}
//         />
//         {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
//         <input
//           type="text"
//           className="text-black h-9 w-72 mt-1 pl-2 rounded-3xl"
//           placeholder="Last Name"
//           {...register('last_name')}
//         />
//         {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
//         <input
//           type="text"
//           className="text-black h-9 w-72 mt-1 pl-2 rounded-3xl"
//           placeholder="Email"
//           {...register('email')}
//         />
//         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//         <div className="border border-sky-500 flex items-center h-9 bg-white rounded-lg">
//           <p className="text-black h-full rounded-lg pl-2 bg-white flex items-center">Amount:</p>
//           <input
//             type="text"
//             className="text-stone-400 h-6  w-16 border-0 ring-0 outline-0 rounded-3xl"
//             {...register('amount')}
//             defaultValue={course.Price ? course.Price : '500'}
//           />
//         </div>
//         {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
//         {loading ? (
//           <button type="submit" disabled className="w-full h-9 text-sm rounded-3xl p-1 text-white flex items-center justify-center bg-blue-600">
//             <LoadingOutlined size="large" style={{ color: 'white' }} />
//           </button>
//         ) : (
//           <button type="submit" className="w-full h-9 rounded-3xl p-1 text-white flex items-center justify-center bg-blue-600 text-sm">Buy</button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Payment;

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';

const Payment = () => {
  const navigate = useNavigate();
  const { course, user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const paymentSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    amount: yup.string().required('Amount is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(paymentSchema)
  });

  const { courseID, userID } = useParams();

  const paymentData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/pay/${courseID}/${userID}`, data);
      setLoading(false);
      window.open(response.data.responsed.data.checkout_url, '_blank');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 min-h-screen pb-24">
      <form onSubmit={handleSubmit(paymentData)} className="flex flex-col justify-center bg-gray-800 rounded-xl p-8 mt-10 items-center gap-5 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Buy Course</h1>
        
        <input
          type="text"
          className={`w-full h-12 px-4 rounded-lg border-2 ${errors.first_name ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-gray-300 focus:outline-none focus:border-gray-500 transition duration-300`}
          placeholder="First Name"
          {...register('first_name')}
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
        
        <input
          type="text"
          className={`w-full h-12 px-4 rounded-lg border-2 ${errors.last_name ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-gray-300 focus:outline-none focus:border-gray-500 transition duration-300`}
          placeholder="Last Name"
          {...register('last_name')}
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
        
        <input
          type="email"
          className={`w-full h-12 px-4 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-gray-300 focus:outline-none focus:border-gray-500 transition duration-300`}
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        
        <div className="w-full relative">
          <input
            type="text"
            className="w-full h-12 px-4 pl-10 rounded-lg border-2 border-gray-600 bg-gray-700 text-gray-300 focus:outline-none focus:border-gray-500 transition duration-300"
            {...register('amount')}
            defaultValue={course.Price ? course.Price : '500'}
            readOnly
          />
          <span className="absolute top-0 left-0 h-full flex items-center pl-3 text-gray-400">$</span>
        </div>
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        
        <button type="submit" className={`w-full h-12 rounded-lg text-white flex items-center justify-center ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500'} transition duration-300 text-lg`}>
          {loading ? <LoadingOutlined className="animate-spin" /> : 'Buy'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
