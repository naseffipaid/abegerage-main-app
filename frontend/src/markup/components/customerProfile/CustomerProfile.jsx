
import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '../../../context/AuthContext';
import customerService from '../../../services/customer.services';
import { useParams } from 'react-router-dom';
import AddVehicleForm from '../vehicles/AddVehicleForm';  // ✅ Import AddVehicleForm

const CustomerProfile = () => {
  const { id } = useParams();  // ✅ Extract customer_id from URL
//   console.log('Customer ID:', id);

  const [customer, setCustomer] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);  // ✅ State to show AddVehicleForm

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (!token || !id) {
          setApiError(true);
          setApiErrorMessage('Missing token or customer ID.');
          return;
        }

        const response = await customerService.getSingleCustomer(token, id);

        if (!response.ok) {
          setApiError(true);
          setApiErrorMessage('Customer not found.');
          return;
        }

        const data = await response.json();
        if (data && data.data) {
          setCustomer(data.data);
        } else {
          setApiError(true);
          setApiErrorMessage('Invalid response from the server.');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setApiError(true);
        setApiErrorMessage('An error occurred while fetching data.');
      }
    };

    fetchCustomer();
  }, [token, id]);

  return (
    <div className="container py-4" style={{ padding: '20px', margin: '20px' }}>
      {apiError ? (
        <div className="alert alert-danger">{apiErrorMessage}</div>
      ) : (
        customer && (
          <>
            {/* Customer Info Section */}
            <div className="d-flex align-items-center mb-5" style={{ gap: '20px' }}>
              <div className="rounded-circle bg-danger text-white text-center p-4" style={{ width: '100px', height: '100px', lineHeight: '60px' }}>
                <strong>Info</strong>
              </div>
              <div className="p-5 flex-grow-1" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                <h4 className="text-primary">Customer: {customer?.customer_first_name} {customer?.customer_last_name}</h4>
                <p><strong>Email:</strong> {customer?.customer_email}</p>
                <p><strong>Phone Number:</strong> {customer?.customer_phone_number}</p>
                <p><strong>Active Customer:</strong> {customer.active_customer_status ? 'Yes' : 'No'}</p>
                <p><strong>Edit Customer Info:</strong> <a href="#edit-customer" className="text-danger"><i className="bi bi-pencil-fill"></i></a></p>
              </div>
            </div>

            {/* Vehicles Section */}
            <div className="d-flex align-items-center mb-5" style={{ gap: '20px' }}>
              <div className="rounded-circle bg-danger text-white text-center p-4" style={{ width: '100px', height: '100px', lineHeight: '60px' }}>
                <strong>Cars</strong>
              </div>
              <div className="p-5 flex-grow-1" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                <h5 className="text-primary">Vehicles of {customer?.customer_first_name}</h5>
                <input type="text" className="form-control" placeholder="No vehicle found" disabled />
                <button className="btn btn-danger mt-3" onClick={() => setShowForm(true)}>ADD NEW VEHICLE</button>  {/* ✅ Click to Show Form */}
                
                {/* ✅ EDITED THIS: Move AddVehicleForm inside the Vehicles section */}
                {showForm && <AddVehicleForm onClose={() => setShowForm(false)} customerId={id} />}
              </div>
            </div>

            {/* Orders Section */}
            <div className="d-flex align-items-center" style={{ gap: '20px' }}>
              <div className="rounded-circle bg-danger text-white text-center p-4" style={{ width: '100px', height: '100px', lineHeight: '60px' }}>
                <strong>Orders</strong>
              </div>
              <div className="p-5 flex-grow-1" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                <h5 className="text-primary">Orders of {customer.customer_first_name}</h5>
                <p className="text-muted">Orders will be displayed here</p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default CustomerProfile;