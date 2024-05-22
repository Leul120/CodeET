import React, { useContext } from 'react'
import { Carousel } from 'antd'
import { AppContext } from './App'

const Banner = () => {
    const courses=useContext(AppContext)
    console.log(courses)
  return (
   <div className='flex justify-center pt-24 relative'>
        <Carousel autoplay dotPosition='top' dots={4} pauseOnHover={true}  className='mt-2 w-56 block h-96  '>
            {courses.map((course,index)=>{
                return(
                    <div  key={index}>
                        <img src={course.Poster} key={index} alt={course.Title} className=''/></div>
                )})
            }
        </Carousel>
        </div>
  )
}

export default Banner