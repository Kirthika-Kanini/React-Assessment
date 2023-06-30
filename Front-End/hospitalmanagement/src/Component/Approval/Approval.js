import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Approval.css';

function Approval() {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get(Variables.API_URL + 'Users')
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

  return (
    <div className="approval-container">
      {registers.map((register, index) => (
        <div key={register.id} className={`card ${index % 4 === 0 ? 'first-card' : ''}`}>
          <p>Name: {register.name}</p>
          <p>Role: {register.role}</p>
          <p>Specialization: {register.specialization}</p>
          <p>Gender: {register.gender}</p>
          <p>Status: {register.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Approval;
