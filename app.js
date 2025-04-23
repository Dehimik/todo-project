const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/tasks', tasksRouter);
app.get('/', (req, res) => res.redirect('/tasks'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});