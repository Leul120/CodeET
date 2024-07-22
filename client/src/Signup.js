import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('password');
  const [types, setTypes] = useState('password');
  const [errored, setErrored] = useState([false, '']);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const userSchema = yup.object().shape({
    name: yup.string().required('Please Enter A Full Name'),
    email: yup
      .string()
      .email('Please Enter A Valid Email')
      .required('Please Enter An Email'),
    password: yup.string().min(8).required('Please Enter A Password'),
    passwordConfirm: yup
      .string()
      .required('Please Confirm Your Password')
      .oneOf([yup.ref('password'), null], 'Passwords Must Match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const toggleVisibility = (e, type, setType) => {
    e.preventDefault();
    setType(type === 'text' ? 'password' : 'text');
  };

  const submitForm = async (value) => {
    setLoading(true);
    try {
      value.verificationCode = Math.floor(Math.random() * 100000);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/signup`,
        value
      );
      navigate(`/verifyEmail/${response.data.newUser._id}`);
    } catch (error) {
      console.error(error);
      setErrored([true, 'Email already exists. Please try again!']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
        <h1 className="text-center text-3xl font-bold text-purple-500 mb-4">
          Sign Up
        </h1>
        {errored[0] && (
          <p className="text-red-500 text-sm mb-4">{errored[1]}</p>
        )}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Full Name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type={type}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400 pr-10"
                placeholder="Password"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
                onClick={(e) => toggleVisibility(e, type, setType)}
              >
                <FaRegEye className="text-gray-500" />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                type={types}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 bg-gray-700 text-white placeholder-gray-400 pr-10"
                placeholder="Confirm Password"
                {...register('passwordConfirm')}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-3 mr-4 focus:outline-none"
                onClick={(e) => toggleVisibility(e, types, setTypes)}
              >
                <FaRegEye className="text-gray-500" />
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingOutlined className="animate-spin mr-2" /> Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          By clicking sign up you agree to our user{' '}
          <span className="text-purple-400 cursor-pointer hover:underline">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-purple-400 cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;

