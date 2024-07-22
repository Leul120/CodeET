
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FaRegEye } from 'react-icons/fa6';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';
// import './login.css'; // Import the CSS file for styles

const Login = () => {
  const [types, setTypes] = useState('password');
  const [errored, setErrored] = useState('');
  let { setMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    setMenu('Login');
    if (user) {
      navigate('/');
    }
  }, [navigate, user, setMenu]);

  const loginSchema = yup.object().shape({
    email: yup.string().email('Please Provide A Valid Email').required('Email Required'),
    password: yup.string().required('Password is required').min(8),
  });

  const dataPost = async (value) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_URL}/users/login`, value);
      if (response?.data.status === 'success') {
        setErrored('');
        setLoading(false);
        message.success('Logged In Successfully');
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);

        const custom = btoa(response.data.token);

        window.localStorage.setItem('token', custom);
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (error) {
      setErrored(error.response.data.message);
      setLoading(false);
    }
  };

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitData = async (value) => {
    dataPost(value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
        
        <div className="w-full flex justify-center items-center px-4 py-8">
          <form onSubmit={handleSubmit(submitData)} className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-gray-100 pb-4 font-bold text-center">Log In</h1>
            <p className="text-red-600 text-center">{errored}</p>
            <input
              type="text"
              className={`rounded-md my-2 w-full px-4 py-2 bg-gray-700 text-gray-300 border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-gray-500 transition duration-300`}
              placeholder="Email"
              {...register('email')}
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-md mt-2">
              <input
                type={types}
                className="bg-transparent text-gray-300 px-4 py-2 w-full focus:outline-none"
                placeholder="Password"
                {...register('password')}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTypes((prevType) => (prevType === 'text' ? 'password' : 'text'));
                }}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 transition duration-300 focus:border-0 active:border:0 border:0"
              >
                <FaRegEye />
              </button>
            </div>
            <p className="text-red-400 text-sm">{errors.password?.message}</p>

            {loading ? (
              <button type="submit" disabled className="w-full h-10 mt-4 rounded-md p-1 text-white flex gap-2 text-sm items-center justify-center bg-purple-600">
                <LoadingOutlined className="animate-spin" />
                Logging In...
              </button>
            ) : (
              <button type="submit" className="w-full h-10 mt-4 rounded-md p-1 text-white flex items-center justify-center bg-purple-700 hover:bg-purple-600 transition duration-300 text-sm">
                Log In
              </button>
            )}
            <Link to="/signup">
              <button type="button" className="w-full h-10 mt-4 rounded-md text-purple-700 bg-transparent hover:underline transition duration-300 text-sm">
                Sign Up
              </button>
            </Link>
            <div className="text-center mt-4">
              <Link to="/forget-Password" className="text-blue-600 hover:underline transition duration-300">
                Forget Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;



