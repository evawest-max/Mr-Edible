import { useState } from "react";
import "./Foodsection.css";
import { Cartcontext } from "../context folder/appContext";
import { useContext } from "react";


 export let checkout=[]

 function Fooditem(props){
    const cart= useContext(Cartcontext)
    
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart</button>)
    function addToCart(){
        let checkCheckout=checkout.includes(props.id)
        if (checkCheckout){
            console.log("id can not be added because it already exist")
        }else{
            props.addclickeds()
            checkout.push(props.id)
        }
        newbuttonState(<button onClick={removefromCart} className="food-button">Remove</button>)
        console.log(checkout)
        console.log(props.id)
        cart.additem(props.id, props.price,props.name, props.image )
    }

    function removefromCart(){
        props.removeclickeds()       
            let indexs=    checkout.findIndex(checkindex)
                function checkindex(checkouts){
                    return checkouts===props.id
                }
                checkout.splice(indexs,1) 
            //this function loops through the checkout array and and if the item in the checkout array march the item id, it removes it from the list
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart</button>)
        cart.deleteFromCart(props.id)
        //props.toggle=true
        
    }
    
    return(
        <div>
            <div className="food-item"  >
                <img src={props.image} alt="rice"/>
                <p >{props.name}<br/>₦{props.price}</p>
                {buttonState}
            </div>
        </div>
    )
}
export default Fooditem