import { useState } from "react"
import "./cart.css"
//import mdi_cart from "./mdi_cart.svg"
import backArrow from "./back arrow.svg"
import location from "./location.svg"
import checkoutcart from "./cart-checkout.svg"
import { checkout} from "../Food component/food item"
import foods from "../Food component/foods"
import removeBTN from "./x button.svg"
import ItemQuantity from "./itemQuantity"
//import CheckoutPage from "./checkoutPage"
import { Link } from "react-router-dom"
import { reduceNumberOnCart } from "../search component/searchBar"

 

export let changeAddToCart=false
function Cart(){
        let filteredFoodItems= foods.filter((i)=>{
            return checkout.includes(i.id)
        })
        filteredFoodItems.reverse()

        function newmap(){
            reduceNumberOnCart()
            filteredFoodItems= foods.filter((i)=>{
                return checkout.includes(i.id)
            })
            filteredFoodItems.reverse()
            foodsmapped=foodsmapped=filteredFoodItems.map((item, index)=>{    
                function removeFromCart(){  
                    let indexs=    checkout.findIndex(checkindex)
                        function checkindex(checkouts){
                            return checkouts===item.id
                        }
                        checkout.splice(indexs,1)
                        filteredFoodItems.pop()
                        //alert("it was clicked")
                        newmap()
                        newfoodState(foodsmapped)
                       
                    //this function loops through the checkout array and and if the item in the checkout array march the item id, it removes it from the list
                }
                return(
                    <div key={index} className="foodcartMapped">
                        <ItemQuantity/>
                        <div className="foodcartInfomation">
                            <img className="foodcartMappedImage" src={item.link} alt="food"/>
                            <p>{item.name}</p>
                            <p className="foodcartMappedAmount">${item.amount}</p>
                            <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
                        </div>
                    </div>
                ) 
            })
        }
        let foodsmapped=filteredFoodItems.map((item, index)=>{    
            function removeFromCart(){   
                let indexs=    checkout.findIndex(checkindex)
                    function checkindex(checkouts){
                        return checkouts===item.id
                    }
                    checkout.splice(indexs,1)
                    filteredFoodItems.pop()
                    
                    newmap()
                    newfoodState(foodsmapped)                
                //this function loops through the checkout array and and if the item in the checkout array march the item id, it removes it from the list
            }
            return(
                <div key={index} className="foodcartMapped">
                    <ItemQuantity/>
                    <div className="foodcartInfomation">
                        <img className="foodcartMappedImage" src={item.link} alt="food"/>
                        <p>{item.name}</p>
                        <p className="foodcartMappedAmount">${item.amount}</p>
                        <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
                    </div>
                </div>
            ) 
        })
        const [foodState, newfoodState]=useState(foodsmapped)

        let cartTotal=0
        let deleveryfee=0
        const tax=1
        
        filteredFoodItems.forEach(element => {
            cartTotal+=element.amount
            deleveryfee+=500
        });
        let subtotal=cartTotal+deleveryfee+tax
    
    return(
        
        <div className="cartdisplay-container">
                <Link to="/home"><div className="cart-transprent-background"></div></Link>
                <div className="cartdisplay-items-container">
                    <div className="cart-back-arrow">
                        <Link to="/home"><img  src={backArrow} alt="back arrow"/></Link> 
                        <h4 className="goback">continue shopping</h4>
                    </div>
                    <div>
                        <h2 className="cart-selections-title">Your Cart</h2>
                        <div>{foodState}</div>
                    </div>
                    <div>
                        <input type="text" placeholder="Promo code"/>
                        <button className="promo-button">Apply code</button>
                    </div>
                    <div className="amount-main-container">
                        <div className="amount-title-container">
                            <div>
                                <p className="cart-amount-tittle">tax:</p>
                            </div>
                            <div >
                                <p className="cart-amount-tittle">delevery:</p>
                            </div>
                            <div >
                                <p className="cart-amount-tittle">Cart total:</p>
                            </div>
                        </div>
                        <div className="amount-container">
                            <div>
                                <p className="cart-amount-tittle">₦{tax}</p>
                            </div>
                            <div>
                                <p className="cart-amount-tittle">₦{deleveryfee}</p>
                            </div>
                            <div>
                                <p className="cart-amount-tittle">₦{cartTotal}</p>
                            </div>
                        </div>
                    </div>
                        <hr/>
                    <div className="amount-main-container">
                        <div className="amount-title-container" >
                            <p className="cart-amount-tittle">Subtotal</p>
                        </div>
                        <div className="amount-container">
                            <p className="cart-amount-tittle">₦{subtotal}</p>
                        </div>
                    </div>
                    <Link to="/checkoutpage"><button  className="checkoutButton">Proceed to checkout</button></Link>
                    <div className="cart-toggle-container">
                        <img className="cart-toggle-cart-in" src={checkoutcart} alt="cart"/>
                        <Link to="/checkoutpage"><img className="cart-toggle-checkout-out" src={location} alt="location"/></Link>
                    </div>
                </div>
            </div>
    )
}
export default Cart