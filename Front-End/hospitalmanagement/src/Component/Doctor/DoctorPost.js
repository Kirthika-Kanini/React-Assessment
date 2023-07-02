import React, { useState, useEffect } from "react";
import { Variables } from '../Variable';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from "axios";

const DoctorPost = () => {
    const[doctorId,setDoctorId]=useState(0)
  const [doctorName, setDoctorName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(0);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [tesimonials, setTesimonials] = useState("");
  const [specialization,setSpecialization]=useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get(Variables.API_URL + "Doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "doctorName") setDoctorName(value);
    else if (name === "gender") setGender(value);
    else if (name === "phone") setPhone(value);
    else if (name === "email") setEmail(value);
    else if (name === "experience") setExperience(Number(value));
    else if (name === "licenseNumber") setLicenseNumber(value);
    else if (name === "tesimonials") setTesimonials(value);
    else if (name === "specialization") setSpecialization(value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("doctorName", doctorName);
    formData.append("imageFile", imageFile);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("experience", experience);
    formData.append("licenseNumber", licenseNumber);
    formData.append("tesimonials", tesimonials);
    formData.append("specialization",specialization);
  
    if (selectedDoctor) {
      axios
        .put(Variables.API_URL + `Doctors/${selectedDoctor.doctorId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Doctor updated:", response.data);
          // Perform any necessary actions after successful update
          fetchDoctors(); // Fetch updated list of doctors
          resetForm(); // Reset the form
        })
        .catch((error) => {
          console.error("Error", error);
          // Handle the error appropriately
        });
    }else {
        axios
          .post(Variables.API_URL + "Doctors", formData)
          .then((response) => {
            console.log("Doctor created:", response.data);
            // Perform any necessary actions after successful creation
            fetchDoctors(); // Fetch updated list of doctors
            resetForm(); // Reset the form
          })
          .catch((error) => {
            console.error("Error", error);
            // Handle the error appropriately
          });
      }
    };

  const handleUpdate = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorName(doctor.doctorName);
    setImageFile(null);
    setGender(doctor.gender);
    setPhone(doctor.phone);
    setEmail(doctor.email);
    setExperience(doctor.experience);
    setLicenseNumber(doctor.licenseNumber);
    setTesimonials(doctor.tesimonials);
    setSpecialization(doctor.specialization);
  };
  
  const resetForm = () => {
    setSelectedDoctor(null);
    setDoctorName("");
    setImageFile(null);
    setGender("");
    setPhone("");
    setEmail("");
    setExperience(0);
    setLicenseNumber("");
    setTesimonials("");
    setSpecialization("");
  };
  const handleDelete = (doctorId) => {
    axios
      .delete(Variables.API_URL + `Doctors/${doctorId}`)
      .then((response) => {
        console.log("Doctor deleted:", response.data);
        // Perform any necessary actions after successful deletion
        fetchDoctors(); // Fetch updated list of doctors
      })
      .catch((error) => {
        console.error("Error", error);
        // Handle the error appropriately
      });
  };
  return (
    <div className="container-fluid">
      <br />
      <h2>Create Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            className="form-control"
            value={doctorName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            className="form-control"
            value={gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleInputChange}
            required
          />
          
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            className="form-control"
            value={experience}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            className="form-control"
            value={licenseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tesimonials</label>
          <input
            type="text"
            name="tesimonials"
            className="form-control"
            value={tesimonials}
            onChange={handleInputChange}
            required
          />
        </div>   <div className="form-group">
          <label>Specialization</label>
          <input
            type="text"
            name="specialization"
            className="form-control"
            value={specialization}
            onChange={handleInputChange}
            required
          />
          
        </div><br/>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="imageFile"
            className="form-control-file"
            onChange={handleImageChange}
            required
          />
        </div><br/>
        <div className="form-group">
        <button type="submit" className="btn btn-primary">
          {selectedDoctor ? "Update" : "Create"}
        </button></div>
      </form>

      <h2>Doctor List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Experience</th>
            <th>License Number</th>
            <th>Tesimonials</th>
            <th>Video</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.doctorName}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.email}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.licenseNumber}</td>
              <td>{doctor.tesimonials}</td>
              <td>{doctor.specialization}</td>
              <td>
                <img
                  src={`https://localhost:7224/uploads/doctor/${doctor.docImagePath}`}
                  className="card-img-top"
                  alt="Doctor"
                  style={{ height: "20px", objectFit: "cover" }}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(doctor)}>Update</button></td>
              <td>  <button onClick={() => handleDelete(doctor.doctorId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPost;
