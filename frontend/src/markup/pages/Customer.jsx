import React from 'react'
import AdminMenu from '../components/AddEmployeeForm/AdminMenu/AdminMenu';
import CustomerList from '../components/CustomerList/CustomerList';

function Customer() {
        return (
          <div>
            <div className="container-fluid admin-pages">
              <div className="row">
                <div className="col-md-3 admin-left-side">
                  <AdminMenu/>
                </div>
                <div className="col-md-9 admin-right-side">
                  <CustomerList />
                </div>
              </div>
            </div>
          </div>
        );
      } 

export default Customer