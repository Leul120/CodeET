// import React, { useContext, useEffect, useRef, useState } from 'react'
// import './App.css'
// import 'react-html5video/dist/styles.css'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { AppContext } from './App'
// import { useQuery } from 'react-query'
// import { useNavigate } from 'react-router-dom'
// import { List } from 'antd'
// import Video from './Video'
// import ReactPlayer from 'react-player'
// import { array } from 'yup'

// const WatchingPage = () => {
//   const [data,setData]=useState([])
//   const navigate=useNavigate()
//   const {user,enrolled}=useContext(AppContext)
//   const [chosen,setChosen]=useState([])
//   const [i,setI]=useState(0)
//   const [course,setCourse]=useState([])
//   useEffect(()=>{
//   if(!user || !enrolled){
//     navigate('/')
//   }},[])
//   const [courseUrl,setCourseUrl]=useState("")
//   const courseID="nnn"
//   const find=async ()=>{
//     try{
//     const response=await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`)
//     console.log(response.data)
//       setData(response.data)
      
     
//     }catch(error){
//       console.log(error)
//     }
//   }
//   useEffect(()=>{
//     setChosen("nnn")
//     find()
//   },[])
//   console.log(data)


// const filter=(data)=>{
  
//   const course=data.key.split('/')
 
//   console.log(course[i])
//   return course[i]===chosen
// }
// const filtered=data.filter(filter)

// console.log(filtered)

// console.log(chosen)
//   return (
//     <div className='pt-32'>
//     <div className='h-1/2'>
//       <ReactPlayer
//       url={courseUrl}
//       width="100%"
//       height="50%"
//       controls
//       />
//     </div >
      
//     {filtered.map((cour)=>{
//       const course=cour.key.split('/')
//       console.log(course)

//       return(
//       <li  onClick={()=>{
//         setI(i+1)
//         setChosen(course[i+1])
//          if((i+2)===course.length){
//     setCourseUrl(cour.url)
//   }
//       }}>{course[i+1]}</li>)
//     })}
//     </div>
//   )
// }
 

// export default WatchingPage

// import React, { useContext, useEffect, useState } from 'react';
// import './App.css';
// import 'react-html5video/dist/styles.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from './App';
// import ReactPlayer from 'react-player';

// const WatchingPage = () => {
//   const [data, setData] = useState([]);
//   const [chosen, setChosen] = useState("");
//   const [i, setI] = useState(0);
//   const [courseUrl, setCourseUrl] = useState("");
//   const navigate = useNavigate();
//   const { user, enrolled } = useContext(AppContext);
//   const courseID = "nnn";

//   useEffect(() => {
//     if (!user || !enrolled) {
//       navigate('/');
//     }
//   }, [user, enrolled, navigate]);

//   const findCourse = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     findCourse();
//     setChosen(courseID);
//   }, [courseID]);

//   const handleItemClick = (cour) => {
//     const course = cour.key.split('/');
//     if (i + 2 < course.length) {
//       setChosen(course[i + 1]);
//       setI(i + 1);
//     } else {
//       setCourseUrl(cour.url);
//     }
//   };

//   const filtered = data.filter(cour => cour.key.split('/')[i] === chosen);

//   // Use a Set to ensure unique folders
//   const uniqueFolders = new Set();
//   const folderItems = filtered.map((cour, index) => {
//     const folderName = cour.key.split('/')[i + 1];
//     if (!uniqueFolders.has(folderName)) {
//       uniqueFolders.add(folderName);
//       return (
//         <li key={index} className='border hover:bg-gray-500 flex items-center border-border h-10 rounded-lg my-1' onClick={() => handleItemClick(cour)}>
//           {folderName}
//         </li>
//       );
//     }
//     return null;
//   });

//   return (
//     <div className='pt-16'>
//       <div className='h-1/2'>
//         <ReactPlayer
//           url={courseUrl}
//           width="100%"
//           height="50%"
//           controls
//         />
//       </div>
//       <ul>
//         {folderItems}
//       </ul>
//     </div>
//   );
// }

// export default WatchingPage;
