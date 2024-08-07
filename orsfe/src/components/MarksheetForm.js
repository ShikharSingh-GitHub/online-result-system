import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarksheetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    physics: '',
    chemistry: '',
    maths: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/marksheet/getMarksheet/${id}`, { credentials: 'include' })
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
    const url = id ? `http://localhost:5000/api/marksheet/updateMarksheet/${id}` : 'http://localhost:5000/api/marksheet/addMarksheet';
    const method = 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
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
          name: '',
          rollNo: '',
          physics: '',
          chemistry: '',
          maths: ''
        });
        setMessage(data.message);
        navigate('/MarksheetList');
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
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter First Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>RollNo</label>
                  <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Enter RollNo" className="form-control" />
                </div>
                <div className="form-group">
                  <label>physics</label>
                  <input type="text" name="physics" value={formData.physics} onChange={handleChange} placeholder="Enter physics Marks" className="form-control" />
                </div>
                <div className="form-group">
                  <label>chemistry</label>
                  <input type="text" name="chemistry" value={formData.chemistry} onChange={handleChange} placeholder="Enter chemistry Marks" className="form-control" />
                </div>
                <div className="form-group">
                  <label>maths</label>
                  <input type="text" name="maths" value={formData.maths} onChange={handleChange} placeholder="Enter maths Marks" className="form-control"
                  />
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

export default MarksheetForm;
