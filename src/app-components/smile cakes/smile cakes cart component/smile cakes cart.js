import { useEffect, useState } from "react"
import "./cart.css"
import removeBTN from "./x button.svg"
import ItemQuantity from "./itemQuantity"
import { Link } from "react-router-dom"
import { useContext } from "react"
import {BiArrowBack} from "react-icons/bi"
import { SmileCartcontext, productsIDInTheCartList} from "../smile cartContext/smileCartContext"

export let changeAddToCart=false
export let productsIDInTheCartListpagetotal=0

function SmileCakesCart(){
    let deleveryfee=0
    const tax=5
    const cart=useContext(SmileCartcontext)
    productsIDInTheCartList.forEach(element => {
        deleveryfee+=1000
    });
    
    const [subtotal, newsubtotal]=useState(cart.totalItemInCart+deleveryfee+tax)
    useEffect(()=>{
        newsubtotal(cart.totalItemInCart+deleveryfee+tax)
    },[cart.totalItemInCart, deleveryfee])
    
    
    const [foodState, newfoodState]=useState("cart is emptys")
    
    productsIDInTheCartList.reverse()
    useEffect(()=>{
        if (productsIDInTheCartList.length===0){
            newfoodState("cart is empty")
        }
        else{newfoodState(productsIDInTheCartList.map((item, index)=>{    
            function removeFromCart(){  
                cart.deleteFromCartList(item.id) 
            }
            return(
                <div key={index} className="foodcartMapped">
                    <ItemQuantity id={item.id} price={item.price} quantity={item.quantity}/>
                    <div className="foodcartInfomation">
                        <img className="foodcartMappedImage" src={item.image} alt="food"/>
                        <p>{item.name}</p>
                        <p className="foodcartMappedAmount">₦{item.price}</p>
                        <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
                    </div>
                </div>
            ) 
        }))
        productsIDInTheCartListpagetotal=subtotal
    }
    },[cart.items])

    // productsIDInTheCartListpagetotal=subtotal
    
    
    return(
        
            <div id="cart-parent">
                    <Link to="/smile-cakes"><div className="cart-transprent-background"></div></Link>
                <div className="cartdisplay-items-container">
                    <div className="cart-back-arrow">
                        <Link to="/smile-cakes"><BiArrowBack/></Link> 
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
                    <Link to="/smile-cakes-checkoutpage"><button className="checkoutButton">Proceed to checkout</button></Link>
                    
                </div>
            </div>
      
    )
}
export default SmileCakesCart