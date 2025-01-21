import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu';
import AddCustomer from '../../components/AddCustomerForm/AddCustomer';
import LoginForm from '../../components/LoginForm/LoginForm';
import CustomerProfile from '../../components/customerProfile/CustomerProfile';

function CustomerSection() {
  const { isLogged, isAdmin } = useAuth();
  
    if (isLogged) {
  
      console.log("Kebede");
  
      if (isAdmin) {
        return (
          <div>
            <div className="container-fluid admin-pages">
              <div className="row">
                <div className="col-md-3 admin-left-side">
                  <AdminMenu/>
                </div>
                <div className="col-md-9 admin-right-side">
                  <CustomerProfile />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h1>You are not authorized to access this page</h1>
          </div>
        );
      }
    } else {
      return (
        <div>
          <LoginForm />
        </div>
      );
    }
}

export default CustomerSection