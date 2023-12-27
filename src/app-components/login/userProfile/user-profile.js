import React, { useRef, useState } from 'react'
import "./user-profile.css"
import { Cartcontext } from '../../Mr edible store/context folder/appContext'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import users from '../../signup/usersData'
import { FaBox } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { IoSettings } from "react-icons/io5";
import { MdForwardToInbox } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import Cart from '../../Mr edible store/cart component/cart'
import { useEffect } from 'react'
// import propic from "C:\\fakepath\\IMG_20230809_082548_707~2.jpg"


function UserProfile() {
    const cart= useContext(Cartcontext)
    function signout(){
      localStorage.removeItem('mredibleloggedinUser')
        cart.signout()
    }
    let user=cart.currentUser

    const [deleteButton, setdeleteButton]=useState(<button id='delete-button' onClick={switchDeletebutton}>Delete my account</button>)
    function switchDeletebutton(){
      setdeleteButton(<div>
        <h3>Are you sure? <br/>if you delete account all your records will be lost for ever.</h3>
        <div>
          <Link to="/signup-page"><button onClick={deleteAccount} id='delete-button'>Yes</button></Link>
          <button onClick={switchBackToDeletebutton} id='edit-button'>No</button>
        </div>
      </div>)
    }
    function deleteAccount(){
      users.map((item, index)=>{
        if (item.id===cart.currentUser.id){
          cart.deleteUserAccount(index)
          localStorage.removeItem('mredibleloggedinUser')
        }
      })
    }
    function switchBackToDeletebutton(){
      setdeleteButton(<button id='delete-button' onClick={switchDeletebutton}>Delete my account</button>)
    }

    const [namebordercolors, setnamebordercolors]=useState()
    const [phonenumberbordercolors, setphonenumberbordercolors]=useState()
  

    const nameref=useRef()
    const phoneref=useRef()
    const adressessref=useRef()
    const [editButton, setEditButton]=useState(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
    function editaccount(){
      setEditButton(<div className='edit-form-container'>
        <h6><strong>Edit my profile</strong></h6>
        <p>Ensure name is more than 3 letters <br/> and phonenumber is 11 digits </p>
        <form >
          <label>New name</label><br/>
          <input type='text' ref={nameref} placeholder='your new name' required id='editInput'/><br/>
          <label>New phonenumber</label><br/>
          <input type='number' ref={phoneref} Placeholder='Phonenumber' required id='editInput'/><br/>
        </form>
        <button onClick={saveNewUserData} id='edit-button'>Save</button>
        <button onClick={cancelEdit} id='edit-button'>Cancel</button>
      </div>)
    }
    function reset(){
      setEditButton(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
            
    }
    
    function saveNewUserData(){
      if (nameref.current.value.length>4){
        if (phoneref.current.value.length===11){
          users.map((item)=>{
            let check=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
            if (item.id===check.id){
              item.name=nameref.current.value
              item.phonenumber=phoneref.current.value
              item.address=adressessref.current.value
              reset()
              setEditButton(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
              localStorage.setItem('mredibleaccount', JSON.stringify(users))
            }
          })
          alert("Update successfull")
        }else{
          alert("please makesure phone number is equal to 11 numbers")
        }
      }else{
        console.log('it is working')
        alert("please makesure name is more than 4 letters")
      }
    }
    function cancelEdit(){
      setEditButton((<button onClick={editaccount} id='edit-button'>Edit my account</button>))
    }
    const [content, setcontent]=useState(<div>kindly use the Profile menu at the bottom of your screen </div>)
    const gotoinbox=()=>{
      setcontent(<div>This is were you will find your messages <RiMessage2Fill /> we send you.<br/>your inbox is empty now</div>)
    }
    const gotoOrders=()=>{
      setcontent(<h4>This are your order history<div className='ordered-container'>{cart.orders}</div></h4>)
    }
    const gotofavourites=()=>{
      setcontent(<div>This is where you will find your order favourities</div>)
    }
    const gotoSettings=()=>{
      setcontent(<div>
                  <button id='delete-button' onClick={switchDeletebutton}><MdDeleteForever />Delete my account</button>
                </div>)
    }
    function onimagechange(e){

    }

    function gotoProfile(){
      console.log(user.passport)
    setcontent(<div>
      <div className='passport_update'>
        <img src={user.passport} alt='user'/>
        <div>
          <p>upload a new photo</p>
          <input type='file' onChange={onimagechange}/><br/>
        <button id='update-photo-button'>Update</button>
        </div>
      </div>

      <div className='edit-form-container'>
        <p><strong>Change user information here </strong></p>
        <form >
          <label>Fullname name</label><br/>
          <input type='text' ref={nameref} placeholder='John Smith' required id='editInput'/><br/>
          <label>Email</label><br/>
          <input type='text' ref={adressessref} placeholder='JohnSmith@yahoo.com' required id='editInput'/><br/>
          <label>Address</label><br/>
          <input type='text'  placeholder='NO 2 pipeline, nigeria' required id='editInput'/><br/>
          <label>Phonenumber</label><br/>
          <input type='number' ref={phoneref} Placeholder='Phonenumber' required id='editInput'/><br/>
        <button onClick={saveNewUserData} id='update-button'>Update information</button>
        </form>
      </div>
    </div>)
    }
    const [userimage,setuserimage]=useState(<img src={user.passport} alt='user' />)
    useEffect(() => {
      setuserimage(<img src={user.passport} alt='user' />)
    }, [])
    
  return (
    <div className='profileContainer' >
        <div className='profile-toggle'>
          <div className='profile-toggle-information'>
            {userimage}
            <div>
              <p className='information-name'>Welcome {user.name}</p>
              <p className='information-email'>{user.email}</p>
              <p className='information-phoneNumb'>{user.phonenumber}</p>
            </div>
          </div>
          
          <div className='profile-toggle-container'>
            <div onClick={gotoinbox}>
              <p id='buttom-toggle-icons'><MdForwardToInbox /></p>
              <p> Inbox</p>
            </div>
            <div onClick={gotoOrders}>
              <p id='buttom-toggle-icons'><FaBox /></p>
              <p > Orders</p>
            </div>
            <div onClick={gotoProfile}>
              <p id='buttom-toggle-icons'><CgProfile/> </p>
              <p onClick={gotoProfile}>Update Profile</p>
            </div>
            <div onClick={gotofavourites}>
              <p id='buttom-toggle-icons'><FcLike /> </p>
              <p>Favourites</p>
            </div>
            <div onClick={gotoSettings}>
              <p id='buttom-toggle-icons'><IoSettings/></p>
              <p> Settings</p>
            </div>
            <Link to="/login-page">
              <div onClick={signout}>
                <p id='buttom-toggle-icons'><PiSignOutBold /></p>
                <p >Sign out</p>
              </div>
            </Link>
          </div>
        <div>
          <br/>
          {content}
        </div>
      </div>
        {/* <p id='profile-welcome'>Welcome:  <p id='profile-name'>{user.name} <br></br>{user.email},   {user.phonenumber}</p></p>
        <img src={user.passport} alt='user' height="50px" width="50px"/>
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
        {deleteButton}
        {editButton} */}
    </div>
  )
}

export default UserProfile