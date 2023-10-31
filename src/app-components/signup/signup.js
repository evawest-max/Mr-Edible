import React from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

function Signup() {
  return (
    <div id='signup-container'>
        <div id='signup-Form-container'>
            <h3 className='signup-title'>SIGN UP</h3>
            <form className='signup-form'>
                <label>Full Name</label>
                <input type='text' placeholder='John Smith'/><br/>
                <label>Phone number</label>
                <input type='phonenumber' placeholder='07030000000'/><br/>
                <label>E-mail</label>
                <input type='email' placeholder='example@yahoo.com'/><br/>
                <label>Create Password</label>
                <input type='password' placeholder='********'/><br/>
                <label>Confirm Password</label>
                <input type='password' placeholder='********'/><br/>
            </form>
            <button className='signup-button'><strong>SIGN UP</strong></button>
            
            <h5 className='sign-up-button'>
              <p>I already Have an account?</p>
              <div><NavLink to="/login-page">SIGN IN</NavLink></div>
            </h5>
            <p className='login-options'>Or sign in using</p>
            <div className='login-option-picture'><FcGoogle/></div>
          </div>
    </div>
  )
}

export default Signup