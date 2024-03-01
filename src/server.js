// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolisttest',
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

// app.post('/api/tasks', (req, res) => {
//   const newTask = { text: req.body.text };
//   db.query('INSERT INTO tasks SET ?', newTask, (err, result) => {
//     if (err) {
//       console.error('Error adding task to MySQL:', err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       newTask.id = result.insertId;
//       res.json(newTask);
//     }
//   });
// });

app.post('/api/tasks', (req, res) => {
  const { judul, deskripsi, status } = req.body;
  const sql = 'INSERT INTO tasks (judul, deskripsi, status) VALUES (?, ?, ?)';
  db.query(sql, [judul, deskripsi, status], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Tugas ditambahkan');
  });
});

// app.get('/api/tasks', (req, res) => {
//   const sql = 'SELECT * FROM tasks';
//   db.query(sql, (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.json(results);
//   });
// });

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mencoba registrasi' });
    } else {
      if (results.length > 0) {
        res.status(409).json({ message: 'Username sudah terdaftar' });
      } else {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Gagal mendaftar, coba lagi nanti' });
          } else {
            res.status(201).json({ message: 'Registrasi berhasil' });
          }
        });
      }
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mencoba login' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        if (password === user.password) {
          // Jika username dan password cocok, Anda bisa membuat token JWT di sini
          // Kemudian, kirim token sebagai respons
          res.status(200).json({ message: 'Login berhasil' });
        } else {
          res.status(401).json({ message: 'Username atau password salah' });
        }
      } else {
        res.status(401).json({ message: 'Username atau password salah' });
      }
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
  const updatedTask = { judul: req.body.judul, deskripsi: req.body.deskripsi, status: req.body.status };
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
