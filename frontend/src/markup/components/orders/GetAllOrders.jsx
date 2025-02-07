import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa"; // Import FaTrash for delete icon
import { useAuth } from "../../../context/AuthContext";
import orderService from "../../../services/order.services";
import { Link } from "react-router";

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getAllOrders(token);
        const data = await res.json();

        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setOrders(data.data);
          setApiError(false);
        } else {
          setOrders([]);
        }

        if (res.status === 401) {
          setApiError(true);
          setApiErrorMessage("Unauthorized: Please log in again.");
        } else if (res.status === 403) {
          setApiError(true);
          setApiErrorMessage("Forbidden: You do not have access.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setApiError(true);
        setApiErrorMessage("Something went wrong. Please try again.");
      }
    };

    fetchOrders();
  }, [token]);

  // Function to get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "badge bg-success";
      case "In Progress":
        return "badge bg-warning text-dark";
      case "Received":
        return "badge bg-secondary";
      default:
        return "badge bg-light";
    }
  };

  // **Pagination Logic**
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Function to change page
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">
        Orders <span className="text-danger">____</span>
      </h2>

      <table className="table table-hover table-bordered mt-3">
        <thead className="table-light text-center">
          <tr>
            <th>Order Id</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Order Date</th>
            <th>Received by</th>
            <th>Order Status</th>
            <th>View/Edit</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {apiError ? (
            <tr>
              <td colSpan="7" className="text-danger mt-2">{apiErrorMessage}</td>
            </tr>
          ) : (
            currentOrders.map((order) => (
              <tr key={order.order_id}>
                <td className="align-middle">{order.order_id}</td>
                <td className="text-start p-3">
                  <strong>{order.customer_first_name} {order.customer_last_name}</strong> <br />
                  <span className="text-muted">{order.customer_email}</span> <br />
                  <span className="text-muted">{order.customer_phone_number}</span>
                </td>
                <td className="text-start p-3">
                  <strong>{order.vehicle_make}</strong> <br />
                  {order.vehicle_year} <br />
                  {order.vehicle_tag}
                </td>
                <td className="align-middle">{order.order_date ? new Date(order.order_date).toLocaleDateString("en-US", {year: "numeric",month: "long", day: "numeric"}):"N/A"}</td>
                <td className="align-middle">{order.company_role_name} {order.employee_first_name}</td>
                <td className="align-middle">
                  <span className={getStatusBadge(
                    order.order_status === 1
                      ? "Completed"
                      : order.order_status === 0
                      ? "In Progress"
                      : "Received"
                  )}>
                    {order.order_status === 1
                      ? "Completed"
                      : order.order_status === 0
                      ? "In Progress"
                      : "Received"}
                  </span>
                </td>
                <td className="align-middle">
                  <Link to={`/order/edit/${order.order_hash}`} className="text-dark me-2">
                    <FaEdit size={18} />
                  </Link>
                  <Link to={`/order/${order.order_hash}`} className="text-dark me-2">
                    <FaExternalLinkAlt size={18} />
                  </Link>
                  {/* Add delete icon with link */}
                  <Link to={`/deleteOrder/${order.order_hash}`} className="text-dark">
                    <FaTrash size={18} />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <button 
          className="btn btn-primary" 
          onClick={prevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="fw-bold">Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}</span>

        <button 
          className="btn btn-primary" 
          onClick={nextPage} 
          disabled={currentPage >= Math.ceil(orders.length / ordersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllOrders;