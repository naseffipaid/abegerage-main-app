
//Import the Routes and Route components from react-router-dom
import { Routes, Route } from 'react-router-dom'

//import the page components
import Home from './markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/admin/AddEmployee'

// Import the css files 
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file 
import "./assets/styles/custom.css";

//import Header
import Header from './markup/components/Header/Header'
//import Footer
import Footer from './markup/components/Footer/Footer'
import Unauthorized from './markup/pages/Unauthorized';
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';
import Orders from './markup/pages/Orders';
import Customer from './markup/pages/Customer';
import Employee from './markup/pages/Employee';


function App() {
 

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
        <Route path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          } />
        <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customer />
            </PrivateAuthRoute>
          } />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employee />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
