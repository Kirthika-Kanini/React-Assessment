import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variables } from '../Variable';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Approved() {
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

  const approvedRegisters = registers.filter((register) => register.status === 'approved' && register.role === 'doctor');

  return (
    <div>
      <div className="row">
        {approvedRegisters.map((register) => (
          <div key={register.id} className="col-md-3 mb-3">
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
