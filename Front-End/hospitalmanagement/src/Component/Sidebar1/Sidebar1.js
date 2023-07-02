import React from 'react'
import './Sidebar1.css'
import { Link } from 'react-router-dom';

function Sidebar1() {
  return (
    <div>
      <div>
      <div class="vertical-nav bg-white" id="sidebar">
        <div class="py-4 px-3 mb-4 bg-light">
          <div class="media d-flex align-items-center">
            <div class="media-body">
              <h4 class="m-0">Hospital Management</h4>
              <p class="font-weight-light text-muted mb-0">Admin Panel</p>
            </div>
          </div>
        </div>

        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

        <ul class="nav flex-column bg-white mb-0">
          <li class="nav-item li">
            <Link to='/doctor' class="nav-link text-dark font-italic bg-light">
              <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Doctor
            </Link>
          </li>
          <li class="nav-item li">
            <Link to='/patient' class="nav-link text-dark font-italic">
              <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
              Patient
            </Link>
          </li>
          <li class="nav-item li">
            <Link to='/AdminApproval' class="nav-link text-dark font-italic">
              <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
              Approval
            </Link>
          </li>
          <li class="nav-item li">
            <Link to='AppointmentApproval' class="nav-link text-dark font-italic">
              <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Appointment
            </Link>
          </li>
          <li class="nav-item li">
            <Link to='DiagnosePost' class="nav-link text-dark font-italic">
              <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Diagnose
            </Link>
          </li>
        </ul>

        <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">CRUD</p>

        <ul class="nav flex-column bg-white mb-0">
          <li class="nav-item li">
          <Link to='/DoctorPost' class="nav-link text-dark font-italic bg-light">
              <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Doctor
            </Link>
          </li>
          <li class="nav-item li">
          <Link to='/patientPost' class="nav-link text-dark font-italic">
              <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
              Patient
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Sidebar1
