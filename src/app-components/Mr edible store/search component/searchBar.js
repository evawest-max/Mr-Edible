import { useRef, useState } from "react"
import "./searchBar.css"
import Foodsection from "../Food component/Foodsection"
import foods from "../Food component/foods"
import Fooditem from "../Food component/food item"
import CartIcon from "../cart component/cartIcon"
// import { Link } from "react-router-dom"
import FoodFilter from "../Food component/food filter/foodFilter"
import {AiFillStar} from "react-icons/ai";
// import Cart from "../cart component/cart"
import { useContext } from "react"
import { Cartcontext } from "../context folder/appContext"
import { IoIosSearch } from "react-icons/io";
import { child, get, getDatabase, onValue, ref } from "firebase/database"





 function SearchBar(props){
    // const car=useContext(Cartcontext)
    const cart=useContext(Cartcontext)
    let edFoods=[]
    // console.log(localStorage.getItem("nameobject"))
  
    for (const key in JSON.parse(localStorage.getItem("allVendorItem"))) {
        if (String(key).toLocaleLowerCase() === localStorage.getItem("nameobject").toLocaleLowerCase()){
            Object.values(JSON.parse(localStorage.getItem("allVendorItem"))[key]).map((item)=>{
                edFoods.push(item)
            })
        }
    }
    console.log(edFoods)

    // console.log(cart.buissnessName)
    let [itemsInDatabase, newItemsInDatabase]=useState(edFoods.map((items, index)=>{ 
        let cartcheck=false
        let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
        localStorage.getItem("mredible_cart") !==null?
        Object.keys(allfoods).forEach((item)=>{
            item===localStorage.getItem("nameobject")&&
            allfoods[item].map((product)=>{
                product.id===items.id?cartcheck=true:cartcheck=false  
            })    
        }):cartcheck=false
        
        let star=items.star===1?<AiFillStar/>:items.star===2?<div><AiFillStar/><AiFillStar/></div>:items.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:items.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:items.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
        return(
            <Fooditem key={index} cartcheck={cartcheck} id={items.id} image={items.passport} name={items.name} price={items.amount} oldprice={items.oldAmount} stars={star} vendorName={items.vendorName} availability={items.availability}/>
        ) 
    }))

    let inputRef= useRef()
    
    function findFood(){
        const filtereditemsInDatabase= edFoods.filter((items)=>{
            return items.name.toLocaleLowerCase().includes(inputRef.current.value.toLocaleLowerCase())
        })
        console.log(filtereditemsInDatabase)
        
        newItemsInDatabase(filtereditemsInDatabase.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            // console.log(index)
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
            ) 
        }))
    }

    

    //filter by category
    function filterbycategoryAll(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
            ) 
        }))
    }
    function filterbycategorySnacks(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="snacks"&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbycategoryDrinks(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="drinks"&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbycategoryFoods(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.category==="foods"&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    //filter by price
    function filterbyprice1000(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.amount<=1000&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbyprice1000_4000(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return (item.amount>1000&&item.amount<=4000)&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbypriceOver4000(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.amount>=4000&&<Fooditem key={item.id} id={item.id} cartcheck={cartcheck} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }

    //filter by rating
    function filterbyratings(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===1&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }

    function filterbyratings2(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===2&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbyratings3(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===3&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbyratings4(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===4&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    function filterbyratings5(){
        newItemsInDatabase(edFoods.map((item, index)=>{
            let cartcheck=false
            let allfoods=JSON.parse(localStorage.getItem("mredible_cart"));
            localStorage.getItem("mredible_cart") !==null?
            Object.keys(allfoods).forEach((item)=>{
                item===localStorage.getItem("nameobject")&&
                allfoods[item].map((product)=>{
                    product.id===item.id?cartcheck=true:cartcheck=false  
                })    
            }):cartcheck=false
            let star=item.star===1?<AiFillStar/>:item.star===2?<div><AiFillStar/><AiFillStar/></div>:item.star===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:item.star===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return item.star===5&&<Fooditem key={item.id} cartcheck={cartcheck} id={item.id} image={item.passport} name={item.name} price={item.amount} oldprice={item.oldAmount} stars={star} vendorName={item.vendorName} availability={item.availability}/>
        }))
    }
    // fillter ny 

    return(
        <div className="searchcontainer">
            
            <Foodsection/>
            <CartIcon/>
            <div className="vendor-SearchbarContainer" >
                <input onChange={findFood} ref={inputRef} type="text" placeholder="eg. rice and chicken"/>
                <IoIosSearch/>
            </div>
            

            <div className="fiterandfoodcontainer">
                <FoodFilter filterbyratings={filterbyratings} filterbyratings2={filterbyratings2} filterbyratings3={filterbyratings3} filterbyratings4={filterbyratings4} filterbyratings5={filterbyratings5}
                    filterbyprice1000={filterbyprice1000} filterbyprice1000_4000={filterbyprice1000_4000} filterbypriceOver4000={filterbypriceOver4000}
                    filterbycategoryAll={filterbycategoryAll} filterbycategorySnacks={filterbycategorySnacks} filterbycategoryDrinks={filterbycategoryDrinks} filterbycategoryFoods={filterbycategoryFoods}
                />
                <div className="food-container">
                    {itemsInDatabase}
                </div>
            </div>
        </div>
    )
}
export default SearchBar