import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';
import ReactPlayer from 'react-player';
import { Radio } from 'antd';
import './popular.css'
const SubfolderList = () => {
  const [data, setData] = useState([]);
  const [courseUrl, setCourseUrl] = useState("");
  const { user, enrolled } = useContext(AppContext);
  const [courseTitle,setCourseTitle]=useState("")
  const navigate = useNavigate();
  const { folderName } = useParams();
  const courseID = useParams().courseID;

  useEffect(() => {
    if (!user || !enrolled) {
      navigate('/');
    }
  }, [user, enrolled, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [courseID]);

  const handleItemClick = (cour) => {
    setCourseTitle(cour.key.split('/')[2].split('.')[0]+ cour.key.split('/')[2].split('.')[1])
    setCourseUrl(cour.url);
  };

  const filtered = data.filter(cour => cour.key.split('/')[1] === folderName);
   const uniqueFolder= filtered.sort((a, b) => a.key.split('/')[2].split('.')[0]-b.key.split('/')[2].split('.')[0])
   console.log(uniqueFolder)
  return (
    <div className='pt-16 flex flex-row flex-wrap'>

      <div className='w-3/4' >
        <ReactPlayer
          url={courseUrl}
          width="100%"
          height="600px"
          controls
          autoPlay
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        />
        <h1 className="font-bold p-2">{courseTitle}</h1>
      </div>
    <ul className='flex flex-col'>
        {uniqueFolder.map((cour, index) => {
          const a=cour.key.split('/')[2].split('.')
          if(a.includes("mp4")){
          return(
          <li  key={index} className='shadow my-1 p-1 text-sm hover:bg-blue-600  hover:text-white h-10 min-w-96 flex items-center cursor-pointer' onClick={() => handleItemClick(cour)}>
           <p className="p-1 mr-1 rounded-3xl text-center text-md bg-slate-300 w-8 h-8"></p> {cour.key.split('/')[2].split('.')[0]}{cour.key.split('/')[2].split('.')[1]}
        )}})}
  </ul>
    </div>
  );
};

export default SubfolderList;
