const pool = require('../config/db.js'); 
const { body, query, param, validationResult } = require('express-validator');
const { errorHandler } = require('../middelware/errorHandler.js');




async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'UPDATE projects SET status = "inactive" WHERE project_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project soft-deleted successfully' });
  } catch (err) {
    errorHandler(err);
  }
}


 async function updateProject(req, res) {
  const { id } = req.params;
  const { name, description, status } = req.body;

  console.log({name,description,status});

  try {
    const [result] = await pool.query(
      'UPDATE projects SET name = ?, description = ?, status = ? WHERE project_id = ?',
      [name, description, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    errorHandler(err);
  }
}


async function getAllProjects(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    errorHandler(err); // Pass error to centralized error handler
  }
}



async function getProjects(req, res) {
  const { page = 1, limit = 10, search, status } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Base query
    let query = 'SELECT * FROM projects';
    const queryParams = [];

    // Add WHERE conditions dynamically
    const conditions = [];

    // Add status condition
    if (status) {
      conditions.push('status = ?');
      queryParams.push(status);
    } else {
      conditions.push('status IN ("active", "inactive")'); // Default status filter
    }

    // Add search condition
    if (search) {
      conditions.push('LOWER(name) LIKE LOWER(?)');
      queryParams.push(`%${search}%`);
    }

    // Append conditions to the query
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Add pagination
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));

    // Execute the query to fetch projects
    const [projects] = await pool.query(query, queryParams);

    // Count total projects for pagination
    const [totalCount] = await pool.query(
      `SELECT COUNT(*) as total FROM projects WHERE ${conditions.join(' AND ')}`,
      queryParams.slice(0, conditions.length) // Use the same conditions as above
    );
    const totalProjects = totalCount[0].total;

    // Return the projects along with pagination data
    res.json({
      projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProjects / limit),
        totalProjects,
      },
    });
  } catch (err) {
    errorHandler(err);
  }
}



 async function createProject(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {
    // Insert the new project into the database
    const [result] = await pool.query(
      'INSERT INTO projects (name, description) VALUES (?, ?)',
      [name, description]
    );

    res.status(201).json({
      message: 'Project created successfully',
      projectId: result.insertId
    });
  } catch (err) {
    errorHandler(err); // Pass error to centralized error handler
  }
}


module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getAllProjects
 }