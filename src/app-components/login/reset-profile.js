import React, { useRef, useState } from 'react'
import "./login.css"
import { sendPasswordResetEmail, } from 'firebase/auth'
import { auth,} from '../../firebase/firebase config'


function ResetPassword() {
//   const cart= useContext(Cartcontext)

  const emailRef= useRef()



  const [loginAlert, setloginAlert]=useState()
  const [alertcolor, setalertcolor]=useState({})
  const [emailbordercolor, setemailbordercolor]=useState({border: "1px solid darkorange"})
  const [buttonState, setButtonState]=useState("Reset")

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
  
  

  async function resetPassword(){
    setButtonState("Loading...")
    try{
      const userCredential=await sendPasswordResetEmail(auth, emailRef.current.value)
      setemailbordercolor({border: "green"})
      setalertcolor({color:"green"})
      setloginAlert("Rest link sent!")
      setButtonState("Reset")
      if (userCredential){
      }
    }catch(error){
      setemailbordercolor({border: "2px solid red"})
      setalertcolor({color:"red"})
      setloginAlert(error.message)
      setButtonState("Reset")
    }
  }
  

  return (
    
    <div className='login'>
      <div id='login-Form-container'>
        <h3 className='login-title'>Reset Password</h3>
        <p style={alertcolor} className='signinalert'>{loginAlert}</p>
        <div className='loginFormAndButton'>
          <form className='login-form'>
            <label>E-mail</label>
            <input onBlur={validateEmail} style={emailbordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
          </form>
          
        <button onClick={resetPassword} className='login-button'><strong>{buttonState}</strong></button>
        </div>
        <br></br>
        
        
        
      </div>
    </div>
        
    
    
  )
}

export default ResetPassword
