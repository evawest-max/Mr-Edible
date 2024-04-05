import React from 'react'
import "./customers.css"
import CustomerCards from '../components/customer cards/customer cards'

export default function Customers() {
  return (
    <div id='admin-vendor-main-container'>
      <input type='text' placeholder='Search for sustomer'/>
      <div id='admin-vendor-cards-container'>
        <CustomerCards/>
      </div>
    </div>
  )
}
