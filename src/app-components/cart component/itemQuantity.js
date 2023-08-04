import { useState } from "react"

let qt=0
function ItemQuantity(){
    const [quantitys, newQuantity]=useState(qt)
        function increaseQuantitys(){
            qt+=1
            newQuantity(qt)
        }
        function decreaseQuantitys(){
            
            qt > 0? qt-=1 : qt+=0
            newQuantity(qt)
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
