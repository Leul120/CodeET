
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import { createContext } from 'react';
import SingleCourse from './SingleCourse';
import { QueryClient, QueryClientProvider } from 'react-query';
import Signup from './Signup';
import Chatai from './Chatai';
import ForgetPassword from './ForgetPassword';
import Login from './Login';
import Payment from './Payment';
import Dashboard from './Dashboard';
import FolderList from './FolderList';
import SubfolderList from './SubfolderList';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import ContactUs from './ContactUs';


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
  const [menu,setMenu]=useState('home')
  const [email,setEmail]=useState("")
  const [newID,setNewID]=useState("")
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{ courses, text, setText ,setCourses,count,setCount,page,setPage,isLoading,setIsLoading,tokens,setTokens,name,setName,user,setUser,enrolled,setEnrolled,course,setCourse,refetcher,setRefetcher,setSort,sort,menu,setMenu,email,setEmail,newID,setNewID}}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/signup' element={<Signup/>}/>
              
        <Route path="/subfolder/:folderName/:courseID" element={<SubfolderList />} />
              <Route path="/course/:courseID" element={<SingleCourse />} />
              <Route path='/forget-password' element={<ForgetPassword/>}/>
              <Route path='/ai' element={<Chatai/>}/>
              <Route path="/course/watch/:courseID" element={<FolderList />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/pay/:courseID/:userID' element={<Payment/>}/>
              <Route path='dashboard' element={<Dashboard/>}/>   
              <Route path='/resetPassword/:resetToken' element={<ResetPassword/>}/>  
              <Route path='verifyEmail/:newID' element={<VerifyEmail/>} />  <Route path='/contact-us'  element={<ContactUs/>}/>     </Routes>
                   
              </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;