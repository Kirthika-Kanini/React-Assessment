import React, { useState, useEffect } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
const DiagnosePost = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    fetchDiagnoses();
  }, []);
  const navigate = useNavigate();
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

  const editDiagnose = (diagnose) => {
    const { id, name, description, symptoms } = diagnose;

    setId(id);
    setName(name);
    setDescription(description);
    setSymptoms(symptoms);
  };

  const updateDiagnose = () => {
    const updatedDiagnose = {
      id: id,
      name: name,
      description: description,
      symptoms: symptoms
    };

    axios
      .put(Variables.API_URL + "Diagnoses/" + id, updatedDiagnose, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log("Updated", response.data);
        fetchDiagnoses();
        setId("");
        setName("");
        setDescription("");
        setSymptoms("");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const createDiagnose = () => {
    const diagnose = {
      name: name,
      description: description,
      symptoms: symptoms
    };

    axios
      .post(Variables.API_URL + "Diagnoses", diagnose, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log("Created", response.data);
        fetchDiagnoses();
        setName("");
        setDescription("");
        setSymptoms("");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleNameInputChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSymptomsInputChange = (event) => {
    setSymptoms(event.target.value);
  };

  const deleteDiagnose = (id) => {
    axios
      .delete(Variables.API_URL + "Diagnoses/" + id, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log("Deleted", response.data);
        fetchDiagnoses();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center">DIAGNOSE FORM</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleNameInputChange}
                placeholder="Enter Diagnose Name"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={handleDescriptionInputChange}
                placeholder="Enter Description"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={symptoms}
                onChange={handleSymptomsInputChange}
                placeholder="Enter Symptoms"
              />
            </div><br></br>
            {id ? (
              <button onClick={updateDiagnose}>Save Changes</button>
            ) : (
              <button onClick={createDiagnose}>Submit</button>
            )}
          </div>
        </div>
        <h2 className="mt-5">Diagnose List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Diagnose Name</th>
              <th>Description</th>
              <th>Symptoms</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {diagnoses.map((diagnose) => (
              <tr key={diagnose.id}>
                <td>{diagnose.name}</td>
                <td>{diagnose.description}</td>
                <td>{diagnose.symptoms}</td>
                <td>
                  <button onClick={() => editDiagnose(diagnose)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteDiagnose(diagnose.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosePost;
