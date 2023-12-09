import React from 'react'
import "./user-profile.css"
import { Cartcontext } from '../../context folder/appContext'
import { useContext } from 'react'
<<<<<<< HEAD
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
// import propic from "C:\\fakepath\\IMG_20230809_082548_707~2.jpg"

=======
import { NavLink } from 'react-router-dom'
>>>>>>> parent of c0e363a (fixed login route)

function UserProfile() {
    const cart= useContext(Cartcontext)
    function signout(){
        cart.signout()
    }
<<<<<<< HEAD
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
        alert("please makesure name is more than 4 letters")
      }
    }
    function cancelEdit(){
      setEditButton((<button onClick={editaccount} id='edit-button'>Edit my account</button>))
    }
    const [content, setcontent]=useState(<div>This is were you will find your messages we send you.<br/>your inbox is empty now</div>)
    const gotoinbox=()=>{
      setcontent(<div>This is were you will find your messages <RiMessage2Fill /> we send you.<br/>your inbox is empty now</div>)
    }
    const gotoOrders=()=>{
      setcontent(<div>this are are your order history</div>)
    }
    const gotofavourites=()=>{
      setcontent(<div>this are are your order favourities</div>)
    }
    const gotoSettings=()=>{
      setcontent(<div>change your settings</div>)
    }
    function onimagechange(e){

    }

    function gotoProfile(){
      console.log(user.passport)
    setcontent(<div>
      <div></div>
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
          <input type='text' ref={nameref} placeholder='JohnSmith@yahoo.com' required id='editInput'/><br/>
          <label>Address</label><br/>
          <input type='text' ref={nameref} placeholder='NO 2 pipeline, nigeria' required id='editInput'/><br/>
          <label>Phonenumber</label><br/>
          <input type='number' ref={phoneref} Placeholder='Phonenumber' required id='editInput'/><br/>
        <button onClick={saveNewUserData} id='update-button'>Update information</button>
        </form>
      </div>
    </div>)
    }
    
  return (
    <div className='profileContainer' >
      <div className='profileContainertwo'>
        <div className='profile-toggle'>
          <div className='profile-toggle-information'>
          <img src={user.passport} alt='user' />
            <p>Welcome {user.name}</p>
            <p className='information-email'>{user.email}</p>
            <p>{user.phonenumber}</p>
          </div>
          <br/>
          <div className='profile-toggle-container'>
            <p onClick={gotoinbox}><MdForwardToInbox /> Inbox</p>
            <p onClick={gotoOrders}><FaBox /> Orders</p>
            <p onClick={gotoProfile}><CgProfile/> Update Profile</p>
            <p onClick={gotofavourites}><FcLike /> Favourites</p>
            <p onClick={gotoSettings}><IoSettings/> Settings</p>
            <Link to="/login-page"><button id='sign-out-button' onClick={signout}><PiSignOutBold /> Sign out</button></Link>
            <button id='delete-button' onClick={switchDeletebutton}><MdDeleteForever />Delete my account</button>
          </div>
        </div>
        <div>
          {content}
        </div>
      </div>
        {/* <p id='profile-welcome'>Welcome:  <p id='profile-name'>{user.name} <br></br>{user.email},   {user.phonenumber}</p></p>
        <img src={user.passport} alt='user' height="50px" width="50px"/>
=======
    let uses=cart.currentUser
  return (
    <div className='profileContainer' >
        <p id='profile-welcome'>Welcome:  <p id='profile-name'>{uses.name} <br></br>{uses.email},   {uses.phonenumber}</p></p>
>>>>>>> parent of c0e363a (fixed login route)
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
<<<<<<< HEAD
        {deleteButton}
        {editButton} */}
=======
        <button id='delete-button'>Delete my account</button>
        <button id='edit-button'>Edit my account</button>
>>>>>>> parent of c0e363a (fixed login route)
    </div>
  )
}

export default UserProfile