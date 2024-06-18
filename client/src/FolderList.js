// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from './App';
// import { LoadingOutlined } from '@ant-design/icons';

// const FolderList = () => {
//   const [data, setData] = useState([]);
//   const { user, enrolled,isLoading,setIsLoading } = useContext(AppContext);
// console.log("hello")
//   const navigate = useNavigate();
//   const courseID = useParams().courseID;
//   useEffect(() => {
//     if (!user || !enrolled) {
//       navigate('/');
//     }
//   }, [user, enrolled, navigate]);

//   useEffect(() => {
//     setIsLoading(true)
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
//         console.log(response.data)
//         setData(response.data);
//         setIsLoading(false)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [courseID]);
// console.log(data.length)
//   const uniqueFolders = Array.from(new Set(data.map(cour => cour.key.split('/')[1])));
//   // const uniqueFolder= uniqueFolders.sort((a, b) => a.split('.')[0]-b.split('.')[0])
//   console.log(uniqueFolders)
//   return (<>
//     {isLoading && (<div className='h-screen flex justify-center items-center text-4xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>)}
//     {!isLoading && (<div className='pt-16'>
//       <ul className='bg-slate-100'>
//         {uniqueFolders.map((folder, index) => (
//           <li key={index} className=' shadow my-1 hover:bg-blue-600  h-10 pl-1 hover:text-white flex items-center cursor-pointer' onClick={() => navigate(`/subfolder/${folder}/${courseID}`)}>
//            <p className='p-1 mr-1 rounded-3xl text-center bg-slate-300 w-8 h-8'></p> {folder}
//           </li>
//         ))}
//       </ul>
//     </div>)}
//     </>
//   );
// };

// export default FolderList;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';
import { LoadingOutlined } from '@ant-design/icons';

const FolderList = () => {
  const [data, setData] = useState([]);
  const { user, enrolled, isLoading, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const { courseID } = useParams();

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

  // Get unique folders and sort them by name
  const uniqueFolders = Array.from(new Set(data.map(cour => cour.key.split('/')[1]))).sort();
 
  uniqueFolders.sort((a, b) => {
return a?.split('.')[0]-b?.split('.')[0] || a?.split('-')[0]-b?.split('-')[0]})

console.log(uniqueFolders)
  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <LoadingOutlined style={{ fontSize: 50, color: 'black' }} spin />
        </div>
      ) : (
        <div className='pt-16 bg-slate-800'>
          <ul className='bg-gray-800 p-4 rounded-lg shadow-md'>
            {uniqueFolders.map((folder, index) => (
              <li 
                key={index} 
                className='shadow my-2 p-2 text-white bg-slate-500 rounded-md hover:bg-blue-600 hover:text-white flex items-center cursor-pointer transition-colors duration-200'
                onClick={() => navigate(`/subfolder/${folder}/${courseID}`)}
              >
                <span className=''></span>
                <span className='flex-grow'>{folder}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FolderList;

