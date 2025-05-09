import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authAPI';

const Navbar = () => {

  const {user} = useSelector((state)=>state.profile );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='w-[100vw] h-[7vh] flex justify-between items-center bg-slate-900'>
      <div className='text-xl font-semibold ml-5'>
        Task Scheduler
      </div>

      <div>
        {
          (user)?(<button className='h-[6vh] w-[15vw] bg-blue-700 rounded-xl mr-5' onClick={()=>dispatch(logout(navigate))}>Logout</button>):(<div>
            <button className='h-[6vh] w-[10vw] bg-blue-700 rounded-xl ml-5' onClick={()=>navigate("/login")}>LogIn</button>
            <button className='h-[6vh] w-[10vw] bg-blue-700 rounded-xl m-5' onClick={()=>navigate("/signup")}>SignUp</button>
          </div>)
        }
      </div>
    </div>
  )
}

export default Navbar
