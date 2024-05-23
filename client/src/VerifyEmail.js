import React, { useContext, useState } from 'react'
import { AppContext } from './App'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VerifyEmail = () => {
    const {user,updateUser,isLoading,seIsLoading}=useContext(AppContext)
    const [error,setError]=useState(false)
    const [searchParams,setSearchParams]=useSearchParams()
    const navigate=useNavigate()
    const emailToken=searchParams.get("emailToken")
  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail