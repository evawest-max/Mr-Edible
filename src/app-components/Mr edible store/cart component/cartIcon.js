import {HiMiniShoppingCart} from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Cartcontext } from "../context folder/appContext"

function CartIcon(){
    const cart=useContext(Cartcontext)
    return(
        
            <Link  className="cartContainer" to="/cart">
                <div><HiMiniShoppingCart/></div>
                <p className="carttext">{cart.numberOfItemsInCart}</p>
            </Link>
            
        
    )
}
export default CartIcon