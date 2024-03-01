// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
// import TaskForm2 from './component/TaskForm2';
import { Container, Tab, Tabs } from 'react-bootstrap';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks', error));
  }, []);

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
    <div style={{ marginTop: 50 }}>
      <Container>
      
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="To Do">
        <section>
          <h1 style={{ textAlign: 'center' }}>Todo List</h1>
          <TaskForm onSubmit={addTask} />
          {/* <TaskForm2 /> */}
          <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTaskHandler} />
          {editTask && (
            <div>
              <h2>Edit Task</h2>
              <TaskForm onSubmit={updateTask} initialTask={editTask} />
            </div>
          )}
        </section>
        
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
    </Tabs>
    </Container>
    </div>

  );
};

export default ToDo;
