import React, { useState } from 'react';
import customerService from '../../../services/customer.services';
import { useAuth } from '../../../context/AuthContext';

function AddCustomer() {
    const [customer_email, setEmail] = useState('');
    const [customer_first_name, setFirstName] = useState('');
    const [customer_last_name, setLastName] = useState('');
    const [customer_phone_number, setNumber] = useState('');
    const [customer_hash, setHash] = useState(''); // Store the generated hash
    const [active_customer_status, setActive_customer_status] = useState(1);

    // Errors 
    const [emailError, setEmailError] = useState('');
    const [firstNameRequired, setFirstNameRequired] = useState('');
    const [phoneNumberRequired, setPhoneNumberRequired] = useState('');
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    // Get logged-in employee token
    const { employee } = useAuth();
    const loggedInEmployeeToken = employee?.employee_token || '';

    console.log("Token being sent:", loggedInEmployeeToken);

    // Function to generate a unique 8-digit hash
    const generateCustomerHash = () => {
      const timestamp = Date.now().toString(); // Get current timestamp
      const randomNum = Math.floor(Math.random() * 1e10).toString(); // Generate 10-digit random number
      const uuidFragment = crypto.randomUUID().replace(/-/g, '').substring(0, 7); // Generate a 7-character UUID fragment
      return (timestamp + randomNum + uuidFragment).substring(0, 25); // Ensure it is exactly 25 characters
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate a unique hash for the customer
        const uniqueHash = generateCustomerHash();
        setHash(uniqueHash); // Save the hash in state

        let valid = true;

        if (!customer_first_name) {
            setFirstNameRequired('First name is required');
            valid = false;
        } else {
            setFirstNameRequired('');
        }

        if (!customer_phone_number) {
            setPhoneNumberRequired('Phone number is required');
            valid = false;
        } else {
            setPhoneNumberRequired('');
        }

        if (!customer_email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!customer_email.includes('@')) {
            setEmailError('Invalid email format');
        } else {
            const regex = /^\S+@\S+\.\S+$/;
            if (!regex.test(customer_email)) {
                setEmailError('Invalid email format');
                valid = false;
            } else {
                setEmailError('');
            }
        }

        if (!valid) return;

        const formData = {
            customer_email,
            customer_first_name,
            customer_last_name,
            customer_phone_number,
            customer_hash: uniqueHash, // Add the generated hash to formData
            active_customer_status,
        };

        customerService.createCustomer(formData, loggedInEmployeeToken)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setServerError(data.error);
                } else {
                    console.log("Customer added with hash:", uniqueHash);
                    setSuccess(true);
                    setServerError('');
                }
            })
            .catch((error) => {
                const resMessage = error.response?.data?.message || error.message || error.toString();
                setServerError(resMessage);
            });
    };

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new customer</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="email" name="customer_email" value={customer_email} onChange={event => setEmail(event.target.value)} placeholder="Customer email" />
                                            {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_first_name" value={customer_first_name} onChange={event => setFirstName(event.target.value)} placeholder="Customer first name" />
                                            {firstNameRequired && <div className="validation-error" role="alert">{firstNameRequired}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_last_name" value={customer_last_name} onChange={event => setLastName(event.target.value)} placeholder="Customer last name" required />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="customer_phone_number" value={customer_phone_number} onChange={event => setNumber(event.target.value)} placeholder="Customer Phone Number" required />
                                            {phoneNumberRequired && <div className="validation-error" role="alert">{phoneNumberRequired}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit">
                                                <span>Add Customer</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {success && <div className="success-message">Customer added successfully! Hash: {customer_hash}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddCustomer;