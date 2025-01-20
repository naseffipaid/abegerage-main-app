import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
// Import the auth hook  
import { useAuth } from "../../../context/AuthContext";
// Import the date-fns library 
import { format } from 'date-fns'; // To properly format the date on the table 
// Import the getAllEmployees function  
import customerService from "../../../services/customer.services";

// Create the EmployeesList component 
const CustomerList = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data  
  const [customers, setCustomers] = useState([]);
  // A state to serve as a flag to show the error message 
  const [apiError, setApiError] = useState(false);
  // A state to store the error message 
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
//   console.log("employee is", employee)
  let token = null; // To store the token 
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    // Call the getAllEmployees function 
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers.then((res) => {
      if (!res.ok) {
        console.log(res.status);
        setApiError(true);
        if (res.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (res.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      }
      return res.json()
    }).then((data) => {
      if (data.data.length !== 0) {
        setCustomers(data.data)
      }

    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div >
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2 >
              </div >
              < Table striped bordered hover >
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Active</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customer_id}>
                     
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>{format(new Date(customer.customer_added_date), 'MM - dd - yyyy | kk:mm')}</td>
                      <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                      <td>
                        <div className="edit-delete-icons">
                          edit | delete
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table >
            </div >
          </section >
        </>
      )}
    </>
  );
}

// Export the EmployeesList component 
export default CustomerList;