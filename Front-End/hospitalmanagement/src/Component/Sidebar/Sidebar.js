import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBox, faCog } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button className="nav-button active">
            <Link to="/doctor" className="nav-link">
              <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
              Doctor
            </Link>
          </button>
        </li>
        <li>
          <button className="nav-button">
            <Link to="/patient" className="nav-link">
              <FontAwesomeIcon icon={faUsers} className="nav-icon" />
              Patients
            </Link>
          </button>
        </li>
        <li>
          <button className="nav-button">
            <Link to="/appointmentview" className="nav-link">
              <FontAwesomeIcon icon={faBox} className="nav-icon" />
              Appointments
            </Link>
          </button>
        </li>
        <li>
          <button className="nav-button">
            <Link to="/settings" className="nav-link">
              <FontAwesomeIcon icon={faCog} className="nav-icon" />
              Settings
            </Link>
          </button>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
