/* eslint-disable no-undef */
const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        status: {
            type: String,
            enum: ["Created", "Completed"],
            default:"Created",
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now, 
            immutable: true 
          },
          completedAt: {
            type: Date,
            required: function() {
              return this.status === 'Completed'; 
            }
          }
    },
    { 
        timestamps: true 
      }
)

module.exports = mongoose.model("Task", taskSchema)

