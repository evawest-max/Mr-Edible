import React from 'react'
import "./vendor card.css"
import { NavLink } from 'react-router-dom'

export default function VendorCards(props) {
  return (
    <div id='vendor-card-container'>
        <img src="https://www.businesslist.com.ng/img/ng/k/1618929858-45-genesis-foods-nigeria-limited.jpg"  alt='vendor logo'/>
        {/* <p id='asset-card-text1'>Total no of {props.properties} {props.landlords} {props.tenants}</p> */}
        <h1>{props.numb1} {props.numb2} {props.numb3} Food items</h1>
        <NavLink to="vendordetails"><p id='vendor-card-more-details'>More details</p></NavLink>
        <button id='vendor-activate-account-BTN'>Activate Account</button>
        <div >
            <textarea placeholder='Comments...'/>
            <div id='vendor-comment-btn-container'>
                <button id='vendor-suspend-account-BTN'>Suspend Account</button>
                <button id='vendor-delete-Account'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}
