import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orderService from "../../../services/order.services";
import { useAuth } from "../../../context/AuthContext";

const DeleteOrder = () => {
  const { orderHash } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee: authEmployee } = useAuth();
  const token = authEmployee ? authEmployee.employee_token : null;

  useEffect(() => {
    if (orderHash && token) {
      orderService.getSingleOrder(token, orderHash)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          return res.json();
        })
        .then((data) => {
          console.log(data)  
          setOrder(data?.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [orderHash, token]);

  const handleDelete = () => {
    if (token) {
      orderService.deleteOrder(orderHash, token)
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          navigate("/admin/orders"); // Redirect to order list after successful deletion
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleCancel = () => {
    navigate("/admin/orders"); // Redirect to order list if cancelled
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Delete Service</h2>
        </div>   
        <p>Are you sure you want to delete orders of <strong>{order.customer_first_name} {order.customer_last_name}</strong> ?</p>
        <div className="d-flex justify-content-center gap-3"> {/* Center buttons */}
          <button className="theme-btn btn-style-one" onClick={handleDelete}>Yes, Delete</button>
          <button className="theme-btn btn-style-one" onClick={handleCancel}>No, Cancel</button>
        </div>
      </div>
    </section>
  );
};

export default DeleteOrder;