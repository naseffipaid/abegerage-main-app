import React from 'react'
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu'
import DeleteService from '../../components/services/DeleteService'

function DeleteServicePage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <DeleteService/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteServicePage