import { useState } from "react"
import { Cartcontext } from "../context folder/appContext"
import { useContext } from "react"


function ItemQuantity(props){
    const cart=useContext(Cartcontext)
    cart.items.filter((product)=>{
        return product.id===props.id
    })
    let quantity=cart.items.find(product=> product.id===props.id)?.quantity
    let [quantitys, newQuantitys]=useState(quantity)
            function increaseQuantitys(){
                newQuantitys(cart.items.find(product=> product.id===props.id)?.quantity+1)
                cart.addOneToCart(props.id, props.price)   
            }
            function decreaseQuantitys(){
                newQuantitys(cart.items.find(product=> product.id===props.id)?.quantity-1)
                quantitys>1&&cart.removeOneFromCart(props.id, props.price)
                quantitys<2&&newQuantitys(1)
            }

    return (
        <div className="increaseCartNumb">
            <p onClick={increaseQuantitys} className="increaseBtn">+</p>
            <p className="increaseNumb">{quantitys}</p>
            <p onClick={decreaseQuantitys} className="increaseBtn">-</p>
        </div>
    )
}

export default ItemQuantity
