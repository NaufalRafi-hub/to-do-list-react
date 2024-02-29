// TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialTask }) => {
  // const [task, setTask] = useState(initialTask ? initialTask.text : '');
  const [task, setTask] = useState(initialTask ? initialTask.judul : '');
  const [desc, setDesc] = useState(initialTask ? initialTask.deskripsi : '');
  const [status, setStatus] = useState(initialTask ? initialTask.status : 0);

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

  useEffect(() => {
    setTask(initialTask ? initialTask.judul : '');
    setDesc(initialTask ? initialTask.deskripsi : '');
    setStatus(initialTask ? initialTask.status : '');
  }, [initialTask]);

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a new description"
        value={desc}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a status"
        value={status}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button> */}
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
        <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button>

    </form>
  );
};

export default TaskForm;
