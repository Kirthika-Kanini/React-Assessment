import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login'
import Sidebar from './Component/Sidebar/Sidebar';
import Approval from './Component/Approval/Approval'
import AdminApproval from './Component/Approval/AdminApproval';
import OtpVerify from './Component/OtpVerifictaion/Otpverify';
import Doctor from './Component/Doctor/Doctor'
import DoctorPost from './Component/Doctor/DoctorPost'
import Patient from './Component/Patient/Patient'
import PatientPost from './Component/Patient/PatientPost';
import DiagnoseFetch from './Component/Diagnose/DiagnoseFetch';
import { Appointment } from './Component/Appointment/Appointment';
import  {DiagnosePost}  from './Component/Diagnose/DiagnosePost';
import { AppointmentPost } from './Component/Appointment/AppointmentPost'
import  AppointmentView  from './Component/Appointment/AppointmentView'
import AppointmentApproval from './Component/Approval/AppointmentApproval';
import { AppointmentStatus } from './Component/Appointment/AppointmentStatus';
import Sidebar1 from './Component/Sidebar1/Sidebar1';
import PatientUser from './Component/UserSide/PatientUser';
import DoctorUser from './Component/UserSide/DoctorUser';
import Navbar1 from './Component/Navbar1/Navbar1';
import Home from './Component/UserSide/Home'
function App() {
  const shouldRenderSidebar = location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== '/register' && location.pathname !== '/login'
   && location.pathname !== '/PatientUser'&& location.pathname !== '/patientUser'&& location.pathname !== '/DoctorUser'&& location.pathname !== '/doctorUser'
   && location.pathname !== '/AppointmentPost'&& location.pathname !== '/appointmentPost'&& location.pathname !== '/AppointmentStatus'&& location.pathname !== '/appointmentStatus'
   && location.pathname !== '/Sidebar1' && location.pathname !== '/Diagnosefetch' && location.pathname !== '/Approval' && location.pathname !== '/home' ;

   const shouldRenderSidebar1=location.pathname=='/Diagnosefetch'
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      {shouldRenderSidebar && <Sidebar1 />}
      
      <div className={shouldRenderSidebar ? 'content' : 'content1'}>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Approval" element={<Approval />} />
            <Route path="/AdminApproval" element={<AdminApproval />} />
            <Route path="/Otpverify" element={<OtpVerify />} />
            <Route path="/Doctor" element={<Doctor />}  />
            <Route path="/DoctorPost" element={<DoctorPost/>}/>
            <Route  path="/Patient" element={<Patient/>}/>
            <Route path="/PatientPost" element={<PatientPost/>} />
            <Route path="/Appointment"Component={Appointment}/>
            <Route path="/AppointmentPost" Component={AppointmentPost}/>
            <Route path="/AppointmentView" Component={AppointmentView}/>
            <Route path="/AppointmentApproval" element={<AppointmentApproval/>}/>
            <Route path="/AppointmentStatus" Component={AppointmentStatus}/>
            <Route path="/PatientUser" element={<PatientUser/>} />
            <Route path="/DoctorUser" element={<DoctorUser/>} />
            <Route path="/DiagnosePost" Component={DiagnosePost} />
            <Route path="/sidebar1" Component={Navbar1} />
            <Route path="/DiagnoseFetch" element={<DiagnoseFetch/>} />
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
