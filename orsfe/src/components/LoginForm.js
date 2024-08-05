import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setAuth }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password }),
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Invalid credentials');
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth(true);
        navigate('/');
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Login ID</label>
                  <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Enter Login ID" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="form-control" />
                </div>
                &nbsp;
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default LoginForm;