import mdi_cart from "./mdi_cart.svg"

function CartIcon(props){
    return(
        <div className="cartContainer">
            <img  src={mdi_cart} alt="cart"/>
            <p className="carttext">{props.countt}</p>
        </div>
    )
}
export default CartIcon