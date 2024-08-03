import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/user/searchuser')
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-4">User Management</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/adduser">Add User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/UserList">User List</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<h2 className="text-center">Welcome to the User Management System</h2>} />
          <Route path="/adduser" element={<UserForm fetchUsers={fetchUsers} />} />
          <Route path="/UserList" element={<UserList users={users} fetchUsers={fetchUsers}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
