import React, { useState } from 'react'
import "./vendorNav.css"
import { NavLink } from 'react-router-dom'
import mrEdible from "./mrEdible.PNG"
import { GrOverview } from "react-icons/gr";
import { MdNotificationsActive } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoSunny } from "react-icons/io5";
import { useContext } from 'react'
import { Cartcontext } from '../../../Mr edible store/context folder/appContext';

export default function VendorNav() {
  const cart= useContext(Cartcontext)
  function signoutAdmin(){
    cart.changeAuthUser()
    if (localStorage.getItem("mredibleloggedinUser")!==null){
      localStorage.removeItem('mredibleloggedinUser')
        cart.signout()
    }
  }

  const [overviewDisplay, setOverviewDisplay]=useState({background:"white", borderRadius: "10px", color: "black"})
  const [notificationsDisplay, setNotificationDisplay]=useState({background:"none", })
  const [foodsDisplay, setFoodsDisplay]=useState({background:"none", })
  const [uploadDisplay, setUploadDisplay]=useState({background:"none", })
  const [settingsDisplay, setSettingsDisplay]=useState({background:"none", })

    function switchToOverview(){
      setOverviewDisplay({background:"white", borderRadius: "10px", color: "black"})
      setNotificationDisplay({background:"none"})
      setFoodsDisplay({background:"none"})
      setUploadDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToNotifications(){
      setOverviewDisplay({background:"none"})
      setNotificationDisplay({background:"white", borderRadius: "10px", color: "black"})
      setFoodsDisplay({background:"none"})
      setUploadDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToFoods(){
      setOverviewDisplay({background:"none"})
      setNotificationDisplay({background:"none"})
      setFoodsDisplay({background:"white", borderRadius: "10px", color: "black"})
      setUploadDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToUpload(){
      setOverviewDisplay({background:"none"})
      setNotificationDisplay({background:"none"})
      setFoodsDisplay({background:"none"})
      setUploadDisplay({background:"white",borderRadius: "10px", color: "black"})
      setSettingsDisplay({background:"none"})
    }
    function switchToSettings(){
      setOverviewDisplay({background:"none"})
      setNotificationDisplay({background:"none"})
      setFoodsDisplay({background:"none"})
      setUploadDisplay({background:"none"})
      setSettingsDisplay({background:"white", borderRadius: "10px", color: "black"})
    }
    

  return (
      <div id='admin-nav-image-container'>
        <img src={mrEdible} alt='logo'/>
        <p>Vendor tools</p>
        <nav id='admin-nav'>
            <NavLink to="vendor-profile-overview" style={overviewDisplay} onClick={switchToOverview}><div><GrOverview /></div> <span>Overview</span></NavLink>
            {/* <NavLink to="payments"><div><MdPayments /></div> <span>Payments</span></NavLink> */}
            <NavLink to="vendor-notifications" style={notificationsDisplay} onClick={switchToNotifications}><div><MdNotificationsActive /></div> <span>Notifications</span><div style={{color:"gold"}}><IoSunny/></div></NavLink>
            <NavLink to="vendor-foods" style={foodsDisplay} onClick={switchToFoods}><div><IoFastFoodOutline /></div> <span>Foods</span></NavLink>
            <NavLink to="vendor-upload" style={uploadDisplay} onClick={switchToUpload}><div><FaUpload /></div><span>Upload</span> </NavLink>
            <NavLink to="vendor-settings" style={settingsDisplay} onClick={switchToSettings}><div><FiSettings /></div> <span>Settings</span></NavLink>
        </nav>
        <div id='admin-sign-out-container'>
          <NavLink to="/login-page" onClick={signoutAdmin}><div><LiaSignOutAltSolid /></div> <span>Sign out</span></NavLink>
        </div>
      </div>
  )
}
