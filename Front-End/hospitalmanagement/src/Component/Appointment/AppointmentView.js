import React, { useState, useEffect } from "react";
import axios from "axios";
import { Variables } from "../Variable";
import * as XLSX from "xlsx";

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get(Variables.API_URL + "Appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(appointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, "appointments.xlsx");
  };

  return (
    <div className="card-container">
      <button onClick={exportToExcel} className="btn btn-primary mb-3">
        Export to Excel
      </button>
      {appointments.map((appointment) => (
        <div className="card" key={appointment.appointmentId}>
          <div className="card-body">
            <h5 className="card-title">Patient: {appointment.patientName}</h5>
            <p className="card-text">Date: {appointment.date}</p>
            <p className="card-text">Time: {appointment.time}</p>
            <p className="card-text">
              Reason for Visit: {appointment.reasonForVisit}
            </p>
            <p className="card-text">Status: {appointment.status}</p>
            <p className="card-text">Doctor:{appointment.doctor && appointment.doctor.doctorName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentView;
