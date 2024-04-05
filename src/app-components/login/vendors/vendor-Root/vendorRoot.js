import React from 'react'
import "./VendorRoot.css"
import { Outlet } from 'react-router-dom'
import VendorNav from '../vendor-nav/vendorNav'


export default function VendorRoot() {
  return (
    <div id='adminroot-main-container'>
        <VendorNav/>

        <div id='admin-outlet-container'>
            <Outlet/>
        </div>
    </div>
  )
}
