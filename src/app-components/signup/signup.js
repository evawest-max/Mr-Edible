import React, { useRef, useState } from 'react'
import "./signup.css"
import { Link, NavLink } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import users from './usersData'
import { child, equalTo, get, getDatabase, onValue, orderByChild, orderByValue, push, query, ref, set, update } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import { auth, database } from '../../firebase/firebase config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth, sendEmailVerification } from "firebase/auth";



function Signup() {

    let nameref=useRef()
    let phoneref=useRef()
    let emailref=useRef()
    let createpasswordref=useRef()
    let confirmpasswordref=useRef()
    let passportref=useRef()

    const [file, setfile]=useState()
    function onimagechange(e){
      console.log(e.target.files)
      setfile(e.target.files[0])
    }
    

    const [alerttext, setalerttext]=useState()
    const [alerttextcolor, setalerttextcolor]=useState()
    const [namebordercolor, setnamebordercolor]=useState()
    const [phonenumberbordercolor, setphonenumberbordercolor]=useState()
    const [emailbordercolor, setemailbordercolor]=useState()
    const [createpasswordbordercolor, setcreatepasswordbordercolor]=useState()
    const [confirmpasswordbordercolor, setconfirmpasswordbordercolor]=useState()
    const [buttonState, setButtonState]=useState("SIGN UP")

    function validatename(){
      if (nameref.current.value.length<4){
          setalerttextcolor({color: "red"})
          setnamebordercolor({border: "2px solid red"})
          setalerttext("Fullname must be longer than 4 letters.")
      }else{
        setnamebordercolor({border: "2px solid green"})
        setalerttext("")
      }
    }
    function validatePhonenumber(){
      if (phoneref.current.value.length!==11){
        setalerttextcolor({color: "red"})
        setphonenumberbordercolor({border: "2px solid red"})
        setalerttext("invalid phone number, 11 numbers only!")
      }else if(phoneref.current.value.length===11){
        setphonenumberbordercolor({border: "2px solid green"})
        setalerttext("")
      }
    }
    function validateEmail(){
      if (!emailref.current.value.includes("@") ){
        setalerttextcolor({color: "red"})
        setemailbordercolor({border: "2px solid red"})
        setalerttext("email is incorrect 'include @'")
      }else{
        setemailbordercolor({border: "2px solid green"})
        setalerttext("")
      }
    }
    function validateCreatePassword(){
      if (createpasswordref.current.value.includes(",")||createpasswordref.current.value.includes("!") ||createpasswordref.current.value.includes("@") ||createpasswordref.current.value.includes("#") ||createpasswordref.current.value.includes("$")||createpasswordref.current.value.includes("%") && createpasswordref.current.value.length>=6){
        setcreatepasswordbordercolor({border: "2px solid green"})
        setalerttext("")
      }else{
        setalerttextcolor({color: "red"})
        setcreatepasswordbordercolor({border: "2px solid red"})
        setalerttext("password must include one of this symbols', @ ! # $ %' and longer than 6 characters")
      }
    }


    const db = getDatabase();
    const storage= getStorage()

    async function registerUser (){
      setButtonState("Loading...")
      // const newPostKey = push(child(ref(db), 'users/')).key;
      
        if (nameref.current.value.length>4){
          if (phoneref.current.value.length===11){
            
              if (emailref.current.value.includes("@")){
                if (createpasswordref.current.value===confirmpasswordref.current.value && confirmpasswordref.current.value.length>=6){
                  if (confirmpasswordref.current.value.includes(",")||confirmpasswordref.current.value.includes("!")||confirmpasswordref.current.value.includes("@") ||confirmpasswordref.current.value.includes("#") ||confirmpasswordref.current.value.includes("$")||confirmpasswordref.current.value.includes("%")){
                    
                    try{
                      const userCredential=await createUserWithEmailAndPassword(auth, emailref.current.value, createpasswordref.current.value)
                      console.log(userCredential)
                      const user = userCredential.user
                      const postData={
                        id:user.uid,
                        name:nameref.current.value,
                        passport:`customer passport/ ${user.uid}`,
                        password:confirmpasswordref.current.value,
                        phonenumber:phoneref.current.value,
                        email:emailref.current.value,
                        ediblePoints:0,
                      }
                      await set(ref(db,"users/"+user.uid, ), postData).then(() => {
                        
                        console.log('Update success')
                      })
                      
                      const serverimageref= storageRef(storage, `customer passport/ ${user.uid}`)
                      await uploadBytes(serverimageref, file).then((snapshot) => {
                          console.log('Uploaded a blob or file!');
                        }).catch((error)=>{console.log(error)});
                      
                        
                        await sendEmailVerification(auth.currentUser)
                          .then(() => {
                            // Email verification sent!
                            // ...
                          })
                          .catch((error)=>{
                            setalerttext("Email verification not sent."+error.message)
                          });
                      setnamebordercolor({border: "2px solid green"})
                      setphonenumberbordercolor({border: "2px solid green"})
                      setemailbordercolor({border: "2px solid green"})
                      setcreatepasswordbordercolor({border: "2px solid green"})
                      setconfirmpasswordbordercolor({border: "2px solid green"})
                      setalerttextcolor({color: "lime"})
                      setalerttext("Sign up successfull! Email verification link has been sent to your mail.")
                      setButtonState("SIGN UP")
                    }catch (error){
                      setalerttextcolor({color: "red"})
                      setemailbordercolor({border: "2px solid red"})
                      setalerttext(error.message)
                      setButtonState("SIGN UP")
                      console.log(error.message)
                    }
                    
                  }else {
                    setalerttextcolor({color: "red"})
                    setconfirmpasswordbordercolor({border: "2px solid red"})
                    setalerttext("password must include one of this symbols', @ ! # $ %'")
                  }
                }else{
                  setalerttextcolor({color: "red"})
                  setemailbordercolor({border: "2px solid red"})
                  setalerttext("password do not match or shorter than 6 characters")
                }
              }else{
                setalerttextcolor({color: "red"})
                setemailbordercolor({border: "2px solid red"})
                setalerttext("email is incorrect 'include @'")
              }
          }else{
            setalerttextcolor({color: "red"})
            setphonenumberbordercolor({border: "2px solid red"})
            setalerttext("invalid phone number, 11 numbers only!")
          }
        }else{
          setalerttextcolor({color: "red"})
          setnamebordercolor({border: "2px solid red"})
          setalerttext("Fullname must be longer than 3 letters.")
        }
        
    }

    const [signupCustomerDisplay, setSignupCustomerDisplay]=useState({display: "block"})
    const [signupVendorDisplay, setSignupVendorDisplay]=useState({display: "none"})

    const [signupCustomerDisplayButton, setSignupCustomerDisplayButton]=useState({background:"green", color:"white", borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px", padding:"10px"})
    const [signupVendorDisplayButton, setSignupVendorDisplayButton]=useState({background:"none", borderRadius:"10px", padding:"10px"})

    function switchToCustomerSignup(){
      setSignupCustomerDisplay({display: "block"})
      setSignupVendorDisplay({display: "none"})
      setSignupCustomerDisplayButton({background:"green", color:"white", borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px", padding:"10px"})
      setSignupVendorDisplayButton({background:"none"})
    }
    function switchToVendorSignup(){
      setSignupVendorDisplay({display: "block"})
      setSignupCustomerDisplay({display: "none"})
      setSignupVendorDisplayButton({background:"green", color:"white",borderTopRightRadius:"10px", borderBottomRightRadius:"10px", padding:"10px"})
      setSignupCustomerDisplayButton({background:"none"})
    }

  return (
    <div id='signup-container'>
        <div id='signup-Form-container'>
            <h3 className='signup-title'>CREATE AN ACCOUNT</h3>
            <div style={{border:"1px solid green", width:"fit-content", borderRadius:"15px", height:"fit-content", margin:"auto"}}>
              <button style={signupCustomerDisplayButton} onClick={switchToCustomerSignup}>CUSTOMER</button>
              <button style={signupVendorDisplayButton} onClick={switchToVendorSignup}>VENDOR</button>
            </div>
            <p style={alerttextcolor}>{alerttext}</p>
            <div className='inputAndButtondiv' style={signupCustomerDisplay}>
              <form className='signup-form'>
                  <label>Full Name</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Phone number</label>
                  <input style={phonenumberbordercolor} onBlur={validatePhonenumber} ref={phoneref} type='phonenumber' placeholder='07030000000'/><br/>
                  <label>E-mail</label>
                  <input style={emailbordercolor}onBlur={validateEmail} ref={emailref} type='email' placeholder='example@yahoo.com'/><br/>
                  <label>Passport</label>
                  <input className='RegisterationImageName' ref={passportref} type='file' accept='image/*' onChange={onimagechange}/><br/>
                  <label>Create Password</label>
                  <input style={createpasswordbordercolor}onBlur={validateCreatePassword} ref={createpasswordref} type='password' placeholder='********'/><br/>
                  <label>Confirm Password</label>
                  <input style={confirmpasswordbordercolor} ref={confirmpasswordref} type='password' placeholder='********'/><br/>
                  <p><input style={confirmpasswordbordercolor} ref={confirmpasswordref} required type='checkbox' placeholder='********'/>i have read and i accept all the <Link to="www.facebook.com">terms and conditions</Link> </p>

              </form>
              <button onClick={registerUser} className='signup-button'><strong>{buttonState}</strong></button>
            </div>

              <div className='inputAndButtondiv' style={signupVendorDisplay}>
              <form className='signup-form'>
                  <label>Full Name</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Bussiness Name</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Phone number</label>
                  <input style={phonenumberbordercolor} onBlur={validatePhonenumber} ref={phoneref} type='phonenumber' placeholder='07030000000'/><br/>
                  <label>E-mail</label>
                  <input style={emailbordercolor}onBlur={validateEmail} ref={emailref} type='email' placeholder='example@yahoo.com'/><br/>
                  <label>Head Office Address</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Account number</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Account name</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Bank</label>
                  <input style={namebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Passport</label>
                  <input className='RegisterationImageName' ref={passportref} type='file' accept='image/*' onChange={onimagechange}/><br/>
                  <label>Bussiness logo</label>
                  <input className='RegisterationImageName' ref={passportref} type='file' accept='image/*' onChange={onimagechange}/><br/>
                  <label>Create Password</label>
                  <input style={createpasswordbordercolor}onBlur={validateCreatePassword} ref={createpasswordref} type='password' placeholder='********'/><br/>
                  <label>Confirm Password</label>
                  <input style={confirmpasswordbordercolor} ref={confirmpasswordref} type='password' placeholder='********'/><br/>

                    <p><input style={confirmpasswordbordercolor} ref={confirmpasswordref} required type='checkbox' placeholder='********'/>i have read and i accept all the <Link to="www.facebook.com">terms and conditions</Link> </p>
              </form>
              <button onClick={registerUser} className='signup-button'><strong>{buttonState}</strong></button>
              </div>

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