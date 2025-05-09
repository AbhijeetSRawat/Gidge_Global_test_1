/* eslint-disable no-undef */
const Project = require('../models/project');

const User =require('../models/user')

exports.createProject= async (req,res)=>{
    try{
        //get user Id
        const userID=req.user.id;

        const user = User.findById(userID);

        if (user.projects && user.projects.length >= 4) {
          return res.status(400).json({
              success: false,
              message: "Maximum project limit reached (4 projects allowed)",
              error: {
                  code: "PROJECT_LIMIT_EXCEEDED",
                  maxAllowed: 4,
                  currentCount: user.projects.length
              }
          });
      }

        //get all requires fields
        let{
            name
        }=req.body

        if(!name){
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
              })
        }

        //create project
        const newProject=await Project.create({
            name,
        })

        await User.findByIdAndUpdate(
            {
              _id: userID,
            },
            {
              $push: {
                projects: newProject._id,
              },
            },
            { new: true }
          )

          res.status(200).json({
            success: true,
            data: newProject,
            message: "Project Created Successfully",
          })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
        success: false,
        message: "Failed to create project",
        error: error.message,
        })
    }
}

exports.getAllProjects = async (req,res) =>{
  try{

      const {projectId}=req.body();

      const ProjectDetails = await Project.findById(projectId).populate('tasks').exec();

      return res.status(200).json({
        success:true,
        message:"project are fetched",
        data:ProjectDetails
      })
  }
  catch(error){
      return res.status(403).json({
        success:false,
        message:error.message
      })
  }
}