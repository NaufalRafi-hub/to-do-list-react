// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch initial tasks
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

  const addTask = (text) => {
    // Create a new task
    const newTask = { text };

    // Send POST request to add the task
    axios.post('/api/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task', error));
  };

  const deleteTask = (id) => {
    // Send DELETE request to remove the task
    axios.delete(`/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default App;
