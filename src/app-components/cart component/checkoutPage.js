import backArrow from "./back arrow.svg"
import location from "./location.svg"
import checkoutcart from "./cart-checkout.svg"
import { Link } from "react-router-dom"

function CheckoutPage(props){
    
   
    
    return(
        <div className="cartdisplay-container">
                    <Link to="/cart"><div onClick={props.clear} className="cart-transprent-background"></div></Link>
                    <div className="cartdisplay-items-container">
                        <div className="cart-back-arrow">
                        <Link to="/cart"><img onClick={props.clear} src={backArrow} alt="back arrow"/></Link>
                            <h4 onClick={props.clear} className="goback">Back to cart</h4>
                        </div> 
                        <form>
                            <label>Your name</label>
                            <input type="text" placeholder="yourname"/><br/>
                            <label>Your Phone number</label>
                            <input type="text" placeholder="090********"/><br/>
                            <label>Your Email</label>
                            <input type="text" placeholder="example@yahoo.com"/><br/>
                            <label>Your street address</label>
                            <input type="text" placeholder="no1 kane street"/><br/>
                            <label>Delivery locationr</label>
                            <select name="" id="">
                                <option value="Texas">Texas</option>
                                <option value="New York">New york</option>
                                <option value="Capetown">Capetown</option>
                            </select>
                            
                        </form>
                        <button className="checkoutButton">Place Your Order</button>
                        <div className="cart-toggle-container">
                            <Link to="/cart"><img className= "togglestate" src={checkoutcart} alt="cart"/></Link>
                            <img  className="cart-toggle" src={location} alt="location"/>
                        </div>
                    </div>
                </div>
    )
}
export default CheckoutPage