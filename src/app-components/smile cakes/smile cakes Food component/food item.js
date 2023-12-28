import { useState } from "react";
import "./Foodsection.css";
import { useContext } from "react";
import { SmileCartcontext } from "../smile cartContext/smileCartContext";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";


//  export let checkout=[]
 function Fooditem(props){
    const cart= useContext(SmileCartcontext)
    
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart <FaCartPlus/></button>)

    function addToCart(){
        console.log('you clicked me')
        newbuttonState(<button onClick={removefromCart} className="food-button">Remove <MdRemoveShoppingCart /></button>)
        cart.addItemsToCartList(props.id, props.price,props.name, props.image )
    }

    function removefromCart(){    
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart <FaCartPlus/></button>)
        cart.deleteFromCartList(props.id)
    }

    return(
        
            <div className="food-item"  >
                <img src={props.image} alt="rice"/>
                <p className="food-name">{props.name}</p>
                <p className="food-price"><del>{props.oldprice}</del> ₦{props.price}</p>
                <div>{props.stars}</div>
                {buttonState}
            </div>
        
    )
}
export default Fooditem