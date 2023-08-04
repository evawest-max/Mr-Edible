import Cart from "../cart component/cart";
import mrEdible from "./mrEdible.PNG";
import "./nav.css";


function Navbar() {
  return (
    
      <div className="navcontainer">
        <img className="logo" src={mrEdible} alt="logo" />
        <nav>
          <ul>
            <li>Categories</li>
            <li>Special Order</li>
            <li>Track Order</li>
          </ul>
        </nav>
        <Cart />
      </div>
      
      
    
  );
}

export { Navbar };
