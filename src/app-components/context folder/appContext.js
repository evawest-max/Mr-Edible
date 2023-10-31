import React, { createContext } from 'react'
import { useState } from 'react'

let cartproducts=[]
let changes=false
export const Cartcontext= createContext({
  casechange:changes,
  changeINdex:0,
  totalItemInCart:0,
  items:cartproducts,
  getproductquantity:()=>{},
  addOneToCart:()=>{},
  additem:()=>{},
  removeOneFromCart:()=>{}, 
  deleteFromCart:()=>{},
  getTotalCart:()=>{},
  changeZ:()=>{},
})


function Cartprovider({children}) {

  const [indexState, setindexState]=useState({ zIndex:"2" })
  function changeZ(){
    changes=!changes
    changes? setindexState({ zIndex:"0" }):setindexState({zIndex:"1"})
  }

  const [totalCart, settotalCart]=useState(cartproducts.reduce((total, item)=>{
    return total+(item.price*item.quantity)
  },0))

  function getproductquantity(id){
    const quantity=cartproducts.find(product=> product.id===id)?.quantity
    
    if(quantity===undefined){
      return 0;
    }
    return quantity
  }

  function additem(id, price, name, image){
    const quantity=getproductquantity(id)
    if (quantity===0){
        cartproducts=[...cartproducts, {id:id, price:price, name:name, image:image,quantity:1}]
      }else{console.log("item already exist in cart")}
    getTotalCart() 
  }

  function addOneToCart(id, price, name, image){
    //const quantity=getproductquantity(id)
    
      cartproducts=
        cartproducts.map(
          product=>
          {if (product.id === id){
           return {...product, quantity:product.quantity+1}
          }else {return product}}
        ) 
    
      console.log(cartproducts)
      getTotalCart()
  }

  function removeOneFromCart(id){
    const quantity=getproductquantity(id)
    
      if (quantity===1){
        deleteFromCart(id)
      }else{
        cartproducts=cartproducts.map((product)=>{
          if(product.id===id){
            product.quantity--
            return product
          }
          else{return product}
        
        })
      }

    console.log(cartproducts)
    getTotalCart()
  }

  function deleteFromCart(id){
    cartproducts=cartproducts.filter((product)=>{
      return product.id!==id
    })
    console.log(cartproducts)
    cartproducts.length<1?settotalCart(0):getTotalCart()
  }
  
  function getTotalCart(){
    settotalCart(cartproducts.reduce((total, product)=>{
      return total+(product.price*product.quantity)
    },0)
    )
    console.log(totalCart)
  }

  const contextvalue={
    casechange:changes,
    changeINdex:indexState,
    increaseIndex:true,
    items:cartproducts,
    totalItemInCart:totalCart,
    getproductquantity,
    addOneToCart,
    additem,
    removeOneFromCart,
    deleteFromCart,
    getTotalCart,
    changeZ
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider