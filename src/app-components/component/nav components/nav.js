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
import { FaSellsy } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { useContext } from "react";
import { Cartcontext } from "../../Mr edible store/context folder/appContext";

//import CartIcon from "../cart component/cartIcon";

// let signup="sign in"
// let signstate=true
function Navbar() {
  const cart=useContext(Cartcontext)

  const [menustate, newMenuState]=useState({display: "none"})
  function openMenu(){
    cart.increaseIndex=true
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState()
  }
  function menuclose(){
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState({display: "none", background:"blue"})
  }
  
 
  
  return (
    
    <div className="everything">
        <NavLink to="/"><img className="logo" src={mrEdible} alt="logo" /></NavLink>
      <div className="navcontainer">
        <nav>
          
            <NavLink to="/vendors">Food Vendors</NavLink>
            <NavLink to="/special">Contact</NavLink>
            <NavLink to="/track">Services</NavLink>
          
        </nav> 
      </div>
      
      <div id="loginIcon-visibility-desktop">{cart.loginIcon}</div>
      

      {/* <div className="navcontainer-mobile">
        <div className="Sign-menu"> */}
          <div className="open-menubutton-mobile" onClick={openMenu}><GiHamburgerMenu/></div>
        {/* </div>
      </div> */}



      <div style={menustate} id="menu-mobile-overall" onClick={menuclose}>
        <div onClick={menuclose} className="nav-transparent-background"></div>
        <nav>
          <div id="close-menubutton-mobile" style={{}} onClick={menuclose}><IoMdClose/></div>
            <ul>
              <div>
                <NavLink onClick={menuclose} to="/vendors"><FaSellsy />Food Vendors</NavLink>
                <NavLink onClick={menuclose} to="/special"><FcOnlineSupport/>Contact</NavLink>
                <NavLink onClick={menuclose} to="/track"><FcAbout />Services</NavLink>
              </div>
            </ul>
              <div id="loginIcon-visibility-mobile">{cart.loginIcon}</div>
        </nav>
      </div>
    </div>  
  );
}

export { Navbar };
