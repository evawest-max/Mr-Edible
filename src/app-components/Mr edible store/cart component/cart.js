import { useEffect, useState } from "react"
import "./cart.css"
// import backArrow from "./back arrow.svg"
// import location from "./location.svg"
// import productsIDInTheCartListcart from "./cart-productsIDInTheCartList.svg"
// import { productsIDInTheCartList} from "../Food component/food item"
// import foods from "../Food component/foods"
import removeBTN from "./x button.svg"
import ItemQuantity from "./itemQuantity"
import { Cartcontext, productsIDInTheCartList } from "../context folder/appContext"
import { Link } from "react-router-dom"
import { useContext } from "react"
import {BiArrowBack} from "react-icons/bi"

export let changeAddToCart=false
export let productsIDInTheCartListpagetotal=0

function Cart(){
    let deleveryfee=0
    const tax=5
    const cart=useContext(Cartcontext)
    let allCartItems=[]
    if (localStorage.getItem("mredible_cart") !==null){
        let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
        Object.keys(allfoods).forEach((item)=>{
          if (item===localStorage.getItem("nameobject")){
            // console.log(allfoods[item])
            allCartItems=allfoods[item]
          }else allCartItems=[]
        })
    }

    
    
    allCartItems.forEach(element => {
        deleveryfee+=1000
    });
    
    const [subtotal, newsubtotal]=useState(cart.totalItemInCart+deleveryfee+tax)
    useEffect(()=>{
        newsubtotal(cart.totalItemInCart+deleveryfee+tax)
    },[cart.totalItemInCart, deleveryfee])
    
    
    const [foodState, newfoodState]=useState("cart is emptys")
    
    
    allCartItems.reverse()
    useEffect(()=>{
        if (localStorage.getItem("mredible_cart") !==null){
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"))
            Object.keys(allfoods).forEach((item)=>{
              if (item===localStorage.getItem("nameobject")){
                if (allfoods[item].length===0){
                    newfoodState("cart is empty")
                }else if (allfoods[item].length>0){newfoodState(allfoods[item].map((item, index)=>{    
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
                // allCartItems=allfoods[item]
              }
            }
            })
        }
        // if (JSON.stringify(localStorage.getItem('kilimanjaro')).length===0){
        //     newfoodState("cart is empty")
        // }
        // else{newfoodState(allCartItems.map((item, index)=>{    
        //     function removeFromCart(){  
        //         cart.deleteFromCartList(item.id) 
        //     }
        //     return(
        //         <div key={index} className="foodcartMapped">
        //             <ItemQuantity id={item.id} price={item.price} quantity={item.quantity}/>
        //             <div className="foodcartInfomation">
        //                 <img className="foodcartMappedImage" src={item.image} alt="food"/>
        //                 <p>{item.name}</p>
        //                 <p className="foodcartMappedAmount">₦{item.price}</p>
        //                 <img onClick={removeFromCart} className="Xbutton" src={removeBTN} alt="remove button"/>
        //             </div>
        //         </div>
        //     ) 
        // }))
        productsIDInTheCartListpagetotal=subtotal
    
    },[cart.items])

    // productsIDInTheCartListpagetotal=subtotal
    function tests(){
        cart.addToOrders()
    }
    console.log(allCartItems)
    return(
    
            <div id="cart-parent">
                    <Link to="/mrEdible"><div className="cart-transprent-background"></div></Link>
                <div className="cartdisplay-items-container">
                    <div className="cart-back-arrow">
                        <Link to="/mrEdible"><BiArrowBack/></Link> 
                        <h4 className="goback">Continue shopping</h4>
                    </div>
                    <div>
                        <h2 className="cart-selections-title">Your Cart</h2>
                        <div>{foodState}</div>
                    </div>
                    <div>
                        <input className="promo-input" type="text" placeholder="Promo code"/>
                        <button className="promo-button" onClick={tests}>Apply code</button>
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
                    <Link to="/checkoutpage"><button className="checkoutButton">Proceed to checkout</button></Link>
                    
                </div>
            </div>
    
    )
}
export default Cart