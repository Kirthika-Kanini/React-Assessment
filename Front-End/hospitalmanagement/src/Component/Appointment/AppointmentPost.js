import React, { useState, useEffect } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import 'bootstrap/dist/css/bootstrap.css';
import { Link,useNavigate } from 'react-router-dom';

const AppointmentPost = () => {
  const [Appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [status, setStatus] = useState("scheduled"); // Set default value as "scheduled"
  const [doctorId, setDoctorId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const selectedDoctorId = localStorage.getItem('selectedDoctorId');
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    }
    fetchAppointments();
  }, []);
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchAppointments();
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
  const fetchAppointments = () => {
    axios
      .get(Variables.API_URL + "Appointments", {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const createAppointment = () => {
    const appointment = {
      patientName: patientName,
      date: date,
      time: time,
      patientEmail: patientEmail,
      reasonForVisit: reasonForVisit,
      status: status,
      doctor: {
        doctorId: doctorId
      }
    };

    axios
      .post(Variables.API_URL + "Appointments", appointment, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log("Created", response.data);
        fetchAppointments();
        setPatientName("");
        setDate("");
        setTime("");
        setPatientEmail("");
        setReasonForVisit("");
        setStatus("scheduled"); // Reset status to "scheduled" after submission
        localStorage.setItem("patientName", patientName);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handlePatientNameInputChange = (event) => {
    setPatientName(event.target.value);
  };

  const handleDateInputChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeInputChange = (event) => {
    setTime(event.target.value);
  };

  const handleReasonForVisitInputChange = (event) => {
    setReasonForVisit(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setPatientEmail(event.target.value);
  };

  const handleDoctorIdInputChange = (event) => {
    setDoctorId(event.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home" style={{ marginLeft: "20px" }}>
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
              <Link className="nav-link" to="/DoctorUser" style={{ marginLeft: "20px" }}>
                Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AppointmentStatus" style={{ marginLeft: "20px" }}>
                Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DiagnoseFetch" style={{ marginLeft: "20px" }}>
                Diagnose
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 style={{ justifyContent: "center" }}>APPOINTMENT FORM</h1>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            value={patientName}
            onChange={handlePatientNameInputChange}
            placeholder="Enter Patient Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={handleDateInputChange}
            placeholder="Enter Date"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={time}
            onChange={handleTimeInputChange}
            placeholder="Enter Time"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={reasonForVisit}
            onChange={handleReasonForVisitInputChange}
            placeholder="Enter Reason for Visit"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={patientEmail}
            onChange={handleEmailInputChange}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={doctorId}
            readOnly
            placeholder="Enter Doctor ID"
          />
        </div>
        <button className="btn btn-primary" onClick={createAppointment}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AppointmentPost;
