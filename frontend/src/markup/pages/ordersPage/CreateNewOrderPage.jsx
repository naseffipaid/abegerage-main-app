import React from 'react'
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu'
import NewOrders from '../../components/orders/NewOrders'
import CreateNewOrder from '../../components/orders/CreateNewOrder'

function CreateNewOrderPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CreateNewOrder/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewOrderPage