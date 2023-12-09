import { useState } from "react"
import { Cartcontext } from "../context folder/appContext"
import { useContext } from "react"


function ItemQuantity(props){
    const cart=useContext(Cartcontext)
    
    let [quantitys, newQuantitys]=useState(props.quantity)
    
    function increaseQuantitys(){
        cart.increaseProductQuantity(props.id, props.price)   
        let count=props.quantity+1
        newQuantitys(count)
    }
    function decreaseQuantitys(){
        quantitys>1&&cart.decreaseProductQuantity(props.id, props.price)
        let count=props.quantity-1
        newQuantitys(count)
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
