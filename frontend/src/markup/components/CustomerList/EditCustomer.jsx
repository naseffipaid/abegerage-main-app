import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../../services/customer.services';
import { useAuth } from '../../../context/AuthContext';

function EditCustomer() {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customer_email, setEmail] = useState('');
    const [customer_first_name, setFirstName] = useState('');
    const [customer_last_name, setLastName] = useState('');
    const [customer_phone_number, setNumber] = useState('');
    const [active_customer_status, setActive_customer_status] = useState(0); // Initialize as integer 0
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const { employee } = useAuth();
    const loggedInEmployeeToken = employee?.employee_token || '';

    useEffect(() => {
        if (customerId && loggedInEmployeeToken) {
            customerService.getSingleCustomer(loggedInEmployeeToken, customerId)
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then(err => { throw new Error(err.error || "Server error") });
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data && data.data) {
                        setCustomer(data.data);
                        setEmail(data.data.customer_email);
                        setFirstName(data.data.customer_first_name);
                        setLastName(data.data.customer_last_name);
                        setNumber(data.data.customer_phone_number);
                        setActive_customer_status(data.data.active_customer_status || 0); // Set directly from the integer
                        setLoading(false);
                    } else {
                        setError("Customer data not found.");
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [customerId, loggedInEmployeeToken]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            customer_email,
            customer_first_name,
            customer_last_name,
            customer_phone_number,
            active_customer_status: active_customer_status, // Send the integer directly
        };

        customerService.updateCustomer(customerId, formData, loggedInEmployeeToken)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setServerError(data.error);
                } else {
                    setSuccess(true);
                    setServerError('');
                    navigate('/admin/customers');
                }
            })
            .catch((error) => {
                const resMessage = error.response?.data?.message || error.message || error.toString();
                setServerError(resMessage);
            });
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
                    <h2>Edit Customer</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                {success && <p>Customer Updated Successfully</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="email" name="customer_email" value={customer_email} onChange={event => setEmail(event.target.value)} placeholder="Customer email" />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_first_name" value={customer_first_name} onChange={event => setFirstName(event.target.value)} placeholder="Customer first name" />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_last_name" value={customer_last_name} onChange={event => setLastName(event.target.value)} placeholder="Customer last name" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_phone_number" value={customer_phone_number} onChange={event => setNumber(event.target.value)} placeholder="Customer Phone Number" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={active_customer_status === 1} // Check if it's 1
                                                    onChange={e => setActive_customer_status(e.target.checked ? 1 : 0)} // Set to 1 or 0
                                                    id="activeCustomerCheckbox"
                                                />
                                                <label className="form-check-label" htmlFor="activeCustomerCheckbox">Active Customer</label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit">
                                                <span>Update Customer</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {success && <div className="success-message">Customer updated successfully!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditCustomer;