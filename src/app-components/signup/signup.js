import React, { useRef, useState } from 'react'
import "./signup.css"
import { Link, NavLink } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import users from './usersData'

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
      if (createpasswordref.current.value.includes(",")||createpasswordref.current.value.includes("@") ||createpasswordref.current.value.includes("#") ||createpasswordref.current.value.includes("$")||createpasswordref.current.value.includes("%") && createpasswordref.current.value.length>=6){
        setcreatepasswordbordercolor({border: "2px solid green"})
        setalerttext("")
      }else{
        setalerttextcolor({color: "red"})
        setcreatepasswordbordercolor({border: "2px solid red"})
        setalerttext("password must include one of this symbols', @ # $ %' and longer than 6 characters")
      }
    }

    let userexist=false

    const registerUser= ()=>{
      for (let i=0; i<users.length; i++){
        if (users[i].email === emailref.current.value){
          userexist=true
        }
      } 
        if (nameref.current.value.length>4){
          if (phoneref.current.value.length===11){
            if (!userexist){
              if (emailref.current.value.includes("@") && !userexist){
                if (createpasswordref.current.value===confirmpasswordref.current.value && confirmpasswordref.current.value.length>=6){
                  if (confirmpasswordref.current.value.includes(",")||confirmpasswordref.current.value.includes("@") ||confirmpasswordref.current.value.includes("#") ||confirmpasswordref.current.value.includes("$")||confirmpasswordref.current.value.includes("%")){
                    let newuser={
                      id:users[users.length-1].id+1,
                      name:nameref.current.value,
                      email:emailref.current.value,
                      phonenumber:phoneref.current.value,
                      password : confirmpasswordref.current.value,
                      passport: URL.createObjectURL(file)
                    }
                    if(localStorage.getItem('mredibleaccount')!==null){
                      let stringusers=localStorage.getItem('mredibleaccount')
                      let objectusers=JSON.parse(stringusers)
                      objectusers.push(newuser)
                      localStorage.setItem('mredibleaccount', JSON.stringify(objectusers))
                    }else{
                      users.push(newuser)
                      localStorage.setItem('mredibleaccount',JSON.stringify(users))
                    }
                    console.log(users)
                    
                    setnamebordercolor({border: "2px solid green"})
                    setphonenumberbordercolor({border: "2px solid green"})
                    setemailbordercolor({border: "2px solid green"})
                    setcreatepasswordbordercolor({border: "2px solid green"})
                    setconfirmpasswordbordercolor({border: "2px solid green"})
                    setalerttextcolor({color: "lime"})
                    setalerttext("Sign up successfull")
                    userexist=false
                  }else {
                    setalerttextcolor({color: "red"})
                    setconfirmpasswordbordercolor({border: "2px solid red"})
                    setalerttext("password must include one of this symbols', @ # $ %'")
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
              setemailbordercolor({border: "2px solid red"})
              setalerttext("User already exist")
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

  return (
    <div id='signup-container'>
        <div id='signup-Form-container'>
            <h3 className='signup-title'>CREATE AN ACCOUNT</h3>
            <p style={alerttextcolor}>{alerttext}</p>
            <div className='inputAndButtondiv'>
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
              </form>
              <button onClick={registerUser} className='signup-button'><strong>SIGN UP</strong></button>
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