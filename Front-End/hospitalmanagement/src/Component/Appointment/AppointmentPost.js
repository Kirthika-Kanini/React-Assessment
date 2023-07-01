import React, { Component } from "react";
import axios from "axios";
import { Variables } from "../Variable";

export class AppointmentPost extends Component {
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
      status,
      doctorId
    } = this.state;

    const appointment = {
      patientName: patientName,
      date: date,
      time: time,
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
      doctorId
    } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason for Visit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reasonForVisit}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <input
          type="text"
          value={patientName}
          onChange={this.handlePatientNameInputChange}
          placeholder="Enter Patient Name"
        />
        <input
          type="text"
          value={date}
          onChange={this.handleDateInputChange}
          placeholder="Enter Date"
        />
        <input
          type="text"
          value={time}
          onChange={this.handleTimeInputChange}
          placeholder="Enter Time"
        />
        <input
          type="text"
          value={reasonForVisit}
          onChange={this.handleReasonForVisitInputChange}
          placeholder="Enter Reason for Visit"
        />
      
      <input
  type="text"
  value={doctorId}
  readOnly
  placeholder="Enter Doctor ID"
/>
        <button onClick={this.createAppointment}>Submit</button>
      </div>
    );
  }
}
