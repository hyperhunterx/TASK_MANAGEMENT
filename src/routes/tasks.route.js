const { deleteTasks, updateTasks, getTasks, createTask, getAllTasks } = require("../controllers/tasks.controller");
const { verifyToken } = require("../middelware/authMiddleware");
const { checkRole } = require("../middelware/roleMiddleware");

const express = require("express");
const router = express.Router();

// app.post('/', verifyToken, checkRole('Admin'), createTask);
router.route('/').post(verifyToken, checkRole('Admin'),createTask);


// app.get('/', verifyToken, getTasks);
router.route('/').get(verifyToken ,getTasks);

router.route('/:id').put(verifyToken, checkRole('Admin') ,updateTasks);
// app.put('/:id', verifyToken, checkRole('Admin'), updateTasks);

// app.delete('/:id', verifyToken, checkRole('Admin'), deleteTasks);
router.route('/:id').delete(verifyToken, checkRole('Admin') ,deleteTasks);

router.route('/get-all-tasks').get(getAllTasks);


module.exports = router;
