import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Approve.css';

function Approval() {
  const [registers, setRegisters] = useState([]);
  const storedName = localStorage.getItem('name');

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

  const filteredRegisters = registers.filter((register) => register.name === storedName);

  return (
    <div className="userapproval-container">
      {filteredRegisters.map((register, index) => (
        <div key={register.id} className={`usercard ${index % 4 === 0 ? 'userfirst-card' : ''}`}>
          <div className="usercard-content">
            <p className="usercard-title">Hello {register.name}</p>
            
            <p>You Status is {register.status}</p>
            {register.status === 'approved' && (
              <div className='down'>
              <Link to="/Login" className="useraccess-button">Access</Link></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Approval;
