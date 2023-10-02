import { NavLink } from "react-router-dom";
//import Cart from "../cart component/cart";
import mrEdible from "./mrEdible.PNG";
import menu from "./menuButton.png"
import closemenu from "./x button.png"
import "./nav.css";
import { useState } from "react";
//import CartIcon from "../cart component/cartIcon";


function Navbar() {
  const [menustate, newMenuState]=useState(<img className="menubutton-mobile" onClick={openMenu} src={menu} alt="logo" />)
  function openMenu(){
    newMenuState(
      <nav>
          <img className="menubutton-mobile" onClick={Menuclose} src={closemenu} alt="logo" />
          <ul>
            <NavLink to="/vendors">Food Vendors</NavLink>
            <NavLink to="/special">Special Order</NavLink>
            <NavLink to="/track">Track Order</NavLink>
          </ul>
        </nav>
    )
  }
  function Menuclose(){
    newMenuState(<img className="menubutton-mobile" onClick={openMenu} src={menu} alt="logo" />)
  }
  return (
    <div>
      <div className="navcontainer">
        <NavLink to="/"><img className="logo" src={mrEdible} alt="logo" /></NavLink>
        <nav>
          <ul>
            <NavLink to="/vendors">Food Vendors</NavLink>
            <NavLink to="/special">Special Order</NavLink>
            <NavLink to="/track">Track Order</NavLink>
          </ul>
        </nav> 
      </div>

      <div className="navcontainer-mobile">
        <NavLink to="/"><img className="logo" src={mrEdible} alt="logo" /></NavLink>
        <div className="Sign-menu">
          
          {menustate}
        </div>
      </div>
    </div>  
      
    
  );
}

export { Navbar };
