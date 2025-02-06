import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import { format } from 'date-fns';
import customerService from "../../../services/customer.services";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  useEffect(() => {
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers.then((res) => {
      if (!res.ok) {
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
        setCustomers(data.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [token]);

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
              <h2>Customers</h2>
            </div>
            <Table striped bordered hover>
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
                    <td>
                      <Link to={`/admin/customers/${customer.customer_id}`} className="text-dark">
                        {customer.customer_first_name}
                      </Link>
                    </td>
                    <td>{customer.customer_last_name}</td>
                    <td>
                      <Link to={`/admin/customers/${customer.customer_id}`} className="text-dark">
                        {customer.customer_email}
                      </Link>
                    </td>
                    <td>{customer.customer_phone_number}</td>
                    <td>{format(new Date(customer.customer_added_date), 'MM-dd-yyyy | HH:mm')}</td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td>
                    <div className="edit-delete-icons d-flex gap-2"> {/* Added flexbox for spacing */}
                        <Link to={`/editCustomer/${customer.customer_id}`} className="text-primary"> {/* Link to EditCustomer */}
                          <FaEdit size={18} />
                        </Link>
                        <Link to={`/deleteCustomer/${customer.customer_id}`} className="text-danger"> {/* Link to DeleteCustomer */}
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
}

export default CustomerList;