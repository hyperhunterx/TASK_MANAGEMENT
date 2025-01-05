const { register, login } = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

// Route for user registration
router.route('/register').post(register);
router.route('/login').post(login);



module.exports = router;
