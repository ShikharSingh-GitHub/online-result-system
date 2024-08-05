import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isAuth, setAuth] = useState(false);

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/user/searchuser', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('user');
          setAuth(false);
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(true);
      fetchUsers(); // Fetch users on initial render if authenticated
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {isAuth ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adduser">Add User</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/UserList">User List</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<h2 align="center">Welcome to Online Result System</h2>} />
          {isAuth ? (
            <>
              <Route path="/adduser" element={<UserForm fetchUsers={fetchUsers} />} />
              <Route path="/UserList" element={<UserList users={users} fetchUsers={fetchUsers} />} />
              <Route path="/edituser/:id" element={<UserForm fetchUsers={fetchUsers} />} />
            </>
          ) : (
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
          )}
          <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
