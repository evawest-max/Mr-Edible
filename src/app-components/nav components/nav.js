import { NavLink } from "react-router-dom";
//import Cart from "../cart component/cart";
import mrEdible from "./mrEdible.PNG";
// import menu from "./menuButton.png"
// import closemenu from "./x button.png"
import "./nav.css";
import { useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import {IoMdClose} from "react-icons/io"
// import {RiLoginBoxFill} from "react-icons/ri"
import {FcOnlineSupport} from "react-icons/fc"
import { useContext } from "react";
import { Cartcontext } from "../context folder/appContext";

//import CartIcon from "../cart component/cartIcon";

// let signup="sign in"
// let signstate=true
function Navbar() {
  const cart=useContext(Cartcontext)

  const [menustate, newMenuState]=useState(<div className="menubutton-mobile" onClick={openMenu}><GiHamburgerMenu/></div>)
  function openMenu(){
    cart.increaseIndex=true
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState(
      <div>
        <div onClick={menuclose} className="nav-transparent-background"></div>
      <nav>
        <div className="menubutton-mobile" style={{}} onClick={menuclose}><IoMdClose/></div>
          <ul>
          <div>
            <NavLink onClick={menuclose} to="/vendors">Food Vendors</NavLink>
            <NavLink onClick={menuclose} to="/special"><FcOnlineSupport/>Special Order</NavLink>
            <NavLink onClick={menuclose} to="/track">Track Order</NavLink>
          </div>
          </ul>
      </nav>
      </div>
    )
  }
  function menuclose(){
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState(<div className="menubutton-mobile" onClick={openMenu}><GiHamburgerMenu/></div>)
  }
  
 
  
  return (
    
    <div className="everything">
        <img className="logo" src={mrEdible} alt="logo" />
      <div className="navcontainer">
        <nav>
          
            <NavLink to="/vendors">Food Vendors</NavLink>
            <NavLink to="/special">Special Order</NavLink>
            <NavLink to="/track">Track Order</NavLink>
          
        </nav> 
      </div>
      
      {cart.loginIcon}
      

      <div className="navcontainer-mobile">
        <div className="Sign-menu">
          
          {menustate}
        </div>
      </div>
    </div>  
      
    
  );
}

export { Navbar };
