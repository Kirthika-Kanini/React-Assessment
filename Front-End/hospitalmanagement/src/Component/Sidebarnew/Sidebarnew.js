import React from 'react'
import './Sidebarnew.css'
import { Link} from 'react-router-dom';
function Sidebarnew() {
    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
      };
  return (
    <div>
      <nav class="main-menu">
            <ul>
                <li>
                    <Link to='/doctor'>
                        <i className="fa fa-code-fork fa-2x"></i>
                        <span className="nav-text">
                        Doctor
                        </span>
                    </Link>
                  
                </li>
                <li class="has-subnav">
                <Link to='/patient'>
                        <i className="	fa fa-group fa-2x"></i>
                        <span className="nav-text">
                            Patient
                        </span>
                    </Link>
                    
                </li>
                <li class="has-subnav">
                <Link to='/AdminApproval'>
                       <i className="fa fa-lock fa-2x"></i>
                        <span className="nav-text">
                          Approval
                        </span>
                    </Link>
                    
                </li>
                <li class="has-subnav">
                <Link to='/AppointmentApproval'>
                       <i className="	fa fa-calendar fa-2x"></i>
                        <span className="nav-text">
                      Appointments
                        </span>
                    </Link>
                   
                </li>
                <li>
                <Link to='/DiagnosePost'>
                        <i className="fa fa-video-camera fa-2x"></i>
                        <span className="nav-text">
                            Diagnose
                        </span>
                    </Link>
                </li>
                <li>
                <Link to='/DoctorPost'>
                        <i className="fa fa-book fa-2x"></i>
                        <span className="nav-text">
                    Doctor Access
                        </span>
                    </Link>
                </li>
                <li>
                <Link to='/Approved'>
                       <i className="fa fa-check-square-o fa-2x"></i>
                        <span className="nav-text">
                            Approved Doctors
                        </span>
                    </Link>
                </li>
               
            </ul>

            <ul class="logout">
                <li>
                <Link onClick={logout} to='/home'>
                         <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                        </Link>
                </li>  
            </ul>
        </nav>
    </div>
  )
}

export default Sidebarnew
