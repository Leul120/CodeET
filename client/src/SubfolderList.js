// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from './App';
// import ReactPlayer from 'react-player';
// import { Radio } from 'antd';
// import './popular.css'
// const SubfolderList = () => {
//   const [data, setData] = useState([]);
//   const [courseUrl, setCourseUrl] = useState("");
//   const { user, enrolled } = useContext(AppContext);
//   const [courseTitle,setCourseTitle]=useState("")
//   const navigate = useNavigate();
//   const { folderName } = useParams();
//   const courseID = useParams().courseID;

//   useEffect(() => {
//     if (!user || !enrolled) {
//       navigate('/');
//     }
//   }, [user, enrolled, navigate]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [courseID]);

//   const handleItemClick = (cour) => {
//     setCourseTitle(cour.key.split('/')[2].split('.')[0]+ cour.key.split('/')[2].split('.')[1])
//     setCourseUrl(cour.url);
//   };

//   const filtered = data.filter(cour => cour.key.split('/')[1] === folderName);
//    const uniqueFolder= filtered.sort((a, b) => a.key.split('/')[2].split('.')[0]-b.key.split('/')[2].split('.')[0])
//    console.log(uniqueFolder)
//   return (
//     <div className='pt-16 flex flex-row flex-wrap'>

//       <div className='w-3/4' >
//         <ReactPlayer
//           url={courseUrl}
//           width="100%"
//           height="600px"
//           controls
//           autoPlay
//           config={{ file: { attributes: { controlsList: 'nodownload' } } }}
//         />
//         <h1 className="font-bold p-2">{courseTitle}</h1>
//       </div>
//     <ul className='flex flex-col'>
//         {uniqueFolder.map((cour, index) => {
//           const a=cour.key.split('/')[2].split('.')
//           if(a.includes("mp4")){
//           return(
//           <li  key={index} className='shadow my-1 p-1 text-sm hover:bg-blue-600  hover:text-white h-10 min-w-96 flex items-center cursor-pointer' onClick={() => handleItemClick(cour)}>
//            <p className="p-1 mr-1 rounded-3xl text-center text-md bg-slate-300 w-8 h-8"></p> {cour.key.split('/')[2].split('.')[0]}{cour.key.split('/')[2].split('.')[1]}</li>
//         )}})}
//   </ul>
//     </div>
//   );
// };

// export default SubfolderList;

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from './App';
// import ReactPlayer from 'react-player';
// import './popular.css';
// import Skeleton from 'react-loading-skeleton';

// const SubfolderList = () => {
//   const [data, setData] = useState([]);
//   const [courseUrl, setCourseUrl] = useState("");
//   const { enrolled,isLoading,setIsLoading } = useContext(AppContext);
//   const [courseTitle, setCourseTitle] = useState("");
//   const navigate = useNavigate();
//   const { folderName } = useParams();
//   const courseID = useParams().courseID;
//    const user = JSON.parse(window.localStorage.getItem('user'));
//   useEffect(() => {
//     if (!user || !enrolled) {
//       navigate('/');
//     }
//   }, [user, enrolled, navigate]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
//         setData(response.data);
//         setIsLoading(false)
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false)
//       }
//     };
//     fetchData();
//   }, [courseID]);

//   const handleItemClick = (cour,bb) => {
//     console.log(cour)
//     // setCourseTitle(cour.key.split('/')[2].split('.')[0] + cour.key.split('/')[2].split('.')[1]);
//     setCourseTitle(bb)
//     const a=filtered.filter((abc)=>{return abc.key.split('/').includes(cour)})
//     console.log(a[0].url)
//     setCourseUrl(a[0].url);
//   };
// let uniqueFolders=[]
//   const filtered = data.filter(cour => cour.key.split('/')[1] === folderName);
//   console.log(filtered)
//   for(let i=0;i<filtered.length;i++){
//     uniqueFolders.push(filtered[i].key.split('/')[2])
//   }
//   console.log(uniqueFolders[0])
// console.log(uniqueFolders[0]?.split('-')[0])
//   if(uniqueFolders[0]?.split('.')[2]==='mp4'){
//   uniqueFolders.sort((a, b) => {
// return a?.split('.')[0]*1-b?.split('.')[0]*1})}
// else if(uniqueFolders[0]?.split('-')[1]==='mp4'){
  
//   uniqueFolders?.sort((a, b) => {
// return (a?.split('-')[0]*1)-(b?.split('-')[0]*1)})
// }
// console.log(uniqueFolders)
// console.log(courseUrl)
// console.log(uniqueFolders.filter((abc)=>{return abc.split('.').includes('mp4')}).length===0)
//   return (
//     <div className='pt-16 h-full  min-h-screen bg-slate-900'>
//     {isLoading?(<div className='w-screen mr-3 pt-10'><Skeleton className='h-10' count={20} baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' /></div>):(<>
//       <div className={``}>
//         <ReactPlayer
//           url={courseUrl}
//           width="100%"
//           height={`${courseUrl===""?"0px":"600px"}`}
//           controls
//           playing
//           autoplay
//           config={{ file: { attributes: { controlsList: 'nodownload' } } }}
//         />
//         <h1 className="font-bold p-2 text-white ">{courseTitle}</h1>
//       </div>
//       <ul className={` flex-col w-full  h-full pt-10`}>
//       {uniqueFolders.filter((abc)=>{return abc.split('.').includes('mp4')}).length===0?(
//         <li className='text-white text-center pt-10 h-8 '>I know but there is no course in this section move to the next one</li>
//       ):(<>
      
//         {uniqueFolders.map((cour, index) => {
//           const bb=cour.split('.')
//           if(bb.includes('mp4')){
//             bb.splice(bb.indexOf('mp4'),1)
//             return (
//               <li key={index} className={` shadow-lg my-1 p-1 text-white pl-2 text-sm hover:bg-slate-200  rounded-lg hover:text-black h-10  flex items-center cursor-pointer `} onClick={() => handleItemClick(cour,bb)}>
//                  {bb[0]}.{bb[1]}
//               </li>
//             )
//           }
//         })}</>)}
//       </ul></>)}
//     </div>
//   );
// };

// export default SubfolderList;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';
import ReactPlayer from 'react-player';
import './popular.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SubfolderList = () => {
  const [data, setData] = useState([]);
  const [courseUrl, setCourseUrl] = useState("");
  const { enrolled, isLoading, setIsLoading } = useContext(AppContext);
  const [courseTitle, setCourseTitle] = useState("");
  const navigate = useNavigate();
  const { folderName } = useParams();
  const { courseID } = useParams();
  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !enrolled) {
      navigate('/');
    }
  }, [user, enrolled, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseID, setIsLoading]);

  const handleItemClick = (cour, bb) => {
    setCourseTitle(bb.join('.'));
    const selectedCourse = data.find(abc => abc.key.split('/').includes(cour));
    setCourseUrl(selectedCourse.url);
  };

  const filtered = data.filter(cour => cour.key.split('/')[1] === folderName);

  let uniqueFolders = [];
  for (let i = 0; i < filtered.length; i++) {
    uniqueFolders.push(filtered[i].key.split('/')[2]);
  }

  if (uniqueFolders[0]?.split('.')[2] === 'mp4') {
    uniqueFolders.sort((a, b) => a?.split('.')[0] * 1 - b?.split('.')[0] * 1);
  } else if (uniqueFolders[0]?.split('-')[1] === 'mp4') {
    uniqueFolders.sort((a, b) => (a?.split('-')[0] * 1) - (b?.split('-')[0] * 1));
  }

  return (
    <div className='pt-16 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      {isLoading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <Skeleton className='w-11/12 h-10' count={10} baseColor='#ebf0ec' borderRadius='10px' highlightColor='#cfd4d1' />
        </div>
      ) : (
        <>
          <div className='flex flex-col items-center'>
            <ReactPlayer
              url={courseUrl}
              width="100%"
              height={courseUrl ? "600px" : "0px"}
              controls
             
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              className='shadow-lg mb-4 rounded-lg overflow-hidden'
            />
            <h1 className="font-bold p-4 text-white text-2xl">{courseTitle}</h1>
          </div>
          <ul className='w-full max-w-4xl mx-auto pt-10'>
            {uniqueFolders.filter(abc => abc.split('.').includes('mp4')).length === 0 ? (
              <li className='text-white text-center pt-10 h-8'>
                I know but there is no course in this section, move to the next one
              </li>
            ) : (
              uniqueFolders.map((cour, index) => {
                const bb = cour.split('.');
                if (bb.includes('mp4')) {
                  bb.splice(bb.indexOf('mp4'), 1);
                  return (
                    <li
                      key={index}
                      className='shadow-lg my-2 p-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-all duration-300 flex items-center cursor-pointer'
                      onClick={() => handleItemClick(cour, bb)}
                    >
                      {bb.join('.')}
                    </li>
                  );
                }
              })
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default SubfolderList;
