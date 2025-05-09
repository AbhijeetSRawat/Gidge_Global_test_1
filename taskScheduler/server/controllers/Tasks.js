/* eslint-disable no-undef */
const Task = require("../models/task")
const Project = require("../models/project")

// CREATE a new Task
exports.createTask = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { title, description, status, projectId } = req.body

    // Validate the input
    if (!title || !description|| !status || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      })
    }

    // Create a new Task with the given name
    const newTask = await Task.create({  title, description, status, })

    // Add the new Task to the Project's content array
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          tasks: newTask._id,
        },
      },
      { new: true }
    )
      .exec()

    // Return the updated Project object in the response
    res.status(200).json({
      success: true,
      message: "Task created successfully",
      newTask,
      updatedProject,
    })
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// UPDATE a Task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, taskId } = req.body;
    
    // Validate taskId
    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required"
      });
    }

    // Create update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData, // Combined all updates in one object
      { new: true, runValidators: true } // Returns updated doc and runs schema validations
    );

    // Check if task was found and updated
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    });

  } catch (error) {
    console.error("Error updating Task:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE a Task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId, projectId } = req.body; 

    // Validate required fields
    if (!taskId || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Both taskId and projectId are required",
      });
    }

    // Remove task reference from project first
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { tasks: taskId } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: {
        deletedTask,
        updatedProject 
      },
    });

  } catch (error) {
    console.error("Error deleting Task:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get task details
exports.getTaskDetails = async ( req,res)=>{
    try{
        const { taskId } = req.body;

        const taskDetails = await Task.findOne({
                   _id: taskId,
                });
        
                return res.status(200).json({
                          success: true,
                          data: taskDetails,
                         })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


