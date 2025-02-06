import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../../services/employee.services";
import { useAuth } from "../../../context/AuthContext";

const DeleteEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee: authEmployee } = useAuth();
  const token = authEmployee ? authEmployee.employee_token : null;

  useEffect(() => {
    if (employeeId && token) {
      employeeService.getSingleEmployee(employeeId, token)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          return res.json();
        })
        .then((data) => {
          setEmployee(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [employeeId, token]);

  const handleDelete = () => {
    if (token) {
      employeeService.deleteEmployee(employeeId, token)
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          navigate("/admin/employees"); // Redirect to employee list after successful deletion
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/employees"); // Redirect to employee list if cancelled
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Delete Employee</h2>
        </div>
        <p>Are you sure you want to delete {employee.employee_first_name} {employee.employee_last_name}?</p>
        <div className="d-flex justify-content-center gap-3"> {/* Center buttons */}
          <button className="theme-btn btn-style-one" onClick={handleDelete}>Yes, Delete</button>
          <button className="theme-btn btn-style-one" onClick={handleCancel}>No, Cancel</button>
        </div>
      </div>
    </section>
  );
};

export default DeleteEmployee;
