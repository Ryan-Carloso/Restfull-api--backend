const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

let tasks = [
  { id: 1, title: 'First Task', completed: false },
  { id: 2, title: 'Second Task', completed: true },
];

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);