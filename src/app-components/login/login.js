import React, { useRef } from 'react'
import "./login.css"

import {FcGoogle} from "react-icons/fc"
import { NavLink } from 'react-router-dom'

function LoginPage() {
  const emailRef= useRef()
  let bordercolor={
    borderColor: "none"
  }
  function validateEmail(){
    if (emailRef.current.value.includes("@"&&".com")){
      bordercolor.borderColor= "green"
    }
    else {
      bordercolor.borderColor= "red"
    }
  }
  const passwardRef=useRef()
  
  function validatePassword(){
    let range=/^[0-9]+$/
    range.test(passwardRef.current.value)&& console.log("yes it is number")
  }
  return (
    <div>
        <div className='login'>
          <div id='login-Form-container'>
            <h3 className='login-title'>SIGN IN</h3>
            <form className='login-form'>
              <label>E-mail</label>
              <input onBlur={validateEmail} style={bordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
              <label>Password</label>
              <input onBlur={validatePassword} ref={passwardRef} type='password' placeholder='********'/>
            </form>
            <p className='login-forgot-password'>Forgot password?</p>
            <button className='login-button'><strong>SIGN IN</strong></button>
            <p className='login-options'>Or sign in using</p>
            <div className='login-option-picture'><FcGoogle/></div>
            
            <h5 className='sign-up-button'>
              <p>I dont Have an account?</p>
              <div><NavLink to="/signup-page">SIGN UP</NavLink></div>
            </h5>
          </div>
        </div>
        
    </div>
    
  )
}

export default LoginPage
