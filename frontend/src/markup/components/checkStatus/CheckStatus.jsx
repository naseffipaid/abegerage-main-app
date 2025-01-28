import React, { useState } from "react";
import orderService from "../../../services/order.services";
import { ClipLoader } from "react-spinners";

// Helper function to get status details
const getStatusDetails = (status) => {
  switch (status) {
    case 0:
      return { text: "In progress", className: "badge bg-warning text-white" };
    case 1:
      return { text: "Completed", className: "badge bg-success text-white" };
    default:
      return { text: "Received", className: "badge bg-secondary text-white" };
  }
};

const CheckStatus = () => {
  const [orderHash, setOrderHash] = useState(""); // Order hash input
  const [order, setOrder] = useState(null); // Store fetched order
  const [services, setServices] = useState([]); // Store services
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Fetch order details based on orderHash
  const fetchOrderDetails = async () => {
    if (orderHash.trim() === "") {
      setApiError("Please enter a valid Order Hash.");
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      const res = await orderService.getSingleOrderCustomer(orderHash);
      const data = await res.json();

      if (res.ok && data?.data?.length > 0) {
        setOrder(data.data[0]);
        setServices(
          data.data
            .filter((item) => item.service_id !== null)
            .map((item) => ({
              service_id: item.service_id,
              service_name: item.service_name,
              service_description: item.service_description,
              service_completed: item.service_completed ?? 0,
            }))
        );
      } else {
        setOrder(null);
        setApiError("No order found for this Order Hash.");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Input Section */}
      <div className="card shadow-lg p-4 mb-4">
        <h3 className="fw-bold text-center">Check Your Order Status</h3>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Enter Order Hash"
            value={orderHash}
            onChange={(e) => setOrderHash(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchOrderDetails}>
            Check Status
          </button>
        </div>
        {apiError && <p className="text-danger text-center mt-2">{apiError}</p>}
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="d-flex justify-content-center py-4">
          <ClipLoader color="#007bff" size={50} />
        </div>
      )}

      {/* Display Order Details */}
      {order && (
        <div className="card shadow-lg p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold">
              {order.customer_first_name} {order.customer_last_name}
            </h2>
            <span className={getStatusDetails(order.order_status).className}>
              {getStatusDetails(order.order_status).text}
            </span>
          </div>

          {/* Customer Details */}
          <div className="row g-3 mt-4">
            <div className="col-md-6">
              <div className="card p-3">
                <h5 className="text-uppercase text-secondary">Customer</h5>
                <p className="fw-semibold">
                  {order.customer_first_name} {order.customer_last_name}
                </p>
                <p>Email: {order.customer_email}</p>
                <p>Phone: {order.customer_phone_number}</p>
                <p>Active Customer: {order.active_customer_status === 1 ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="col-md-6">
              <div className="card p-3">
                <h5 className="text-uppercase text-secondary">Car in Service</h5>
                <p className="fw-semibold">
                  {order.vehicle_make} {order.vehicle_model} ({order.vehicle_year})
                </p>
                <p>Vehicle Tag: {order.vehicle_tag}</p>
                <p>Vehicle Mileage: {order.vehicle_mileage}</p>
                <p>Vehicle Color: {order.vehicle_color}</p>
              </div>
            </div>
          </div>

          {/* Requested Services */}
          <h4 className="fw-bold mt-4">Requested Services</h4>
          <ul className="list-group mt-3">
            {services.map((service) => (
              <li key={service.service_id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">{service.service_name}</span>
                  <small className="text-muted">{service.service_description}</small>
                </div>
                <span className={getStatusDetails(service.service_completed).className}>
                  {getStatusDetails(service.service_completed).text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckStatus;