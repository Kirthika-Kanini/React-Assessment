import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link} from 'react-router-dom';

const PatientPost = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [showForm, setShowForm] = useState(false);

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

  
  const toggleForm = () => {
    setShowForm(!showForm);
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
      .get(Variables.API_URL + "Patients",{
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  const handleDelete = (patientId) => {
    axios
      .delete(Variables.API_URL + `Patients/${patientId}`,{
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log("Patient deleted:", response.data);
        fetchPatients();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setPatientName(patient.patientName);
    setImageFile(null);
    setGender(patient.gender);
    setPhone(patient.phone);
    setEmail(patient.email);
    setAddress(patient.address);
    setMedicalHistory(patient.medicalHistory);
    setBloodGroup(patient.bloodGroup);
    setPreferredLanguage(patient.preferredLanguage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("patientName", patientName);
    formData.append("imageFile", imageFile);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("medicalHistory", medicalHistory);
    formData.append("bloodGroup", bloodGroup);
    formData.append("preferredLanguage", preferredLanguage);

    if (selectedPatient) {
      axios
        .put(Variables.API_URL + `Patients/${selectedPatient.patientId}`, formData,{
          headers: {
            Authorization: `Bearer ${getCookieValue('token')}`,
          },
        })
        .then((response) => {
          console.log("Patient updated:", response.data);
          fetchPatients();
          resetForm();
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      axios
        .post(Variables.API_URL + "Patients", formData,{
          headers: {
            Authorization: `Bearer ${getCookieValue('token')}`,
          },
        })
        .then((response) => {
          console.log("Patient created:", response.data);
          fetchPatients();
          resetForm();
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setPatientName("");
    setImageFile(null);
    setGender("");
    setPhone("");
    setEmail("");
    setAddress("");
    setMedicalHistory("");
    setBloodGroup("");
    setPreferredLanguage("");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home">Home</Link>
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
              <Link className="navbar-brand" to="/DoctorUser">Doctor</Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/AppointmentStatus">Status</Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/DiagnoseFetch">Diagnose</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br/>
      <div className="container-fluid">
        <button className="btn btn-primary" onClick={toggleForm}>
          Add Patient
        </button>
        {showForm && (
          <form onSubmit={(event) => { handleSubmit(event); toggleForm(); }}>
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="patientName"
                className="form-control"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Medical History</label>
              <input
                type="text"
                name="medicalHistory"
                className="form-control"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Preferred Language</label>
              <input
                type="text"
                name="preferredLanguage"
                className="form-control"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="imageFile"
                className="form-control-file"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {selectedPatient ? "Update" : "Create"}
            </button>
          </form>
        )}

        <h2>Patient List</h2>
        <div className="row ">
          {patients.map((patient) => (
            <div className="col-md-3" key={patient.patientId}>
              <div className="card mb-4 h-60" >
                <img
                  src={`https://localhost:7224/uploads/patient/${patient.patImagePath}`}
                  className="card-img-top"
                  alt="Patient" style={{height:"200px"}}
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(patient.patientId)}
                  >
                    Delete
                  </button>&nbsp;&nbsp;
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => {handleUpdate(patient); toggleForm();}}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPost;
