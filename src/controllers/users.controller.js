const pool = require('../config/db.js'); // Make sure the db.js file exists
const { body, query, param, validationResult } = require('express-validator');
const { errorHandler } = require('../middelware/errorHandler.js');
const bcrypt  = require('bcryptjs');



async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    errorHandler(err);
  }
}




async function fetchUsers(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { role, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM users';
  const queryParams = [];

  if (role) {
    query += ' WHERE role = ?';
    queryParams.push(role);
  }

  query += ' LIMIT ? OFFSET ?';
  queryParams.push(parseInt(limit), parseInt(offset));

  try {
    const [rows] = await pool.query(query, queryParams);
    res.json({ page, limit, users: rows });
  } catch (err) {
    errorHandler(err);
  }
}





async function deleteUsers(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    // Delete the user from the database
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    errorHandler(err);
  }
}


async function getAllUsers(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    errorHandler(err); // Pass error to centralized error handler
  }
}


module.exports = {
  getAllUsers,
  deleteUsers,
  fetchUsers,
  createUser
}