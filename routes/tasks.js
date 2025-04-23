const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.render('index', { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.create(title, description);
        res.redirect('/tasks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        await Task.updateStatus(id, completed);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.delete(id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;