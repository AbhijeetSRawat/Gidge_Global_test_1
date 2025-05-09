import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSLice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
})

export default rootReducer