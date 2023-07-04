import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import * as XLSX from 'xlsx';

export default function UniqueAppointment() {
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Doctors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doctors');
    XLSX.writeFile(workbook, 'doctors.xlsx');
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

  const fetchDoctors = () => {
    const doctorName = localStorage.getItem('DoctorName'); // Get the DoctorName from localStorage
  
    axios
      .get(Variables.API_URL + 'Doctors', {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const filteredDoctors = response.data.filter((doctor) => doctor.doctorName === doctorName);
          setDoctors(filteredDoctors);
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
    <div className="container-fluid">
      <h1>Appointments</h1>

      <button onClick={exportToExcel} className="btn btn-primary mb-3">
        Export to Excel
      </button>

      <div className="row mt-3">
  {Doctors.map((doctor) => (
    <div className="col-12 col-md-6 col-lg-4 mb-4" key={doctor.doctorId}>
      <div className="card">
        <div className="card-body">
          {doctor.appointments && (
            <div>
              {doctor.appointments.map((appointment) => (
                <div key={appointment.appointmentId}>
                  <h5 className="card-title">{appointment.patientName}</h5>
                  <p>Reason: {appointment.reasonForVisit}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
</div>
    </div>
  );
}
