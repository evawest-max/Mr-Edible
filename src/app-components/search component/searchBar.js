import { useRef, useState } from "react"
import "./searchBar.css"
import Foodsection from "../Food component/Foodsection"
import foods from "../Food component/foods"
import Fooditem from "../Food component/food item"
import CartIcon from "../cart component/cartIcon"
import { Link } from "react-router-dom"
import FoodFilter from "../Food component/food filter/foodFilter"
import {AiFillStar} from "react-icons/ai";
import Cart from "../cart component/cart"
import { useContext } from "react"
import { Cartcontext } from "../context folder/appContext"


let psd=0
export function reduceNumberOnCart(){
    psd--
}

function SearchBar(){
    const cart=useContext(Cartcontext)
    let [itmap, newitmap]=useState(foods.map((items, index)=>{
        
        let star=items.star===1?<AiFillStar/>:items.star===2?<div><AiFillStar/><AiFillStar/></div>:items.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:items.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:items.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
        
        return(
            <Fooditem key={index} addclickeds={addclicked} removeclickeds={removeclicked} id={items.id} image={items.link} name={items.name} price={items.amount} oldprice={items.oldAmount} stars={star}/>
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
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
            ) 
        }))
    }

    

    //filter by category
    function filterbycategoryAll(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
            ) 
        }))
    }
    function filterbycategorySnacks(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="snacks"&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbycategoryDrinks(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="drinks"&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbycategoryFoods(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="foods"&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    //filter by price
    function filterbyprice1000(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.amount<=1000&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbyprice1000_4000(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return (item.amount>1000&&item.amount<=4000)&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbypriceOver4000(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.amount>=4000&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }

    //filter by rating
    function filterbyratings(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===1&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }

    function filterbyratings2(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===2&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbyratings3(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===3&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbyratings4(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===4&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    function filterbyratings5(){
        newitmap(foods.map((item, index)=>{
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===5&&<Fooditem key={item.id} addclickeds={addclicked} removeclickeds={removeclicked} id={item.id} image={item.link} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star}/>
        }))
    }
    // fillter ny 

    return(
        <div className="searchcontainer">
            
            <CartIcon countt={counts}/>
            <div className="SearchbarContainer" style={cart.changeINdex}>
                <input onChange={findFood} ref={inputRef} type="text" placeholder="I am searching for..."/>
            </div>
            
             
            <Foodsection/>
            <div className="fiterandfoodcontainer">
                <FoodFilter filterbyratings={filterbyratings} filterbyratings2={filterbyratings2} filterbyratings3={filterbyratings3} filterbyratings4={filterbyratings4} filterbyratings5={filterbyratings5}
                    filterbyprice1000={filterbyprice1000} filterbyprice1000_4000={filterbyprice1000_4000} filterbypriceOver4000={filterbypriceOver4000}
                    filterbycategoryAll={filterbycategoryAll} filterbycategorySnacks={filterbycategorySnacks} filterbycategoryDrinks={filterbycategoryDrinks} filterbycategoryFoods={filterbycategoryFoods}
                />
                <div className="food-container">
                    {itmap}
                </div>
            </div>
        </div>
    )
}
export default SearchBar