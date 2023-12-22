import {HiMiniShoppingCart} from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useContext } from "react"

import { SmileCartcontext } from "../smile cartContext/smileCartContext"

function CartIcon(){
    const cart=useContext(SmileCartcontext)

    // style={cart.changeINdex}
    return(
        
            <Link  className="cartContainer" to="/smile-cakes-cart">
                <HiMiniShoppingCart/>
                <p className="carttext">{cart.numberOfItemsInCart}</p>
            </Link>
            
        
    )
}
export default CartIcon