import { useState } from "react";
import "./Foodsection.css";
import { Cartcontext} from "../context folder/appContext";
import { useContext } from "react";



//  export let checkout=[]
 function Fooditem(props){
    const cart= useContext(Cartcontext)
    
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart</button>)

    function addToCart(){
        newbuttonState(<button onClick={removefromCart} className="food-button">Remove</button>)
        cart.addItemsToCartList(props.id, props.price,props.name, props.image )
    }

    function removefromCart(){    
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart</button>)
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