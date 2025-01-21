import React, { useState } from 'react';
import PropTypes from 'prop-types';
import vehicleService from '../../../services/vehicles.services';
import { useAuth } from '../../../context/AuthContext';

const AddVehicleForm = ({ onClose, customerId }) => {
  const [vehicleData, setVehicleData] = useState({
    year: '',
    make: '',
    model: '',
    type: '',
    mileage: '',
    tag: '',
    serial: '',
    color: ''
  });

  console.log("Customer id is ",customerId)
  // ✅ State for Validation Errors
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  // ✅ Get logged-in employee token
  const { employee } = useAuth();
  const token = employee?.employee_token || '';

  // ✅ Handle Input Changes & Remove Errors Immediately
  const handleChange = (e) => {
    const { name, value } = e.target;

    setVehicleData({ ...vehicleData, [name]: value });

    // ✅ Remove the error message for this field as soon as the user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // ✅ Validate Form Fields
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!vehicleData.year || isNaN(vehicleData.year) || vehicleData.year.length !== 4) {
      newErrors.year = 'Valid vehicle year is required (4 digits)';
      valid = false;
    }

    if (!vehicleData.make) {
      newErrors.make = 'Vehicle make is required';
      valid = false;
    }

    if (!vehicleData.model) {
      newErrors.model = 'Vehicle model is required';
      valid = false;
    }

    if (!vehicleData.type) {
      newErrors.type = 'Vehicle type is required';
      valid = false;
    }

    if (!vehicleData.mileage || isNaN(vehicleData.mileage)) {
      newErrors.mileage = 'Valid mileage is required (numbers only)';
      valid = false;
    }

    if (!vehicleData.tag) {
      newErrors.tag = 'Vehicle tag is required';
      valid = false;
    }

    if (!vehicleData.serial) {
      newErrors.serial = 'Vehicle serial number is required';
      valid = false;
    }

    if (!vehicleData.color) {
      newErrors.color = 'Vehicle color is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;  // ❌ Stop if validation fails
  
    // ✅ Ensure customer_id is included
    if (!customerId) {
      console.error("Error: customer_id is missing or undefined!");
      setServerError("Customer ID is missing. Cannot add vehicle.");
      return; // ❌ Stop execution if customerId is missing
    }
  
    // ✅ Match form data with database fields
    const formData = { 
      customer_id: customerId,  
      vehicle_year: vehicleData.year,
      vehicle_make: vehicleData.make,
      vehicle_model: vehicleData.model,
      vehicle_type: vehicleData.type,
      vehicle_mileage: vehicleData.mileage,
      vehicle_tag: vehicleData.tag,
      vehicle_serial: vehicleData.serial,
      vehicle_color: vehicleData.color
    };
  
    console.log("Submitting vehicle data:", formData);  // ✅ Debugging log
  
    try {
      const response = await vehicleService.addVehicle(formData, token);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Vehicle added successfully:', data);
        setSuccess(true);
        setServerError('');
        setVehicleData({
          year: '',
          make: '',
          model: '',
          type: '',
          mileage: '',
          tag: '',
          serial: '',
          color: ''
        }); // ✅ Reset form after success
      } else {
        console.error("Server Response Error:", data);
        setServerError(data.error || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error("Network error:", error);
      setServerError('Network error. Please try again.');
    }
  };
  return (
    <div className="container mt-4 w-100">
      <div className="card shadow-lg p-4 ms-0 w-100" style={{ maxWidth: '700px' }}>
        {/* Close Button */}
        <div className="d-flex justify-content-end">
          <button className="btn btn-light text-danger border-0" onClick={onClose}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>

        {/* Form Title */}
        <h4 className="text-primary mb-3">Add a new vehicle</h4>
        <hr className="border-danger" style={{ width: '20%' }} />

        {/* ✅ Display Server Error */}
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        {/* ✅ Display Success Message */}
        {success && <div className="alert alert-success">Vehicle added successfully!</div>}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" name="year" placeholder="Vehicle Year" value={vehicleData.year} onChange={handleChange} />
            {errors.year && <div className="text-danger">{errors.year}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="make" placeholder="Vehicle Make" value={vehicleData.make} onChange={handleChange} />
            {errors.make && <div className="text-danger">{errors.make}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="model" placeholder="Vehicle Model" value={vehicleData.model} onChange={handleChange} />
            {errors.model && <div className="text-danger">{errors.model}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="type" placeholder="Vehicle Type" value={vehicleData.type} onChange={handleChange} />
            {errors.type && <div className="text-danger">{errors.type}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="mileage" placeholder="Vehicle Mileage" value={vehicleData.mileage} onChange={handleChange} />
            {errors.mileage && <div className="text-danger">{errors.mileage}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="tag" placeholder="Vehicle Tag" value={vehicleData.tag} onChange={handleChange} />
            {errors.tag && <div className="text-danger">{errors.tag}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="serial" placeholder="Vehicle Serial" value={vehicleData.serial} onChange={handleChange} />
            {errors.serial && <div className="text-danger">{errors.serial}</div>}
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="color" placeholder="Vehicle Color" value={vehicleData.color} onChange={handleChange} />
            {errors.color && <div className="text-danger">{errors.color}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100">
            ADD VEHICLE
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Prop validation to prevent missing props
AddVehicleForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  customerId: PropTypes.string.isRequired
};

export default AddVehicleForm;