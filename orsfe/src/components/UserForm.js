
import React, { useState } from 'react';

const UserForm = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(name, ' => ', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetch('http://localhost:5000/api/user/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setFormData({
          firstName: '',
          lastName: '',
          loginId: '',
          password: '',
          dob: '',
          gender: '',
          role: ''
        });
        setMessage(data.message);
        fetchUsers();
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add User</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Login ID</label>
          <input
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
