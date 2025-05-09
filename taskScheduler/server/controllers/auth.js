/* eslint-disable no-undef */
const User = require("../models/user");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")

require("dotenv").config();

exports.signup= async(req,res)=>{
    try{

        // get data from the body

        const{
            name,
            email,
            password,
            confirmPassword,
            country,
            otp
        }=req.body

      

        //check if anything missing
        if(!name ||
            !email ||
            !password ||
            !confirmPassword ||
            !country ||
            !otp){
                return res.status(403).json({
                    success:false,
                    message:'All fields are required',
                })
            }
            
            console.log(name,
              email,
              password,
              confirmPassword,
              country,
              otp)

            //check if passwords match?
            if(password != confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Password and confirmPassword do not match"
                })
            }

            //check whether the user alredy exists or not
            const existingUser = await User.findOne({email})

            if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User already eists"
                })
            }

            //find most recent otp
            const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

            if (response.length === 0) {
                // OTP not found for the email
                return res.status(400).json({
                  success: false,
                  message: "The OTP is not valid",
                })
              } else if (otp !== response[0].otp) {
                // Invalid OTP
                return res.status(400).json({
                  success: false,
                  message: "The OTP is not valid",
                })
              }
              
              // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10)

            // create the user
            const user = await User.create({
                name,
                email,
                password:hashedPassword,
                country,
            })

            return res.status(200).json({
                success: true,
                user,
                message: "User registered successfully",
              })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        })
    }
}

exports.login = async(req,res)=>{
    try{

        // Get email and password from request body
    const { email, password } = req.body

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    const user = await User.findOne({ email })

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
        const currentDate = new Date(); // Current date and time
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            createdAt: currentDate.toISOString(), // Add current date in ISO format
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h", 
          }
        );
        // Save token to user document in database
        
        user.token = token
        user.password = undefined

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Generated token payload:", decoded);

        res.status(200).json({
          success:true,
          data:user,
          message:"Logged in successfully",
          token:token
        })
    }
    else{
        return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
        })
    }

    }
    catch(error){
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
        })
    }
}

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body
  
      // Check if user is already present
      // Find user with provided email
      const checkUserPresent = await User.findOne({ email })
      // to be used in case of signup
  
      // If user found with provided email
      if (checkUserPresent) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        })
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })

      let result = await OTP.findOne({ otp: otp })

      console.log("OTP", otp)
      console.log("Result", result)

      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTP.findOne({ otp: otp }); // Re-check DB
      }

      const otpPayload = { email, otp }

      const otpBody = await OTP.create(otpPayload)

      console.log("OTP Body", otpBody)
      
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
}

exports.getUserDetails = async(req,res)=>{
    try{
      const userID=req.user.id;
    
      const user = await User.findById(userID).populate({
        path: "projects",
        populate: {
          path: "tasks",
        },
      }).exec();
  
      res.status(200).json({
        success:true,
        data:user
      })
    }
    catch(error){
        res.status(404).json({
          success:false,
          error:error.message
        })
    }
}

