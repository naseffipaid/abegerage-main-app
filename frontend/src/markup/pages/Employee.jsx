import React from 'react'
import { useAuth} from '../../context/AuthContext'
import LoginForm from '../components/LoginForm/LoginForm';
import EmployeesList from '../components/EmployeesList/EmployeesList';
import AdminMenu from '../components/AddEmployeeForm/AdminMenu/AdminMenu';

function Employees() {
    // Destructure the auth hook 
    const { isLogged, isAdmin } = useAuth();
  
    if (isLogged) {
  
      console.log("Kebede");
  
      if (isAdmin) {
        return (
          <div>
            <div className="container-fluid admin-pages">
              <div className="row">
                <div className="col-md-3 admin-left-side">
                  <AdminMenu />
                </div>
                <div className="col-md-9 admin-right-side">
                  <EmployeesList />
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
  
  export default Employees;