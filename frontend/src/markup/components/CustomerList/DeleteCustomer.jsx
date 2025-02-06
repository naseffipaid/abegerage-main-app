import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../../services/customer.services";
import { useAuth } from "../../../context/AuthContext";

const DeleteCustomer = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee: authEmployee } = useAuth();
  const token = authEmployee ? authEmployee.employee_token : null;

  useEffect(() => {
    if (customerId && token) {
      customerService.getSingleCustomer(token, customerId)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          return res.json();
        })
        .then((data) => {
          setCustomer(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [customerId, token]);

  const handleDelete = () => {
    if (token) {
      customerService.deleteCustomer(customerId, token)
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          navigate("/admin/customers"); // Redirect to customer list after successful deletion
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/customers"); // Redirect to customer list if cancelled
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Delete Customer</h2>
        </div>
        <p>Are you sure you want to delete {customer.customer_first_name} {customer.customer_last_name}?</p>
        <div className="d-flex justify-content-center gap-3"> {/* Center buttons */}
          <button className="theme-btn btn-style-one" onClick={handleDelete}>Yes, Delete</button>
          <button className="theme-btn btn-style-one" onClick={handleCancel}>No, Cancel</button>
        </div>
      </div>
    </section>
  );
};

export default DeleteCustomer;
