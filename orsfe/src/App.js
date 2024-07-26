import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home ||</Link>
            </li>
            <li>
              <Link to="/UserList">UserList ||</Link>
            </li>
            <li>
              <Link to="/UserForm">UserForm ||</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/" element={<h1>welcome to job jungle</h1>} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/UserForm" element={<UserForm/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

