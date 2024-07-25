// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from './App'
// import Skeleton from 'react-loading-skeleton'
// import { Link } from 'react-router-dom'
// import './popular.css'
// import { fetchCourses } from './Home'
// import Description from './Description'
// import Footer from './Footer'
// import Pagination from '@mui/material/Pagination';
// import {LoadingOutlined} from '@ant-design/icons'
// import { Menu, Rate } from 'antd'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'
// import errorPic from './error.avif'


// const PopularCourses = () => {
//     const {courses,text,setCourses,page,setPage,isLoading,setIsLoading,setRefetcher,sort,setSort,setUser,setMenu}=useContext(AppContext)
//     const [error,setError]=useState(false)
//     // const [user,setUser]=useState({})
   
//    useEffect(() => {
//     setMenu('home')
//      setUser(JSON.parse(window.localStorage.getItem('user')));
//     setIsLoading(true)
 
//   fetchCourses(page, text,sort).then((fetchedCourses) => {
//     if(fetchedCourses){
//     setCourses(fetchedCourses)
//     setIsLoading(false)
//     setError(false)
// }
//   }).catch((err)=>{
//     setError(true)
//   })
// }, [text,page,sort]);
    
    
//    console.log(courses)
    
//     const onChange=(e)=>{
//       setSort(e.key)
//       setPage(1)
//     }
//   return (
//     <>
    
//        {!error &&( <div className='flex main flex-col' >
        
//          <Description/>
          
//           <Menu onChange={onChange} value={sort}  onSelect={onChange} className='text-white bg-transparent border-none shadow-none w-24'>
         
//           <Menu.SubMenu key="odd" title="sort" className='text-white bg-white/20 backdrop-blur-xl w-24 mt-1 ml-4 itemIcon={<DownOutlined />} ' style={{color:"white"}}>
//             <Menu.SubMenu  title="Released">
//             <Menu.Item key="Released" className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
//             <Menu.Item key='-Released' className='' ><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
//             </Menu.SubMenu>
//             <Menu.SubMenu title="Price">
//               <Menu.Item key='Price'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
//             <Menu.Item key="-Price"  className=''><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
//             </Menu.SubMenu>
//             <Menu.SubMenu title="Rating">
//               <Menu.Item key='Rating'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundUp className='text-2xl'/>Lower-To-Higher</p></Menu.Item>
//             <Menu.Item key='-Rating'  className=''><p className='flex flex-row items-center'><IoIosArrowRoundDown className='text-2xl'/>Higher-To-Lower</p></Menu.Item>
//             </Menu.SubMenu>
//           </Menu.SubMenu>
       
//         </Menu>
       
       
    
   
//     <div className='xs:grid gap-9 xs:gap-5 flex flex-row flex-wrap xs:grid-cols-3  sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 p-4  '>
//     {isLoading?(<>
//     {(() => {
//         const components = [];
//         for (let i = 0; i <10; i++) {
//           components.push(<div key={i}><Skeleton baseColor='#ebf0ec' borderRadius='0.7rem' highlightColor='#4a4f4b' className='h-48 bg-white'/>
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
    
//     </>):(<>
//         {courses.map((course,index)=>{
//             return(
//                 <Link to={`/course/${course._id}`} className='flex flex-col pb-5 justify-between w-28 xs:w-auto '><div><img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border hover:size-2xl xs:h-48 w-28 xs:w-96 rounded-lg' loading='lazy'/>
//                 <p className=' h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden w-32 xs:w-full text-slate-300 font-bold' key={Math.random()}>{course.Title}</p>
                
//                 <p className='text-red-400 text-sm ' key={Math.random()}><Rate disabled allowHalf defaultValue={course.Rating/2} /> {course.Rating}</p>
//                 <p className='text-red-300 text-sm bg-gradient-to-r from-green-200 to-purple-300 text-transparent bg-clip-text' key={Math.random()}>{course.bought} {" "} people bought</p>
//                 </div>
//                 <button type="button" className="text-white   bg-purple-500 flex items-center justify-center text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto   me-2  xs:text-center xs:text-nowrap overflow-hidden max-w-96"> {course.Price-0.01}Birrs only</button>

                
//                 </Link>
//                 // </div>
//             )
//         })}</>)}</div>
//     <div className='flex justify-center'>
//         <Pagination count={5}  color='secondary'  page={page} shape="rounded" className='m-3 w-72 p-0 text-white rounded-lg bg-white/30 flex justify-center backdrop-blur-2xl' onChange={async (e,i)=>{
//            await setPage(i)
//            setRefetcher(true)
           
//             }} />
//         </div>
//     <Footer/>
//     </div>
//        )}
//        {error && (<div className='h-screen '><img src={errorPic}/></div>)}
//     </>
//   )
// }

// export default PopularCourses

// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from './App';
// import Skeleton from 'react-loading-skeleton';
// import { Link } from 'react-router-dom';
// import './popular.css';
// import { fetchCourses } from './Home';
// import Description from './Description';
// import Footer from './Footer';
// import Pagination from '@mui/material/Pagination';
// import { LoadingOutlined } from '@ant-design/icons';
// import { Menu, Rate } from 'antd';
// import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
// import errorPic from './error.avif';

// const PopularCourses = () => {
//   const {
//     courses, text, setCourses, page, setPage, isLoading, setIsLoading, setRefetcher, sort, setSort, setUser, setMenu
//   } = useContext(AppContext);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     setMenu('Home');
//     setUser(JSON.parse(window.localStorage.getItem('user')));
//     setIsLoading(true);

//     fetchCourses(page, text, sort)
//       .then((fetchedCourses) => {
//         if (fetchedCourses) {
//           setCourses(fetchedCourses);
//           setIsLoading(false);
//           setError(false);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setError(true);
//         setIsLoading(false);
//       });
//   }, [text, page, sort]);

//   const onChange = (e) => {
//     setSort(e.key);
//     setPage(1);
//   };

//   const renderSkeletons = () => {
//     const skeletons = [];
//     for (let i = 0; i < 10; i++) {
//       skeletons.push(
//         <div key={i}>
//           <Skeleton baseColor='#ebf0ec' borderRadius='0.7rem' highlightColor='#cfd4d1' className='h-48 bg-white' />
//           <Skeleton className='h-5' baseColor='#ebf0ec' borderRadius='0.5rem' highlightColor='#cfd4d1' />
//           <div className='max-w-56'>
//             <Skeleton className='h-4' baseColor='#ebf0ec' borderRadius='0.4rem' highlightColor='#cfd4d1' />
//           </div>
//           <div className='max-w-44'>
//             <Skeleton className='h-4 w-32' baseColor='#ebf0ec' borderRadius='0.7rem' highlightColor='#cfd4d1' />
//           </div>
//           <div className='h-8'>
//             <Skeleton className='h-9' baseColor='#ebf0ec' borderRadius='0.5rem' highlightColor='#cfd4d1' />
//           </div>
//         </div>
//       );
//     }
//     return skeletons;
//   };

//   return (
//     <div className='main'>
//       {!error ? (
//         <div className='  min-h-screen  '>
//           <Description />
//           <Menu onSelect={onChange}  className='text-white bg-transparent border-none shadow-none w-24'>
//             <Menu.SubMenu key='sort' title='Sort' className='text-white bg-white/20 backdrop-blur-xl w-24 mt-1 ml-4'>
//               <Menu.SubMenu title='Released'>
//                 <Menu.Item key='Released'><p className='flex items-center'><IoIosArrowRoundUp className='text-2xl' />Lower-To-Higher</p></Menu.Item>
//                 <Menu.Item key='-Released'><p className='flex items-center'><IoIosArrowRoundDown className='text-2xl' />Higher-To-Lower</p></Menu.Item>
//               </Menu.SubMenu>
//               <Menu.SubMenu title='Price'>
//                 <Menu.Item key='Price'><p className='flex items-center'><IoIosArrowRoundUp className='text-2xl' />Lower-To-Higher</p></Menu.Item>
//                 <Menu.Item key='-Price'><p className='flex items-center'><IoIosArrowRoundDown className='text-2xl' />Higher-To-Lower</p></Menu.Item>
//               </Menu.SubMenu>
//               <Menu.SubMenu title='Rating'>
//                 <Menu.Item key='Rating'><p className='flex items-center'><IoIosArrowRoundUp className='text-2xl' />Lower-To-Higher</p></Menu.Item>
//                 <Menu.Item key='-Rating'><p className='flex items-center'><IoIosArrowRoundDown className='text-2xl' />Higher-To-Lower</p></Menu.Item>
//               </Menu.SubMenu>
//             </Menu.SubMenu>
//           </Menu>

//           <div className='xs:grid gap-9 xs:gap-5 flex flex-wrap xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 p-4'>
//             {isLoading ? renderSkeletons() : (
//               courses.map((course) => (
//                 <Link to={`/course/${course._id}`} key={course._id} className='flex flex-col pb-5 justify-between w-28 xs:w-auto'>
//                   <div>
//                     <img alt={course.Title} src={course.Poster} className='h-24 shadow-md hover:shadow-border xs:h-48 w-28 xs:w-96 rounded-lg' loading='lazy' />
//                     <p className='h-5 text-wrap mr-1 pt-1 pb-1 text-sm overflow-hidden w-32 xs:w-full text-slate-300 font-bold'>{course.Title}</p>
//                     <p className='text-red-400 text-sm'><Rate disabled allowHalf defaultValue={course.Rating / 2} /> {course.Rating}</p>
//                     <p className='text-red-300 text-sm bg-gradient-to-r from-green-200 to-purple-300 text-transparent bg-clip-text'>{course.bought} people bought</p>
//                   </div>
//                   <button type='button' className='text-white bg-purple-500 flex items-center justify-center text-xs xs:font-medium xs:rounded-lg rounded-md px-5 py-2.5 h-6 xs:h-auto'>{course.Price - 0.01} Birrs only</button>
//                 </Link>
//               ))
//             )}
//           </div>
//           <div className='flex justify-center'>
//             <Pagination count={5} color='secondary' page={page} shape='rounded' className='m-3 w-72 text-white rounded-lg bg-white/30 flex justify-center backdrop-blur-2xl' onChange={(e, i) => {
//               setPage(i);
//               // setRefetcher(true);
//             }} />
//           </div>
//           <Footer />
//         </div>
//       ) : (
//         <div className='h-screen'><img src={errorPic} alt='Error' /></div>
//       )}
//     </div>
//   );
// };

// export default PopularCourses;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import './popular.css';
import { fetchCourses } from './Home';
import Description from './Description';
import Footer from './Footer';
import Pagination from '@mui/material/Pagination';
import { Menu, Rate } from 'antd';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import errorPic from './error.avif';

const PopularCourses = () => {
  const {
    courses,
    text,
    setCourses,
    page,
    setPage,
    isLoading,
    setIsLoading,
    sort,
    setSort,
    setUser,
    setMenu,
  } = useContext(AppContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMenu('Home');
    setUser(JSON.parse(window.localStorage.getItem('user')));
    setIsLoading(true);

    fetchCourses(page, text, sort)
      .then((fetchedCourses) => {
        if (fetchedCourses) {
          // Set fetched courses to state
          setCourses(fetchedCourses);
          setIsLoading(false);
          setError(false);
        } else {
          // Handle case when fetchedCourses is null or undefined
          setCourses([]);
          setIsLoading(false);
          setError(true);
        }
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
        setError(true);
        setIsLoading(false);
      });
  }, [text, page, sort, setCourses, setIsLoading, setMenu, setUser]);

  const onChange = (e) => {
    setSort(e.key);
    setPage(1);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse"
      >
        <Skeleton
          baseColor="#4a5568"
          highlightColor="#718096"
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="mt-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
        <Skeleton className="mt-4 h-8 w-full" />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 pt-16">
      {!error ? (
        <div className="w-full max-w-7xl flex flex-col min-h-screen">
          <Description />
          <Menu
            onSelect={onChange}
            className="text-white bg-transparent border-none shadow-none w-24"
          >
            <Menu.SubMenu
              key="sort"
              title="Sort"
              className="text-white bg-white/20 backdrop-blur-xl w-24 mt-1 ml-4"
            >
              <Menu.SubMenu title="Released">
                <Menu.Item key="Released">
                  <p className="flex items-center">
                    <IoIosArrowRoundUp className="text-2xl" />
                    Lower-To-Higher
                  </p>
                </Menu.Item>
                <Menu.Item key="-Released">
                  <p className="flex items-center">
                    <IoIosArrowRoundDown className="text-2xl" />
                    Higher-To-Lower
                  </p>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="Price">
                <Menu.Item key="Price">
                  <p className="flex items-center">
                    <IoIosArrowRoundUp className="text-2xl" />
                    Lower-To-Higher
                  </p>
                </Menu.Item>
                <Menu.Item key="-Price">
                  <p className="flex items-center">
                    <IoIosArrowRoundDown className="text-2xl" />
                    Higher-To-Lower
                  </p>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="Rating">
                <Menu.Item key="Rating">
                  <p className="flex items-center">
                    <IoIosArrowRoundUp className="text-2xl" />
                    Lower-To-Higher
                  </p>
                </Menu.Item>
                <Menu.Item key="-Rating">
                  <p className="flex items-center">
                    <IoIosArrowRoundDown className="text-2xl" />
                    Higher-To-Lower
                  </p>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu>
{courses.length===0 && !isLoading? (<h1 className='text-stone-200 text-center'>No course with name:{text}</h1>):(
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
            {isLoading
              ?  renderSkeletons()
              : courses.map((course) => (
                  <Link
                    to={`/course/${course._id}`}
                    key={course._id}
                    className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105 justify-between"
                  >
                    <img
                      alt={course.Title}
                      src={course.Poster}
                      className="h-48 w-full object-cover rounded-t-lg"
                      loading="lazy"
                    />
                    <div className="mt-2">
                      <h2 className="text-lg font-semibold text-white">
                        {course.Title}
                      </h2>
                      <div className="flex items-center mt-1">
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={course.Rating}
                          className="mr-2"
                        />
                        <span className="text-red-400">{course.Rating}</span>
                      </div>
                      <p className="text-sm text-red-300 bg-gradient-to-r from-green-200 to-purple-300 text-transparent bg-clip-text">
                        {course.bought} people bought
                      </p>
                    </div>
                    <button className="mt-4 text-white bg-purple-500 flex items-center justify-center text-xs font-medium rounded-lg px-5 py-2.5 transition duration-300 hover:bg-purple-600">
                      {course.Price - 0.01} Birrs only
                    </button>
                  </Link>
                ))}
          </div>
      )}
          <div className="flex justify-center mt-6">
            <Pagination
              count={3}
              color="secondary"
              page={page}
              shape="rounded"
              className="m-3 w-48 text-white bg-white/10 rounded-lg backdrop-blur-2xl"
              onChange={(e, i) => {
                setPage(i);
              }}
            />
          </div>
          <Footer />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <img src={errorPic} alt="Error" className="w-80 h-80 object-contain" />
        </div>
      )}
    </div>
  );
};

export default PopularCourses;

