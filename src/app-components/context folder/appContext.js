import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, NavLink, json } from 'react-router-dom'
import {RiLoginBoxFill} from "react-icons/ri"
import { FaUserCircle } from "react-icons/fa";
import users from '../signup/usersData'

export let productsIDInTheCartList=[]
let changes=false
export const Cartcontext= createContext({
  signinsuccessful:false,
  
  numberOfItemsInCart:0,
  currentUser: 0,
  loginIcon:0,
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
  switchToUser:()=>{},
  signout:()=>{},
  deleteUserAccount:()=>{},
})


function Cartprovider({children}) {
  
  const [numberOfItemsInCart, setnumberOfItemsInCart]=useState(localStorage.getItem("mredible_cart")!==null? JSON.parse(localStorage.getItem("mredible_cart")).length:0)
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
    const quantity=getproductquantity(id)
    if (quantity===0){
        productsIDInTheCartList=[{id:id, price:price, name:name, image:image, quantity:1}, ...productsIDInTheCartList ]
      }else{console.log("item already exist in cart")}
    getTotalCart() 
    localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("mredible_cart")!==null){
      setnumberOfItemsInCart(JSON.parse(localStorage.getItem("mredible_cart")).length)
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
    localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
    if (localStorage.getItem("mredible_cart")!==null){
      setnumberOfItemsInCart(JSON.parse(localStorage.getItem("mredible_cart")).length)
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
    localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
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
    localStorage.setItem("mredible_cart", JSON.stringify(productsIDInTheCartList))
  }
  
  function getTotalCart(){
    settotalCart(productsIDInTheCartList.reduce((total, product)=>{
      return total+(product.price*product.quantity)
    },0)
    )
    console.log(totalCart)
  }

  useEffect(()=>{
    if (localStorage.getItem("mredible_cart")!==null){
      productsIDInTheCartList=JSON.parse(localStorage.getItem("mredible_cart"))
    }
},[])
  
  const [loginIcon, setloginIcon]= useState(
    <div className="login-container">
      <div><FaUserCircle /></div>
      <NavLink to="/login-page">
      <p>SIGN IN/SIGN UP</p>
      </NavLink>
    </div>)

  let [userloggedin, setuserloggedin]=useState({})
  let userloggedindisplay={}

  function switchToUser(index){
    setuserloggedin({...users[index], password:"*******"})
    userloggedindisplay={...users[index], password:"*******"}
    
    const stringofuser=JSON.stringify(userloggedindisplay)
    localStorage.setItem("mredibleloggedinUser", stringofuser);
    let existing = localStorage.getItem('mredibleloggedinUser')
    existing=existing && JSON.parse(existing)

    setloginIcon(
      <div className="login-container">
        <div><div><img src={existing.passport?existing.passport:"www.robohash.com/2"} width="20px" height="20px" alt='user pic'/></div></div>
        <NavLink to="/user-profile">
        <p>{existing.name}</p>
        </NavLink>
      </div>)
  }

  function signout(){
    setuserloggedin({})
    setloginIcon(
      <div className="login-container">
        <div><FaUserCircle /></div>
        <NavLink to="/login-page">
        <p>SIGN IN/SIGN UP</p>
        </NavLink>
      </div>)
  }

  useEffect(() => {
    // useffect calls a keepuserloggedin() function to keep use signed in when the browser reloads
    keepuserloggedin()
 }, []);

 function keepuserloggedin(){
  if (localStorage.getItem('mredibleloggedinUser') !== null){
  let userDataFromLocalStorage=JSON.parse(localStorage.getItem('mredibleloggedinUser'))
  userloggedindisplay=userDataFromLocalStorage
  setuserloggedin(userDataFromLocalStorage)
  console.log(userDataFromLocalStorage)
  setloginIcon(
    <div className="login-container">
      <div><img src={userDataFromLocalStorage.passport} width="20px" height="20px" alt='user pic'/> </div>
      <Link to="/user-profile">
      <p> {userDataFromLocalStorage.name}</p>
      </Link>
    </div>)
  }
  if (localStorage.getItem('mredibleaccount') !== null){
    while(users.length>0){
      users.pop()
    }
  let accountDataFromLocalStorage=localStorage.getItem('mredibleaccount')
  let thedata=JSON.parse(accountDataFromLocalStorage)
  thedata.forEach(element => {
    users.push(element)
  });
  }
}

  function deleteUserAccount(index){
    users.splice(index, 1)
    setuserloggedin({})
    localStorage.setItem('mredibleaccount', JSON.stringify(users))
    setloginIcon(
      <div className="login-container">
        <div><FaUserCircle /></div>
        <NavLink to="/login-page">
        <p>SIGN IN/SIGN UP</p>
        </NavLink>
      </div>)
  }

  const contextvalue={
    signinsuccessful:false,
    numberOfItemsInCart:numberOfItemsInCart,
    currentUser: userloggedin,
    loginIcon:loginIcon,
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
    switchToUser,
    signout,
    deleteUserAccount,
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider