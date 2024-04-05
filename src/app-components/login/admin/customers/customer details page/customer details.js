import React from 'react'
import "./customer details.css"
import CustomerHistoryFoodCard from '../../components/customer food history/customer history food card'

export default function CustomerDetails() {
  return (
    <div id='admin-vendor-Detail-container'>
        <div id='admin-vendor-info-container'>
            <img src='https://media.istockphoto.com/id/470958260/photo/photobooth-picture-of-a-young-woman.jpg?s=612x612&w=0&k=20&c=dkBS8IjDmYUGgu_dsE1IbIVKTtDZJkqPPkDXZTkxQM0='  alt='vendor logo'/>
            {/* <p>
            Genesis Group is a hospitality conglomerate based in Nigeria with diverse business interests including restaurants, catering, snack food manufacturing, hotels, cinemas, and real estate development. 
            The company was founded in 1991 and has since established itself as a provider of exceptional customer experiences across its Strategic Business Units (SBUs). <br/>

            The company's success is built on its "CAN DO" attitude, which drives its commitment to delivering world-class services with a strong customer focus. 
            This approach has earned Genesis Group a reputation for excellence and the testimonials of satisfied clients and customers attest to the quality of its products and services. Genesis Group is dedicated to meeting all applicable regulatory and client requirements in order to maintain its high standards and ensure the satisfaction of its customers.
            </p> */}
            <p>Name: Jones faith</p>
            <div>Mr Edible point: 300 </div>
            <p> Registered on: 08/01/2024</p>
            <p>Address: Port Harcourt, abuja, Warri, Owerri</p>
            <p>Account name:Jones faith</p>
            <p>Account number: 0055889027</p>
            <p>Bank: FCMB</p>
            <p>Phone number: 09093450943</p>
            <p>Email Address: Admin@genesisgroup.com</p>
        </div>
        <div id='admin-vendor-search-fooditem-container'>
            <input type='text' placeholder='Search for food items'/>
            <h3>Order history</h3>
            <div id='admin-vendor-fooditem-container'>
                <CustomerHistoryFoodCard/>
                <CustomerHistoryFoodCard/>
                <CustomerHistoryFoodCard/>
                <CustomerHistoryFoodCard/>
            </div>
        </div>
    </div>
  )
}
