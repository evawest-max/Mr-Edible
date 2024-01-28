import React, { useRef, useState } from 'react'
import "./login.css"
import { useContext } from 'react'
import { Cartcontext } from '../Mr edible store/context folder/appContext'
import {FcGoogle} from "react-icons/fc"
import { Link, NavLink } from 'react-router-dom'
import users from '../signup/usersData'
import { signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase config'
import { get, getDatabase, ref, update } from 'firebase/database'
import { getAuth, sendEmailVerification } from "firebase/auth";
import { uploadBytes, ref as storageRef, getStorage, getDownloadURL } from 'firebase/storage'


function LoginPage() {
  const cart= useContext(Cartcontext)

  const emailRef= useRef()
  const passwardRef=useRef()


  const [loginAlert, setloginAlert]=useState()
  const [alertcolor, setalertcolor]=useState({})
  const [emailbordercolor, setemailbordercolor]=useState({border: "1px solid darkorange"})
  const [passwordbordercolor, setpasswordbordercolor]=useState({border: "1px solid darkorange"})
  const [buttonState, setButtonState]=useState("SIGN IN")

  function validateEmail(){
      if (!emailRef.current.value.includes("@")&& !emailRef.current.value.includes(".")){
        setemailbordercolor({border: "2px solid red"})
        setalertcolor({color:"red"})
        setloginAlert("Email must include '@'")
      }
      if (emailRef.current.value.includes("@")&& emailRef.current.value.includes(".")){
        setemailbordercolor({border: "none"})
        setalertcolor({color:"red"})
        setloginAlert("")
      }
  }
  const [signinsuccessful, setsigninsuccessful]=useState(false)
  const storage= getStorage()
  async function submitloginWithGoogle(){
    try{
      const userCredential=await signInWithPopup(auth, provider)
      console.log(userCredential)
      const user=userCredential.user
      
      if (user.emailVerified){
        setemailbordercolor({border: "none"})
        setpasswordbordercolor({border: "none"})
        setalertcolor({color:"green"})
        const serverimageref= storageRef(getStorage(), `customer passport/${user.uid}`)
        await getDownloadURL(serverimageref)
        .then(url=>{console.log(url.exist())})   
        .catch(()=>{
          fetch(user.photoURL).then(res => {
            return res.blob();
          }).then(blob => {
              //uploading blob to firebase storage
               uploadBytes(serverimageref, blob).then((snapshot) => {
                  console.log('Uploaded a blob or file!');
                }).catch((error)=>{console.log(error)});
          }).catch(error=>{
            alert("the image was not uploaded.")
          })

        })
        
        await update(ref(getDatabase(), "users/"+ user.uid),{
          last_login:new Date().toLocaleString(),
          email:user.email,
          id:user.uid,
          name:user.displayName,
          passport:`customer passport/ ${user.uid}`,
        }).then(()=>{
          cart.switchToUser(user.uid)
        })
        
        setloginAlert("Sign in successfull!")
        console.log("login successfull")
       
      }else{
        setalertcolor({color:"red"})
        setloginAlert(<p>account not verified<button>resend verification link</button></p>)
      }
    }catch(error){
      setalertcolor({color:"red"})
      setloginAlert(error.message)
      
    }
  }

  async function submitlogin(){
    setButtonState("Loading...")
    try{
      const userCredential=await signInWithEmailAndPassword(auth, emailRef.current.value, passwardRef.current.value)
      console.log(userCredential)
      const user=userCredential.user
      if (user.emailVerified===true){
        setemailbordercolor({border: "none"})
        setpasswordbordercolor({border: "none"})
        setalertcolor({color:"green"})
        await update(ref(getDatabase(), "users/"+ userCredential.uid),{
          last_login:new Date().toLocaleString(),
        })
        cart.switchToUser(user.uid)
        setloginAlert("Sign in successfull!")
        setButtonState("SIGN IN")
        console.log("login successfull")
      }else{
        setalertcolor({color:"red"})
        setloginAlert(<p>account not verified<button onClick={resendVerificationLink}>resend verification link</button></p>)
        setButtonState("SIGN IN")
      }
    }catch(error){
      setemailbordercolor({border: "2px solid red"})
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
    
    <div className='login'>
      <div id='login-Form-container'>
        <h3 className='login-title'>SIGN IN</h3>
        <p style={alertcolor} className='signinalert'>{loginAlert}</p>
        <div className='loginFormAndButton'>
          <form className='login-form'>
            <label>E-mail</label>
            <input onBlur={validateEmail} style={emailbordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
            <label>Password</label>
            <input style={passwordbordercolor} ref={passwardRef} type='password' placeholder='********'/>
          </form>
          <p className='login-forgot-password'><Link to="/reset-profile">Forgot password?</Link></p>
          <Link onClick={submitlogin} to={signinsuccessful && '/user-profile'}><button className='login-button'><strong>{buttonState}</strong></button></Link>
        </div>
        
        <p className='login-options'>Or sign in using</p>
        <div className='login-option-picture' onClick={submitloginWithGoogle}><FcGoogle/></div>
        
        <h5 className='sign-up-button'>
          <p>I dont Have an account?</p>
          <div><NavLink to="/signup-page">SIGN UP</NavLink></div>
        </h5>
      </div>
    </div>
        
    
    
  )
}

export default LoginPage
