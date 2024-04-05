import React from 'react'
import "./vendors.css"
import VendorCards from '../components/vendor cards/vendor cards'

export default function VendorsCardContainer() {
  return (
    <div id='admin-vendor-main-container'>
      <input type='text' placeholder='Search for Vendor'/>
      <div id='admin-vendor-cards-container'>
        <VendorCards/>
        <VendorCards/>
        <VendorCards/>
        <VendorCards/>
        <VendorCards/>
        <VendorCards/>
        <VendorCards/>
      </div>
    </div>
  )
}
