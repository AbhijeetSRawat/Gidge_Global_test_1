import { Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Sendotp from "./pages/sendotp"

import { useEffect } from "react"


function App() {
  
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="text-white bg-blue-500">

        

          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/sendotp" element={<Sendotp/>} />
            <Route path="*" element={<div> Page Not Found </div>} />
          </Routes>
        
    </div>
  )
}

export default App
