import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../../services/customer.services";
import { useAuth } from "../../../context/AuthContext";
import VehicleService from "../../../services/vehicles.services";

const DeleteVehicle = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee: authEmployee } = useAuth();
  const token = authEmployee ? authEmployee.employee_token : null;

  useEffect(() => {
    if (vehicleId && token) {
      VehicleService.getSingleVehicle(token, vehicleId)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          return res.json();
        })
        .then((data) => {
          setVehicle(data?.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [vehicleId, token]);

  const handleDelete = () => {
    if (token) {
      VehicleService.deleteVehicle(vehicleId, token)
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => {throw new Error(err.error || "Server error")});
          }
          navigate(`/admin/customers/${vehicle.customer_id}`); // Redirect to vehicle list after successful deletion
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleCancel = () => {
    navigate(`/admin/customers/${vehicle.customer_id}`); // Redirect to customer list if cancelled
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Delete Customer</h2>
        </div>
        <p>Are you sure you want to delete {vehicle.vehicle_make} {vehicle.vehicle_model}?</p>
        <div className="d-flex justify-content-center gap-3"> {/* Center buttons */}
          <button className="theme-btn btn-style-one" onClick={handleDelete}>Yes, Delete</button>
          <button className="theme-btn btn-style-one" onClick={handleCancel}>No, Cancel</button>
        </div>
      </div>
    </section>
  );
};

export default DeleteVehicle;
