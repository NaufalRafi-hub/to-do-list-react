import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Kata sandi dan konfirmasi kata sandi tidak cocok');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/register', {
        username,
        password
      });
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan saat melakukan registrasi');
    }
  };

  return (
    <Container>
      <div style= {{marginTop: '40px'}}>
        <h2>Registrasi</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Konfirmasi Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit">Daftar</button>
        </form>
        <div>
          <p>sudah punya account?</p>
          <a href="/">Login</a>
        </div>    
        {message && <p>{message}</p>}
      </div>
    </Container>
    
  );
}

export default Register;