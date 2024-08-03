import React from 'react';


const UserList = ({ users, fetchUsers }) => {
  const deleteUser = (userId) => {
    fetch(`http://localhost:5000/api/user/deleteuser/${userId}`, {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          fetchUsers();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
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
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.loginId}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
