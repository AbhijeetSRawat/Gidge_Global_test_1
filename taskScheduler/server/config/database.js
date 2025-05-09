/* eslint-disable no-undef */
const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch((error)=>{
        console.log("Error in connecting the DB");
        console.log(error);
    })
}

module.exports=dbConnect;
