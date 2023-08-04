import backArrow from "./back arrow.svg"
import location from "./location.svg"
import checkoutcart from "./cart-checkout.svg"

function CheckoutPage(props){
    
   
    
    return(
        <div className="cartdisplay-container">
                    <div onClick={props.clear} className="cart-transprent-background"></div>
                    <div className="cartdisplay-items-container">
                        <div className="cart-back-arrow">
                            <img onClick={props.clear} src={backArrow} alt="back arrow"/>
                            <h4 onClick={props.clear} className="goback">continue shopping</h4>
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
                        <button className="checkoutButton">Checkout</button>
                        <div className="cart-toggle-container">
                            <img className= "togglestate" src={checkoutcart} alt="cart"/>
                            <img  className="cart-toggle" src={location} alt="location"/>
                        </div>
                    </div>
                </div>
    )
}
export default CheckoutPage