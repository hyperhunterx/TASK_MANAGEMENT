const { createUser, fetchUsers, deleteUsers, getAllUsers } = require("../controllers/users.controller");
const { verifyToken } = require("../middelware/authMiddleware");
const { checkRole } = require("../middelware/roleMiddleware.js");
const { body, query, param, validationResult } = require('express-validator');

const express = require("express");
const router = express.Router();


// Create a new user (Admin-only)
// app.post(
//   '/',
//   verifyToken,
//   checkRole('Admin'),
//   [
//     body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
//     body('email').isEmail().withMessage('Invalid email format.'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
//     body('role').isIn(['Admin', 'User']).withMessage('Role must be either Admin or User'),
//   ],
//   createUser
// );

router.route('/').post(verifyToken,
  checkRole('Admin'), [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('role').isIn(['Admin', 'User']).withMessage('Role must be either Admin or User'),
], createUser);



router.route('/').get(verifyToken,
  checkRole('Admin'), [
  query('role').optional().isIn(['Admin', 'User']).withMessage('Invalid role filter'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
], fetchUsers);


// Get paginated users
// app.get(
//   '/',
//   verifyToken,
//   checkRole('Admin'),
//   [
//     query('role').optional().isIn(['Admin', 'User']).withMessage('Invalid role filter'),
//     query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
//     query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
//   ],
//   fetchUsers
// );




// Delete a user by ID (Admin-only)

// app.delete(
//   '/:id',
//   verifyToken,
//   checkRole('Admin'),
//   [
//     param('id').isInt({ min: 1 }).withMessage('User ID must be a valid positive integer'),
//   ],
//   deleteUsers
// );

router.route('/:id').delete(verifyToken,
  checkRole('Admin'), [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a valid positive integer'),
], deleteUsers);



router.route('/get-all-users').get(getAllUsers);

// app.get('/get-all-users', getAllUsers);


module.exports = router;
