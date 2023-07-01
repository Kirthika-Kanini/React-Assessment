import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import "bootstrap/dist/css/bootstrap.min.css"; 
import axios from "axios";
const PatientPost = () => {
    const [patientName, setPatientName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [preferredLanguage, setPreferredLanguage] = useState("");
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
  
    useEffect(() => {
      fetchPatients();
    }, []);
  
    const fetchPatients = () => {
      axios
        .get(Variables.API_URL + "Patients")
        .then((response) => {
          setPatients(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
        });
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "patientName") setPatientName(value);
      else if (name === "gender") setGender(value);
      else if (name === "phone") setPhone(value);
      else if (name === "email") setEmail(value);
      else if (name === "address") setAddress(value);
      else if (name === "medicalHistory") setMedicalHistory(value);
      else if (name === "bloodGroup") setBloodGroup(value);
      else if (name === "preferredLanguage") setPreferredLanguage(value);
    };
  
    const handleImageChange = (event) => {
      setImageFile(event.target.files[0]);
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
          .put(Variables.API_URL + `Patients/${selectedPatient.patientId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
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
          .post(Variables.API_URL + "Patients", formData)
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
  
    const handleDelete = (patientId) => {
      axios
        .delete(Variables.API_URL + `Patients/${patientId}`)
        .then((response) => {
          console.log("Patient deleted:", response.data);
          fetchPatients(); 
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
  
    return (
      <div className="container">
        <br />
        <h2>Create Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              className="form-control"
              value={patientName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div><br/>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="imageFile"
              className="form-control-file"
              onChange={handleImageChange}
              required
            />
          </div>
          <br/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {selectedPatient ? "Update" : "Create"}
            </button>
          </div>
        </form>
  
        <h2>Patient List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Medical History</th>
              <th>Blood Group</th>
              <th>Preferred Language</th>
              <th>Image</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>{patient.patientName}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.address}</td>
                <td>{patient.medicalHistory}</td>
                <td>{patient.bloodGroup}</td>
                <td>{patient.preferredLanguage}</td>
                <td>
                  <img
                    src={`https://localhost:7224/uploads/patient/${patient.patImagePath}`}
                    className="card-img-top"
                    alt="Patient"
                    style={{ height: "20px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(patient)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(patient.patientId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PatientPost;
  