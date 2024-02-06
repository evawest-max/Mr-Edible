
// import { useRef, useState } from "react";
// import VendorCard from "../vendor/vendor-card";
// import vendorsdata from "../vendor/vendorDatabase";
import "./homePage.css";
// import {AiFillStar} from "react-icons/ai";
// import { useContext } from "react";
// import { Cartcontext } from "../Mr edible store/context folder/appContext"
// import { TiArrowDownThick } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Homepage(){

    return(
        <div className="homepage-image-container">
            <div className="homepage-text-btn-container">
                <h3> Welcome to My Edible Food<br/> market place <br/><span>WE ARE RATED<IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /></span></h3>
                <div>
                    <NavLink to="vendors" className="homepage-Btn-1">Start shoping </NavLink>
                    <NavLink to="vendors" className="homepage-Btn-2">Teach me how to</NavLink>
                    <NavLink to="vendors" className="homepage-Btn-3">FAQ</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Homepage