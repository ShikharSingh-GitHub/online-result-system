import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (userId) => {
    fetch(`http://localhost:5000/api/user/deleteuser/${userId}`, {
      method: 'POST',
      credentials: 'include', // Include credentials for session management
    })
      .then(response => {
        if (response.ok) {
          fetchUsers();
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h2 align="center">User List</h2>
      <table border="1px" width="100%" align="center" className="table">
        <thead align="center">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Login ID</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.loginId}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <Link to={`/edituser/${user._id}`}><button>Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
