/* eslint-disable no-undef */
const express = require("express")
const router = express.Router()

const {
    createTask,
    updateTask,
    deleteTask,
    getTaskDetails,
   
} = require("../controllers/Tasks");

const { auth } = require("../middlewares/auth")

router.post("/createTask",auth,createTask);
router.post("/updateTask",auth,updateTask)
router.post("/deleteTask",deleteTask);
router.get("/getTaskDetails",getTaskDetails)


module.exports = router;
