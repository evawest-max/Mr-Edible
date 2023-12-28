import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export let productsIDInTheCartList=[]
let changes=false
export const SmileCartcontext= createContext({
  numberOfItemsInCart:0,
  casechange:changes,
  changeINdex:0,
  totalItemInCart:0,
  items:productsIDInTheCartList,
  Smileorders:0,

  getproductquantity:()=>{},
  increaseProductQuantity:()=>{},
  addItemsToCartList:()=>{},
  decreaseProductQuantity:()=>{}, 
  deleteFromCartList:()=>{},
  getTotalCart:()=>{},
  changeZ:()=>{},
  addToOrders:()=>{},
})


function SmileCakesCartprovider({children}) {
  
  const [numberOfItemsInCart, setnumberOfItemsInCart]=useState(localStorage.getItem("smileCakes_cart")!==null? JSON.parse(localStorage.getItem("smileCakes_cart")).length:0)
  const [indexState, setindexState]=useState({ zIndex:"2" })
  function changeZ(){
    changes=!changes
    changes? setindexState({ zIndex:"0" }):setindexState({zIndex:"1"})
  }

  const [totalCart, settotalCart]=useState(productsIDInTheCartList.reduce((total, item)=>{
    return total+(item.price*item.quantity)
  },0))

  function getproductquantity(id){
    const quantity=productsIDInTheCartList.find(product=> product.id===id)?.quantity
    if(quantity===undefined){
      return 0;
    }
    return quantity
  }

  function addItemsToCartList(id, price, name, image){
    console.log('add button was clicked')
    const quantity=getproductquantity(id)
    if (quantity===0){
        productsIDInTheCartList=[{id:id, price:price, name:name, image:image, quantity:1}, ...productsIDInTheCartList ]
      }else{console.log("item already exist in cart")}
    getTotalCart() 
    localStorage.setItem("smileCakes_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("smileCakes_cart")!==null){
      setnumberOfItemsInCart(JSON.parse(localStorage.getItem("smileCakes_cart")).length)
    }
    else{
      setnumberOfItemsInCart(0)
    }
  }

  function deleteFromCartList(id){
    productsIDInTheCartList=productsIDInTheCartList.filter((product)=>{
      return product.id!==id
    })
    console.log(productsIDInTheCartList)
    productsIDInTheCartList.length<1?settotalCart(0):getTotalCart()
    localStorage.setItem("smileCakes_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("smileCakes_cart")!==null){
      setnumberOfItemsInCart(JSON.parse(localStorage.getItem("smileCakes_cart")).length)
    }
    else{
      setnumberOfItemsInCart(0)
    }
  }

  function increaseProductQuantity(id, price, name, image){
    productsIDInTheCartList=productsIDInTheCartList.map(product=>{
        if (product.id === id){
         return {...product, quantity:product.quantity+1}
        }else {return product}
      }) 
    console.log(productsIDInTheCartList)
    getTotalCart()
    localStorage.setItem("smileCakes_cart", JSON.stringify(productsIDInTheCartList))
}

  function decreaseProductQuantity(id){
    const quantity=getproductquantity(id)
      if (quantity===1){
        deleteFromCartList(id)
      }else{
        productsIDInTheCartList=productsIDInTheCartList.map((product)=>{
          if(product.id===id){
            product.quantity--
            return product
          }
          else{return product}
        })
      }
    console.log(productsIDInTheCartList)
    getTotalCart()
    localStorage.setItem("smileCakes_cart", JSON.stringify(productsIDInTheCartList))
  }
  
  function getTotalCart(){
    settotalCart(productsIDInTheCartList.reduce((total, product)=>{
      return total+(product.price*product.quantity)
    },0)
    )
    console.log(totalCart)
  }
  let [itemsInOrders, setitemsInOrders]=useState("Your history is empty")
  
  function addToOrders(){ 
    if (localStorage.getItem("mredibleloggedinUser")!==null){
      let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
      if (loggedinuser.orderedItems){
        loggedinuser={...loggedinuser, orderedItems: (loggedinuser.orderedItems).concat(productsIDInTheCartList)}
        localStorage.setItem("mredibleloggedinUser", JSON.stringify(loggedinuser));
      }
      else{
        loggedinuser={...loggedinuser, orderedItems: productsIDInTheCartList}
      localStorage.setItem("mredibleloggedinUser", JSON.stringify(loggedinuser));
      }
      
    }
    setitemsInOrders(
      JSON.parse(localStorage.getItem("mredibleloggedinUser")).orderedItems.map((item, index)=>{
        return (
          <div key={index} className="ordered-food-item"  >
          <img src={item.image} alt="rice"/>
          <p className="ordered-food-name">{item.name}</p>
          <p className="ordered-food-price"><del>{item.oldprice}</del> ₦{item.price}</p>
          </div>
        )
      })
    )
    
  }

  useEffect(() => {
    
    if (localStorage.getItem("smileCakes_cart")!==null){
      productsIDInTheCartList=JSON.parse(localStorage.getItem("smileCakes_cart"))
    }

    if (localStorage.getItem("mredibleloggedinUser")!==null){
      let loggedinuser=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
      if (loggedinuser.orderedItems&&loggedinuser.orderedItems.length>=1){
        setitemsInOrders(
          JSON.parse(localStorage.getItem("mredibleloggedinUser")).orderedItems.map((item, index)=>{
            return (
              <div key={index} className="ordered-food-item"  >
              <img src={item.image} alt="rice"/>
              <p className="ordered-food-name">{item.name}</p>
              <p className="ordered-food-price"><del>{item.oldprice}</del> ₦{item.price}</p>
              </div>
            )
          })
        )
      }
      else{
        setitemsInOrders(
          "empty"
        )
      }
    }
  }, [])
  


  
  

  const contextvalue={
    signinsuccessful:false,
    numberOfItemsInCart:numberOfItemsInCart,
   
    casechange:changes,
    changeINdex:indexState,
    increaseIndex:true,
    items:productsIDInTheCartList,
    totalItemInCart:totalCart,
    Smileorders:itemsInOrders,

    getproductquantity,
    increaseProductQuantity,
    addItemsToCartList,
    decreaseProductQuantity,
    deleteFromCartList,
    getTotalCart,
    changeZ,
    addToOrders,
    
  }

  return (
    <SmileCartcontext.Provider value={contextvalue}>
      {children}
    </SmileCartcontext.Provider>
  )
}

export default SmileCakesCartprovider