import { useState } from "react"
// import { Cartcontext } from "../../Mr edible store/context folder/appContext"
import { useContext } from "react"
import { SmileCartcontext } from "../smile cartContext/smileCartContext"


function ItemQuantity(props){
    const cart=useContext(SmileCartcontext)
    
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
