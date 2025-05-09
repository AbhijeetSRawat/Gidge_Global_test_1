/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const {
    login,
    signup,
    sendotp,
    getUserDetails,
  } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

  

  // Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

router.get("/getuserdetails", auth,getUserDetails)

module.exports = router;