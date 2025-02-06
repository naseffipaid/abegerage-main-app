import React from 'react'
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu'
import DeleteEmployee from '../../components/AddEmployeeForm/DeleteEmployee'

function DeleteEmployeePage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <DeleteEmployee/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteEmployeePage 