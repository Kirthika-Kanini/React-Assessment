import React, { Component } from "react";
import axios from "axios";
import { Variables } from "../Variable";

export class AppointmentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appointments: [],
      patientName: "",
      date: "",
      time: "",
      reasonForVisit: "",
      status: "scheduled", // Set default value as "scheduled"
      doctorId: ""
    };
  }

  componentDidMount() {
    
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

 

  render() {
    const {
      Appointments
    } = this.state;

    return (
        <div className="card-container">
        {Appointments.map((appointment) => (
          <div className="card" key={appointment.appointmentId}>
            <div className="card-body">
              <h5 className="card-title">Patient: {appointment.patientName}</h5>
              <p className="card-text">Date: {appointment.date}</p>
              <p className="card-text">Time: {appointment.time}</p>
              <p className="card-text">Reason for Visit: {appointment.reasonForVisit}</p>
              <p className="card-text">Status: {appointment.status}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
