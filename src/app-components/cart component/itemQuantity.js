import { useState } from "react"



function ItemQuantity(props){
    let [quantitys, newQuantitys]=useState(1)
            function increaseQuantitys(){
                let qt=quantitys+1
                newQuantitys(qt)
                //console.log(quantitys)
               
                //itemamount=item.amount*qt
            }
            function decreaseQuantitys(){ 
                let qt=quantitys-1
                newQuantitys(qt)
                console.log(quantitys)
                
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
