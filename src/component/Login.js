import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";
import { Button, Container } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        username,
        password
      });
      await login({ username });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>Login</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', marginTop: '40px'}}>
          <input style={{borderRadius: '10px', padding: '10px'}} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input style={{borderRadius: '10px', padding: '10px'}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
          {/* <button onClick={handleLogin}>Login</button>   */}
          <Button style={{paddingLeft: '40px', paddingRight: '40px'}}onClick={handleLogin}>Login</Button>
        <div style={{marginTop: '40px'}}>
          <p>belum punya account?<a href="/register"> Register</a></p>
          
        </div>    
      </div>
    </Container>
    
  );
}

export default Login;