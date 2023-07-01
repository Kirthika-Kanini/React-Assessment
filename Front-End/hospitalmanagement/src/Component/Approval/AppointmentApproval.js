import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Approval.css';

function AppointmentApproval() {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(Variables.API_URL + 'Appointments')
      .then((response) => {
        if (response.status === 200) {
          setRegisters(response.data);
        } else {
          throw new Error('Failed to fetch registers');
        }
      })
      .catch((error) => {
        console.error('Error fetching registers:', error);
        toast.error('Error fetching registers:', error.message);
      });
  };

  const handleAccept = (register) => {
    const updatedRegister = { ...register, status: 'Approved' };

    axios
      .put(Variables.API_URL + `Appointments/${register.appointmentId}`, updatedRegister)
      .then((response) => {
        console.log('Updated', response.data);
        fetchItems();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleReject = (register) => {
    const updatedRegister = { ...register, status: 'Rejected' };

    axios
      .put(Variables.API_URL + `Appointments/${register.appointmentId}`, updatedRegister)
      .then((response) => {
        console.log('Updated', response.data);
        fetchItems();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleCallStatus = (register) => {
    const updatedRegister = { ...register, status: 'Callstat' };

    axios
      .put(Variables.API_URL + `Appointments/${register.appointmentId}`, updatedRegister)
      .then((response) => {
        console.log('Updated', response.data);
        fetchItems();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleWaitlisted = (register) => {
    const updatedRegister = { ...register, status: 'Waitlisted' };

    axios
      .put(Variables.API_URL + `Appointments/${register.appointmentId}`, updatedRegister)
      .then((response) => {
        console.log('Updated', response.data);
        fetchItems();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  return (
    <div className="approval-container">
      {registers.map((register, index) => (
        <div key={register.appointmentId} className={`card ${index % 4 === 0 ? 'first-card' : ''}`}>
          <p>Name: {register.patientName}</p>
          <p>Date: {register.date}</p>
          <p>Time: {register.time}</p>
          <p>Reason for Visit: {register.reasonForVisit}</p>
          <p>Status: {register.status}</p>
          <div className="button-container">
            <button className="accept-button" onClick={() => handleAccept(register)}>
              Accept
            </button><br/>
            <button className="reject-button" onClick={() => handleReject(register)}>
              Reject
            </button></div>
            <div className="button-container">
            <button className="callstat-button" onClick={() => handleCallStatus(register)}>
              Call Status
            </button><br/>
            <button className="waitlisted-button" onClick={() => handleWaitlisted(register)}>
              Waitlisted
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentApproval;
