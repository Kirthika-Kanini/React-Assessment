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
function App() {
  const shouldRenderSidebar = location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== '/register' && location.pathname !== '/login';
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      {shouldRenderSidebar && <Sidebar />}
      <div className={shouldRenderSidebar ? 'content' : 'content1'}>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Approval" element={<Approval />} />
            <Route path="/AdminApproval" element={<AdminApproval />} />
            <Route path="/Otpverify" element={<OtpVerify />} />
            <Route path="/Doctor" element={<Doctor />}  />
            <Route path="/DoctorPost" Component={DoctorPost}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
