import { useState } from "react";
import { increaseCount } from "../cart component/cart";
import "./Foodsection.css";
let addToCartToggle=false
 export let count=1
 export let checkout=[]
function Fooditem(props){
    const [counts, newcounts]=useState(1)
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart</button>)
    function removefromCart(){
        addToCartToggle = !addToCartToggle
        count--
        
        for (let i=0; i<checkout.length; i++){
            checkout[i]===props.id?checkout.pop(checkout[i]):console.log("cant find it")
        };
        
        newcounts(counts-1)
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart</button>)
        console.log(count)
        console.log(addToCartToggle)
        console.log(checkout)
    }
    function addToCart(){
        addToCartToggle = !addToCartToggle
        count++
        checkout.push(props.id)
       // {addToCartToggle? buttonState:newbuttonState(<button onClick={removefromCart} className="food-button">remove</button>)} 
        newbuttonState(<button onClick={removefromCart} className="food-button">remove</button>)
        console.log(count)
        console.log(addToCartToggle)
        console.log(checkout)
    }
    return(
        <div>
        <div className="food-item"  >
          <img src={props.image} alt="rice"/>
          <p >{props.name}<br/>${props.price}</p>
          {buttonState}
        </div>
        </div>
    )
}
export default Fooditem