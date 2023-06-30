import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBox, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button className="nav-button active">
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            Doctor
          </button>
        </li>
        <li>
          <button className="nav-button">
            <FontAwesomeIcon icon={faUsers} className="nav-icon" />
            Patients
          </button>
        </li>
        <li>
          <button className="nav-button">
            <FontAwesomeIcon icon={faBox} className="nav-icon" />
            Appointments
          </button>
        </li>
        <li>
          <button className="nav-button">
            <FontAwesomeIcon icon={faCog} className="nav-icon" />
            Settings
          </button>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
