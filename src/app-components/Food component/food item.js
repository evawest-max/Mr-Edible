import { useState } from "react";
import "./Foodsection.css";

 export let checkout=[]
function Fooditem(props){
    const [counts, newcounts]=useState(1)
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart</button>)
    
    function removefromCart(){
        props.removeclickeds()       
            let indexs=    checkout.findIndex(checkindex)
                function checkindex(checkouts){
                    return checkouts===props.id
                }
                checkout.splice(indexs,1) 
            //this function loops through the checkout array and and if the item in the checkout array march the item id, it removes it from the list
        newcounts(counts-1)
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart</button>)
    }
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