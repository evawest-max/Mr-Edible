import React, { useRef, useState } from 'react'
import "./signup.css"
import { Link, NavLink } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { getDatabase, onValue, orderByChild, orderByValue, push, query, ref, set, update } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import { auth,} from '../../firebase/firebase config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { sendEmailVerification } from "firebase/auth";
import Footer from '../../footer-components/footer'



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
    

    const [customerAlerttext, setCustomeralerttext]=useState()
    const [customerAlerttextcolor, setCustomerAlerttextcolor]=useState()
    const [vendorAlerttext, setVendorAlerttext]=useState()
    const [vendorAlerttextcolor, setVendorAlerttextcolor]=useState()
    const [customerNamebordercolor, setCustomerNamebordercolor]=useState()
    const [vendorNamebordercolor, setVendorNamebordercolor]=useState()
    const [phonenumberbordercolor, setphonenumberbordercolor]=useState()
    const [customerEmailbordercolor, setCustomerEmailbordercolor]=useState()
    const [vendorEmailbordercolor, setVendorEmailbordercolor]=useState()
    const [createpasswordbordercolor, setcreatepasswordbordercolor]=useState()
    const [confirmpasswordbordercolor, setconfirmpasswordbordercolor]=useState()
    const [buttonState, setButtonState]=useState("SIGN UP")

    function validatename(){
      if (nameref.current.value.length<4){
          setCustomerAlerttextcolor({color: "red"})
          setCustomerNamebordercolor({border: "2px solid red"})
          setCustomeralerttext("Fullname must be longer than 4 letters.")
      }else{
        setCustomerNamebordercolor({border: "2px solid green"})
        setCustomeralerttext("")
      }
    }
    function validatePhonenumber(){
      if (phoneref.current.value.length!==11){
        setCustomerAlerttextcolor({color: "red"})
        setphonenumberbordercolor({border: "2px solid red"})
        setCustomeralerttext("invalid phone number, 11 numbers only!")
      }else if(phoneref.current.value.length===11){
        setphonenumberbordercolor({border: "2px solid green"})
        setCustomeralerttext("")
      }
    }
    function validateEmail(){
      if (!emailref.current.value.includes("@") ){
        setCustomerAlerttextcolor({color: "red"})
        setCustomerEmailbordercolor({border: "2px solid red"})
        setCustomeralerttext("email is incorrect 'include @'")
      }else{
        setCustomerEmailbordercolor({border: "2px solid green"})
        setCustomeralerttext("")
      }
    }
    function validateCreatePassword(){
      if (createpasswordref.current.value.includes(",")||createpasswordref.current.value.includes("!") ||createpasswordref.current.value.includes("@") ||createpasswordref.current.value.includes("#") ||createpasswordref.current.value.includes("$")||createpasswordref.current.value.includes("%") && createpasswordref.current.value.length>=6){
        setcreatepasswordbordercolor({border: "2px solid green"})
        setCustomeralerttext("")
      }else{
        setCustomerAlerttextcolor({color: "red"})
        setcreatepasswordbordercolor({border: "2px solid red"})
        setCustomeralerttext("password must include one of this symbols', @ ! # $ %' and longer than 6 characters")
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
                        accountType:"customer"
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
                            setCustomeralerttext("Email verification not sent."+error.message)
                          });
                      setCustomerNamebordercolor({border: "2px solid green"})
                      setphonenumberbordercolor({border: "2px solid green"})
                      setCustomerEmailbordercolor({border: "2px solid green"})
                      setcreatepasswordbordercolor({border: "2px solid green"})
                      setconfirmpasswordbordercolor({border: "2px solid green"})
                      setCustomerAlerttextcolor({color: "lime"})
                      setCustomeralerttext("Sign up successfull! Email verification link has been sent to your mail.")
                      setButtonState("SIGN UP")
                    }catch (error){
                      setCustomerAlerttextcolor({color: "red"})
                      setCustomerEmailbordercolor({border: "2px solid red"})
                      setCustomeralerttext(error.message)
                      setButtonState("SIGN UP")
                      console.log(error.message)
                    }
                    
                  }else {
                    setCustomerAlerttextcolor({color: "red"})
                    setconfirmpasswordbordercolor({border: "2px solid red"})
                    setCustomeralerttext("password must include one of this symbols', @ ! # $ %'")
                  }
                }else{
                  setCustomerAlerttextcolor({color: "red"})
                  setCustomerEmailbordercolor({border: "2px solid red"})
                  setCustomeralerttext("password do not match or shorter than 6 characters")
                }
              }else{
                setCustomerAlerttextcolor({color: "red"})
                setCustomerEmailbordercolor({border: "2px solid red"})
                setCustomeralerttext("email is incorrect 'include @'")
              }
          }else{
            setCustomerAlerttextcolor({color: "red"})
            setphonenumberbordercolor({border: "2px solid red"})
            setCustomeralerttext("invalid phone number, 11 numbers only!")
          }
        }else{
          setCustomerAlerttextcolor({color: "red"})
          setCustomerNamebordercolor({border: "2px solid red"})
          setCustomeralerttext("Fullname must be longer than 3 letters.")
        }
        
    }

    function vendorValidatename(){
      if (nameref.current.value.length<4){
          setVendorAlerttextcolor({color: "red"})
          setVendorNamebordercolor({border: "2px solid red"})
          setVendorAlerttext("Fullname must be longer than 4 letters.")
      }else{
        setVendorNamebordercolor({border: "2px solid green"})
        setVendorAlerttext("")
      }
    }
    function vendorValidatePhonenumber(){
      if (phoneref.current.value.length!==11){
        setVendorAlerttextcolor({color: "red"})
        setphonenumberbordercolor({border: "2px solid red"})
        setVendorAlerttext("invalid phone number, 11 numbers only!")
      }else if(phoneref.current.value.length===11){
        setphonenumberbordercolor({border: "2px solid green"})
        setVendorAlerttext("")
      }
    }
    function vendorValidateEmail(){
      if (!emailref.current.value.includes("@") ){
        setVendorAlerttextcolor({color: "red"})
        setVendorEmailbordercolor({border: "2px solid red"})
        setVendorAlerttext("email is incorrect 'include @'")
      }else{
        setVendorEmailbordercolor({border: "2px solid green"})
        setVendorAlerttext("")
      }
    }
    function vendorValidateCreatePassword(){
      if (createpasswordref.current.value.includes(",")||createpasswordref.current.value.includes("!") ||createpasswordref.current.value.includes("@") ||createpasswordref.current.value.includes("#") ||createpasswordref.current.value.includes("$")||createpasswordref.current.value.includes("%") && createpasswordref.current.value.length>=6){
        setcreatepasswordbordercolor({border: "2px solid green"})
        setVendorAlerttext("")
      }else{
        setVendorAlerttextcolor({color: "red"})
        setcreatepasswordbordercolor({border: "2px solid red"})
        setVendorAlerttext("password must include one of this symbols', @ ! # $ %' and longer than 6 characters")
      }
    }


    let vendorNameref=useRef()
    let vendorBussinessNameref=useRef()
    let vendorPhoneref=useRef()
    let vendorEmailref=useRef()
    let vendorcreatepasswordref=useRef()
    let vendorConfirmpasswordref=useRef()
    let vendorLogoref=useRef()
    let vendorAddressref=useRef()
    let vendorAccountNameref=useRef()
    let vendorAccountNumberRef=useRef()
    let vendorBankNameref=useRef()

    const [vendorFile, setVendorFile]=useState()
    function onVendorImagechange(e){
      console.log(e.target.files)
      setVendorFile(e.target.files[0])
    }

    async function registerVendor (){
      // alert("it was clickeed")
      setButtonState("Loading...")
      // const newPostKey = push(child(ref(db), 'users/')).key;
      
        if (vendorNameref.current.value.length>4){
          if (vendorPhoneref.current.value.length===11){
            
              if (vendorEmailref.current.value.includes("@")){
                if (vendorcreatepasswordref.current.value===vendorConfirmpasswordref.current.value && vendorConfirmpasswordref.current.value.length>=6){
                  if (vendorConfirmpasswordref.current.value.includes(",")||vendorConfirmpasswordref.current.value.includes("!")||vendorConfirmpasswordref.current.value.includes("@") ||vendorConfirmpasswordref.current.value.includes("#") ||vendorConfirmpasswordref.current.value.includes("$")||vendorConfirmpasswordref.current.value.includes("%")){
                    
                    try{
                      const userCredential=await createUserWithEmailAndPassword(auth, vendorEmailref.current.value, vendorConfirmpasswordref.current.value)
                      console.log(userCredential)
                      const vendor = userCredential.user
                      const postData={
                        id:vendor.uid,
                        name:vendorNameref.current.value,
                        bussiness_name:vendorBussinessNameref.current.value,
                        passport:`customer passport/ ${vendor.uid}`,
                        password:vendorConfirmpasswordref.current.value,
                        phonenumber:vendorPhoneref.current.value,
                        email:vendorEmailref.current.value,
                        address:vendorAddressref.current.value,
                        accountName: vendorBankNameref.current.value,
                        accountNumber: vendorAccountNumberRef.current.value,
                        bankName: vendorBankNameref.current.value,
                        ediblePoints:0,
                        accountType:"vendor",
                        registeration_date_and_time:new Date().toLocaleString(),
                        store_status:false
                      }
                      await set(ref(db,"users/"+vendor.uid, ), postData).then(() => {
                        
                        console.log('Update success')
                      })
                      
                      const serverimageref= storageRef(storage, `customer passport/ ${vendor.uid}`)
                      await uploadBytes(serverimageref, vendorFile).then((snapshot) => {
                          console.log('Uploaded a blob or file!');
                        }).catch((error)=>{console.log(error)});
                      
                        
                        await sendEmailVerification(auth.currentUser)
                          .then(() => {
                            // Email verification sent!
                            // ...
                          })
                          .catch((error)=>{
                            setVendorAlerttext("Email verification not sent."+error.message)
                          });
                      setVendorNamebordercolor({border: "2px solid green"})
                      setphonenumberbordercolor({border: "2px solid green"})
                      setVendorEmailbordercolor({border: "2px solid green"})
                      setcreatepasswordbordercolor({border: "2px solid green"})
                      setconfirmpasswordbordercolor({border: "2px solid green"})
                      setVendorAlerttextcolor({color: "lime"})
                      setVendorAlerttext("Sign up successfull! Email verification link has been sent to your mail.")
                      setButtonState("SIGN UP")
                    }catch (error){
                      setVendorAlerttextcolor({color: "red"})
                      setVendorEmailbordercolor({border: "2px solid red"})
                      setVendorAlerttext(error.message)
                      setButtonState("SIGN UP")
                      console.log(error.message)
                    }
                    
                  }else {
                    setVendorAlerttextcolor({color: "red"})
                    setconfirmpasswordbordercolor({border: "2px solid red"})
                    setVendorAlerttext("password must include one of this symbols', @ ! # $ %'")
                    setButtonState("SIGN UP")
                  }
                }else{
                  setVendorAlerttextcolor({color: "red"})
                  setVendorEmailbordercolor({border: "2px solid red"})
                  setVendorAlerttext("password do not match or shorter than 6 characters")
                  setButtonState("SIGN UP")
                }
              }else{
                setVendorAlerttextcolor({color: "red"})
                setVendorEmailbordercolor({border: "2px solid red"})
                setVendorAlerttext("email is incorrect 'include @'")
                setButtonState("SIGN UP")
              }
          }else{
            setVendorAlerttextcolor({color: "red"})
            setphonenumberbordercolor({border: "2px solid red"})
            setVendorAlerttext("invalid phone number, 11 numbers only!")
            setButtonState("SIGN UP")
          }
        }else{
          setVendorAlerttextcolor({color: "red"})   
          setVendorNamebordercolor({border: "2px solid red"})
          setVendorAlerttext("Fullname must be longer than 3 letters.")
          setButtonState("SIGN UP")
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
      setSignupVendorDisplayButton({background:"white", color:"green",borderTopRightRadius:"10px", borderBottomRightRadius:"10px", padding:"10px"})
      setVendorAlerttextcolor({display:"none"})
      setCustomerAlerttextcolor({display:"block", color:"red"})
    }
    function switchToVendorSignup(){
      setSignupVendorDisplay({display: "block"})
      setSignupCustomerDisplay({display: "none"})
      setSignupVendorDisplayButton({background:"green", color:"white",borderTopRightRadius:"10px", borderBottomRightRadius:"10px", padding:"10px"})
      setSignupCustomerDisplayButton({background:"white", color:"green", borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px", padding:"10px"})
      setVendorAlerttextcolor({display:"block", color:"red"})
      setCustomerAlerttextcolor({display:"none"})
    }
    const [checkstyle, setCheckstyle]=useState({display:"none"})
    function handleChange(e) {
      if (e.target.checked) {
        setCheckstyle({display:"block"})
      } else {
        setCheckstyle({display:"none"})
      }
   }

  return (
    <div>
    <div id='signup-container'>
        <div id='signup-Form-container'>
            <h3 className='signup-title'>CREATE AN ACCOUNT</h3>
            <div style={{border:"1px solid green", backgroundColor:"white", width:"fit-content", borderRadius:"15px", height:"fit-content", display:"flex", margin:"auto"}}>
              <button style={signupCustomerDisplayButton} onClick={switchToCustomerSignup}>CUSTOMER</button>
              <button style={signupVendorDisplayButton} onClick={switchToVendorSignup}>VENDOR</button>
            </div>
            <p style={customerAlerttextcolor}>{customerAlerttext}</p>
            <div className='inputAndButtondiv' style={signupCustomerDisplay}>
              <form className='signup-form'>
                  <label>Full Name</label>
                  <input style={customerNamebordercolor} onBlur={validatename} ref={nameref} type='text' placeholder='John Smith'/><br/>
                  <label>Phone number</label>
                  <input style={phonenumberbordercolor} onBlur={validatePhonenumber} ref={phoneref} type='phonenumber' placeholder='07030000000'/><br/>
                  <label>E-mail</label>
                  <input style={customerEmailbordercolor}onBlur={validateEmail} ref={emailref} type='email' placeholder='example@yahoo.com'/><br/>
                  <label>Passport</label>
                  <input className='RegisterationImageName' ref={passportref} type='file' accept='image/*' onChange={onimagechange}/><br/>
                  <label>Create Password</label>
                  <input style={createpasswordbordercolor}onBlur={validateCreatePassword} ref={createpasswordref} type='password' placeholder='********'/><br/>
                  <label>Confirm Password</label>
                  <input style={confirmpasswordbordercolor} ref={confirmpasswordref} type='password' placeholder='********'/><br/>
                  <p id='sign-up-terms-and-Conditions'><input  required type='checkbox' placeholder='********'/>i have read and i accept all the <Link to="www.facebook.com">terms and conditions</Link> </p>

              </form>
              <button onClick={registerUser} className='signup-button'><strong>{buttonState}</strong></button>
            </div>
            <p style={vendorAlerttextcolor}>{vendorAlerttext}</p>
            <div className='inputAndButtondiv' style={signupVendorDisplay}>
              <form className='signup-form'>
                  <label>Full Name</label>
                  <input style={vendorNamebordercolor} onBlur={vendorValidatename} ref={vendorNameref} type='text' placeholder='John Smith' required/><br/>
                  <label>Bussiness Name</label>
                  <input   ref={vendorBussinessNameref} type='text' placeholder='John Smith'/><br/>
                  <label>Phone number</label>
                  <input  onBlur={vendorValidatePhonenumber} ref={vendorPhoneref} type='phonenumber' placeholder='07030000000'/><br/>
                  <label>E-mail</label>
                  <input style={vendorEmailbordercolor} onBlur={vendorValidateEmail} ref={vendorEmailref} type='email' placeholder='example@yahoo.com'/><br/>
                  <label>Head Office Address</label>
                  <input  ref={vendorAddressref} type='text' placeholder='John Smith'/><br/>
                  <label>Account number</label>
                  <input  ref={vendorAccountNumberRef} type='text' placeholder='John Smith'/><br/>
                  <label>Account name</label>
                  <input  ref={vendorAccountNameref} type='text' placeholder='John Smith'/><br/>
                  <label>Bank</label>
                  <input  ref={vendorBankNameref} type='text' placeholder='John Smith'/><br/>
                  {/* <label>Passport</label>
                  <input className='RegisterationImageName'  type='file' accept='image/*' onChange={onimagechange}/><br/> */}
                  <label>Bussiness logo</label>
                  <input className='RegisterationImageName' ref={vendorLogoref} type='file' accept='image/*' onChange={onVendorImagechange}/><br/>
                  <label>Create Password</label>
                  <input  onBlur={vendorValidateCreatePassword} ref={vendorcreatepasswordref} type='password' placeholder='********'/><br/>
                  <label>Confirm Password</label>
                  <input  ref={vendorConfirmpasswordref} type='password' placeholder='********'/><br/>

                    <p id='sign-up-terms-and-Conditions'><input required onChange = {handleChange} type='checkbox'/>i have read and i accept all the <Link to="www.facebook.com">terms and conditions</Link> </p>
              </form>
              <button onClick={registerVendor} className='signup-button' style={checkstyle}><strong>{buttonState}</strong></button>
              </div>

            <h5 className='sign-up-button'>
              <p onkey>I already Have an account?</p>
              <div><NavLink to="/login-page">SIGN IN</NavLink></div>
            </h5>
            <p className='login-options'>Or sign in using</p>
            <div className='login-option-picture'><FcGoogle/></div>
          </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Signup