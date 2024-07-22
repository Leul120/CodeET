
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './App';
import './popular.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import errorPic from './error.avif';
import { LoadingOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { setUser, isLoading, setIsLoading, setMenu } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const storedUser = JSON.parse(window.localStorage.getItem('user'));
  const userID = storedUser?._id;
  const token = atob(window.localStorage.getItem('token'));

  useEffect(() => {
    setMenu('Dashboard');
  }, [setMenu]);

  useEffect(() => {
    setUser(storedUser);
  }, [setUser, storedUser]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/dashboard/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="p-2">
        <Skeleton
          className="h-48 w-full rounded-xl"
          baseColor="#303030"
          highlightColor="#525252"
        />
        <Skeleton
          className="h-6 w-3/4 mt-2 rounded-lg"
          baseColor="#303030"
          highlightColor="#525252"
        />
        <Skeleton
          className="h-6 w-1/2 mt-2 rounded-lg"
          baseColor="#303030"
          highlightColor="#525252"
        />
      </div>
    ));
  };

  const renderCourses = () => {
    return courses.map((course) => {
      const date = course.Released.slice(0, 4);
      return (
        <Link
          to={`/course/${course._id}`}
          key={course._id}
          className="flex flex-col items-start p-4 backdrop-blur-md bg-white/20 rounded-xl transition transform hover:scale-105 hover:shadow-lg"
        >
          <img
            alt={course.Title}
            src={course.Poster}
            className="h-48 w-full rounded-xl object-cover mb-4"
            loading="lazy"
          />
          <p className="text-white font-bold text-lg overflow-hidden truncate w-full">
            {course.Title}
          </p>
          <p className="text-white text-sm">Released: {date}</p>
          <p className="text-white text-sm">Rating: {course.Rating}</p>
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 pt-16">
      {!error ? (
        <div className="min-h-screen">
          {storedUser ? (
            <div className="flex flex-col items-center min-h-screen">
              <h1 className="text-white text-4xl font-bold mb-8">
                Bought Courses
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {isLoading ? (
                  renderSkeletons()
                ) : courses.length > 0 ? (
                  renderCourses()
                ) : (
                  <p className="text-white text-lg col-span-full text-center">
                    No courses bought yet.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-gray-400 text-center text-2xl mt-16">
              You Haven't Logged In
            </h1>
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <img src={errorPic} alt="Error" className="w-1/2 h-auto" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
