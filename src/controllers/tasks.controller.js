 const { body, query, param, validationResult } = require('express-validator');
 const pool = require('../config/db.js');  
 const {sendEmail} = require('../utils/mail.js');  
 const { errorHandler } = require('../middelware/errorHandler.js');






async function deleteTasks(req, res) {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE task_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        errorHandler(err);
    }
}


async function updateTasks(req, res) {
    const { id } = req.params;
    const { project_id, assigned_to, title, description, status, due_date } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE tasks SET project_id = ?, assigned_to = ?, title = ?, description = ?, status = ?, due_date = ? WHERE task_id = ?',
            [project_id, assigned_to, title, description, status, due_date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        errorHandler(err);
    }
}


async function getTasks(req, res) {
    const { page = 1, limit = 10, status, due_date, assigned_to } = req.query;
    const offset = (page - 1) * limit;

    try {
        let query = 'SELECT * FROM tasks';
        const queryParams = [];

        // Add filters for status, due_date, and assigned_to
        if (status) {
            query += ' WHERE status = ?';
            queryParams.push(status);
        }

        if (due_date) {
            query += queryParams.length > 0 ? ' AND due_date = ?' : ' WHERE due_date = ?';
            queryParams.push(due_date);
        }

        if (assigned_to) {
            query += queryParams.length > 0 ? ' AND assigned_to = ?' : ' WHERE assigned_to = ?';
            queryParams.push(assigned_to);
        }

        // Add pagination
        query += ' LIMIT ? OFFSET ?';
        queryParams.push(parseInt(limit), parseInt(offset));

        const [tasks] = await pool.query(query, queryParams);

        // Count total tasks for pagination
        const [totalCount] = await pool.query('SELECT COUNT(*) as total FROM tasks');
        const totalTasks = totalCount[0].total;

        res.json({
            tasks,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalTasks / limit),
                totalTasks,
            },
        });
    } catch (err) {
        errorHandler(err);
    }
}


async function createTask(req, res, next) {
    const { project_id, assigned_to, title, description, status = 'Pending', due_date } = req.body;

    try {
        // Check if the project exists
        const [project] = await pool.query('SELECT * FROM projects WHERE project_id = ?', [project_id]);
        if (project.length === 0) {
            return res.status(400).json({ error: 'Project not found' });
        }

        // Check if the user exists
        const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [assigned_to]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Insert task into the database
        const [result] = await pool.query(
            'INSERT INTO tasks (project_id, assigned_to, title, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)',
            [project_id, assigned_to, title, description, status, due_date]
        );

        // Send email notification to the assigned user
        const emailSubject = `New Task Assigned: ${title}`;
        const emailBody = `Hello ${user[0].name},\n\nYou have been assigned a new task:\n\nTitle: ${title}\nDescription: ${description}\nDue Date: ${due_date}\n\nPlease check your task management system for more details.`;
        await sendEmail(user[0].email, emailSubject, emailBody);

        res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
    } catch (err) {
        errorHandler(err);
    }
}

 async function getAllTasks(req, res, next) {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (err) {
        errorHandler(err); // Pass error to centralized error handler
    }
}



module.exports = {
    getAllTasks,
    createTask,
    updateTasks,
    getTasks,
    deleteTasks
  }