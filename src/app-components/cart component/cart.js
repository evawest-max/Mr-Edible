import { useState } from "react"
import "./cart.css"
import mdi_cart from "./mdi_cart.svg"
import backArrow from "./back arrow.svg"
import location from "./location.svg"
import checkoutcart from "./cart-checkout.svg"
import { mycart } from "../Food component/Foodsection"
import { useEffect } from "react"
import { checkout, count } from "../Food component/food item"
import foods from "../Food component/foods"
import removeBTN from "./x button.svg"
import ItemQuantity from "./itemQuantity"
import CheckoutPage from "./checkoutPage"

 
let clickedcart=false

function Cart(props){
    const [countstate, newcountstate]=useState(count)

      
    function removecCart(){
        newCartItem(
            <div className="cartContainer">
                <img onClick={cartclicked} src={mdi_cart} alt="cart"/>
                <p className="carttext">{countstate}</p>
            </div>
        )
    }
    
    function cartclicked(){
        const filteredFoodItems= foods.filter((i)=>{
            return checkout.includes(i.id)
        })
        console.log(filteredFoodItems)
        let foodsmapped=filteredFoodItems.map((item, index)=>{
            return(
                <div className="foodcartMapped">
                    <ItemQuantity/>
                    <div className="foodcartInfomation">
                        <img className="foodcartMappedImage" src={item.link} alt="food"/>
                        <p>{item.name}</p>
                        <p className="foodcartMappedAmount">${item.amount}</p>
                        <img className="Xbutton" src={removeBTN} alt="remove button"/>
                    </div>
                </div>
            ) 
        })

        let cartTotal=0
        let deleveryfee=0
        const tax=1
        
        filteredFoodItems.forEach(element => {
            cartTotal+=element.amount
            deleveryfee+=1
        });
        let subtotal=cartTotal+deleveryfee+tax
        
        
        let gotoloca=false
        function locationAndPay(){
            gotoloca=!gotoloca
            console.log(gotoloca)
            newCartItem(
                <CheckoutPage clear={removecCart}/>
            )
        }
        let togglestate=gotoloca? "cart-toggle":"location-toggle"

        clickedcart=true
        newCartItem(
            <div className="cartdisplay-container">
                <div onClick={removecCart} className="cart-transprent-background"></div>
                <div className="cartdisplay-items-container">
                    <div className="cart-back-arrow">
                        <img onClick={removecCart} src={backArrow} alt="back arrow"/>
                        <h4 onClick={removecCart} className="goback">continue shopping</h4>
                    </div> 
                    <div>
                        <h2 className="cart-selections-title">Your Cart</h2>
                        <div>{foodsmapped}</div>
                    </div>
                    <div>
                        <input type="text" placeholder="Promo code"/>
                        <button className="promo-button">Apply code</button>
                    </div>
                    <div>
                   
                        <div className="amount-container">
                            <p className="cart-amount-tittle">tax</p>
                            <p className="cart-amount-tittle">${tax}</p>
                        </div>
                        <div className="amount-container">
                            <p className="cart-amount-tittle">delevery</p>
                            <p className="cart-amount-tittle">${deleveryfee}</p>
                        </div>
                        <div className="amount-container">
                            <p className="cart-amount-tittle">Cart total</p>
                            <p className="cart-amount-tittle">${cartTotal}</p>
                        </div>
                        <hr/>
                        <div className="amount-container">
                            <p className="cart-amount-tittle">Subtotal</p>
                            <p className="cart-amount-tittle">${subtotal}</p>
                        </div>
                    </div>
                    <button onClick={locationAndPay} className="checkoutButton">Proceed to checkout</button>
                    <div className="cart-toggle-container">
                        <img className="cart-toggle" src={checkoutcart} alt="cart"/>
                        <img onClick={locationAndPay} className={togglestate} src={location} alt="location"/>
                    </div>
                </div>
            </div>
        )
        console.log("cart was clicked")
    } 
    //const [itemCount, newitemCount]= useState(count)
    const [cartitems, newCartItem]=useState((
        <div className="cartContainer">
            <img onClick={cartclicked} src={mdi_cart} alt="cart"/>
            <p className="carttext">{countstate}</p>
        </div>
    ))  
    return(
        <div>
            {clickedcart ? cartitems: cartitems}
        </div>
    )
}
export default Cart