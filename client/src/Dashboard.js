// import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons';
// import { AppContext } from './App';
// import './popular.css'
// import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'
// import errorPic from './error.avif'
// const Dashboard = () => {
//     const {setUser,isLoading,setIsLoading,setMenu}=useContext(AppContext)
//     const [error,setError]=useState(false)
//     let [course,setCourse]=useState([])
//     const storedUser=JSON.parse(window.localStorage.getItem('user'))
//     const userID=storedUser?._id
//     let token= atob(window.localStorage.getItem('token'))
//     useEffect(() => {
//       setMenu('Dashboard')
//         setUser(JSON.parse(window.localStorage.getItem('user')));
//       }, [setUser]);




// useEffect(() => {
//     const fetchCourses = async () => {
//       try{
//          setIsLoading(true)
//           const res = await axios.get(`${process.env.REACT_APP_URL}/api/dashboard/${userID}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setCourse(res.data.courses);
//         setIsLoading(false);
//         setError(false)
//       }catch(error){
//         setIsLoading(false)
//         setError(true)
//       }
//       }
  
//     fetchCourses();
//   }, []);
  
//   return (
//     <div >
//     {!error&&(<>
//         {storedUser?(<div className='flex dashboard '>
//         <div className='pt-24 h-screen '  ><h1 className='text-white'> </h1>
//         <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
//         {isLoading?(<>{(() => {
//         const components = [];
//         for (let i = 0; i <10; i++) {
//           components.push(<div key={i}><Skeleton baseColor='#cfd4d1' borderRadius='0.7rem' highlightColor='#4a4f4b' className='h-48 bg-white'/>
//     <Skeleton className='h-5' baseColor='#2a2b2a' borderRadius='1rem' highlightColor='#4a4f4b'/>
//     <div className='max-w-56'>
//     <Skeleton className='h-4 ' baseColor='#2a2b2a' borderRadius='1rem' highlightColor='#4a4f4b'/></div><div className='max-w-44 '>
//     <Skeleton className='h-4 w-32' baseColor='#2a2b2a' borderRadius='1rem' highlightColor='#4a4f4b'/>
//     </div>
//     <div className='h-8'>
//     <Skeleton className='h-8 ' baseColor='#2a2b2a' borderRadius='1rem' highlightColor='#4a4f4b'/>
//     </div>
//     </div>);
//         }
//         return components;
//       })()}
//       </>):(<>{ 
//            course?.map((course)=>{
//             const date= course?.Released.slice(0,4)
//             return(
//                 <Link to={`/course/${course?._id}`} className='flex flex-col pb-5 justify-between backdrop-blur-md bg-white/20 rounded-xl ml-2'><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-40 xs:w-96 rounded-xl ' loading='lazy'/>
//                 <p className='text-slate-100 h-5 text-wrap mr-1 font-bold pt-1 pb-1 text-sm overflow-hidden ' key={Math.random()}>{course.Title}</p>
//                 <p className='text-slate-100 text-sm' key={Math.random()}>Released: {date} </p>
//                 <p className='text-slate-200 text-sm' key={Math.random()}>Rating: {course.Rating}</p>
//                 </div></Link>
//                 )
//             })   
//         }</>)}
//         </div></div></div>):(<h1 className='text-slate-400 text-center'>You Haven't Logged In </h1>)}
//         </>)}
//         {error && (<div className='h-screen '><img src={errorPic}/></div>)}
//     </div>
//   )
// }

// export default Dashboard

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from './App';
import './popular.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import errorPic from './error.avif';

const Dashboard = () => {
    const { setUser, isLoading, setIsLoading, setMenu } = useContext(AppContext);
    const [error, setError] = useState(false);
    const [courses, setCourses] = useState([]);

    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    const userID = storedUser?._id;
    const token = atob(window.localStorage.getItem('token'));

    useEffect(() => {
        setMenu('Dashboard');
        setUser(storedUser);
    }, [setMenu, setUser, storedUser]);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/dashboard/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(res.data.courses);
                setError(false);
            } catch (err) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [userID, token, setIsLoading]);

    const renderSkeletons = () => {
        const skeletons = Array.from({ length: 10 }, (_, i) => (
            <div key={i} className=''>
                <div className='w-60'><Skeleton baseColor='#cfd4d1' borderRadius='0.7rem' highlightColor='#ebf0ec' className='h-48 w-64 bg-white'/></div>
                <Skeleton className='h-5' baseColor='#cfd4d1' borderRadius='1rem' highlightColor='#ebf0ec'/>
                <div className=' w-48'>
                    <Skeleton className='h-4' baseColor='#cfd4d1' borderRadius='1rem' highlightColor='#ebf0ec'/>
                </div>
                <div className='max-w-44'>
                    <Skeleton className='h-4 w-32' baseColor='#cfd4d1' borderRadius='1rem' highlightColor='#ebf0ec'/>
                </div>
                <div className='h-8'>
                    <Skeleton className='h-8' baseColor='#cfd4d1' borderRadius='1rem' highlightColor='#ebf0ec'/>
                </div>
            </div>
        ));
        return skeletons;
    };

    const renderCourses = () => {
        return courses.map(course => {
            const date = course.Released.slice(0, 4);
            return (
                <Link to={`/course/${course._id}`} key={course._id} className='flex flex-col pb-5 justify-between backdrop-blur-md bg-white/20 rounded-xl ml-2'>
                    <div>
                        <img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-40 xs:w-96 rounded-xl' loading='lazy'/>
                        <p className='text-slate-100 h-5 text-wrap mr-1 font-bold pt-1 pb-1 text-sm overflow-hidden'>{course.Title}</p>
                        <p className='text-slate-100 text-sm'>Released: {date}</p>
                        <p className='text-slate-200 text-sm'>Rating: {course.Rating}</p>
                    </div>
                </Link>
            );
        });
    };

    return (
        <div>
            {!error ? (
                <>
                    {storedUser ? (
                        <div className='flex dashboard'>
                            <div className='pt-24 min-h-screen h-full'>
                                <h1 className='text-white'>Bought Courses</h1>
                                <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                                    {isLoading ? renderSkeletons() : renderCourses()}
                                </div>
                                <div><h1 className='text-white'>To Be Bought</h1>
                                
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1 className='text-slate-400 text-center'>You Haven't Logged In</h1>
                    )}
                </>
            ) : (
                <div className='h-screen'>
                    <img src={errorPic} alt="Error" />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
