import { useState } from "react"
import "./searchBar.css"
import vector from "./Vector.svg"
import Foodsection from "../Food component/Foodsection"
import foods from "../Food component/foods"
import Fooditem, { count } from "../Food component/food item"

function SearchBar(){
    const [current, newcurrent]=useState("")
    function findFood(event){
        newcurrent(event.target.value) 
    }

    const filteredItmap= foods.filter((items)=>{
        return items.name.includes(current)
    })
      
    let itmap=filteredItmap.map((item, index)=>{
        return(
            <Fooditem key={index} id={item.id} image={item.link} name={item.name} price={item.amount}/>
        ) 
    })
    
    return(
        <div>
            <div className="SearchbarContainer">
                <input onChange={findFood} value={current} type="text" placeholder="I am searching for..."/>
                <img src={vector} alt="search"/>
            </div>
            <Foodsection/>
            <div className="food-container">
                {itmap}
            </div>
        </div>
    )
}
export default SearchBar