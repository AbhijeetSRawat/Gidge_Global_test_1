const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  GETUSERDETAILS_API : BASE_URL + "/auth/getuserdetails"
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_PROJECT_API: BASE_URL + "/project/getAllProject",  
  CREATE_PROJECT_API: BASE_URL + "/project/createProject",
  
}

//TASK ENDPOINTS
export const taskEndpoints = {
    GET_TASK_DETAILS_API: BASE_URL + "/task/getTaskDetails",  
    CREATE_TASK_API: BASE_URL + "/task/createTask",
    UPDATE_TASK_API: BASE_URL + "/task/updateTask",
    DELETE_TASK_API: BASE_URL + "/task/deleteTask",
    
  }







