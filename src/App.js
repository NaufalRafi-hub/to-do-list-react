// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
