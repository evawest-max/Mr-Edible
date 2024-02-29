import React from 'react'
import "./adminRoot.css"
import AdminNav from '../admin-nav/adminNav'
import { Outlet } from 'react-router-dom'

export default function AdminRoot() {
  return (
    <div id='adminroot-main-container'>
        <AdminNav/>

        <div id='admin-outlet-container'>
            <Outlet/>
        </div>
    </div>
  )
}
