import {HiMiniShoppingCart} from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Cartcontext } from "../context folder/appContext"

function CartIcon(props){
    const cart=useContext(Cartcontext)
    return(
        
            <Link style={cart.changeINdex} className="cartContainer" to="/cart">
                <HiMiniShoppingCart/>
                <p className="carttext">{props.countt}</p>
            </Link>
            
        
    )
}
export default CartIcon