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

  getproductquantity:()=>{},
  increaseProductQuantity:()=>{},
  addItemsToCartList:()=>{},
  decreaseProductQuantity:()=>{}, 
  deleteFromCartList:()=>{},
  getTotalCart:()=>{},
  changeZ:()=>{},
  
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

  useEffect(()=>{
    if (localStorage.getItem("smileCakes_cart")!==null){
      productsIDInTheCartList=JSON.parse(localStorage.getItem("smileCakes_cart"))
    }
},[])
  
  

  

  
  

  const contextvalue={
    signinsuccessful:false,
    numberOfItemsInCart:numberOfItemsInCart,
   
    casechange:changes,
    changeINdex:indexState,
    increaseIndex:true,
    items:productsIDInTheCartList,
    totalItemInCart:totalCart,
    getproductquantity,
    increaseProductQuantity,
    addItemsToCartList,
    decreaseProductQuantity,
    deleteFromCartList,
    getTotalCart,
    changeZ,
    
  }

  return (
    <SmileCartcontext.Provider value={contextvalue}>
      {children}
    </SmileCartcontext.Provider>
  )
}

export default SmileCakesCartprovider