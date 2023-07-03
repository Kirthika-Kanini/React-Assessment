import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

export default function PatientUser() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchPatients();
    }
  }, [navigate]);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const fetchPatients = () => {
    axios
      .get(Variables.API_URL + 'Patients', {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPatients(response.data);
        } else {
          throw new Error('Failed to fetch patients');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
        toast.error('Error fetching patients:', error.message);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Home</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <h1>Patients</h1>

        <div className="row mt-3">
          {patients.map((patient) => (
            <div className="col-md-3 mb-4" key={patient.patientId}>
              <div className="card">
                <img
                  src={`https://localhost:7224/uploads/patient/${patient.patImagePath}`}
                  className="card-img-top"
                  alt="Patient Image"
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{patient.patientName}</h5>
                  <p className="card-text">Gender: {patient.gender}</p>
                  <p className="card-text">Phone: {patient.phone}</p>
                  <p className="card-text">Email: {patient.email}</p>
                  <p className="card-text">Address: {patient.address}</p>
                  <p className="card-text">Medical History: {patient.medicalHistory}</p>
                  <p className="card-text">Blood Group: {patient.bloodGroup}</p>
                  <p className="card-text">Preferred Language: {patient.preferredLanguage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
