import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from 'react-router-dom';
import './Fetch.css'
const DiagnoseFetch = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiagnose, setSelectedDiagnose] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDiagnoses();
  }, []);
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchDiagnoses();
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
  useEffect(() => {
    if (diagnoses.length > 0 && selectedDiagnose === null) {
      setSelectedDiagnose(diagnoses[0]);
    }
  }, [diagnoses, selectedDiagnose]);

  const fetchDiagnoses = () => {
    axios
      .get(Variables.API_URL + "Diagnoses", {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
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

  const handleDiagnoseClick = (diagnose) => {
    setSelectedDiagnose(diagnose);
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
              <Link className="nav-link" to="/DiagnoseFetch"  style={{marginLeft:"20px"}}>
                Diagnose
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className='container-fluid'>
        <br />
        <div className="row">
        <div className="col-md-12">
        <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            /></div>
          <div className="col-md-4 mt-2">
            
            <div className="list-group">
              {filteredDiagnoses.map((diagnose) => (
                <button
                  key={diagnose.id}
                  className={`list-group-item list-group-item-action${selectedDiagnose && selectedDiagnose.id === diagnose.id ? " active" : ""}`}
                  onClick={() => handleDiagnoseClick(diagnose)}
                >
                  {diagnose.name}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-8">
  {selectedDiagnose && (
    <div className="card">
      <div className="card-body">

        <h1 className="card-text">{selectedDiagnose.name}</h1>
        <p className="card-text">Description: {selectedDiagnose.description}</p>
        <div className="video-container">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            width="560"
            height="315"
            src={selectedDiagnose.symptoms}
            title="YouTube Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default DiagnoseFetch;
