import React, { Component } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import 'bootstrap/dist/css/bootstrap.css';

export class AppointmentPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appointments: [],
      patientName: "",
      date: "", 
      time: "",
      patientEmail:"",
      reasonForVisit: "",
      status: "scheduled", // Set default value as "scheduled"
      doctorId: ""
    };
  }

  componentDidMount() {
    const selectedDoctorId = localStorage.getItem('selectedDoctorId');
    if (selectedDoctorId) {
      this.setState({ doctorId: selectedDoctorId });
    }
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    axios
      .get(Variables.API_URL + "Appointments")
      .then((response) => {
        this.setState({ Appointments: response.data });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  createAppointment = () => {
    const {
      patientName,
      date,
      time,
      reasonForVisit,
      patientEmail,
      status,
      doctorId
    } = this.state;

    const appointment = {
      patientName: patientName,
      date: date,
      time: time,
      patientEmail:patientEmail,
      reasonForVisit: reasonForVisit,
      status: status,
      doctor: {
        doctorId: doctorId
      }
    };

    axios
      .post(Variables.API_URL + "Appointments", appointment)
      .then((response) => {
        console.log("Created", response.data);
        this.fetchAppointments();
        this.setState({
          patientName: "",
          date: "",
          time: "",
          reasonForVisit: "",
          patientEmail:"",
          status: "scheduled", // Reset status to "scheduled" after submission
          doctorId: ""
        });
        localStorage.setItem("patientName", patientName);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  handlePatientNameInputChange = (event) => {
    this.setState({ patientName: event.target.value });
  };

  handleDateInputChange = (event) => {
    this.setState({ date: event.target.value });
  };

  handleTimeInputChange = (event) => {
    this.setState({ time: event.target.value });
  };

  handleReasonForVisitInputChange = (event) => {
    this.setState({ reasonForVisit: event.target.value });
  };
  handleEmailInputChange = (event) => {
    this.setState({ patientEmail: event.target.value });
  };
  handleStatusInputChange = (event) => {
    this.setState({ status: event.target.value });
  };

  handleDoctorIdInputChange = (event) => {
    this.setState({ doctorId: event.target.value });
  };

  render() {
    const {
      Appointments,
      patientName,
      date,
      time,
      reasonForVisit,
      patientEmail,
      doctorId
    } = this.state;

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
      <div className="container mt-5">
        <h1 style={{justifyContent:"center"}}>APPOINTMENT FORM</h1>
        <div className="form-group mt-5">
          <input
            type="text"
            className="form-control"
            value={patientName}
            onChange={this.handlePatientNameInputChange}
            placeholder="Enter Patient Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={this.handleDateInputChange}
            placeholder="Enter Date"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={time}
            onChange={this.handleTimeInputChange}
            placeholder="Enter Time"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={reasonForVisit}
            onChange={this.handleReasonForVisitInputChange}
            placeholder="Enter Reason for Visit"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={patientEmail}
            onChange={this.handleEmailInputChange}
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
        <button className="btn btn-primary" onClick={this.createAppointment}>
          Submit
        </button>
      </div></div>
    );
  }
}
