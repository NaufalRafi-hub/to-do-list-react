// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
import TaskForm2 from './component/TaskForm2';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import ToDo from './ToDo';
import { ProtectedRoute } from "./component/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

// import './App.css'


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

  // const addTask = ({text}) => {
  //   const newTask = { text };
  //   axios.post('http://localhost:8081/api/tasks', newTask)
  //     .then(response => setTasks([...tasks, response.data]))
  //     .catch(error => console.error('Error adding task', error));
  // };
  const addTask = ({judul, deskripsi, status}) => {
    const newTask = { judul, deskripsi, status };
    axios.post('http://localhost:8081/api/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task', error));
  };
  const deleteTask = (id) => {
    axios.delete(`http://localhost:8081/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task', error));
  };

  const editTaskHandler = (task) => {
    setEditTask(task);
  };

  const updateTask = (editedTask) => {
    axios.put(`http://localhost:8081/api/tasks/${editedTask.id}`, editedTask)
      .then(() => {
        setTasks(tasks.map(task => (task.id === editedTask.id ? editedTask : task)));
        setEditTask(null);
      })
      .catch(error => console.error('Error updating task', error));
  };

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={
        <ProtectedRoute>
          <ToDo />
        </ProtectedRoute>
        } />
      <Route path="/register" element={<Register />} />

    </Routes>
    </AuthProvider>

  );
};

export default App;
