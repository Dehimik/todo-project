const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.render('index', { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new tsk
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.create(title, description);
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to create a task');
    }
});

// Mark task as completed or not
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await Task.updateStatus(id, completed);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to mark a task');
    }
});

// Edit task title and description
router.put('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedTask = await Task.updateTask(id, title, description);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.delete(id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete a task');
    }
});

module.exports = router;