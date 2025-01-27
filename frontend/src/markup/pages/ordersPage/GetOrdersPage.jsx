import React from 'react'
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu'
import GetAllOrders from '../../components/orders/GetAllOrders';

function GetOrdersPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <GetAllOrders/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetOrdersPage;