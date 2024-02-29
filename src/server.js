// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
// const PORT = 3306;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskmulti',
});
console.log(db)
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks from MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/tasks', (req, res) => {
  const newTask = { text: req.body.text };
  db.query('INSERT INTO tasks SET ?', newTask, (err, result) => {
    if (err) {
      console.error('Error adding task to MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      newTask.id = result.insertId;
      res.json(newTask);
    }
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', taskId, (err) => {
    if (err) {
      console.error('Error deleting task from MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = { text: req.body.text };
  db.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, taskId], (err) => {
    if (err) {
      console.error('Error updating task in MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(updatedTask);
    }
  });
});

app.listen(8081, ()=>{
  console.log("Listening on port 8081");
})
