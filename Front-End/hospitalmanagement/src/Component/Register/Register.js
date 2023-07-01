import React, { useState, useEffect } from 'react';
import image1 from './image-1.png';
import image2 from './image-2.png';
import './Register.css';
import { toast } from 'react-toastify';
import './ToastStyles.css';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
	const navigate = useNavigate();

	const [scrollDisabled, setScrollDisabled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollDisabled) {
				window.scrollTo(0, 0);
			}
		};

		if (scrollDisabled) {
			document.body.style.overflow = 'hidden';
			window.addEventListener('scroll', handleScroll);
		} else {
			document.body.style.overflow = 'auto';
			window.removeEventListener('scroll', handleScroll);
		}
		return () => {
			document.body.style.overflow = 'auto';
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrollDisabled]);

	const disableScroll = () => {
		setScrollDisabled(true);
	};

	const enableScroll = () => {
		setScrollDisabled(false);
	};

	useEffect(() => {
		disableScroll();
	})


	const [name, namechange] = useState("");
	const [password, passwordchange] = useState("");
	const [email, emailchange] = useState("");
	const [phone, phonechange] = useState("");
	const [country, countrychange] = useState("India");
	const [address, addresschange] = useState("");
	const [gender, genderchange] = useState("");
	const [role, rolechange] = useState("");
	const [status, statuschange] = useState("");
	const [specialization, specializationchange] = useState("");

	const IsValidate = () => {
		let isproceed = true;
		let errormessage = 'Please enter the value in ';
		// if (id === null || id === '') {
		//     isproceed = false;
		//     errormessage += ' Username';
		// }
		if (name === null || name === '') {
			isproceed = false;
			errormessage += ' Fullname';
		}
		if (role === null || role === '') {
			isproceed = false;
			errormessage += ' Role';
		}
		if (password === null || password === '') {
			isproceed = false;
			errormessage += ' Password';
		}
		if (email === null || email === '') {
			isproceed = false;
			errormessage += ' Email';
		}

		if (!isproceed) {
			toast.warning(errormessage)
		} else {
			if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

			} else {
				isproceed = false;
				toast.warning('Please enter the valid email')
			}
		}
		return isproceed;
	}

	const handlesubmit = (e) => {
		e.preventDefault();
		let regobj = { name, password, email, phone, country, address, gender, role, status, specialization };
		console.log(JSON.stringify(regobj));
		if (IsValidate()) {
			localStorage.setItem('name', name);
			fetch('https://localhost:7224/api/Users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(regobj),
			})
				.then((res) => {
					toast.success('Registered Successfully', {
						toastStyle: {
							background: 'green',
						},
						bodyStyle: {
							fontSize: '20px',
						},
						progressStyle: {
							background: 'white',
						},
					});

					// Check the user's role and navigate accordingly
					if (role === 'patient') {
						navigate('/login');
					} else if (role === 'doctor') {
						navigate('/Approval');
					}
				})
				.catch((err) => {
					toast.error('Failed: ' + err.message, {
						toastStyle: {
							background: 'red',
						},
						bodyStyle: {
							fontSize: '16px',
						},
						progressStyle: {
							background: 'white',
						},
					});
				});
		}
	};

	return (
		<div className="wrapper">
			<div className="inner">
				<img src={image1} alt="" className="image-1" />
				<form onSubmit={handlesubmit} className='form'>
					<h3>New Account?</h3>
					<div className="col">
						<div className="form-group">
							<label>Full Name <span className="errmsg">*</span></label>
							<input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
						</div>
					</div>

					<div className="col">
						<div className="form-group">
							<label>Password <span className="errmsg">*</span></label>
							<input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
						</div>
					</div>
					<div className="col">
						<div className="form-group">
							<label>Email <span className="errmsg">*</span></label>
							<input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
						</div>
					</div>
					<div className="col">
						<div className="form-group">
							<label>Phone <span className="errmsg"></span></label>
							<input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
						</div>
					</div>
					<div className="col">
						<div className="form-group">
							<label>Country <span className="errmsg">*</span></label>
							<input value={country} onChange={e => countrychange(e.target.value)} className="form-control"></input>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="form-group">
							<label>Address <span className="errmsg">*</span></label>
							<textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
						</div>
					</div>
					
					<div className="col-lg-12">
						<div className="form-group">
							<label>Role <span className="errmsg">*</span></label>
							<select value={role} onChange={e => {
								rolechange(e.target.value);
								if (e.target.value === "patient") {
									statuschange("approved");
								}
								else{
									statuschange("requested")
								}
							}} className="form-control">
								<option value="">Select Role</option>
								<option value="patient">Patient</option>
								<option value="doctor">Doctor</option>
							</select>
						</div>
					</div>
					{role === 'doctor' && (
						<div className="col-lg-12">
							<div className="form-group">
								<label>Specialization <span className="errmsg">*</span></label>
								<input  value={specialization} onChange={e => specializationchange(e.target.value)} className="form-control"></input>
							</div>
						</div>
					)}
					<div className="col-lg-6">
						<div className="form-group">
							<label>Gender <span className="errmsg">*</span></label>
							<br></br>
							<input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
							<label>Male</label>
							<input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
							<label>Female</label>
						</div>
					</div>
					<div className="card-footer">
						<button type="submit" className="button ">Register</button>
						Already have an account? <Link to={'/login'} className="">Login</Link>
					</div>

				</form>
				<img src={image2} alt="" className="image-2" />
			</div>

		</div>
	)
}

export default Register;
