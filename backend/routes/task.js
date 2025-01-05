const express = require('express');
const { authenticateUser, isTeacher } = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// Teacher posts a task
router.post('/', authenticateUser, isTeacher, async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            teacher: req.user._id,
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully.', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tasks (accessible to all roles)
router.get('/', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find().populate('teacher', 'name');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
