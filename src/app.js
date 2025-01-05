const express = require('express');
const pool = require('./config/db.js'); // Make sure the db.js file exists
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { body, query, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library
const { errorHandler } = require('./middelware/errorHandler.js');
const app = express();

//routes
const authRoutes = require("./routes/auth.route");
const projectsRoutes = require("./routes/projects.route");
const tasksRoutes = require("./routes/tasks.route");
const usersRoutes = require("./routes/users.route");




app.use(express.json());
app.use(cookieParser())
app.use(errorHandler);


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/projects",projectsRoutes)
app.use("/api/v1/tasks",tasksRoutes)
app.use("/api/v1/users",usersRoutes)




// Route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

module.exports = app;
