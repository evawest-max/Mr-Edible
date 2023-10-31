import { useEffect, useState } from "react"
import "./cart.css"
import backArrow from "./back arrow.svg"
import location from "./location.svg"
import checkoutcart from "./cart-checkout.svg"
import { checkout} from "../Food component/food item"
import foods from "../Food component/foods"
import removeBTN from "./x button.svg"
import ItemQuantity from "./itemQuantity"
import { Cartcontext } from "../context folder/appContext"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { reduceNumberOnCart } from "../search component/searchBar"
import {BiArrowBack} from "react-icons/bi"

export let changeAddToCart=false
export let checkoutpagetotal=0

function Cart(){
    let deleveryfee=0
    const tax=5
    
    
    const cart=useContext(Cartcontext)
    
    let filteredFoodItems= foods.filter((i)=>{
        return checkout.includes(i.id)
    })
    filteredFoodItems.reverse()

    filteredFoodItems.forEach(element => {
        deleveryfee+=1000
    });

    const [subtotal, newsubtotal]=useState(cart.totalItemInCart+deleveryfee+tax)
    useEffect(()=>{
        newsubtotal(cart.totalItemInCart+deleveryfee+tax)
    },[cart.totalItemInCart, deleveryfee])
    

    const [foodState, newfoodState]=useState(filteredFoodItems.map((item, index)=>{    
        function removeFromCart(){
            reduceNumberOnCart()  
            cart.deleteFromCart(item.id) 
            let indexs=    checkout.findIndex(checkindex)
                function checkindex(checkouts){
                    return checkouts===item.id
                }
                checkout.splice(indexs,1)
        }
        return(
            <div key={index} className="foodcartMapped">
                <ItemQuantity id={item.id} price={item.amount}/>
                <div className="foodcartInfomation">
                    <img className="foodcartMappedImage" src={item.link} alt="food"/>
                    <p>{item.name}</p>
                    <p className="foodcartMappedAmount">₦{item.amount}</p>
                    <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
                </div>
            </div>
        ) 
    })
    )

    useEffect(()=>{
        newfoodState(filteredFoodItems.map((item, index)=>{    
            function removeFromCart(){  
                reduceNumberOnCart()
                cart.deleteFromCart(item.id) 
                let indexs=    checkout.findIndex(checkindex)
                    function checkindex(checkouts){
                        return checkouts===item.id
                    }
                    checkout.splice(indexs,1)
                    filteredFoodItems.pop()
            }
            return(
                <div key={index} className="foodcartMapped">
                    <ItemQuantity id={item.id} price={item.amount}/>
                    <div className="foodcartInfomation">
                        <img className="foodcartMappedImage" src={item.link} alt="food"/>
                        <p>{item.name}</p>
                        <p className="foodcartMappedAmount">₦{item.amount}</p>
                        <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
                    </div>
                </div>
            ) 
        }))
        checkoutpagetotal=subtotal
    },[cart.items])

    checkoutpagetotal=subtotal
    
    return(
    
            <div id="cart-parent">
                    <Link to="/"><div className="cart-transprent-background"></div></Link>
                <div className="cartdisplay-items-container">
                    <div className="cart-back-arrow">
                        <Link to="/"><BiArrowBack/></Link> 
                        <h4 className="goback">Continue shopping</h4>
                    </div>
                    <div>
                        <h2 className="cart-selections-title">Your Cart</h2>
                        <div>{foodState}</div>
                    </div>
                    <div>
                        <input className="promo-input" type="text" placeholder="Promo code"/>
                        <button className="promo-button">Apply code</button>
                    </div>
                    <div className="amount-main-container">
                        <div className="amount-title-container">
                            <div>
                                <p className="cart-amount-tittle">Tax:</p>
                            </div>
                            <div >
                                <p className="cart-amount-tittle">Delevery fee:</p>
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
                                <p className="cart-amount-tittle">₦{cart.totalItemInCart}</p>
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
                    
                </div>
            </div>
    
    )
}
export default Cart