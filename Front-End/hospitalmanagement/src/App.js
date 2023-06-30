import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login'
function App() {
  return (
    <div className="App">
  <ToastContainer></ToastContainer>
     <BrowserRouter>
     <Routes>
 
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>

   
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
