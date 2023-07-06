import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

export default function PatientUser() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const patientLogName = localStorage.getItem('PatientLogName');

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchPatients();
    }
  }, [navigate]);
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
  };
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
          const filteredPatients = response.data.filter(patient => patient.patientName === patientLogName);
          setPatients(filteredPatients);
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
            <li className="nav-item">
              <Link className="nav-link" to="/PatientPost" style={{marginLeft:"20px"}}>
                Access
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AppointmentStatus" style={{marginLeft:"20px"}}>
                Appointment Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login"  onClick={logout} style={{marginLeft:"20px"}}>
                Logout
              </Link>
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
