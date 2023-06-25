import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '.'
import AdminSidebar from '../admin/AdminSidebar'

const AdminRoute = () => (
    isAuthenticated() && isAuthenticated().user.role === 1 ? 
    <>
        <AdminSidebar />
        <Outlet />
    </>
    
    : (
        <Navigate to='/signin' />
    )
)

export default AdminRoute