import React, { createContext } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {RiLoginBoxFill} from "react-icons/ri"
import users from '../signup/usersData'

let cartproducts=[]
let changes=false
export const Cartcontext= createContext({
  currentUser: 0,
  loginIcon:0,
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
  switchToUser:()=>{},
  signout:()=>{},
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
  const [loginIcon, setloginIcon]= useState(
    <div className="login-container">
      <div><RiLoginBoxFill/></div>
      <NavLink to="/login-page">
      <p>SIGN IN/SIGN UP</p>
      </NavLink>
    </div>)

  let [userloggedin, setuserloggedin]=useState({})
  let userloggedindisplay={}

  function switchToUser(index){
    setuserloggedin({...users[index], password:"*******"})
    userloggedindisplay={...users[index], password:"*******"}
    setloginIcon(
      <div className="login-container">
        <div><RiLoginBoxFill/></div>
        <NavLink to="/user-profile">
        <p>{userloggedindisplay.name}</p>
        </NavLink>
      </div>)
  }

  function signout(){
    setuserloggedin({})
    setloginIcon(
      <div className="login-container">
        <div><RiLoginBoxFill/></div>
        <NavLink to="/login-page">
        <p>SIGN IN/SIGN UP</p>
        </NavLink>
      </div>)
  }

  const contextvalue={
    currentUser: userloggedin,
    loginIcon:loginIcon,
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
    changeZ,
    switchToUser,
    signout,
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider