import React, { useContext } from 'react';
import { AppContext } from './App';
import axios from 'axios';
import PopularCourses from './PopularCourses';

export const fetchCourses = async (page,search,sort) => {
  try{
    const res = await axios.get(`${process.env.REACT_APP_URL}/api/course/?page=${page}&search=${search}&sort=${sort}`);
    return res.data.courses;
  }catch(error){
    
  }
  };

function Home() {
    const {setCount}=useContext(AppContext)
    
    const hide=()=>{
        setCount("w-full sm:hidden inline-block hidden")
    }
  return (
    <div className='  ' onClick={hide}>
      {/* <Banner/> */}
      
      <PopularCourses />

    </div>
  );
}

export default Home;
