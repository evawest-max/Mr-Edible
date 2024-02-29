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
// import Cart from '../../Mr edible store/cart component/cart'
import { useEffect } from 'react'
import { SmileCartcontext } from '../../smile cakes/smile cartContext/smileCartContext'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDatabase, onValue, update, ref as refDatabase} from 'firebase/database'
// import propic from "C:\\fakepath\\IMG_20230809_082548_707~2.jpg"


function UserProfile() {
    const cart= useContext(Cartcontext)
    // const smilecart=useContext(SmileCartcontext)
    function signout(){
      if (localStorage.getItem("mredibleloggedinUser")!==null){
        localStorage.removeItem('mredibleloggedinUser')
          cart.signout()
      }
    }
    let [user, setuser]=useState(cart.currentUser)

    useEffect(() => {
      setuser(JSON.parse(localStorage.getItem('mredibleloggedinUser')))
      getDownloadURL(ref(getStorage(), `customer passport/${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            setuserimageurl(url)
            // alert('Uploaded a blob or file!');
            // console.log(url)
            
          })
          .catch((error) => {
            // Handle any errors
            console.log(error)
          });
      // if (localStorage.getItem('mredibleloggedinUser') !== null){
      //   setuser(JSON.parse(localStorage.getItem('mredibleloggedinUser')))
      //   setuserimageurl(JSON.parse(localStorage.getItem('mredibleloggedinUser')).imageurl)
      // }
    }, [])
    

    const [deleteButton, setdeleteButton]=useState(<button id='delete-button' onClick={switchDeletebutton}><MdDeleteForever />Delete my account</button>)
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
      if (localStorage.getItem('mredibleloggedinUser') !== null){
        cart.deleteUserAccount(JSON.parse(localStorage.getItem('mredibleloggedinUser')).id)
      }
    }
    function switchBackToDeletebutton(){
      setdeleteButton(<button id='delete-button' onClick={switchDeletebutton}><MdDeleteForever />Delete my account</button>)
    }

    // const [namebordercolors, setnamebordercolors]=useState()
    // const [phonenumberbordercolors, setphonenumberbordercolors]=useState()
  

    const nameref=useRef()
    const phoneref=useRef()
    const adressessref=useRef()
    let passportref=useRef()
    const [editButton, setEditButton]=useState("Update information")
    
    const [file, setfile]=useState()
    const [uploadButton, setuploadbutton]=useState("UPLOAD")
    function onimagechange(e){
      // console.log(e.target.files)
      setfile(e.target.files[0])
    }
    
    async function updatePhoto(){
      setuploadbutton("Uploading")
      const storage= ref(getStorage(), "customer passport/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id)
      await deleteObject(storage).then(() => {
        // File deleted successfully
        uploadBytes(storage, file).then((snapshot) => {
        // console.log(snapshot.metadata.timeCreated)
        getDownloadURL(ref(getStorage(), `customer passport/${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            setuserimageurl(url)
            alert('Uploaded a blob or file!');
            // console.log(url)
            
          })
          .catch((error) => {
            // Handle any errors
            console.log(error)
          });
      });
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });
      
      setuploadbutton("UPLOAD")
    }
    
    function saveNewUserData(){
      if (nameref.current.value.length>4){
        if (phoneref.current.value.length===11){
          if (localStorage.getItem("mredibleloggedinUser")!==null){
            setEditButton("loading...")
            update(refDatabase(getDatabase(), "users/"+  JSON.parse(localStorage.getItem('mredibleloggedinUser')).id),{
              last_profile_update:new Date().toLocaleString(),
              name:nameref.current.value,
              phonenumber:phoneref.current.value,
              address:adressessref.current.value
            }).then(()=>{
              setEditButton("Update Information")
              alert("Update successfull")
            }).catch((error=>{setEditButton("Update Information");alert(error.message)}))
          }
        }else{
          alert("please makesure phone number is equal to 11 numbers")
        }
      }else{
        // console.log('it is working')
        alert("please makesure name is more than 4 letters")
      }
    }
    

    const [inboxDisplay, setInboxDisplay]=useState({display:"none"})
    const [orderDisplay, setOrderDisplay]=useState({display:"none"})
    const [favouritiesDisplay, setFavouritiesDisplay]=useState({display:"none"})
    const [settingsDisplay, setSettingsDisplay]=useState({display:"none"})
    const [profileDisplay, setProfileDisplay]=useState({display:"none"})

    const gotoinbox=()=>{
      setInboxDisplay({display:"flex"})
      setOrderDisplay({display:"none"})
      setFavouritiesDisplay({display:"none"})
      setSettingsDisplay({display:"none"})
      setProfileDisplay({display:"none"})

    }
    const gotoOrders=()=>{
      setInboxDisplay({display:"none"})
      setOrderDisplay({display:"flex"})
      setFavouritiesDisplay({display:"none"})
      setSettingsDisplay({display:"none"})
      setProfileDisplay({display:"none"})
    }
    const gotofavourites=()=>{
      setInboxDisplay({display:"none"})
      setOrderDisplay({display:"none"})
      setFavouritiesDisplay({display:"flex"})
      setSettingsDisplay({display:"none"})
      setProfileDisplay({display:"none"})
    }
    const gotoSettings=()=>{
      setInboxDisplay({display:"none"})
      setOrderDisplay({display:"none"})
      setFavouritiesDisplay({display:"none"})
      setSettingsDisplay({display:"flex"})
      setProfileDisplay({display:"none"})
    }
    
    function gotoProfile(){
      setInboxDisplay({display:"none"})
      setOrderDisplay({display:"none"})
      setFavouritiesDisplay({display:"none"})
      setSettingsDisplay({display:"none"})
      setProfileDisplay({display:"flex"})
    }
    
    const [userimageurl,setuserimageurl]=useState("")
    
    const storage = getStorage();
      getDownloadURL(ref(storage, `${user.passport}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          setuserimageurl(url)
          // console.log(url)
          
        })
        .catch((error) => {
          // Handle any errors
        });
        
      if (localStorage.getItem("mredibleloggedinUser")!==null){
        let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
        const db = getDatabase();
        const userRef = refDatabase(db, "users/"+ loggedinuser.id );
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          // console.log(data)
          localStorage.setItem("mredibleloggedinUser", JSON.stringify(data))
          // updateStarCount(postElement, data);
        });
      }
    
  return (
    <div className='profileContainer' >
        <div className='profile-toggle'>
          <div className='profile-toggle-information'>
          <img src={userimageurl} alt='user' />
            <div>
              <p className='information-name'>Welcome {user.name}</p>
              <p className='information-email'>{user.email}</p>
              <p className='information-phoneNumb'>{user.address}</p>
              <p className='information-phoneNumb'>{user.phonenumber}</p>
            </div>
          </div>

          <div style={inboxDisplay}>This is were you will find your messages <RiMessage2Fill /> we send you.<br/>your inbox is empty now</div>
          <div style={orderDisplay}> 
              <NavLink to="/admin-page">This are your order history</NavLink>
              <div className='ordered-container'> {cart.orders}
              </div>
          </div>
          <div style={favouritiesDisplay}>This is where you will find your order favourities</div>
          <div style={settingsDisplay}>
                  {deleteButton}
          </div>
          <div style={profileDisplay}>
            <div >
              <div className='passport_update'>
                <img src={userimageurl} alt='user'/>
                <div>
                  <p>upload a new photo</p>
                  <input ref={passportref} type='file' accept='image/*' onChange={onimagechange}/><br/>
                <button id='update-photo-button' onClick={updatePhoto}>{uploadButton}</button>
                </div>
              </div>

              <div className='edit-form-container'>
                <p><strong>Update user information here </strong></p>
                <form >
                  <label>Fullname name</label><br/>
                  <input type='text' ref={nameref} placeholder='John Smith' required id='editInput'/><br/>
                  <label>Address</label><br/>
                  <input type='text' ref={adressessref} placeholder='NO 2 pipeline, nigeria' required id='editInput'/><br/>
                  <label>Phonenumber</label><br/>
                  <input type='number' ref={phoneref} Placeholder='Phonenumber' required id='editInput'/><br/>
                <button onClick={saveNewUserData} id='update-button'>{editButton}</button>
                </form>
              </div>
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
        
      </div>
    </div>
  )
}

export default UserProfile