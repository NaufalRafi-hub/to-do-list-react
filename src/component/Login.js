import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";

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
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>  

      <div>
        <p>belum punya account?</p>
        <a href="/register">Register</a>
        </div>    
    </div>
  );
}

export default Login;