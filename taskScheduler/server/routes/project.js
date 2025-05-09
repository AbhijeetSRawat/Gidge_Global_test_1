/* eslint-disable no-undef */
// Import the required modules
const express = require("express")
const router = express.Router()

const {createProject, getAllProjects} = require('../controllers/Project');

const { auth } = require("../middlewares/auth")

router.post("/createProject",auth,createProject)
router.get("/getAllProjects",getAllProjects)

module.exports=router;