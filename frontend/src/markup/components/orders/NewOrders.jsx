import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customerService from "../../../services/customer.services";
import { FaHandPointer } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const NewOrders = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { employee } = useAuth();
  let token = employee ? employee.employee_token : null;

  useEffect(() => {
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers.then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch customers, status:", res.status);
        return;
      }
      return res.json();
    }).then((data) => {
      if (data?.data?.length !== 0) {
        setCustomers(data.data);
        setFilteredCustomers(data.data);
      }
    }).catch((err) => {
      console.error("Error fetching customers:", err);
    });
  }, [token]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!customers.length) {
      console.warn("No customers available to filter");
      return;
    }

    const filtered = customers.filter((customer) => {
      return (
        (customer.customer_first_name?.toLowerCase() || "").includes(query) ||
        (customer.customer_last_name?.toLowerCase() || "").includes(query) ||
        (customer.customer_email?.toLowerCase() || "").includes(query) ||
        (customer.customer_phone_number?.toLowerCase() || "").includes(query)
      );
    });

    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Create a new order</h2>
      <hr className="text-danger" style={{ width: "50px" }} />
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a customer using first name, last name, email address or phone number"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="input-group-text">
          <FaHandPointer style={{ cursor: "pointer" }} />
        </span>
      </div>
      <Link to="/admin/add-customer" className="btn btn-danger mt-3">ADD NEW CUSTOMER</Link>
      {filteredCustomers.length > 0 && (
        <div className="mt-3 table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    <Link to={`/admin/order/${customer.customer_id}`} className="text-dark">
                      <FaHandPointer style={{ cursor: "pointer" }} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(filteredCustomers.length / itemsPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewOrders;