import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
// Import React Icons  
import { FaEdit, FaTrash } from "react-icons/fa";
// Import the auth hook  
import { useAuth } from "../../../context/AuthContext";
// Import the date-fns library  
import { format } from 'date-fns'; // To properly format the date on the table  
// Import the getAllEmployees function  
import employeeService from "../../../services/employee.services";

// Create the EmployeesList component  
const EmployeesList = () => {
  // Create all the states we need to store the data  
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  useEffect(() => {
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees.then((res) => {
      if (!res.ok) {
        setApiError(true);
        setApiErrorMessage(
          res.status === 401 ? "Please login again" :
          res.status === 403 ? "You are not authorized to view this page" :
          "Please try again later"
        );
      }
      return res.json();
    }).then((data) => {
      if (data.data.length !== 0) {
        setEmployees(data.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Employees</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.active_employee ? "Yes" : "No"}</td>
                    <td>{employee.employee_first_name}</td>
                    <td>{employee.employee_last_name}</td>
                    <td>{employee.employee_email}</td>
                    <td>{employee.employee_phone}</td>
                    <td>{format(new Date(employee.added_date), 'MM-dd-yyyy | kk:mm')}</td>
                    <td>{employee.company_role_name}</td>
                    <td>
                      <div className="edit-delete-icons d-flex gap-3">
                        <Link to={`/editEmployee/${employee.employee_id}`} className="text-primary">
                          <FaEdit size={18} />
                        </Link>
                        <Link to={`/deleteEmployee/${employee.employee_id}`} className="text-danger">
                          <FaTrash size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesList;