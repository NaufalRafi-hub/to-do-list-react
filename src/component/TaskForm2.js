import React, { useState } from 'react';
import axios from 'axios';

function TaskForm2() {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [status, setStatus] = useState(0); // Default status "On Progress"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/tasks', {
        judul,
        deskripsi,
        status
      });
      console.log(response.data);
      // Reset form setelah berhasil menambahkan tugas
      setJudul('');
      setDeskripsi('');
      setStatus(0); // Mengembalikan status ke "On Progress"
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Form Tambah Tugas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul:</label>
          <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
        </div>
        <div>
          <label>Deskripsi:</label>
          <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
            <option value={0}>On Progress</option>
            <option value={1}>Done</option>
          </select>
        </div>
        <button type="submit">Tambah Tugas</button>
      </form>
    </div>
  );
}

export default TaskForm2;