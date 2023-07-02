import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Approval.css';
import emailjs from 'emailjs-com';

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
        sendEmail(updatedRegister.status, updatedRegister.patientEmail);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };
  
  function sendEmail(currentStatus, patientEmail) {
    let bodyt = "";
    // const email = localStorage.getItem('email');

    //setRandomNumber(generatedNumber); // Store the generated number in the state

    if (currentStatus === "Approved") {
      bodyt = "";
    } else {
      bodyt = "Wait please...";
    }

    console.log(bodyt)

    const templateParams = {
      to_name: 'User',
      from_name: 'Kirthika',
      message: `Your appointment status is ${currentStatus} ${bodyt}`,
      to_email: patientEmail
    };

    console.log(templateParams);

    emailjs
      .send('hotelmanagament_service', 'template_agfnema', templateParams, 'cpbIrL9BInAJkmY2k')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  const handleReject = (register) => {
    const updatedRegister = { ...register, status: 'Rejected' };

    axios
      .put(Variables.API_URL + `Appointments/${register.appointmentId}`, updatedRegister)
      .then((response) => {
        console.log('Updated', response.data);
        fetchItems();
        sendEmail(updatedRegister.status, updatedRegister.patientEmail);
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
        sendEmail(updatedRegister.status, updatedRegister.patientEmail);
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
        sendEmail(updatedRegister.status, updatedRegister.patientEmail);
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
          <p>Email: {register.patientEmail}</p>
          <p>Reason for Visit: {register.reasonForVisit}</p>
          <p>Status: {register.status}</p>
          
          <div className='card-actions'>
            <div className="button-row">
              <button className="" onClick={() => handleAccept(register)}>
                Accept
              </button>
              <button className="" onClick={() => handleReject(register)}>
                Reject
              </button>
            </div>
            <div className="button-row">
              <button className="" onClick={() => handleCallStatus(register)}>
                CallStat
              </button>
              <button className="" onClick={() => handleWaitlisted(register)}>
                Waitlisted
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentApproval;
