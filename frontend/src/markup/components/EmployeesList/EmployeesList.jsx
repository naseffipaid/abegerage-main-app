import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { format } from 'date-fns';
import employeeService from "../../../services/employee.services";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
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
  }, [token]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(employees.length / employeesPerPage);

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
                {currentEmployees.map((employee) => (
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

            {/* Pagination Controls */}
            <div className="pagination-container d-flex justify-content-between align-items-center">
              <Button 
                disabled={currentPage === 1} 
                onClick={() => paginate(currentPage - 1)} 
                className="pagination-button"
              >
                Previous
              </Button>
              <div className="page-buttons-container d-flex">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button 
                disabled={currentPage === totalPages} 
                onClick={() => paginate(currentPage + 1)} 
                className="pagination-button"
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EmployeesList;