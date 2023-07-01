import React, { useState, useEffect } from 'react'
import image1 from './image-1.png'
import image2 from './image-2.png'
import './Login.css'
import './ToastStyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('patient');

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    
    const proceedLoginUsingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            const inputObj = { name: name, password: password };
            const url = `https://localhost:7224/api/Token/${role}`;

            fetch(url, {
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
                    localStorage.setItem('email', email)
                    localStorage.setItem('name', name);
                    navigate('/home');
                })
                .catch((err) => {
                    toast.error('Login Failed due to: ' + err.message);
                });
        }
    };



    // Function to calculate the expiration date for the cookie (e.g., 10 minutes from now)
    const getCookieExpirationDate = () => {
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 10); // Set expiration to 10 minutes from now
        return expirationDate.toUTCString();
    };


    const validate = () => {
        let result = true;
        if (name === '' || name === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    };

    return (
        <div className="wrapper">
            <div className="inner">
                <img src={image1} alt="" className="image-1" />
                <form onSubmit={proceedLoginUsingAPI} className='form'>
                    <h3>New Account?</h3>
                    <div className="col">
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label>Email <span className="errmsg">*</span></label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label>Password <span className="errmsg">*</span></label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="role"
                                id="patientRole"
                                value="user"
                                checked={role === 'patient'}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-check-input"
                            />
                            <label htmlFor="patientRole" className="form-check-label">Patient</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="role"
                                id="doctorRole"
                                value="doctor"
                                checked={role === 'doctor'}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-check-input"
                            />
                            <label htmlFor="doctorRole" className="form-check-label">Doctor</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="button ">Login</button>
                        Create an Account New Account <Link className="" to="/register">Register</Link>
                    </div>

                </form>
                <img src={image2} alt="" className="image-2" />
            </div>

        </div>
    )
}

export default Login