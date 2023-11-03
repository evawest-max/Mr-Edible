import React from 'react'
import "./user-profile.css"
import { Cartcontext } from '../../context folder/appContext'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

function UserProfile() {
    const cart= useContext(Cartcontext)
    function signout(){
        cart.signout()
    }
    let uses=cart.currentUser
  return (
    <div className='profileContainer' >
        <p id='profile-welcome'>Welcome:  <p id='profile-name'>{uses.name} <br></br>{uses.email},   {uses.phonenumber}</p></p>
        <div id='profile-links'>
          <div>
            <p>Orders:0</p>
          </div>
          <div>
            <p>Pending disputes:0</p>
          </div>
          <div>
            <p>Promo Code:None</p>
          </div>
        </div>
        <NavLink to="/login-page">
        <button id='sign-out-button' onClick={signout}>Sign out</button>
        </NavLink>
        <button id='delete-button'>Delete my account</button>
        <button id='edit-button'>Edit my account</button>
    </div>
  )
}

export default UserProfile