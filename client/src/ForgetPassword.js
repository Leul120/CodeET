// import axios from 'axios'
// import React, { useContext, useState } from 'react'
// import { AppContext } from './App'
// import { Button, Input,notification } from 'antd'
// import { LoadingOutlined } from '@ant-design/icons';
// const ForgetPassword = () => {

//   const {email,setEmail}=useContext(AppContext)
//   const [setStatus]=useState('')
//   const [api, contextHolder] = notification.useNotification();
//   const [loading,setLoading]=useState(false)
//   const submitEmail=async ()=>{
//     window.localStorage.setItem('resetEmail',email)
//     console.log(email)
//     try{
//       setLoading(true)
//     const response=await axios.post(`${process.env.REACT_APP_URL}/users/forgetPassword`,{email:email})
//     console.log(response.data)
//     setStatus(response.data.message)
//     setLoading(false)
//     api.open({
//       message: 'Email sent',
//       description:response.data.message,
//       duration: 0,
//     });
    
//   }catch(error){
//     setLoading(false)
//     console.log(error)
//   }
//   }
  
//   return (
//     <div className='flex flex-col justify-center items-center bg-stone-100 h-screen'>
//     {contextHolder}
//         <div  className='rounded-3xl bg-white w-1/2  shadow-md  flex flex-col justify-center   p-10 h-56'>
//         <h1 className='text-serif font-bold text-sky-500'>Verify email</h1>
//         <Input type="text" placeholder='email@gmail.com' className='rounded-lg mb-3 mt-3'onChange={(e)=>{
//           console.log(e.target.value)
//           setEmail(e.target.value)
//         }}/>{loading &&(<button type="submit" value='Send Verification Link' className='bg-indigo-300 h-9 rounded-3xl text-white   text-sm text-serif  flex flex-row gap-2 justify-center items-center' disabled ><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>Send Verification Link</button>)}
//         {!loading &&(<button type="submit" value='Send Verification Link' className='bg-indigo-500 h-9 rounded-3xl text-white hover:text-indigo-500 hover:bg-white text-sm text-serif hover:border'  onClick={submitEmail}>Send Verification Link</button>)}
//         </div>
//     </div>
//   )
// }

// export default ForgetPassword
// import axios from 'axios';
// import React, { useContext, useState } from 'react';
// import { AppContext } from './App';
// import { Input, notification } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';

// const ForgetPassword = () => {
//   const { email, setEmail } = useContext(AppContext);
//   const [loading, setLoading] = useState(false);
//   const [api, contextHolder] = notification.useNotification();

//   const submitEmail = async () => {
//     window.localStorage.setItem('resetEmail', email);
//     try {
//       setLoading(true);
//       const response = await axios.post(`${process.env.REACT_APP_URL}/users/forgetPassword`, { email });
//       setLoading(false);
//       console.log(response.data)
//       api.open({
//         message: 'Email sent',
//         description: response.data.message,
//         duration: 0,
//       });
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   return (
//     <div className='flex flex-col justify-center items-center bg-stone-100 h-screen'>
//       {contextHolder}
//       <div className='rounded-3xl bg-white w-1/2 shadow-md flex flex-col justify-center p-10 h-56'>
//         <h1 className='text-serif font-bold text-sky-500'>Verify email</h1>
//         <Input 
//           type='text' 
//           placeholder='email@gmail.com' 
//           className='rounded-lg mb-3 mt-3'
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button
//           type='submit'
//           className={`h-9 rounded-3xl text-sm text-serif flex flex-row gap-2 justify-center items-center ${
//             loading ? 'bg-indigo-300 text-white' : 'bg-indigo-500 text-white hover:text-indigo-500 hover:bg-white hover:border'
//           }`}
//           onClick={submitEmail}
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <LoadingOutlined style={{ color: 'white' }} /> Sending...
//             </>
//           ) : (
//             'Send Verification Link'
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { Input, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ForgetPassword = () => {
  const { email, setEmail } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const submitEmail = async () => {
    window.localStorage.setItem('resetEmail', email);
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_URL}/users/forgetPassword`, { email });
      setLoading(false);
      api.open({
        message: 'Email sent',
        description: response.data.message,
        duration: 0,
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      {contextHolder}
      <div className='w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-indigo-400 mb-6 text-center'>Verify Email</h1>
        <Input
          type='text'
          placeholder='Enter your email'
          className='w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 focus:bg-gray-700 text-white'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className={`w-full h-12 rounded-lg text-white text-sm flex justify-center items-center ${
            loading ? 'bg-indigo-500 opacity-50 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          onClick={submitEmail}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingOutlined style={{ marginRight: '0.5rem' }} /> Sending...
            </>
          ) : (
            'Send Verification Link'
          )}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
