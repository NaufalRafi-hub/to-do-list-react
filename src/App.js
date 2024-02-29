// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

  const addTask = ({text}) => {
    const newTask = { text };
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
    <div>
      <h1>Todo List</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTaskHandler} />
      {editTask && (
        <div>
          <h2>Edit Task</h2>
          <TaskForm onSubmit={updateTask} initialTask={editTask} />
        </div>
      )}
    </div>
  );
};

export default App;
