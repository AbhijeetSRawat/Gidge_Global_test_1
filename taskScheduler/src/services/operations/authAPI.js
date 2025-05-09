import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  GETUSERDETAILS_API
} = endpoints



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/sendotp")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  name,
  email,
  password,
  confirmPassword,
  country,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
        country,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/dashboard")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export const getuserdetails = async (token) => {
    const toastId = toast.loading("Loading user details...");
    
    try {
      // Validate token exists
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      // Make API request
      const response = await apiConnector(
        "GET", 
        GETUSERDETAILS_API,
        null, // No body for GET request
        {
          Authorization: `Bearer ${token}`
        }
      );
  
      // Validate response structure
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch user details");
      }
  
      // Return data on success
      toast.success("User details loaded successfully");
    
      return response.data.data;
  
    } catch (error) {
      console.error("GET_USER_DETAILS_API ERROR:", error);
      
      // More specific error messages
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to load user details";
      
      toast.error(errorMessage);
      return null; // Explicitly return null on failure
  
    } finally {
      toast.dismiss(toastId);
    }
  };

  export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}