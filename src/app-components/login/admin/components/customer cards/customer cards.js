import React from 'react'
import "./customer cards.css"
import { NavLink } from 'react-router-dom'

export default function CustomerCards(props) {
  return (
    <div id='customer-card-container'>
        <img src="https://media.istockphoto.com/id/470958260/photo/photobooth-picture-of-a-young-woman.jpg?s=612x612&w=0&k=20&c=dkBS8IjDmYUGgu_dsE1IbIVKTtDZJkqPPkDXZTkxQM0="  alt='vendor logo'/>
        {/* <p id='asset-card-text1'>Total no of {props.properties} {props.landlords} {props.tenants}</p> */}
        <h1>Jones faith</h1>
        <NavLink to="customerdetails"><p id='customer-card-more-details'>More details</p></NavLink>
        <button id='customer-activate-account-BTN'>Activate Account</button>
        <div >
            <textarea placeholder='Comments...'/>
            <div id='customer-comment-btn-container'>
                <button id='customer-suspend-account-BTN'>Suspend Account</button>
                <button id='customer-delete-Account'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}
