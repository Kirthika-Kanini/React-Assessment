import React, { Component } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import "./AppointmentStatus.css";

export class AppointmentStatus extends Component {
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
      doctorId: "",
      showModal: false,
      selectedAppointmentId: null // Track the modal visibility
    };
  }

  componentDidMount() {
    const patientName = localStorage.getItem("patientName");
    if (patientName) {
      this.setState({ patientName: patientName }, () => {
        this.fetchAppointments();
      });
    }
  }

  fetchAppointments = () => {
    const { patientName } = this.state;

    axios
      .get(Variables.API_URL + "Appointments")
      .then((response) => {
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.patientName === patientName
        );
        this.setState({ Appointments: filteredAppointments });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  handleViewStatus = (appointmentId) => {
    this.setState({ selectedAppointmentId: appointmentId, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedAppointmentId: null, showModal: false });
  };

  render() {
    const { Appointments, showModal, selectedAppointmentId } = this.state;

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
      <div className="card-container">
        {Appointments.map((appointment) => (
          <div key={appointment.appointmentId} className="card">
            <h3>{appointment.patientName}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Reason for Visit: {appointment.reasonForVisit}</p>
            <p>Email: {appointment.patientEmail}</p>
            <p>Status: {appointment.status}</p>
            <button className="buton" onClick={() => this.handleViewStatus(appointment.appointmentId)}>
            View Status
          </button>
          </div>
        ))}

{showModal && selectedAppointmentId && (
          <div className="modal">
            <div className="modal-content">
              <div className="container">
                <ol className="progress-meter">
                  <li
                    className={`progress-point ${
                      Appointments.some(
                        (appointment) => appointment.status === "scheduled"
                      )
                        ? "done"
                        : "todo"
                    }`}
                  >
                    Scheduled
                  </li>
                  <li
                    className={`progress-point ${
                      Appointments.some(
                        (appointment) => appointment.status === "Callstat"
                      )
                        ? "done"
                        : "todo"
                    }`}
                  >
                    Call Stat
                  </li>
                  <li
                    className={`progress-point ${
                      Appointments.some(
                        (appointment) => appointment.status === "Waitlisted"
                      )
                        ? "done"
                        : "todo"
                    }`}
                  >
                    Waitlisted
                  </li>
                  <li
                    className={`progress-point ${
                      Appointments.some(
                        (appointment) => appointment.status === "Approved"
                      )
                        ? "done"
                        : "todo"
                    }`}
                  >
                    Approved
                  </li>
                </ol>
              </div>
              <button onClick={this.handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div></div>
    );
  }
}
