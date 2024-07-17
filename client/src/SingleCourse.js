// import React, { useContext, useEffect, useState} from 'react';
// import { AppContext } from './App';
// import { useNavigate, useParams } from 'react-router-dom';
// import './popular.css'
// import axios from 'axios';
// import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'
// import errorPic from './error.avif'



// const SingleCourse = () => {
//   const { user,setMenu, setUser,enrolled,setEnrolled,course,setCourse,isLoading,setIsLoading } = useContext(AppContext);
//   const [error,setError]=useState(false)
//   const [read,setRead]=useState(false)
//   const { courseID } = useParams();
//   useEffect(() => {
//     setMenu("")
//     findUser()
//     filter();
//     setUser(JSON.parse(window.localStorage.getItem('user')));
//   }, [setUser]);
 

  
//   useEffect(()=>{
//   if(user && user.courses.includes(courseID)){
//     setEnrolled(true)
//   }else if(user && !user.courses.includes(courseID)){
//     setEnrolled(false)
//   }},[user,setEnrolled])


  
  
  
//   const navigate=useNavigate()
//   const filter = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/?_id=${courseID}`);
//       if (response.data.courses) {
//         setError(false)
//         setIsLoading(false);
//       }
//       setCourse(response.data.courses[0]);
//     } catch (error) {
//       console.error(error);
      
//       setIsLoading(false);
//       setError(true)
//     }
//   };
 
  

//   const userID=user?._id
//   const findUser=async ()=>{
//     try{
        
// const response=await axios.get(`${process.env.REACT_APP_URL}/users/${userID}`)
// setError(false)
// window.localStorage.setItem('user',JSON.stringify(response.data.user))
//     }catch(error){
//         console.log(error)
//     }
// }
// console.log(course)
//   return (
//     <div>
//       {!error&&(
//     <div className='flex flex-row pt-10 backdrop-blur-2xl items-center flex-wrap  pl-3 min-h-screen single '>
    

    
//         {isLoading?(<div className='w-80 pt-16'><Skeleton className='h-80' baseColor='#ebf0ec' borderRadius='1rem' highlightColor='#cfd4d1'/></div>):(<div className='h-80 rounded-xl pt-16 inline'><img alt={course.Title} src={course.Poster} className=' rounded-lg h-full w-80  '/></div>)}
        
//        {isLoading?(<div className='w-96 ml-4'><Skeleton className='h-8 mr-6 mb-4 flex justify-center' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/>
//        <div className='w-28 ml-5'><Skeleton className='h-10' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/></div></div>):(<div className='pl-4 text-slate-200' ><h1 className='mb-4 flex justify-center text-slate-100' style={{whiteSpace:"pre-wrap"}}>{course.Title}</h1>
        
//        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={user?enrolled?()=>{navigate(`/course/watch/${courseID}`)}: ()=>{navigate(`/pay/${course._id}/${userID}`)}:()=>{navigate('/login')}}>
//         {user? enrolled?"Go to Course" :"Enroll Now":"Login To Enroll"}
//         </button></div>)}
//         <div className={`text-wrap   flex flex-col pl-2  pr-2 overflow-hidden`}>
//         {isLoading?(<><div className='w-44 ml-5'><Skeleton className='h-7' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/></div><div className='w-56 ml-5'><Skeleton className='h-7' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/></div></>):(<>
//         <h2 className='text-stone-300'>{course.DTitle}</h2>
//         <a href={course.link} className='text-stone-300'><button className='bg-stone-100 p-2 text-stone-800 rounded-lg mt-2'>Show In Udemy</button></a>
//         <div className='text-slate-400'>Year: {course.Year}</div>
//         <div className='text-slate-400'>Language: {course.Language}</div></>)}<br/>
        
//         <div className={`backdrop-blur-lg bg-white/10 rounded-3xl p-2 mr-2 ${!read?"h-56 bg-gradient-to-b from-stone-300 to-slate-500 text-transparent bg-clip-text":"h-full text-stone-300"}`}>
//         {isLoading?(<div className='w-screen mr-3 '><Skeleton className='h-7' count={20} baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/></div>):(<>
//         <div style={{whiteSpace:"pre-wrap"}} className=''> <br/>{course.Description}</div><br />
//         <div style={{whiteSpace:"pre-wrap"}} className=''> <br />{course.Requirements}</div><br />
//         <div style={{whiteSpace:"pre-wrap"}} className=''>{course.Learn}</div><br />
//         <div style={{whiteSpace:"pre-wrap"}} className=''>{course.CourseFor}</div><br />
//         <div style={{whiteSpace:"pre-wrap"}} className=''>{course.CourseGoal}</div><br /></>)}</div>
//         </div>
//         {isLoading?(<div className='w-32 ml-5 mt-2'><Skeleton className='h-7' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1'/></div>):(<button className='pl-5 flex items-center p-1 rounded-lg text-stone-200' onClick={()=>{
//           setRead(!read)
//         }}>{!read?`Read More`:"Show Less"}</button>)}
//     </div>)}
//     {error && (<div className='h-screen '><img src={errorPic}/></div>)}
//     </div>
//   )}


// export default SingleCourse

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';
import { useNavigate, useParams } from 'react-router-dom';
import './popular.css';
import axios from 'axios';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import errorPic from './error.avif';

const SingleCourse = () => {
  const { user, setMenu, setUser, enrolled, setEnrolled, course, setCourse, isLoading, setIsLoading } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [read, setRead] = useState(false);
  const { courseID } = useParams();

  useEffect(() => {
    setMenu("");
    findUser();
    filter();
    setUser(JSON.parse(window.localStorage.getItem('user')));
  }, [setUser]);

  useEffect(() => {
   
    if (user && user.courses.includes(courseID)) {
      setEnrolled(true);
    } else if (user && !user.courses.includes(courseID)) {
      setEnrolled(false);
    }
  }, [user, setEnrolled]);

  const navigate = useNavigate();

  const filter = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/?_id=${courseID}`);
      if (response.data.courses) {
        setError(false);
        setIsLoading(false);
        setCourse(response.data.courses[0]);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const findUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/users/${user?._id}`);
      setError(false);
      window.localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-32 py-10">
      {!error && (
        <div className="flex flex-col md:flex-row md:items-start items-center w-full max-w-7xl">
          {isLoading ? (
            <div className="w-80 pt-16">
              <Skeleton className="h-64" baseColor="#ebf0ec" borderRadius="1rem" highlightColor="#cfd4d1" />
            </div>
          ) : (
            <div className="h-80 rounded-xl pt-16 inline-block">
              <img alt={course?.Title} src={course?.Poster} className="rounded-lg h-full w-80 object-cover shadow-lg" />
            </div>
          )}

          <div className="flex flex-col md:ml-6 mt-6 md:mt-0 w-full">
            {isLoading ? (
              <div className="w-96">
                <Skeleton className="h-8 mb-4" baseColor="#ebf0ec" borderRadius="10px" highlightColor="#cfd4d1" />
                <Skeleton className="h-10 w-28 ml-5" baseColor="#ebf0ec" borderRadius="10px" highlightColor="#cfd4d1" />
              </div>
            ) : (
              <div className="text-slate-200">
                <h1 className="mb-4 text-2xl font-bold text-center text-slate-100">{course?.Title}</h1>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  ml-2 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transition duration-300"
                  onClick={user ? (enrolled ? () => navigate(`/course/watch/${courseID}`) : () => navigate(`/pay/${course._id}/${user?._id}`)) : () => navigate('/login')}
                >
                  {user ? (enrolled ? "Go to Course" : "Enroll Now") : "Login To Enroll"}
                </button>
              </div>
            )}
            <div className="flex flex-col pl-2 pr-2 overflow-hidden w-full mt-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-7 mb-2" baseColor="#ebf0ec" borderRadius="10px" highlightColor="#cfd4d1" />
                  <Skeleton className="h-7 mb-2" baseColor="#ebf0ec" borderRadius="10px" highlightColor="#cfd4d1" />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium text-stone-300">{course?.DTitle}</h2>
                  <a href={course?.link} className="text-stone-300">
                    <button className="bg-stone-100 text-stone-800 p-2 rounded-lg mt-2 transition duration-300 hover:bg-stone-200">
                      Show In Udemy
                    </button>
                  </a>
                  <div className="text-slate-400 mt-2">Year: {course?.Year}</div>
                  <div className="text-slate-400">Language: {course?.Language}</div>
                </>
              )}
            </div>
            <div className={`backdrop-blur-lg bg-white/10 rounded-3xl p-4 mt-6 ${!read ? "h-56 bg-gradient-to-b from-stone-300 to-slate-500 text-transparent bg-clip-text" : "h-full text-stone-300"} overflow-hidden transition duration-300`}>
              {isLoading ? (
                <Skeleton count={5} className="h-7 mb-2" baseColor="#ebf0ec" borderRadius="10px" highlightColor="#cfd4d1" />
              ) : (
                <>
                  <div style={{ whiteSpace: "pre-wrap" }}>{course?.Description}</div>
                  <br />
                  <div style={{ whiteSpace: "pre-wrap" }}>{course?.Requirements}</div>
                  <br />
                  <div style={{ whiteSpace: "pre-wrap" }}>{course?.Learn}</div>
                  <br />
                  <div style={{ whiteSpace: "pre-wrap" }}>{course?.CourseFor}</div>
                  <br />
                  <div style={{ whiteSpace: "pre-wrap" }}>{course?.CourseGoal}</div>
                  <br />
                </>
              )}
            </div>
            {!isLoading && (
              <button className="mt-4 pl-5 flex items-center p-2 rounded-lg text-stone-200 hover:bg-white/20 transition duration-300" onClick={() => setRead(!read)}>
                {!read ? "Read More" : "Show Less"}
              </button>
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="h-screen flex items-center justify-center">
          <img src={errorPic} alt="Error" className="w-80 h-80 object-contain" />
        </div>
      )}
    </div>
  );
};

export default SingleCourse;


// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from './App';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Skeleton from 'react-loading-skeleton';
// import errorPic from './error.avif';

// const SingleCourse = () => {
//   const { user, setUser, enrolled, setEnrolled, course, setCourse, isLoading, setIsLoading } = useContext(AppContext);
//   const [error, setError] = useState(false);
//   const [read, setRead] = useState(false);
//   const { courseID } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     findUser();
//     filter();
//     setUser(JSON.parse(window.localStorage.getItem('user')));
//   }, []);

//   useEffect(() => {
//     if (user && user.courses.includes(courseID)) {
//       setEnrolled(true);
//     } else if (user && !user.courses.includes(courseID)) {
//       setEnrolled(false);
//     }
//   }, [user, setEnrolled]);

//   useEffect(() => {
//     if (user?._id) {
//       setUser(JSON.parse(window.localStorage.getItem('user')));
//     }
//   }, [user, setUser]);

//   const filter = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/?_id=${courseID}`);
//       setCourse(response.data.courses[0]);
//       setIsLoading(false);
//       setError(false);
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//       setError(true);
//     }
//   };

//   const findUser = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/users/${user?._id}`);
//       window.localStorage.setItem('user', JSON.stringify(response.data.user));
//       setError(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log(course)
//   return (
//     <div className='min-h-screen'>
//       {!error ? (
//         <div className='flex flex-row pt-10 backdrop-blur-2xl items-center flex-wrap pl-3 min-h-screen single '>
//           {isLoading ? (
//             <div className='w-80 pt-16'><Skeleton className='h-64' baseColor='#ebf0ec' borderRadius='0.7rem' highlightColor='#cfd4d1' /></div>
//           ) : (
//             <div className='h-80 rounded-xl pt-16'><img alt={course.Title} src={course.Poster} className=' rounded-lg h-full w-80  ' /></div>
//           )}
//           {isLoading ? (
//             <div className='w-96 ml-4'><Skeleton className='h-8 mr-6 pt-4 mb-4 flex justify-center' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' />
//               <div className='w-28 ml-5'><Skeleton className='h-10' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' /></div>
//             </div>
//           ) : (
//             <div className='pl-4 text-slate-200' >
//               <h1 className='mb-4 flex justify-center text-slate-100' style={{ whiteSpace: "pre-wrap" }}>{course.Title}</h1>
//               <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={user ? enrolled ? () => { navigate(`/course/watch/${courseID}`) } : () => { navigate(`/pay/${course._id}/${user?._id}`) } : () => { navigate('/login') }}>
//                 {user ? enrolled ? "Go to Course" : "Enroll Now" : "Login To Enroll"}
//               </button>
//             </div>
//           )}
//           <div className={`text-wrap flex flex-col pl-2 pr-2 overflow-hidden`}>
//             {isLoading ? (
//               <>
//                 <div className='w-44 ml-5'><Skeleton className='h-7' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' /></div>
                
//               </>
//             ) : (
//               <div className='pt-10'>
//                 <h2 className='text-stone-300'>{course.DTitle}</h2>
//                 <div className='text-slate-300'>Udemy Link: {course?.VideoLink}</div>
//                 <div className='text-slate-300'>Year: {course.Year}</div>
//                 <div className='text-slate-300'>Language: {course.Language}</div>
//               </div>
//             )}
//             <br />
//             <div className={`backdrop-blur-lg bg-white/10 rounded-3xl p-2 mr-2 ${!read ? "h-56 bg-gradient-to-b from-stone-200  text-transparent bg-clip-text" : "h-full text-stone-200"}`}>
//               {isLoading ? (
//                 <div className='w-screen mr-3 '><Skeleton className='h-7' count={20} baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' /></div>
//               ) : (
//                 <>
//                   <div style={{ whiteSpace: "pre-wrap" }}> <br />{course.Description}</div><br />
//                   <div style={{ whiteSpace: "pre-wrap" }}> <br />{course.Requirements}</div><br />
//                   <div style={{ whiteSpace: "pre-wrap" }}>{course.Learn}</div><br />
//                   <div style={{ whiteSpace: "pre-wrap" }}>{course.CourseFor}</div><br />
//                   <div style={{ whiteSpace: "pre-wrap" }}>{course.CourseGoal}</div><br />
//                 </>
//               )}
//             </div>
//           </div>
//           {isLoading ? (
//             <div className='w-32 ml-5 mt-2'><Skeleton className='h-7' baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' /></div>
//           ) : (
//             <button className='pl-5 flex items-center p-1 rounded-lg text-stone-200' onClick={() => { setRead(!read) }}>
//               {!read ? `Read More` : "Show Less"}
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className='h-screen '><img src={errorPic} alt="Error" /></div>
//       )}
//     </div>
//   );
// };

// export default SingleCourse;
