import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from './Header and sidebar/Dashboard'

const Layout = ({ children }) => {
    return (
        <>
            <Dashboard>
                <Outlet />
            </Dashboard>
        </>
    )
}

export default Layout