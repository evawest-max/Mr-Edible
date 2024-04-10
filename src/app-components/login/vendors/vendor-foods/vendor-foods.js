import React, { useEffect, useState } from 'react'
import "./vendor-foods.css"
import VendorFoodCard from '../components/vendor food card/vendorFoodCard'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { getDownloadURL, ref as storageref, getStorage } from 'firebase/storage';

export default function VendorFoods() {
  let food=[]
  // if(JSON.parse(localStorage.getItem("vendorsFoodItems"))===null){
  //   alert("yes")
  // }
  JSON.parse(localStorage.getItem("vendorsFoodItems"))!==null?food=Object.values(JSON.parse(localStorage.getItem('vendorsFoodItems'))):alert("Your have not added any food item to your store, kindly click on upload to add foot items.");
  const [list, setList]=useState(
    food.map((item, index)=>{
      function handleClick(){
        // const db=getDatabase()
        // remove(ref(db), "food items/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+item.id)
        alert("item has been deleted")
      }
      return <VendorFoodCard handler={handleClick} image={item.passport} name={item.name} amount={item.amount} oldAmount={item.oldAmount}/> 
    })
  )

  return (
    <div id='vendors-food-item-grid-container'>
      {list}
    </div>
  )
}
  
  