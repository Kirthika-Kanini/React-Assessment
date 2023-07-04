import React, { useState, useEffect } from 'react';
import image1 from './image-1.png';
import image2 from './image-2.png';
import image4 from './image-4.png';
import './Login.css';
import './ToastStyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [admin_name, setName] = useState('');
  const [admin_password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLoginUsingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      const inputObj = { admin_name: admin_name, admin_password: admin_password };

      fetch('https://localhost:7224/api/Token/Admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputObj),
      })
        .then((res) => {
          if (res.ok) {
            return res.text();
          } else {
            throw new Error('Invalid Credentials');
          }
        })
        .then((resp) => {
          console.log(resp);
          toast.success('Success');

          // Store the token in a cookie
          document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
         localStorage.setItem('token', resp)
          localStorage.setItem('name', admin_name);
       
          navigate('/AdminApproval');
        })
        .catch((err) => {
          toast.error('Login Failed due to: ' + err.message);
        });
    }
  };
  

  // Function to calculate the expiration date for the cookie (e.g., 10 minutes from now)
  const getCookieExpirationDate = () => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30); // Set expiration to 10 minutes from now
    return expirationDate.toUTCString();
  };

  const validate = () => {
    let result = true;
    if (admin_name === '' || admin_name === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (admin_password === '' || admin_password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <img src={image1} alt="" className="image-1" />
        <form onSubmit={proceedLoginUsingAPI} className="form">
          <h3>New Account?</h3>
          <div className="col">
            <div className="form-group">
              <label>User Name <span className="errmsg">*</span></label>
              <input
                value={admin_name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label>Password <span className="errmsg">*</span></label>
              <input
                type="password"
                value={admin_password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="button">Login</button>
          </div>

        </form>
        <img src={image4} alt="" className="image-2" />
      </div>
    </div>
  );
}

export default LoginAdmin;
