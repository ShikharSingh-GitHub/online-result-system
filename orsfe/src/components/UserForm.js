import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/user/getuser/${id}`, { credentials: 'include' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          setFormData(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {

     // Convert loginId to lowercase before submitting
     const updatedFormData = {
      ...formData,
      loginId: formData.loginId.toLowerCase()
    };

    const url = id ? `http://localhost:5000/api/user/updateuser/${id}` : 'http://localhost:5000/api/user/adduser';
    const method = 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFormData),
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Network response was not ok.');
        }
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
        navigate('/UserList');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
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
              <h2 className="card-title text-center">{id ? 'Edit User' : 'Add User'}</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Login ID</label>
                  <input type="text" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="Enter Login ID" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-control" >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="form-control" >
                    <option value="">Select Role</option>
                    <option value="Admin">admin</option>
                    <option value="User">student</option>
                  </select>
                </div>
                <div className="text-center">
                  <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
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

export default UserForm;
