import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const DiagnoseFetch = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  const fetchDiagnoses = () => {
    axios
      .get(Variables.API_URL + "Diagnoses")
      .then((response) => {
        setDiagnoses(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiagnoses = diagnoses.filter((diagnose) => {
    return (
      diagnose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnose.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnose.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
      </nav> <div className='container-fluid'><br></br>
      <div className="">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h2>Diagnoses</h2>
      <div className="row">
        {filteredDiagnoses.map((diagnose) => (
          <div className="col-md-4 mb-4" key={diagnose.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ID: {diagnose.id}</h5>
                <p className="card-text">Name: {diagnose.name}</p>
                <p className="card-text">Description: {diagnose.description}</p>
                <p className="card-text">Symptoms: {diagnose.symptoms}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    
  );
};

export default DiagnoseFetch;
