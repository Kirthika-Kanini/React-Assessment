import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

export default function DoctorUser() {
  const [Doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchDoctors();
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

  const handleFixAppointment = (doctorId) => {
    localStorage.setItem('selectedDoctorId', doctorId);
    navigate('/AppointmentPost'); 
  };

  const fetchDoctors = () => {
    axios
      .get(Variables.API_URL + 'Doctors', {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDoctors(response.data);
        } else {
          throw new Error('Failed to fetch doctors');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
        toast.error('Error fetching doctors:', error.message);
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
        <div className="row mt-3">
          {Doctors.map((doctor) => (
            <div className="col-md-4 mb-4" key={doctor.doctorId}>
              <div className="card">
                <img
                  src={`https://localhost:7224/uploads/doctor/${doctor.docImagePath}`}
                  className="card-img-top"
                  alt="Doctor Image"
                  style={{ height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.doctorName}</h5>
                  <p className="card-text">Gender: {doctor.gender}</p>
                  <p className="card-text">Phone: {doctor.phone}</p>
                  <p className="card-text">Specialization: {doctor.specialization}</p>
                  <p className="card-text">Experience: {doctor.experience}</p>
                  <p className="card-text">Testimonials: {doctor.tesimonials}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleFixAppointment(doctor.doctorId)}
                  >
                    Fix Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
