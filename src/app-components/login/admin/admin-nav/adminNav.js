import React, { useState } from 'react'
import "./adminNav.css"
import { NavLink } from 'react-router-dom'
import mrEdible from "./mrEdible.PNG"
import { GrOverview } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { GrSchedules } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useContext } from 'react'
import { Cartcontext } from '../../../Mr edible store/context folder/appContext';

export default function AdminNav() {
  const cart= useContext(Cartcontext)
  function signoutAdmin(){
    cart.changeAuthUser()
    if (localStorage.getItem("mredibleloggedinUser")!==null){
      localStorage.removeItem('mredibleloggedinUser')
        cart.signout()
    }
  }

  const [overviewDisplay, setOverviewDisplay]=useState({background:"white", borderRadius: "10px", color: "black"})
  const [vendorsDisplay, setVendorsDisplay]=useState({background:"none", })
  const [customersDisplay, setCustomersDisplay]=useState({background:"none", })
  const [schedulesDisplay, setSchedulesDisplay]=useState({background:"none", })
  const [settingsDisplay, setSettingsDisplay]=useState({background:"none", })

    function switchToOverview(){
      setOverviewDisplay({background:"white", borderRadius: "10px", color: "black"})
      setVendorsDisplay({background:"none"})
      setCustomersDisplay({background:"none"})
      setSchedulesDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToVendors(){
      setOverviewDisplay({background:"none"})
      setVendorsDisplay({background:"white", borderRadius: "10px", color: "black"})
      setCustomersDisplay({background:"none"})
      setSchedulesDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToCustomers(){
      setOverviewDisplay({background:"none"})
      setVendorsDisplay({background:"none"})
      setCustomersDisplay({background:"white", borderRadius: "10px", color: "black"})
      setSchedulesDisplay({background:"none"})
      setSettingsDisplay({background:"none"})
    }
    function switchToSchedules(){
      setOverviewDisplay({background:"none"})
      setVendorsDisplay({background:"none"})
      setCustomersDisplay({background:"none"})
      setSchedulesDisplay({background:"white",borderRadius: "10px", color: "black"})
      setSettingsDisplay({background:"none"})
    }
    function switchToSettings(){
      setOverviewDisplay({background:"none"})
      setVendorsDisplay({background:"none"})
      setCustomersDisplay({background:"none"})
      setSchedulesDisplay({background:"none"})
      setSettingsDisplay({background:"white", borderRadius: "10px", color: "black"})
    }
    

  return (
      <div id='admin-nav-image-container'>
        <img src={mrEdible} alt='logo'/>
        <p>Admin tools</p>
        <nav id='admin-nav'>
            <NavLink to="overview" style={overviewDisplay} onClick={switchToOverview}><div><GrOverview /></div> <span>Overview</span></NavLink>
            {/* <NavLink to="payments"><div><MdPayments /></div> <span>Payments</span></NavLink> */}
            <NavLink to="vendorsCardContainer" style={vendorsDisplay} onClick={switchToVendors}><div><AiTwotoneShop /></div> <span>vendors</span></NavLink>
            <NavLink to="customers" style={customersDisplay} onClick={switchToCustomers}><div><FaUsers /></div> <span>Customers</span></NavLink>
            <NavLink to="schedules" style={schedulesDisplay} onClick={switchToSchedules}><div><GrSchedules /></div><span>Schedules</span> </NavLink>
            <NavLink to="settings" style={settingsDisplay} onClick={switchToSettings}><div><FiSettings /></div> <span>Settings</span></NavLink>
        </nav>
        <div id='admin-sign-out-container'>
          <NavLink to="/login-page" onClick={signoutAdmin}><div><LiaSignOutAltSolid /></div> <span>Sign out</span></NavLink>
        </div>
      </div>
  )
}
