import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Approve.css';

function Approval() {
  const [registers, setRegisters] = useState([]);
  const storedName = localStorage.getItem('name');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(Variables.API_URL + 'Users')
      .then((response) => {
        if (response.status === 200) {
          setRegisters(response.data);
        } else {
          throw new Error('Failed to fetch registers');
        }
      })
      .catch((error) => {
        console.error('Error fetching registers:', error);
        toast.error('Error fetching registers:', error.message);
      });
  };

  const filteredRegisters = registers.filter((register) => register.name === storedName);

  return (
    <div >
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home" style={{marginLeft:"20px"}}>
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/DoctorUser"  style={{marginLeft:"20px"}}>
                Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AppointmentStatus"  style={{marginLeft:"20px"}}>
                Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DiagnoseFetch"  style={{marginLeft:"20px"}}>
                Diagnose
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    <div className="userapproval-container">
      {filteredRegisters.map((register, index) => (
        <div key={register.id} className={`usercard ${index % 4 === 0 ? 'userfirst-card' : ''}`}>
          <div className="usercard-content">
            <p className="usercard-title">Hello {register.name}</p>
            
            <p>Your Status is {register.status}</p>
            {register.status === 'approved' && (
              <div className='down'>
              <Link to="/otpverify" className="useraccess-button">Access</Link></div>
            )}
          </div>
        </div>
      ))}
    </div></div>
  );
}

export default Approval;
