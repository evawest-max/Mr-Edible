import React, { createContext } from 'react'
import { useState } from 'react'

let cartproducts=[]
export const Cartcontext= createContext({
  totalItemInCart:0,
  items:cartproducts,
  getproductquantity:()=>{},
  addOneToCart:()=>{},
  additem:()=>{},
  removeOneFromCart:()=>{}, 
  deleteFromCart:()=>{},
  getTotalCart:()=>{},
})


function Cartprovider({children}) {
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
           return {id:product.id, price:product.price, name:product.name, image:product.image, quantity:product.quantity+1}
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
    items:cartproducts,
    totalItemInCart:totalCart,
    getproductquantity,
    addOneToCart,
    additem,
    removeOneFromCart,
    deleteFromCart,
    getTotalCart
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider