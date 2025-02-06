
//Import the Routes and Route components from react-router-dom
import { Routes, Route } from 'react-router-dom'

//import the page components
import Home from './markup/pages/HomePage'
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
import Customer from './markup/pages/Customer';
import Employee from './markup/pages/Employee';
import AddCustomer from './markup/pages/admin/AddCustomer';
import CustomerSection from './markup/pages/admin/CustomerSection';
import OrdersPage from './markup/pages/ordersPage/OrdersPage';
import CreateNewOrderPage from './markup/pages/ordersPage/CreateNewOrderPage';
import ServicesPage from './markup/pages/servicesPage/ServicesPage';
import OrderFormPage from './markup/pages/ordersPage/OrderFormPage';
import GetOrdersPage from './markup/pages/ordersPage/GetOrdersPage';
import OrderDetailPage from './markup/pages/ordersPage/OrderDetailPage';
import HomePage from './markup/pages/HomePage';
import CheckStatusPage from './markup/pages/CheckStatusPage';
import AdminPage from './markup/pages/admin/AdminPage';
import AboutUsPage from './markup/pages/AboutUsPage';
import ServicesForPage from './markup/pages/ServicesForPage';
import ServiceDetail from './markup/components/static/ServiceDetail';
import ContactUsPage from './markup/pages/ContactUsPage';
import EditEmployeePage from './markup/pages/admin/EditEmployeePage';
import DeleteEmployeePage from './markup/pages/admin/DeleteEmployeePage';
import EditCustomerPage from './markup/pages/admin/EditCustomerPage';
import DeleteCustomerPage from './markup/pages/admin/DeleteCustomerPage';
import EditVehiclePage from './markup/pages/admin/EditVehiclePage';
import DeleteVehiclePage from './markup/pages/admin/DeleteVehiclePage';
import EditServicePage from './markup/pages/admin/EditServicePage';
import DeleteServicePage from './markup/pages/admin/DeleteServicePage';



function App() {
 

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Admin route */}
        <Route path="/admin"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AdminPage/>
            </PrivateAuthRoute>
          } />
        <Route path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
          {/* edit employee */}
          <Route path="/editEmployee/:employeeId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployeePage />
            </PrivateAuthRoute>
          } />
          {/* delete employee */}
          <Route path="/deleteEmployee/:employeeId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <DeleteEmployeePage />
            </PrivateAuthRoute>
          } />
        <Route path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <GetOrdersPage/>
            </PrivateAuthRoute>
          } />
          {/* get a single order */}
          <Route path="/order/:orderHash"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <OrderDetailPage editButton = {false}/>
            </PrivateAuthRoute>
          } />
          {/* edit order */}
          <Route path="/order/edit/:orderHash"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <OrderDetailPage editButton = {true}/>
            </PrivateAuthRoute>
          } />
          {/* add customer route */}
          <Route path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <AddCustomer />
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
          {/* /edit single customer */}
          <Route path="/editCustomer/:customerId"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <EditCustomerPage/>
            </PrivateAuthRoute>
          } />
          {/* delete single customer */}
          <Route path="/deleteCustomer/:customerId"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <DeleteCustomerPage/>
            </PrivateAuthRoute>
          } />
          {/* edit single vehicle */}
          <Route path="/editVehicle/:vehicleId"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <EditVehiclePage/>
            </PrivateAuthRoute>
          } />
          {/* delete single vehicle */}
          <Route path="/deleteVehicle/:vehicleId"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <DeleteVehiclePage/>
            </PrivateAuthRoute>
          } />
          {/*edit single service */}
          <Route path="/editService/:serviceId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditServicePage/>
            </PrivateAuthRoute>
          } />
          {/*delete single service */}
          <Route path="/deleteService/:serviceId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <DeleteServicePage/>
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
           <Route path="/orders/:vehicleId"
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
        {/* // Add the Home Route  */}
        <Route path="/" element={<HomePage />} />
        {/* // check status page for the customer  */}
        <Route path="/check-status" element={<CheckStatusPage />} />
         {/* // About page for the customer  */}
         <Route path="/about" element={<AboutUsPage/>} />
         {/* // services  */}
         <Route path="/services" element={<ServicesForPage/>} />
         {/* // services Detail  */}
         <Route path="/serviceDetail" element={<ServiceDetail/>} />
         {/* // Contact Us  */}
         <Route path="/contact" element={<ContactUsPage/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
