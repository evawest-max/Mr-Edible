import React from 'react'
import AdminFoodItems from '../../components/admin-food-items/admin-food-items'
import "./vendor details.css"
import { FaStar } from "react-icons/fa";


export default function VendorDetails() {
  return (
    <div id='admin-vendor-Detail-container'>
        <div id='admin-vendor-info-container'>
          <img src='https://www.businesslist.com.ng/img/ng/k/1618929858-45-genesis-foods-nigeria-limited.jpg'  alt='vendor logo'/>
          <p>
          Genesis Group is a hospitality conglomerate based in Nigeria with diverse business interests including restaurants, catering, snack food manufacturing, hotels, cinemas, and real estate development. 
          The company was founded in 1991 and has since established itself as a provider of exceptional customer experiences across its Strategic Business Units (SBUs). <br/>

          The company's success is built on its "CAN DO" attitude, which drives its commitment to delivering world-class services with a strong customer focus. 
          This approach has earned Genesis Group a reputation for excellence and the testimonials of satisfied clients and customers attest to the quality of its products and services. Genesis Group is dedicated to meeting all applicable regulatory and client requirements in order to maintain its high standards and ensure the satisfaction of its customers.
          </p>
          <div>Rating: <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> </div>
          <p> Registered on: 08/01/2024</p>
          <p>offices locations: Port Harcourt, abuja, Warri, Owerri</p>
          <p>Account name:Genesis fast food</p>
          <p>Account number: 0055889027</p>
          <p>Bank: FCMB</p>
          <p>Phone number: 09093450943</p>
          <p>Email Address: Admin@genesisgroup.com</p>
        </div>
        <div id='admin-vendor-search-fooditem-container'>
          <input type='text' placeholder='Search for food items'/>
          <div id='admin-vendor-fooditem-container'>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
            <AdminFoodItems/>
          </div>
        </div>
    </div>
  )
}
