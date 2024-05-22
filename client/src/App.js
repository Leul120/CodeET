
// import axios from 'axios';
// import './App.css';
// import { useEffect, useState } from 'react';
// import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
// import Home from './Home';
// import Navbar from './Navbar';
// import { createContext } from 'react';
// import SingleCourse from './SingleCourse';
// import { QueryClient,QueryClientProvider,useQuery } from 'react-query';
// import WatchingPage from './WatchingPage';

// export const AppContext=createContext()

// function App() {
//   const client=new QueryClient({})
//   const [text,setText]=useState("")
//   const [courses,setCourses]=useState([])
//   // async function fetchData() {
//   //   try {
//   //     const response = await axios.get('http://localhost:8000/api/course');
//   //     // console.log(response.data.courses);
      
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // }
//   // useEffect(()=>{
//   //   fetchData();
//   // },[])
//   const { data, isLoading, isFetched, error, refetch } = useQuery('courses', {
//     queryFn: async () => {
//       const res = await axios.get('http://localhost:8000/api/course');
//       setCourses(res.data.courses)
//       return res.data.courses

//     },
//     enabled: true // Fetch data only when needed
//   });
//   console.log(courses)
//   return (
//     <div className="App">
//      <AppContext.Provider value={{courses,text,setText}}>
//      <QueryClientProvider client={client}>
//       <Router>
//       <Navbar/>
//         <Routes>
//           <Route path='/' element={<Home/>}/>
//           <Route path='/course/:courseID' element={<SingleCourse/>}/>
//           <Route path='course/watch' element={<WatchingPage/>}/>
//         </Routes>
//       </Router>
//       </QueryClientProvider>
//      </AppContext.Provider >

//     </div>
//   );
// }

// export default App;

import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import { createContext } from 'react';
import SingleCourse from './SingleCourse';
import { QueryClient, QueryClientProvider } from 'react-query';
import WatchingPage from './WatchingPage';
import Signup from './Signup';
import Chatai from './Chatai';
import ForgetPassword from './ForgetPassword';
import Login from './Login';
import Payment from './Payment';
import Dashboard from './Dashboard';


export const AppContext = createContext();

function App() {
  const [count,setCount]=useState("w-full sm:hidden inline-block hidden")
  const client = new QueryClient({});
  let [text, setText] = useState('');
  let [courses, setCourses] = useState([]);
  let [page,setPage]=useState(1)
  let [tokens,setTokens]=useState("")
  let [refetcher,setRefetcher]=useState(false)
  let [name,setName]=useState("Sign Up")
  let [user,setUser]=useState()
  const [enrolled, setEnrolled] = useState(false);
  const [course, setCourse] = useState({});
  const [isLoading,setIsLoading]=useState(true)
  const [sort,setSort]=useState("-Released")
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{ courses, text, setText ,setCourses,count,setCount,page,setPage,isLoading,setIsLoading,tokens,setTokens,name,setName,user,setUser,enrolled,setEnrolled,course,setCourse,refetcher,setRefetcher,setSort,sort}}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path="/course/:courseID" element={<SingleCourse />} />
              <Route path='/forget-password' element={<ForgetPassword/>}/>
              <Route path='/ai' element={<Chatai/>}/>
              <Route path="/course/watch/:courseID" element={<WatchingPage />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/pay/:courseID/:userID' element={<Payment/>}/>
              <Route path='dashboard'
 element={<Dashboard/>}/>            </Routes>
            
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;