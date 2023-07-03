import React from 'react'
import './Sidebar1.css'
import { Link} from 'react-router-dom';

function Sidebar1() {
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
  };
  return (
    <div>
      <div>
      <div className="vertical-nav bg-white" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="media d-flex align-items-center">
            <div className="media-body">
              <h4 className="m-0">Hospital Management</h4>
              <p className="font-weight-light text-muted mb-0">Admin Panel</p>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item li">
            <Link to='/doctor' className="nav-link text-dark font-italic bg-light">
              <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Doctor
            </Link>
          </li>
          <li className="nav-item li">
            <Link to='/patient' className="nav-link text-dark font-italic">
              <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
              Patient
            </Link>
          </li>
          <li className="nav-item li">
            <Link to='/AdminApproval' className="nav-link text-dark font-italic">
              <i className="fa fa-cubes mr-3 text-primary fa-fw"></i>
              Approval
            </Link>
          </li>
          <li className="nav-item li">
            <Link to='AppointmentApproval' className="nav-link text-dark font-italic">
              <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Appointment
            </Link>
          </li>
          <li className="nav-item li">
            <Link to='DiagnosePost' className="nav-link text-dark font-italic">
              <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Diagnose
            </Link>
          </li>
          <li className="nav-item li">
            <Link onClick={logout} to='home' className="nav-link text-dark font-italic">
              <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Logout
            </Link>
          </li>
        </ul>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">ACCESS</p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item li">
          <Link to='/DoctorPost' className="nav-link text-dark font-italic bg-light">
              <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Doctor
            </Link>
          </li>
         
          
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Sidebar1
