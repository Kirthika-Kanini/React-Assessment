import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Sidebar from './Component/Sidebar/Sidebar';
import Approval from './Component/Approval/Approval';
import AdminApproval from './Component/Approval/AdminApproval';
import OtpVerify from './Component/OtpVerifictaion/Otpverify';
import Doctor from './Component/Doctor/Doctor';
import DoctorPost from './Component/Doctor/DoctorPost';
import Patient from './Component/Patient/Patient';
import PatientPost from './Component/Patient/PatientPost';
import DiagnoseFetch from './Component/Diagnose/DiagnoseFetch';
import { Appointment } from './Component/Appointment/Appointment';
import  DiagnosePost  from './Component/Diagnose/DiagnosePost';
import AppointmentPost  from './Component/Appointment/AppointmentPost';
import AppointmentView from './Component/Appointment/AppointmentView';
import AppointmentApproval from './Component/Approval/AppointmentApproval';
import { AppointmentStatus } from './Component/Appointment/AppointmentStatus';
import Sidebar1 from './Component/Sidebar1/Sidebar1';
import PatientUser from './Component/UserSide/PatientUser';
import DoctorUser from './Component/UserSide/DoctorUser';
import Navbar1 from './Component/Navbar1/Navbar1';
import Home from './Component/UserSide/Home';
import Approved from './Component/Approval/Approved';
import UniqueAppointment from './Component/Appointment/UniqueAppointment';
import Sidebarnew from './Component/Sidebarnew/Sidebarnew';
import LoginAdmin from './Component/Login/LoginAdmin';
import ProtectedApproval from './Component/ProtectedRoute/ProtectedApproval';
import './App.css';
import Logout from './Component/Logout';

function App() {

  const [isOpen, setIsOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const shouldRenderSidebar = location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== '/register' && location.pathname !== '/login'
   && location.pathname !== '/PatientUser'&& location.pathname !== '/patientUser'&& location.pathname !== '/DoctorUser'&& location.pathname !== '/doctorUser'
   && location.pathname !== '/AppointmentPost'&& location.pathname !== '/appointmentPost'&& location.pathname !== '/AppointmentStatus'&& location.pathname !== '/appointmentStatus'
   && location.pathname !== '/Sidebar1' && location.pathname !== '/Diagnosefetch' && location.pathname !== '/Approval' && location.pathname !== '/home'&& location.pathname !== '/Home'
   && location.pathname !== '/patientPost'&& location.pathname !== '/patientPost' && location.pathname !== '/UniqueAppointment' && location.pathname !== '/Otpverify'
   && location.pathname !== '/otpverify' && location.pathname !== '/LoginAdmin' && location.pathname !== '/approval' ;
   const token = localStorage.getItem("token");
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
      {shouldRenderSidebar && (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
          <Sidebarnew onToggle={handleSidebarToggle} />
        </div>
      )}
      <div className={`${shouldRenderSidebar ? 'content' : 'content1'} ${isOpen ? 'open' : 'closed'}`}>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path='/AdminApproval' element={<ProtectedApproval token={token}><AdminApproval/></ProtectedApproval>}/>
             <Route path="/Approval" element={<Approval />} />
            {/* <Route path="/AdminApproval" element={<AdminApproval />} /> */}
            <Route path="/Otpverify" element={<OtpVerify />} />
            <Route path="/Doctor" element={<Doctor />} />
            <Route path="/DoctorPost" element={<DoctorPost />} />
            <Route path="/Patient" element={<Patient />} />
            <Route path="/PatientPost" element={<PatientPost />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/AppointmentPost" element={<AppointmentPost />} />
            <Route path="/AppointmentView" element={<AppointmentView />} />
            <Route path="/AppointmentApproval" element={<AppointmentApproval />} />
            <Route path="/AppointmentStatus" element={<AppointmentStatus />} />
            <Route path="/PatientUser" element={<PatientUser />} />
            <Route path="/DoctorUser" element={<DoctorUser />} />
            <Route path="/DiagnosePost" element={<DiagnosePost/>} />
            <Route path="/Sidebar1" element={<Sidebar1 />} />
            <Route path="/DiagnoseFetch" element={<DiagnoseFetch />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Approved" element={<Approved />} />
            <Route path="/UniqueAppointment" element={<UniqueAppointment />} />
            <Route path="/Sidebarnew" element={<Sidebarnew />} />
            <Route path="/LoginAdmin" element={<LoginAdmin />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
