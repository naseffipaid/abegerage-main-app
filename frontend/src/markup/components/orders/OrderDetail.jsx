// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useAuth } from "../../../context/AuthContext";
// import orderService from "../../../services/order.services";

// const OrderDetail = ({ editButton }) => {
//   const { orderHash } = useParams();
//   const [order, setOrder] = useState(null);
//   const [services, setServices] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const { employee } = useAuth();
//   let token = employee ? employee.employee_token : null;

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await orderService.getSingleOrder(token, orderHash);
//         const data = await res.json();

//         if (data?.data?.length > 0) {
//           // ✅ Extract order details correctly
//           setOrder(data.data[0]);

//           // ✅ Extract only service-related data
//           setServices(
//             data.data
//               .filter((item) => item.service_id !== null)
//               .map((item) => ({
//                 service_id: item.service_id,
//                 service_name: item.service_name,
//                 service_description: item.service_description,
//                 service_completed: item.service_completed,
//               }))
//           );

//           setApiError(false);
//         } else {
//           setOrder(null);
//           setServices([]);
//         }

//         if (res.status === 401) {
//           setApiError(true);
//           setApiErrorMessage("Unauthorized: Please log in again.");
//         } else if (res.status === 403) {
//           setApiError(true);
//           setApiErrorMessage("Forbidden: You do not have access.");
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setApiError(true);
//         setApiErrorMessage("Something went wrong. Please try again.");
//       }
//     };

//     fetchOrder();
//   }, [token, orderHash]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 0:
//         return "badge bg-warning text-white";
//       case 1:
//         return "badge bg-success text-white";
//       default:
//         return "badge bg-secondary text-white";
//     }
//   };

//   if (apiError) {
//     return (
//       <div className="container py-5">
//         <div className="alert alert-danger">{apiErrorMessage}</div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="container py-5">
//         <div className="alert alert-warning">No order found.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <div className="card shadow-lg p-4">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="fw-bold">
//             {order.customer_first_name} {order.customer_last_name}
//           </h2>
//           <span className={getStatusColor(order.order_status)}>
//             {order.order_status === 0
//               ? "In progress"
//               : order.order_status === 1
//               ? "Completed"
//               : "Received"}
//           </span>
//         </div>
//         <p className="text-muted">
//           You can track the progress of your order using this page.
//         </p>

//         <div className="row g-3">
//           <div className="col-md-6">
//             <div className="card p-3">
//               <h5 className="text-uppercase text-secondary">Customer</h5>
//               <p className="fw-semibold">
//                 {order.customer_first_name} {order.customer_last_name}
//               </p>
//               <p>Email: {order.customer_email}</p>
//               <p>Phone: {order.customer_phone_number}</p>
//               <p>
//                 Active Customer: {order.active_customer_status === 1 ? "Yes" : "No"}
//               </p>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="card p-3">
//               <h5 className="text-uppercase text-secondary">Car in Service</h5>
//               <p className="fw-semibold">
//                 {order.vehicle_make} {order.vehicle_model} ({order.vehicle_year})
//               </p>
//               <p>Vehicle Tag: {order.vehicle_tag}</p>
//               <p>Vehicle Mileage: {order.vehicle_mileage}</p>
//               <p>Vehicle Color: {order.vehicle_color}</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4">
//           <h4 className="fw-bold">Requested Services</h4>
//           <ul className="list-group mt-3">
//             {services.length > 0 &&
//               services.map((service, index) => (
//                 <li
//                   key={index}
//                   className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
//                 >
//                   <div className="flex-grow-1">
//                     <h6 className="fw-semibold mb-1">{service.service_name}</h6>
//                     <p className="mb-0 text-muted text-wrap" style={{ maxWidth: "75%" }}>
//                       {service.service_description}
//                     </p>
//                   </div>
//                   <span className={getStatusColor(service.service_completed)}>
//                     {editButton ? (
//                       <Link to="/">
//                         {service.service_completed === 0
//                           ? "In progress"
//                           : service.service_completed === 1
//                           ? "Completed"
//                           : "Received"}
//                       </Link>
//                     ) : (
//                       service.service_completed === 0
//                         ? "In progress"
//                         : service.service_completed === 1
//                         ? "Completed"
//                         : "Received"
//                     )}
//                   </span>
//                 </li>
//               ))}
//           </ul>

//           {/* ✅ Fix: Additional Request Styled Same as Services */}
//           {order.additional_request && (
//             <ul className="list-group mt-3">
//               <li className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
//                 <div className="flex-grow-1">
//                   <h6 className="fw-semibold mb-1">Additional Request</h6>
//                   <p className="mb-0 text-muted text-wrap" style={{ maxWidth: "75%" }}>
//                     {order.additional_request}
//                   </p>
//                 </div>
//                 <span className={getStatusColor(order.additional_requests_completed ?? 0)}>
//                   {editButton ? (
//                     <Link to="/">
//                       {order.additional_requests_completed === 0
//                         ? "In progress"
//                         : order.additional_requests_completed === 1
//                         ? "Completed"
//                         : "Received"}
//                     </Link>
//                   ) : (
//                     order.additional_requests_completed === 0
//                       ? "In progress"
//                       : order.additional_requests_completed === 1
//                       ? "Completed"
//                       : "Received"
//                   )}
//                 </span>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// OrderDetail.propTypes = {
//   editButton: PropTypes.bool,
// };

// export default OrderDetail;
// deep seek result 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
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
      return { text: "Received", className: "badge bg-secondary text-white" };  
    default:
      return { text: "Received", className: "badge bg-secondary text-white" };
  }
};

const OrderDetail = ({ editButton }) => {
  const { orderHash } = useParams();
  const [order, setOrder] = useState(null);
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [sucess, setSucess] = useState({});
  const { employee } = useAuth();
  const token = employee?.employee_token;

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const res = await orderService.getSingleOrder(token, orderHash);
        const data = await res.json();

        if (data?.data?.length > 0) {
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
          setApiError(false);
        } else {
          setOrder(null);
          setServices([]);
        }

        if (!res.ok) {
          handleApiError(res);
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
  }, [token, orderHash]);

  const handleApiError = (res) => {
    if (res.status === 401) {
      setApiErrorMessage("Unauthorized: Please log in again.");
    } else if (res.status === 403) {
      setApiErrorMessage("Forbidden: You do not have access.");
    } else {
      setApiErrorMessage("Something went wrong. Please try again.");
    }
    setApiError(true);
  };

  const handleServiceStatusUpdate = async (serviceId) => {
    try {
      const newStatus = parseInt(selectedStatus[serviceId], 10);
      const response = await orderService.updateServiceStatus(token, orderHash, serviceId, newStatus);
  
      if (response.ok) {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.service_id === serviceId ? { ...service, service_completed: newStatus } : service
          )
        );
        
        setSucess(prev => ({ ...prev, [serviceId]: "Service status updated successfully" })); 
      } else {
        const errorData = await response.json();
        console.error("Failed to update service status:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

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
      <div className="card shadow-lg p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">
            {order.customer_first_name} {order.customer_last_name}
          </h2>
          <span className={getStatusDetails(order.order_status).className}>
            {getStatusDetails(order.order_status).text}
          </span>
        </div>

        <div className="row g-3">
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

        <h4 className="fw-bold mt-4">Requested Services</h4>
        <ul className="list-group mt-3">
          {services.map((service) => (
            <li key={service.service_id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column text-start">
                <span className="fw-semibold">{service.service_name}</span>
                <small className="text-muted">{service.service_description}</small>
              </div>
              {editButton ? (
                <div className="d-flex flex-column align-items-center">
                  {/* ✅ Success message slightly above select button */}
                  {sucess[service.service_id] && (
                    <small className="text-success text-center mb-1">{sucess[service.service_id]}</small>
                  )}
                  <div className="d-flex align-items-center">
                    <select
                      className="form-select form-select-sm w-auto mx-2"
                      value={selectedStatus[service.service_id] || service.service_completed}
                      onChange={(e) => {
                        setSelectedStatus((prev) => ({
                          ...prev,
                          [service.service_id]: e.target.value,
                        }));
                        setSucess(prev => ({ ...prev, [service.service_id]: "" }));
                      }}
                    >
                      <option value="0">In Progress</option>
                      <option value="1">Completed</option>
                    </select>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleServiceStatusUpdate(service.service_id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <span className={getStatusDetails(service.service_completed).className}>
                  {getStatusDetails(service.service_completed).text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

OrderDetail.propTypes = {
  editButton: PropTypes.bool,
};

export default OrderDetail;