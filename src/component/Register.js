import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

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
      <div style= {{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>Registrasi</h2>
        <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', marginTop: '40px'}}>
          <div>
            <input style={{borderRadius: '10px', padding: '10px'}} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input style={{borderRadius: '10px', padding: '10px'}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input style={{borderRadius: '10px', padding: '10px'}} type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {/* <button type="submit">Daftar</button> */}
          <Button type="submit" style={{paddingLeft: '40px', paddingRight: '40px'}}>Daftar</Button>
        </form>
        <div>
          <p>sudah punya account? <a href="/">Login</a></p>
          
        </div>    
        {message && <p>{message}</p>}
      </div>
    </Container>
    
  );
}

export default Register;