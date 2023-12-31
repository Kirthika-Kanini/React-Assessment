import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate,Link } from 'react-router-dom'; // Replace 'your-routing-library' with the actual routing library you are using
import './Otpverify.css';
function OtpVerify() {
    const digitValidate = function (ele) {
        ele.value = ele.value.replace(/[^0-9]/g, '');
      };
    
      const [randomNumber, setRandomNumber] = useState('');
      const navigate = useNavigate();
    
      const handleGetOTP = () => {
        sendEmail();
      };

// Empty dependency array to trigger the effect only once

  function sendEmail() {
    const email = localStorage.getItem('email');
    const generatedNumber = Math.floor(Math.random() * 9000) + 1000;

    setRandomNumber(generatedNumber); // Store the generated number in the state

    const templateParams = {
      to_name: 'User',
      from_name: 'Kirthika',
      message: 'The OTP is ' + generatedNumber,
      to_email: email
    };

    // console.log(templateParams);

    emailjs
      .send('hotelmanagament_service', 'template_agfnema', templateParams, 'cpbIrL9BInAJkmY2k')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  const tabChange = function (val, event) {
    const ele = document.querySelectorAll('input');

    if (event.key === 'Backspace') {
      if (val > 1 && ele[val - 1].value === '') {
        ele[val - 2].focus();
      } else if (val === 1) {
        // Prevent focusing on the previous cell
        ele[val - 1].value = ''; // Clear the value in the current cell
      } else if (val < ele.length && ele[val - 1].value !== '') {
        ele[val].focus();
      }
    } else if (val < ele.length && ele[val - 1].value !== '') {
      ele[val].focus();
    }

    if (ele[val - 1].value.length > 1) {
      ele[val - 1].value = ele[val - 1].value.slice(0, 1); // Truncate to only one character
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your verification logic here
    const otpInputs = document.querySelectorAll('.otp');
    let otp = '';
    otpInputs.forEach((input) => {
      otp += input.value;
    });
    if (otp === randomNumber.toString()) {
      console.log("Correct otp");
      navigate('/login'); // Navigate to the '/home' route
    } else {
      console.log("Invalid otp");
    }
    console.log('OTP:', otp);
  };
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home" style={{marginLeft:"20px"}}>
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/DoctorUser"  style={{marginLeft:"20px"}}>
                Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AppointmentStatus"  style={{marginLeft:"20px"}}>
                Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DiagnoseFetch"  style={{marginLeft:"20px"}}>
                Diagnose
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    <div className="mobile-container">
    <div className="mobile-screen">
   
        <div className="title">Verify OTP</div>
    <form onSubmit={handleSubmit} className="otp-form">
    <a className='otpclick' onClick={handleGetOTP}>Click here to resend verification code</a>
            <div className="otpbox">
              <input
                className="otp"
                type="text"
                onInput={(e) => digitValidate(e.target)}
                onKeyUp={(e) => tabChange(1, e)}
                maxLength="1"
              />
              <input
                className="otp"
                type="text"
                onInput={(e) => digitValidate(e.target)}
                onKeyUp={(e) => tabChange(2, e)}
                maxLength="1"
              />
              <input
                className="otp"
                type="text"
                onInput={(e) => digitValidate(e.target)}
                onKeyUp={(e) => tabChange(3, e)}
                maxLength="1"
              />
              <input
                className="otp"
                type="text"
                onInput={(e) => digitValidate(e.target)}
                onKeyUp={(e) => tabChange(4, e)}
                maxLength="1"
              />
  
              <button type="submit" className="customBtn">
                Verify
              </button>
            </div>
          </form>
      <div className="home-button">
        <button></button>
      </div>
    </div>
  </div></div>
  );
};

export default OtpVerify;
