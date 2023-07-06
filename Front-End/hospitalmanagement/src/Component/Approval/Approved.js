import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
function Approved() {
  const [registers, setRegisters] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    } else {
      fetchItems();
    }
  }, [navigate]);
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  const fetchItems = () => {
    axios
      .get(Variables.API_URL + 'Users', {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
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

  const approvedRegisters = registers.filter((register) => register.status === 'approved' && register.role === 'doctor');

  return (
    <div>
      <div className="row">
        {approvedRegisters.map((register) => (
          <div key={register.id} className="col-md-3 mb-3 ">
            <Card>
              <Card.Body>
                <Card.Title>{register.name}</Card.Title>
                <div className="card-text">
                  <p>Email: {register.email}</p>
                  <p>Phone: {register.phone}</p>
                  <p>Country: {register.country}</p>
                  <p>Address: {register.address}</p>
                  <p>Gender: {register.gender}</p>
                  <p>Specialization: {register.specialization}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Approved;
