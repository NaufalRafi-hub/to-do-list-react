// TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialTask }) => {
  const [task, setTask] = useState(initialTask ? initialTask.text : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onSubmit({
        id: initialTask ? initialTask.id : null,
        text: task,
      });
      setTask('');
    }
  };

  useEffect(() => {
    setTask(initialTask ? initialTask.text : '');
  }, [initialTask]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
