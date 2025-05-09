/* eslint-disable no-undef */
// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task")
const dbConnect = require("./config/database");

const cors = require("cors");

const dotenv = require("dotenv");
const { auth } = require("./middlewares/auth");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
dbConnect();
 
// Middlewares
app.use(express.json());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);


// Setting up routes
app.use("/api/v1/auth",  userRoutes);
app.use("/api/v1/project",auth , projectRoutes);
app.use("/api/v1/task", auth ,taskRoutes);


// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
