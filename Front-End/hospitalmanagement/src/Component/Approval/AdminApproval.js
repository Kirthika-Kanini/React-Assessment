import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Approval.css';
import {  useNavigate } from "react-router-dom";
function AdminApproval() {
  const [registers, setRegisters] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(Variables.API_URL + 'Users')
      .then((response) => {
        if (response.status === 200) {
          const doctors = response.data.filter((user) => user.role === 'doctor');
          setRegisters(doctors);
        } else {
          throw new Error('Failed to fetch registers');
        }
      })
      .catch((error) => {
        console.error('Error fetching registers:', error);
        toast.error('Error fetching registers:', error.message);
      });
  };

  const handleAccept = (registerId, currentStatus) => {
    const updatedStatus = 'approved';
  
    // Assign the fields to variables
    const { id, name, email, password, role, phone, country, address, gender, specialization } = registers.find(register => register.id === registerId);
  
    // Update the status in the database
    axios
      .put(Variables.API_URL + `Users/${registerId}`, { id, name, email, password, role, phone, country, address, gender, specialization, status: updatedStatus })
      .then((response) => {
        // Handle successful update
        console.log('Status updated successfully');
        navigate('/DoctorPost');
        // You can also update the local state if needed
        // Example: Update the status locally
        const updatedRegisters = registers.map((register) => {
          if (register.id === registerId) {
            return { ...register, status: updatedStatus };
          }
          return register;
        });
        setRegisters(updatedRegisters);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        toast.error('Error updating status:', error.message);
      });
  };

  const handleReject = (registerId, currentStatus) => {
    const updatedStatus = 'rejected';
  
    // Assign the fields to variables
    const { id, name, email, password, role, phone, country, address, gender, specialization } = registers.find(register => register.id === registerId);
  
    // Update the status in the database
    axios
      .put(Variables.API_URL + `Users/${registerId}`, { id, name, email, password, role, phone, country, address, gender, specialization, status: updatedStatus })
      .then((response) => {
        // Handle successful update
        console.log('Status updated successfully');
        // You can also update the local state if needed
        // Example: Update the status locally
        const updatedRegisters = registers.map((register) => {
          if (register.id === registerId) {
            return { ...register, status: updatedStatus };
          }
          return register;
        });
        setRegisters(updatedRegisters);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        toast.error('Error updating status:', error.message);
      });
  };
  
  

  return (
    <div className="approval-containerani">
      {registers.map((register, index) => (
        <div key={register.id} className={`card ${index % 4 === 0 ? 'first-card' : ''}`}>
          <p>Name: {register.name}</p>
          <p>Role: {register.role}</p>
          <p>Specialization: {register.specialization}</p>
          <p>Gender: {register.gender}</p>
          <p>Status: {register.status}</p>
          <div className="button-container">
          <button className="accept-button btn-primary" onClick={() => handleAccept(register.id)}>Accept</button>&nbsp;
          <button className="reject-button btn-primary " onClick={() => handleReject(register.id)}>Reject</button>
        </div>
        </div>
      ))}
    </div>
  );
}

export default AdminApproval