import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import orderService from "../../../services/order.services";
import { ClipLoader } from "react-spinners";

// Helper function to get status details
const getStatusDetails = (status) => {
  switch (status) {
    case 0:
      return { text: "In progress", className: "badge bg-warning text-white" };
    case 1:
      return { text: "Completed", className: "badge bg-success text-white" };
    case null:
    default:
      return { text: "Received", className: "badge bg-secondary text-white" };
  }
};

const RequestedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [additionalRequest, setAdditionalRequest] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const res = await orderService.getSingleOrderbyCustomer(token, id);
        const data = await res.json();
        
        if (data?.data?.length > 0) {
            console.log(data)
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
          setAdditionalRequest({
            name: "Additional Request",
            description: data.data[0].additional_request,
            completed: data.data[0].additional_requests_completed,
          });
          setApiError(false);
        } else {
          setOrder(null);
          setServices([]);
          setAdditionalRequest(null);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setApiError(true);
        setApiErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [token, id]);

  if (isLoading) {
    return (
      <div className="container py-5 d-flex justify-content-center align-items-center">
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{apiErrorMessage}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">No order found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
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

        {additionalRequest && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column text-start">
              <span className="fw-semibold">{additionalRequest.name}</span>
              <small className="text-muted">{additionalRequest.description}</small>
            </div>
            <span className={getStatusDetails(additionalRequest.completed).className}>
              {getStatusDetails(additionalRequest.completed).text}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RequestedOrder;
