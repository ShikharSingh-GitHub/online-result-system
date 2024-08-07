import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MarksheetList = ({ user }) => { // Receive user as a prop
  const [marksheets, setMarksheets] = useState([]);

  const fetchMarksheets = () => {
    fetch('http://localhost:5000/api/marksheet/searchMarksheets', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setMarksheets(data);
      })
      .catch(error => {
        console.error('Error fetching marksheets:', error);
      });
  };

  useEffect(() => {
    fetchMarksheets();
  }, []);

  const deleteMarksheet = (marksheetId) => {
    fetch(`http://localhost:5000/api/marksheet/deleteMarksheet/${marksheetId}`, {
      method: 'POST',
      credentials: 'include', // Include credentials for session management
    })
      .then(response => {
        if (response.ok) {
          fetchMarksheets();
        } else if (response.status === 401) {
          throw new Error('Unauthorized');
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        console.error('Error deleting marksheet:', error);
      });
  };

  const calculateTotal = (marksheet) => {
    return marksheet.physics + marksheet.chemistry + marksheet.maths;
  };

  const calculatePercentage = (marksheet) => {
    const total = calculateTotal(marksheet);
    return (total / 300) * 100; // Assuming each subject is out of 100
  };

  const calculatePassFail = (marksheet) => {
    return marksheet.physics >= 33 && marksheet.chemistry >= 33 && marksheet.maths >= 33 ? 'Pass' : 'Fail';
  };

  return (
    <div>
      <h2 align="center">Marksheet List</h2>
      <table border="1px" width="100%" align="center" className="table">
        <thead align="center">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Maths</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Pass/Fail</th>
            {user && user.role === 'admin' && (
              <th>Action</th>
            )}
            
          </tr>
        </thead>
        <tbody align="center">
          {marksheets.map(marksheet => (
            <tr key={marksheet._id}>
              <td>{marksheet.name}</td>
              <td>{marksheet.rollNo}</td>
              <td>{marksheet.physics}</td>
              <td>{marksheet.chemistry}</td>
              <td>{marksheet.maths}</td>
              <td>{calculateTotal(marksheet)}</td>
              <td>{calculatePercentage(marksheet).toFixed(2)}%</td>
              <td>{calculatePassFail(marksheet)}</td>
              <td>
                {user && user.role === 'admin' && (
                  <>
                    <button onClick={() => deleteMarksheet(marksheet._id)}>Delete</button>
                    <Link to={`/editmarksheet/${marksheet._id}`}><button>Edit</button></Link>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksheetList;
