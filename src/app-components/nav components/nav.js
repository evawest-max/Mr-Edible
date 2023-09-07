import { NavLink } from "react-router-dom";
//import Cart from "../cart component/cart";
import mrEdible from "./mrEdible.PNG";
import "./nav.css";
import CartIcon from "../cart component/cartIcon";


function Navbar() {
  return (
    
      <div className="navcontainer">
        <NavLink to="/home"><img className="logo" src={mrEdible} alt="logo" /></NavLink>
        <nav>
          <ul>
            <NavLink to="/vendors">Food Vendors</NavLink>
            <NavLink to="/special">Special Order</NavLink>
            <NavLink to="/track">Track Order</NavLink>
          </ul>
        </nav>
        
        
      </div>
      
      
    
  );
}

export { Navbar };
