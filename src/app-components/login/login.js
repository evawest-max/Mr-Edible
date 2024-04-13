import React, { useRef, useState } from 'react'
import "./login.css"
import { useContext } from 'react'
import { Cartcontext } from '../Mr edible store/context folder/appContext'
import {FcGoogle} from "react-icons/fc"
import { Link, NavLink, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase config'
import { get, getDatabase, onValue, ref, update } from 'firebase/database'
import { getAuth, sendEmailVerification } from "firebase/auth";
import Footer from '../../footer-components/footer'


function LoginPage() {
  const cart= useContext(Cartcontext)

  const emailRef= useRef()
  const passwardRef=useRef()

  const [loginAlert, setloginAlert]=useState()
  const [alertcolor, setalertcolor]=useState({})
  const [emailbordercolor, setemailbordercolor]=useState({border: "1px solid darkorange"})
  const [passwordbordercolor, setpasswordbordercolor]=useState({border: "1px solid darkorange"})
  const [buttonState, setButtonState]=useState("SIGN IN")
  
  async function submitCustomerLoginWithGoogle(){
    try{
      const userCredential=await signInWithPopup(auth, provider)
      console.log(userCredential)
      const user=userCredential.user
      console.log(user)
      const postdata={
        last_login:new Date().toLocaleString(),
        id:user.uid,
        name:user.displayName,
        passport:`customer passport/ ${user.uid}`,
        email:user.email,
      }
      await update(ref(getDatabase(), "users/"+user.uid),postdata)
      const data=await get(ref(getDatabase(), "users/"+user.uid))
      localStorage.setItem('mredibleloggedinUser', JSON.stringify({...data.val()}))
      let person=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
      if (!person.hasOwnProperty('accountType')){  
        const postdata={
          accountType:"customer"
        }
        await update(ref(getDatabase(), "users/"+user.uid),postdata)
        const data=await get(ref(getDatabase(), "users/"+user.uid))
        localStorage.setItem('mredibleloggedinUser', JSON.stringify({...data.val()}))
        cart.switchToUser(user.uid, 1,)
          setalertcolor({color:"blue"})
          setloginAlert("Sign in successfull!")
      }
      else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"){
        cart.switchToUser(user.uid, 1)
        setalertcolor({color:"green"})
        setloginAlert("Sign in successfull!")
      }
      else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"){
        cart.switchToUser(user.uid, 2)
        setalertcolor({color:"green"})
        setloginAlert("Sign in successfull!")
      }
      else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"){
        cart.switchToUser(user.uid, 3)
        setalertcolor({color:"green"})
        setloginAlert("Sign in successfull!")
      }
      
    }catch(error){
      setalertcolor({color:"red"})
      setloginAlert(error.message)
    }
  }

  async function submitCustomerLogin(){
    setButtonState("Loading...")
    try{
      const userCredential=await signInWithEmailAndPassword(auth, emailRef.current.value, passwardRef.current.value)
      // console.log(userCredential)
      const user=userCredential.user
      if (user.emailVerified===true){
        const data=await get(ref(getDatabase(), "users/"+user.uid))
        localStorage.setItem('mredibleloggedinUser', JSON.stringify({...data.val()}))
        // const dataRef =ref(getDatabase(), "users/"+user.uid);
        // onValue(dataRef, (snapshot) => {
        //   const data = snapshot.val();;
        //   localStorage.setItem('mredibleloggedinUser', JSON.stringify({...data}))
        // });
      }
      else{
          setalertcolor({color:"red"})
          setloginAlert(<p>account not verified<button onClick={resendVerificationLink}>resend verification link</button></p>)
          setButtonState("SIGN IN")
        }
      if (localStorage.getItem('mredibleloggedinUser') !== null){  
        if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="customer"){
          await update(ref(getDatabase(), "users/"+user.uid),{
            last_login:new Date().toLocaleString(),
          })
          cart.switchToUser(user.uid, 1)
          setalertcolor({color:"green"})
          setloginAlert("Sign in successfull!")
          setButtonState("SIGN IN")
        }
        else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="vendor"){
          await update(ref(getDatabase(), "users/"+user.uid),{
            last_login:new Date().toLocaleString(),
          })
          cart.switchToUser(user.uid, 2)
          setalertcolor({color:"green"})
          setloginAlert("Sign in successfull!")
          setButtonState("SIGN IN")
        }
        else if (JSON.parse(localStorage.getItem('mredibleloggedinUser')).accountType==="admin"){
          await update(ref(getDatabase(), "users/"+user.uid),{
            last_login:new Date().toLocaleString(),
          })
          cart.switchToUser(user.uid, 3)
          setalertcolor({color:"green"})
          setButtonState("SIGN IN")
        }
      }

    }catch(error){
      setemailbordercolor({border: "2px solid red"})
      setpasswordbordercolor({border: "2px solid red"})
      setalertcolor({color:"red"})
      setloginAlert(error.message)
      setButtonState("SIGN IN")
    }
  }
  function resendVerificationLink(){
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setalertcolor({color:"green"})
        setloginAlert("Verification link sent")
      })
      .catch((error)=>{
        setalertcolor({color:"red"})
        setloginAlert("Verification link not sent"+error.message)
      });
  }

  return (    
    <div>
    <div className='login'>
      <h3 className='login-title'>SIGN-IN</h3>
      <div id='login-Form-container'>
        <p style={alertcolor} className='signinalert'>{loginAlert}</p>
        <div className='loginFormAndButton'>
          <form className='login-form'>
            <label>E-mail</label>
            <input style={emailbordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
            <label>Password</label>
            <input style={passwordbordercolor} ref={passwardRef} type='password' placeholder='********'/>
          </form>
          <p id='login-forgot-passwords'><Link to="/reset-profile">Forgot password?</Link></p>
          <button onClick={submitCustomerLogin} className='login-button'><strong>{buttonState}</strong></button>
        </div>
        {cart.authdata==="customer" &&  <Navigate to='/user-profile'/>}
        {cart.authdata==="vendor" &&  <Navigate to='/Vendor-profile-Overview'/>}
        {cart.authdata==="admin" &&  <Navigate to='/admin-page'/>}
        <p className='login-options'>Or sign in using</p>
        <div className='login-option-picture' onClick={submitCustomerLoginWithGoogle}><FcGoogle/></div>
        
        <h5 className='sign-up-button'>
          <p>I dont Have an account?</p>
          <div><NavLink to="/signup-page">SIGN UP</NavLink></div>
        </h5>
      </div> 
    </div>
    <Footer/>
    </div> 
    
    
  )
}
export default LoginPage
