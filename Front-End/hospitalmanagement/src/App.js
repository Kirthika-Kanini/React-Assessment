import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login'
import Sidebar from './Component/Sidebar/Sidebar';
import Approval from './Component/Approval/Approval'
import AdminApproval from './Component/Approval/AdminApproval';
import OtpVerify from './Component/OtpVerifictaion/Otpverify';
function App() {
  return (
    <div className="App">
  <ToastContainer></ToastContainer>
     <BrowserRouter>
     <Routes>
 
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
    <Route path="/Sidebar" element={<Sidebar/>}></Route>
   <Route path="/Approval" element={<Approval/>}></Route>
   <Route path="/AdminApproval" element={<AdminApproval/>}></Route>
   <Route path="/Otpverify" element={<OtpVerify/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
