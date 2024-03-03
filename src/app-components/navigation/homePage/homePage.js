
// import { useRef, useState } from "react";
// import VendorCard from "../vendor/vendor-card";
// import vendorsdata from "../vendor/vendorDatabase";
import "./homePage.css";
// import {AiFillStar} from "react-icons/ai";
// import { useContext } from "react";
// import { Cartcontext } from "../Mr edible store/context folder/appContext"
// import { TiArrowDownThick } from "react-icons/ti";
// import { FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { MdPlayCircle } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FcFaq } from "react-icons/fc";
import Store from "../../../store-components/store";
import Footer from "../../../footer-components/footer";

function Homepage(){

    return(
        <div>
            <div className="homepage-image-container">
                <div className="homepage-text-btn-container">
                    <h3> Welcome to Mr Edible Food<br/> market place <br/><span>WE ARE RATED<IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /></span></h3>
                    <div>
                        <NavLink to="vendors" className="homepage-Btn-1">Order <span><MdKeyboardDoubleArrowRight style={{fontSize:"200%"}}/></span></NavLink>
                        <Link to="https://www.youtube.com/channel/UCblfN9rFw3yW1P64VThsgnw" className="homepage-Btn-2"><MdPlayCircle style={{fontSize:"200%"}} />  How to order</Link>
                        <NavLink className="homepage-Btn-3"><FcFaq style={{fontSize:"200%"}}/> FAQ</NavLink>
                    </div>
                </div>
            </div>
            <Store/>
            <Footer/>
        </div>
    )
}

export default Homepage