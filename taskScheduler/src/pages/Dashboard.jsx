import React, { useEffect, useState } from 'react'
import { getuserdetails } from '../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/profileSlice';

const Dashboard = () => {

  const [loading,setLoading] =useState(true);

  const [userData, setUserData] = useState(null); // Initialize as null
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        

        console.log("Before fetch - Token:", token); // Check token
        const data = await getuserdetails(token);
        dispatch(setUser(token));
        console.log("Fetched data:", data); // Verify data structure
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setUserData(null);
        setLoading(false);
      }
    };
  
    if (token) {
    fetchUserData();
    
  }
  }, [token]); 

  return (
    <div>
      {(loading) ? (
      <div className='spinner'>
      </div>
    ):(
      <div className='bg-blue-500 w-full min-h-[100vh] text-white p-10 flex-flex-col'>

      
      <div className='text-2xl flex gap-3'>Name of the User : <div className='text-black my-2'>{userData.name}</div></div>
      <div className='text-2xl flex gap-3'>Email of the User : <div className='text-black my-2'>{userData.email}</div></div>
      <div className='text-2xl flex gap-3'>Country of the User : <div className='text-black my-2'>{userData.country}</div></div>
      
      <div className='text-slate-800 text-3xl my-3'>Projects:</div>
      <div>{
          userData.projects.map((project)=>(
            (<div className='bg-slate-600  w-[30vw] min-h-[7vh] rounded-xl flex items-center p-3'>
                - {project.name}
            </div>)
          ))
        }</div>

    </div>
    )}
    </div>
  )
}

export default Dashboard
