// const bcrypt = require('bcryptjs');
const pool  = require ('../config/db.js');  
const bcrypt  = require('bcryptjs');
const { errorHandler } = require('../middelware/errorHandler.js');
const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library




async function register(req, res, next) {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.json({ id: result.insertId, name, email, role });
  } catch (err) {
    next(err); // Pass error to centralized error handler
  }
}



async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a JWT token with user details and role
    const token = jwt.sign(
      { userId: user.user_id, name: user.name, role: user.role },  // Payload
      process.env.JWT_SECRET,  // Secret key
      { expiresIn: '1h' }  // Token expiration (1 hour)
    );


    // Send the token back to the client
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }).json({ message: 'Login successful', token });
  } catch (err) {
    errorHandler(err);
  }
}

module.exports = {
  register,login
}