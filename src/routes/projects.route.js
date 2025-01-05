const { deleteProject, updateProject, getProjects, createProject, getAllProjects } = require("../controllers/projects.controller");
const { verifyToken } = require("../middelware/authMiddleware");
const { checkRole } = require("../middelware/roleMiddleware");
const { body } = require('express-validator');

const express = require("express");
const router = express.Router();

router.route('/').get(verifyToken, getProjects);
router.route('/:id').put(verifyToken, checkRole('Admin'), updateProject);
router.route('/:id').delete(verifyToken, checkRole('Admin'), deleteProject);

router.route('/').post(verifyToken, checkRole('Admin'), [
  body('name').isLength({ min: 3 }).withMessage('Project name must be at least 3 characters long.'),
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long.')
], createProject);

router.route('/get-all-projects').get(getAllProjects);

module.exports = router;



