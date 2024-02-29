import React from 'react'
import "./adminNav.css"
import { NavLink } from 'react-router-dom'
import PAF1 from "./PAF1.png"
import { GrOverview } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GrSchedules } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function AdminNav() {
  return (
      <div id='admin-nav-image-container'>
        <img src={PAF1} alt='logo'/>
        <p>Admin tools</p>
        <nav id='admin-nav'>
            <NavLink to="overview"><GrOverview /> Overview</NavLink>
            <NavLink to="payments"><MdPayments /> Payments</NavLink>
            <NavLink to="properties"><BsFillBuildingsFill /> Properties</NavLink>
            <NavLink to="schedules"><GrSchedules /> Schedules</NavLink>
            <NavLink to="users"><FaUsers /> Users</NavLink>
            <NavLink to="settings"><FiSettings />
 Settings</NavLink>
        </nav>
        <div id='admin-sign-out-container'>
          <NavLink to="">Sign out</NavLink>
        </div>
      </div>
  )
}
