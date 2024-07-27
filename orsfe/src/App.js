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
      <div className="container">
        <h1>User Management</h1>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/adduser">Add User</Link>
          <Link to="/UserList">User List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Welcome to the User Management System</h2>} />
          <Route path="/adduser" element={<UserForm fetchUsers={fetchUsers} />} />
          <Route path="/UserList" element={<UserList users={users} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;