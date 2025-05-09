import React from 'react'
import image from '../assets/taskschedulerImage.jpg'
import { Link } from 'react-router-dom'
const Home = () => {

    

  return (
    <div className='bg-black w-[100vw] p-10 '>

        <div className='w-full flex flex-col items-center'>
            <div className='text-6xl text-amber-200 font-semibold my-4'>
                 WELCOME to the Task Scheduler.
            </div>
            <div className='text-amber-500 text-4xl my-2'>
                Here You can schedule all your tasks.
            </div>
        </div>

        <div className='w-full flex justify-center my-10'>
            <img src={image} className='w-[60vw] ' alt="taskscheduler" />
        </div>

        <div className='w-full flex justify-center'>
            <div className='flex flex-col m-10 text-yellow-200 text-3xl' >

                If you want to register? Click here.

                <Link to="/signup" className='w-[160px] bg-yellow-400 h-[50px] flex justify-center items-center text-blue-900 border border-green-300 rounded-3xl mt-6 '>Sign Up</Link>
            </div>

            <div className='flex flex-col m-10 text-yellow-200 text-3xl'>

                Already have an account? Click here.

                <Link to="/login" className='w-[160px] bg-yellow-400 h-[50px] flex justify-center items-center text-blue-900 border border-green-300 rounded-3xl mt-6 ' >Log In</Link>
            </div>
        </div>

        
    </div>
  )
}

export default Home
