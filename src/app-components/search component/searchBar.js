import { useRef, useState } from "react"
import "./searchBar.css"
import vector from "./Vector.svg"
import Foodsection from "../Food component/Foodsection"
import foods from "../Food component/foods"
import Fooditem from "../Food component/food item"
import CartIcon from "../cart component/cartIcon"
import { Link } from "react-router-dom"

let psd=0
export function reduceNumberOnCart(){
    psd--
}
function SearchBar(){
    let [itmap, newitmap]=useState(foods.map((items, index)=>{
        return(
            <Fooditem key={index} addclickeds={addclicked} removeclickeds={removeclicked} id={items.id} image={items.link} name={items.name} price={items.amount}/>
        ) 
    }))

    let inputRef= useRef()
    const [counts, newcounts]=useState(psd)
    function addclicked(){
        psd+=1
        newcounts(psd)
    }
    function removeclicked(){
        psd-=1
        newcounts(psd)
    }

    function findFood(){
        const filteredItmap= foods.filter((items)=>{
            return items.name.toLocaleLowerCase().includes(inputRef.current.value.toLocaleLowerCase())
        })
        console.log(filteredItmap)
        
        newitmap(filteredItmap.map((item, index)=>{
            console.log(index)
            return(
                <Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} />
            ) 
        }))
    }
    
    return(
        <div>
            <Link to="/cart" className="fruit"><CartIcon countt={counts}/></Link>
            <div className="SearchbarContainer">
                <input onChange={findFood}  ref={inputRef} type="text" placeholder="I am searching for..."/>
                <img src={vector} alt="search"/>
            </div>
            
             
            <Foodsection/>
            <div className="food-container">
                {itmap }
            </div>
        </div>
    )
}
export default SearchBar