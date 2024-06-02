import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';
import ReactPlayer from 'react-player';

const SubfolderList = () => {
  const [data, setData] = useState([]);
  const [courseUrl, setCourseUrl] = useState("");
  const { user, enrolled } = useContext(AppContext);
  const navigate = useNavigate();
  const { folderName } = useParams();
  const courseID = "nnn";

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
    setCourseUrl(cour.url);
  };

  const filtered = data.filter(cour => cour.key.split('/')[1] === folderName);

  return (
    <div className='pt-10'>
      <button onClick={() => navigate(-1)}>Back</button>
      <div className='' >
        <ReactPlayer
          url={courseUrl}
          width="100%"
          height="75%"
          controls
          AutoPlay
          style={{height:"10rem"}}
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        />
      </div>
      <ul className=''>
        {filtered.map((cour, index) => (
          <li key={index} className='shadow my-1 hover:bg-blue-600  hover:text-white h-10 flex items-center cursor-pointer' onClick={() => handleItemClick(cour)}>
            {cour.key.split('/')[2]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubfolderList;
