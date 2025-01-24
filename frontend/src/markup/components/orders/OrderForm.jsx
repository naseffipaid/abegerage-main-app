import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

import vehicleService from "../../../services/vehicles.services";
import orderService from "../../../services/order.services";
import serviceService from "../../../services/service.services"; // ✅ Fixed import path
import { useAuth } from "../../../context/AuthContext";

const OrderForm = () => {
  const { vehicleId } = useParams();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [vehicleCustomer, setVehicleCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [price, setPrice] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Error states
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [serviceApiError, setServiceApiError] = useState(false);
  const [serviceErrorMessage, setServiceErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
        try {
            if (!token || !vehicleId) {
                setApiError(true);
                setApiErrorMessage("Missing token or vehicle ID.");
                return;
            }
            const response = await vehicleService.getSingleVehicle(token, vehicleId);
            if (!response.ok) throw new Error("vehicle not found.");

            const data = await response.json();
            setVehicleCustomer(data?.data[0] || null);
        } catch (error) {
            setApiError(true);
            setApiErrorMessage(error.message);
        }
    };

    const fetchServices = async () => {
        try {
            if (!token || !vehicleId) {
                setServiceApiError(true);
                setServiceErrorMessage("Missing token or vehicle ID.");
                return;
            }
            const response = await serviceService.getServices(token, vehicleId);
            if (!response.ok) throw new Error("Services not found.");

            const data = await response.json();
            setServices(data.data || []);
        } catch (error) {
            setServiceApiError(true);
            setServiceErrorMessage(error.message);
        }
    };

    fetchVehicle();
    fetchServices();
}, [token, vehicleId]);

// // ✅ New useEffect to debug `vehicleCustomer` state updates
useEffect(() => {
    console.log("Updated Vehicle Customer:", vehicleCustomer); // ✅ Now it will log the latest data
}, [vehicleCustomer]); 

  const handleServiceSelection = (service_id) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service_id)
        ? prevSelected.filter((id) => id !== service_id)
        : [...prevSelected, service_id]
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!selectedServices.length) {
      newErrors.selectedServices = "At least one service must be selected.";
    }
    if (!price) {
      newErrors.price = "Price is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!vehicleId) {
      setServerError("Vehicle ID is missing. Cannot place order.");
      return;
    }

    const orderData = {
      employee_id: employee.employee_id,
      customer_id: vehicleCustomer?.customer_id,
      vehicle_id: vehicleId,
      active_order: 1,
      order_total_price: price,
      additional_request: additionalRequest,
      service_id: selectedServices,
      service_completed: 0,
    };

    try {
      const response = await orderService.addOrder(orderData, token);
      const data = await response.json();

      if (response.ok) {
        setOrderSuccess(true);
        setServerError("");
        setSelectedServices([]);
        setAdditionalRequest("");
        setPrice("");
      } else {
        setServerError(data.error || "Failed to add order.");
      }
    } catch (error) {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mx-auto px-5">
      {/* Header Section */}
      <div className="mb-4">
        <h3 className="fw-bold">
          Create a New Order <span className="text-danger">____</span>
        </h3>
      </div>

      {/* API Errors Display */}
      {apiError && <p className="text-danger">{apiErrorMessage}</p>}
      {serviceApiError && <p className="text-danger">{serviceErrorMessage}</p>}
      {serverError && <p className="text-danger">{serverError}</p>}
      {orderSuccess && <p className="text-success">Order placed successfully!</p>}

      {/* Customer Section */}
      {vehicleCustomer && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>{vehicleCustomer.customer_first_name} {vehicleCustomer.customer_last_name}</h5>
          <p>Email: {vehicleCustomer.customer_email}</p>
          <p>Phone Number: {vehicleCustomer.customer_phone_number}</p>
          <p>Active Customer: {vehicleCustomer.active_customer_status}</p>
        </div>
      )}

      {/* Vehicle Section */}
      {vehicleCustomer && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>{vehicleCustomer.vehicle_make} {vehicleCustomer.vehicle_model}</h5>
          <p>Color: {vehicleCustomer.vehicle_color}</p>
          <p>Tag: {vehicleCustomer.vehicle_tag}</p>
          <p>Year: {vehicleCustomer.vehicle_year}</p>
          <p>Mileage: {vehicleCustomer.vehicle_mileage}</p>
        </div>
      )}

      {/* Services Section */}
      <div className="card p-4 mb-4 shadow-sm">
      <h4 className="mb-3">Choose Service</h4>
       {services.length > 0 ? services.map((service) => (
        <div key={service.service_id}>
         <div className="d-flex justify-content-between align-items-start mb-2 custome-container">
           <div className="d-flex flex-column p-3 service-info ">
            <span className="fw-bold">{service.service_name}</span>
            <small className="text-muted">{service.service_description}</small>
         </div>
        <div className="ms-auto service-checkbox">
          <input
            className="form-check-input custom-checkbox"
            type="checkbox"
            id={`service-${service.service_id}`}
            onChange={() => handleServiceSelection(service.service_id)}
            checked={selectedServices.includes(service.service_id)}
          />
         </div>
       </div>
       {/* ✅ Horizontal line now spans the full row */}
      <div className="custom-horizontal-line"></div>
       </div>
      )) : <p>No services available.</p>}
     </div>
      {/* Additional Requests Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">Additional Requests</h4>
        <textarea className="form-control mb-3" placeholder="Service description" rows="3"
          value={additionalRequest} onChange={(e) => setAdditionalRequest(e.target.value)} />
        <input className="form-control mb-3" type="text" placeholder="Price"
          value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="btn btn-danger w-100" onClick={handleSubmit}>SUBMIT ORDER</button>
      </div>
    </div>
  );
};

export default OrderForm;