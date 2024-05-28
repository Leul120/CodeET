import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';

const FolderList = () => {
  const [data, setData] = useState([]);
  const { user, enrolled } = useContext(AppContext);
  const navigate = useNavigate();
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

  const uniqueFolders = Array.from(new Set(data.map(cour => cour.key.split('/')[1])));

  return (
    <div className='pt-16'>
      <ul>
        {uniqueFolders.map((folder, index) => (
          <li key={index} className='border border-blue-700 my-1 hover:bg-blue-600 rounded-lg h-10 hover:text-white flex items-center cursor-pointer' onClick={() => navigate(`/subfolder/${folder}`)}>
            {folder}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
