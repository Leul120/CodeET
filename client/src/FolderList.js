import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';
import { LoadingOutlined } from '@ant-design/icons';

const FolderList = () => {
  const [data, setData] = useState([]);
  const { user, enrolled,isLoading,setIsLoading } = useContext(AppContext);

  const navigate = useNavigate();
  const courseID = "nnn";

  useEffect(() => {
    if (!user || !enrolled) {
      navigate('/');
    }
  }, [user, enrolled, navigate]);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/course/get-course/${courseID}`);
        setData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [courseID]);

  const uniqueFolders = Array.from(new Set(data.map(cour => cour.key.split('/')[1])));

  return (<>
    {isLoading && (<div className='h-screen flex justify-center items-center text-4xl'><LoadingOutlined spinning allowFullScreen size="large" style={{color:"black",font:50}}/></div>)}
    {!isLoading && (<div className='pt-16'>
      <ul className='bg-slate-100'>
        {uniqueFolders.map((folder, index) => (
          <li key={index} className=' shadow my-1 hover:bg-blue-600  h-10 pl-1 hover:text-white flex items-center cursor-pointer' onClick={() => navigate(`/subfolder/${folder}`)}>
           <p className='p-1 mr-1 rounded-3xl text-center bg-slate-300 w-8 h-8'>{folder.split('.')[0]}</p> {folder.split('.')[1]}
          </li>
        ))}
      </ul>
    </div>)}
    </>
  );
};

export default FolderList;
