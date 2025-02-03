import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../../../services/employee.services";
import { useAuth } from "../../../context/AuthContext";

function EditEmployee() {
  const { employeeId } = useParams();
  const [employee_email, setEmail] = useState(''); // Initialize with empty string
  const [employee_first_name, setFirstName] = useState(''); // Initialize with empty string
  const [employee_last_name, setLastName] = useState(''); // Initialize with empty string
  const [employee_phone, setPhoneNumber] = useState(''); // Initialize with empty string
  const [company_role_name, setCompany_role_name] = useState(1);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (employeeId && token) {
      employeeService.getSingleEmployee(employeeId, token)
        .then((res) => {
          if (!res.ok) { // Check for HTTP errors
            return res.json().then(err => {throw new Error(err.error || "Server error")}); // Throw error to be caught
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.data) { // Check if data and data.data exist
            setEmail(data.data.employee_email || ''); // Provide default if data.data.employee_email is missing
            setFirstName(data.data.employee_first_name || '');
            setLastName(data.data.employee_last_name || '');
            setPhoneNumber(data.data.employee_phone || '');
            setCompany_role_name(data.data.company_role_id || 1); // Default role if missing
          } else if(data && data.error) {
            setServerError(data.error)
          } else {
            setServerError("Invalid or missing employee data from API");
          }
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
          setServerError(error.message); // Set the error message
        });
    }
  }, [employeeId, token]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_name,
    };

    employeeService.updateEmployee(employeeId, updatedData, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError('');
        }
      })
      .catch(() => {
        setServerError("Error updating employee");
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleUpdate}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                      {success && <div className="validation-success" role="alert">Employee updated successfully!</div>}
                      <input type="email" value={employee_email} onChange={e => setEmail(e.target.value)} placeholder="Employee email" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" value={employee_first_name} onChange={e => setFirstName(e.target.value)} placeholder="Employee first name" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" value={employee_last_name} onChange={e => setLastName(e.target.value)} placeholder="Employee last name" required />
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" value={employee_phone} onChange={e => setPhoneNumber(e.target.value)} placeholder="Employee phone (555-555-5555)" required />
                    </div>
                    <div className="form-group col-md-12">
                      <select value={company_role_name} onChange={e => setCompany_role_name(e.target.value)} className="custom-select-box">
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit"><span>Update Employee</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployee;