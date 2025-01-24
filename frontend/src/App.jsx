
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
import AddCustomer from './markup/pages/admin/AddCustomer';
import CustomerSection from './markup/pages/admin/CustomerSection';
import OrdersPage from './markup/pages/ordersPage/OrdersPage';
import CreateNewOrderPage from './markup/pages/ordersPage/CreateNewOrderPage';
import ServicesPage from './markup/pages/servicesPage/ServicesPage';
import OrderFormPage from './markup/pages/ordersPage/OrderFormPage';



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
          <Route path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomer />
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
            <PrivateAuthRoute roles={[2,3]}>
              <Customer />
            </PrivateAuthRoute>
          } />
          {/* //single customer */}
          <Route path="/admin/customers/:id"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <CustomerSection/>
            </PrivateAuthRoute>
          } />
          {/* // Add the order route */}
          <Route path="/admin/order"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <OrdersPage />
            </PrivateAuthRoute>
          } />
           {/* //single customer */}
           <Route path="/admin/order/:id"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <CreateNewOrderPage/>
            </PrivateAuthRoute>
          } />
           {/* //orderForm Page per customer per vehicle */}
           <Route path="/order/:vehicleId"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <OrderFormPage/>
            </PrivateAuthRoute>
          } />
          {/* // service route */}
          <Route path="/admin/services"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <ServicesPage />
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
