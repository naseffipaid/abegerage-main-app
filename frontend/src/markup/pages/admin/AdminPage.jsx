import React from 'react'
import AdminMenu from '../../components/AddEmployeeForm/AdminMenu/AdminMenu'
import Dashboard from '../../components/Admin/Dashboard'

function AdminPage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage