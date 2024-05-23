// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const MyComponent = () => {
//   const [data, setData] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const token=window.localStorage.getItem('token')
//    const courseID=useParams()
//   useEffect(() => {
//     // Fetch the JSON data from an API or file
//     const fetchData = async () => {
//       const response = await axios.get(`http://localhost:8000/api/${courseID}`,{withCredentials: true,
//       headers:{
//         Authorization:`Bearer ${token}`
//       }}
//     )
//       const jsonData = await response.json();
//       setData(jsonData);
//     };
//     fetchData();
//   }, []);

//   const handleFolderClick = (folder) => {
//     setSelectedFile(folder);
//   };

//   const renderFolderOrFile = (item) => {
//     if (typeof item === 'object') {
//       return (
//         <div>
//           <div onClick={() => handleFolderClick(item)}>
//             {Object.keys(item)[0]}
//           </div>
//           {selectedFile === item && (
//             <div>
//               {Object.values(item)[0].map((subItem) =>
//                 renderFolderOrFile(subItem)
//               )}
//             </div>
//           )}
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <video controls>
//             <source src={item} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       );
//     }
//   };

//   return (
//     <div>
//       {data ? (
//         renderFolderOrFile(data)
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default MyComponent;