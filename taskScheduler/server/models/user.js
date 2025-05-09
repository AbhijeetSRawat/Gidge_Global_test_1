/* eslint-disable no-undef */
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        token: {
            type: String,
          },
        projects:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Project",
            },
          ],
    }
)

module.exports = mongoose.model("User", userSchema)

