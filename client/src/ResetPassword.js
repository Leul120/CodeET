// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Input } from 'antd'
// import { message } from 'antd'
// import { useNavigate } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons';
// const ResetPassword = () => {
//     const navigate=useNavigate()
//     const emailToken=useParams().resetToken
//     const [status,setStatus]=useState()
//     const [password,setPassword]=useState("")
//     const [loading,setLoading]=useState(false)
//     const [isLoading,setIsLoading]=useState(false)
//     const email=window.localStorage.getItem("resetEmail")
//     console.log(email)
//  const verify=async()=>{
//     try{
//         setIsLoading(true)
//     const response=await axios.get(`${process.env.REACT_APP_URL}/users/resetPassword/${emailToken}`)
//     console.log(response.data)
//     setIsLoading(false)
//     setStatus(response.data.status)
//     }catch(error){
//         console.log(error)
//         setIsLoading(false)
//         message.error("error occured")
//     }
//  }
//  useEffect(()=>{
//     verify()
//  },[])
//  const updatePassword=async()=>{
//     try{
//         setLoading(true)
//         const response=await axios.post(`${process.env.REACT_APP_URL}/users/updatePassword`,{
//             email:email,
//             password:password,
//         })
//         console.log(response.data)
//         setLoading(false)
//         message.success(response.data.message)
//         navigate('/login')
//     }catch(error){
//         setLoading(false)
//         console.log(error)
//     }
//  }

//   return (
//     <div>
//     {isLoading&&(<div className='w-full  mt-64 flex items-center justify-center text-3xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>)}
//         {status===200 &&(
//             <div className='flex justify-center items-center bg-stone-100 h-screen'>
//             <div className=' w-96 flex flex-col bg-white rounded-3xl  justify-center gap-4 p-10 '>
//             <Input  placeholder='your new password' className='rounded-md' onChange={(e)=>{
//                 console.log(e.target.value)
//                 setPassword(e.target.value)
//             }}/>
//             {!loading&&( <button  type='submit' value="Submit" onClick={updatePassword} className='bg-indigo-500 h-9 text-white hover:bg-white hover:text-indigo-500 text-serif text-sm rounded-3xl' >Reset</button>)}
//             {loading&&(<button  type='submit' disabled value="Submit" onClick={updatePassword} className='bg-indigo-500 h-9 text-white flex flex-row justify-center items-center gap-2 rounded-3xl text-serif text-sm' ><LoadingOutlined spinning allowFullScreen size="large" style={{color:"white"}}/>Reseting</button>)}
//             </div></div>
//         )}
//        {(status===404 || status===500 || status===404) && (<p className='text-center'>Verification Failed</p>)}
//     </div>
//   )
// }

// export default ResetPassword

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const email = window.localStorage.getItem('resetEmail');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users/resetPassword/${resetToken}`);
        setStatus(response?.data?.status);
      } catch (error) {
        console.error(error);
        message.error('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [resetToken]);

  const updatePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/users/updatePassword`, {
        email,
        password,
      });
      message.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      message.error('An error occurred while updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className='w-full mt-64 flex items-center justify-center text-3xl'>
          <LoadingOutlined spinning allowFullScreen size='large' style={{ color: 'black', font: 50 }} />
        </div>
      )}
      {status === 200 && (
        <div className='flex justify-center items-center bg-stone-100 h-screen'>
          <div className='w-96 flex flex-col bg-white rounded-3xl justify-center gap-4 p-10'>
            <Input
              placeholder='Your new password'
              className='rounded-md'
              onChange={(e) => setPassword(e.target.value)}
            />
            {!loading ? (
              <button
                type='submit'
                className='bg-indigo-500 h-9 text-white hover:bg-white hover:text-indigo-500 text-serif text-sm rounded-3xl'
                onClick={updatePassword}
              >
                Reset
              </button>
            ) : (
              <button
                type='submit'
                disabled
                className='bg-indigo-500 h-9 text-white flex flex-row justify-center items-center gap-2 rounded-3xl text-serif text-sm'
              >
                <LoadingOutlined spinning allowFullScreen size='large' style={{ color: 'white' }} />
                Reseting
              </button>
            )}
          </div>
        </div>
      )}
      {[404, 500].includes(status) && <p className='text-center'>Verification Failed</p>}
    </div>
  );
};

export default ResetPassword;
