// TaskForm.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../hooks/useAuth";


const TaskForm = ({ onSubmit, initialTask }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [task, setTask] = useState(initialTask ? initialTask.text : '');
  const [task, setTask] = useState(initialTask ? initialTask.judul : '');
  const [desc, setDesc] = useState(initialTask ? initialTask.deskripsi : '');
  const [status, setStatus] = useState(initialTask ? initialTask.status : 0);
  const { logout } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onSubmit({
        id: initialTask ? initialTask.id : null,
        judul: task,
        deskripsi: desc,
        status: status
      });
      setTask('');
      setDesc('');
      setStatus(0); 
    }
  };

  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    setTask(initialTask ? initialTask.judul : '');
    setDesc(initialTask ? initialTask.deskripsi : '');
    setStatus(initialTask ? initialTask.status : '');
  }, [initialTask]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {initialTask ? 'Update Task' : 'Add Task'}
      </Button>
      <Button onClick={handleLogout}>
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
        <Modal.Body>
              
                <div>
                  <label>Judul:</label>
                  <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>
                <div>
                  <label>Deskripsi:</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div>
                  <label>Status:</label>
                  <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
                    <option value={0}>On Progress</option>
                    <option value={1}>Done</option>
                  </select>
                </div>
                {/* <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button> */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type='submit'>
            {initialTask ? 'Update Task' : 'Add Task'}
          </Button>
          
        </Modal.Footer>
        </form>

      </Modal>
    
    </>
    
  );
};

export default TaskForm;
