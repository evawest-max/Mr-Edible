import React, { useRef, useState } from 'react'
import "./login.css"
import { useContext } from 'react'
import { Cartcontext } from '../Mr edible store/context folder/appContext'
import {FcGoogle} from "react-icons/fc"
import { Link, NavLink } from 'react-router-dom'
import users from '../signup/usersData'



function LoginPage() {
  const cart= useContext(Cartcontext)

  const emailRef= useRef()
  const passwardRef=useRef()


  const [loginAlert, setloginAlert]=useState()
  const [alertcolor, setalertcolor]=useState({})
  const [emailbordercolor, setemailbordercolor]=useState({border: "1px solid darkorange"})
  const [passwordbordercolor, setpasswordbordercolor]=useState({border: "1px solid darkorange"})

  function validateEmail(){
    for (let i=0; i<users.length; i++){
      const checkone=emailRef.current.value.includes("@"&&"com")
      const checktwo=users[i].email===emailRef.current.value.toLocaleLowerCase()
      if (checkone && checktwo){
        setemailbordercolor({border: "2px solid green"})
        setloginAlert("")
      }else if (!emailRef.current.value.includes("@"&&".com")){
        setemailbordercolor({border: "2px solid red"})
        setalertcolor({color:"red"})
        setloginAlert("user does not exist")
      }
      
    }
  }
  const [signinsuccessful, setsigninsuccessful]=useState(false)
  
  function validateEmailAndPassword(){
    for (let i=0; i<users.length; i++){
      if (users[i].email===emailRef.current.value){
        if(users[i].password===passwardRef.current.value){
          setsigninsuccessful(true)
        }
      } 
    }
  }

  function submitlogin(){
    for (let i=0; i<users.length; i++){
      if (users[i].email===emailRef.current.value){
        if(users[i].password===passwardRef.current.value){
          setalertcolor({color:"green"})
          setemailbordercolor({border: "2px solid green"})
          setpasswordbordercolor({border: "2px solid green"})
          console.log("login successfull")
          setloginAlert("Sign in successfull!")
          cart.switchToUser(i)
        }else{
          setalertcolor({color:"red"})
          setemailbordercolor({border: "2px solid green"})
          setpasswordbordercolor({border: "2px solid red"})
          setloginAlert("Wrong password!")
        }
      } 
    }
    
  }

  return (
    
    <div className='login'>
      <div id='login-Form-container'>
        <h3 className='login-title'>SIGN IN</h3>
        <p style={alertcolor} className='signinalert'>{loginAlert}</p>
        <div className='loginFormAndButton'>
          <form className='login-form'>
            <label>E-mail</label>
            <input onBlur={validateEmail} style={emailbordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
            <label>Password</label>
            <input onBlur={validateEmailAndPassword} style={passwordbordercolor} ref={passwardRef} type='password' placeholder='********'/>
          </form>
          <p className='login-forgot-password'>Forgot password?</p>
          <Link onClick={submitlogin} to={signinsuccessful && '/user-profile'}><button className='login-button'><strong>SIGN IN</strong></button></Link>
        </div>
        
        <p className='login-options'>Or sign in using</p>
        <div className='login-option-picture'><FcGoogle/></div>
        
        <h5 className='sign-up-button'>
          <p>I dont Have an account?</p>
          <div><NavLink to="/signup-page">SIGN UP</NavLink></div>
        </h5>
      </div>
    </div>
        
    
    
  )
}

export default LoginPage
