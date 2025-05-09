/* eslint-disable no-undef */
const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema(
    {
        
        name:{
            type:String,
            required:true,
        },
        
        tasks:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Task",
            },
          ],
    }
)

module.exports = mongoose.model("Project", projectSchema)

