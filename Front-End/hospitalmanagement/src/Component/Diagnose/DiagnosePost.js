import React, { Component } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import "bootstrap/dist/css/bootstrap.css";

export class DiagnosePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnoses: [],
      id: "",
      name: "",
      description: "",
      symptoms: ""
    };
  }

  componentDidMount() {
    this.fetchDiagnoses();
  }

  fetchDiagnoses = () => {
    axios
      .get(Variables.API_URL + "Diagnoses")
      .then((response) => {
        this.setState({ diagnoses: response.data });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  editDiagnose = (diagnose) => {
    const { id, name, description, symptoms } = diagnose;

    this.setState({
      id: id,
      name: name,
      description: description,
      symptoms: symptoms
    });
  };

  updateDiagnose = () => {
    const { id, name, description, symptoms } = this.state;

    const updatedDiagnose = {
      id: id,
      name: name,
      description: description,
      symptoms: symptoms
    };

    axios
      .put(Variables.API_URL + "Diagnoses/" + id, updatedDiagnose)
      .then((response) => {
        console.log("Updated", response.data);
        this.fetchDiagnoses();
        this.setState({
          id: "",
          name: "",
          description: "",
          symptoms: ""
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  createDiagnose = () => {
    const { name, description, symptoms } = this.state;

    const diagnose = {
      name: name,
      description: description,
      symptoms: symptoms
    };

    axios
      .post(Variables.API_URL + "Diagnoses", diagnose)
      .then((response) => {
        console.log("Created", response.data);
        this.fetchDiagnoses();
        this.setState({
          name: "",
          description: "",
          symptoms: ""
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  handleNameInputChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionInputChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSymptomsInputChange = (event) => {
    this.setState({ symptoms: event.target.value });
  };

  deleteDiagnose = (id) => {
    axios
      .delete(Variables.API_URL + "Diagnoses/" + id)
      .then((response) => {
        console.log("Deleted", response.data);
        this.fetchDiagnoses();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  render() {
    const { diagnoses, id, name, description, symptoms } = this.state;

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
                  onChange={this.handleNameInputChange}
                  placeholder="Enter Diagnose Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={this.handleDescriptionInputChange}
                  placeholder="Enter Description"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={symptoms}
                  onChange={this.handleSymptomsInputChange}
                  placeholder="Enter Symptoms"
                />
              </div><br></br>
              {id ? (
                <button onClick={this.updateDiagnose}>Save Changes</button>
              ) : (
                <button onClick={this.createDiagnose}>Submit</button>
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
                    <button onClick={() => this.editDiagnose(diagnose)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.deleteDiagnose(diagnose.id)}>
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
  }
}
