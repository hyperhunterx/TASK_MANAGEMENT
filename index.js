const express = require("express");
const db = require("./src/config/db.js"); // Import the database connection
const app = require("./src/app");  // Import the app from app.js
require('dotenv').config();


const PORT = 6000;


// Start the server
app.listen(PORT, () => {
  console.log("SERVER IS LISTENING AT:", PORT);
});

