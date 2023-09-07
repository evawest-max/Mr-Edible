import mdi_cart from "./mdi_cart.svg"
import { count } from "../Food component/food item"
//import { Link } from "react-router-dom"

function CartIcon(props){
    return(
        <div onclicks={props.onclicks}  className="cartContainer">
            <img  src={mdi_cart} alt="cart"/>
            <p className="carttext">{props.countt}</p>
        </div>
    )
}
export default CartIcon