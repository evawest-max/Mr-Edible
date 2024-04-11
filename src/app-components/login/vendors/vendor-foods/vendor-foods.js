import React, { useEffect, useState } from 'react'
import "./vendor-foods.css"
import VendorFoodCard from '../components/vendor food card/vendorFoodCard'
import { getDatabase, ref, onValue, remove, set, update } from "firebase/database";
import { getDownloadURL, ref as storageref, getStorage } from 'firebase/storage';

export default function VendorFoods() {
  let food=[]
  
  JSON.parse(localStorage.getItem("vendorsFoodItems"))!==null?food=Object.values(JSON.parse(localStorage.getItem('vendorsFoodItems'))):alert("Your have not added any food item to your store, kindly click on upload to add foot items.");
  const [list, setList]=useState(
    food.map((item, index)=>{
      async function handleClick(){
        const db=getDatabase()
        await update(ref(db), "food items/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+item.id, {value:null}).then(()=>{

        }).catch((error)=>{
          alert(error)
        })
        alert("item has been deleted")
      }
      return <VendorFoodCard key={index} handler={handleClick} id={item.id} availability={item.availability} image={item.passport} name={item.name} amount={item.amount} oldAmount={item.oldAmount}/> 
    })
  )

  if (localStorage.getItem("mredibleloggedinUser")!==null){
    const db = getDatabase();
    const userRef = ref(db, "food items/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name );
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      localStorage.setItem("vendorsFoodItems", JSON.stringify(data))
    });
  }

  return (
    <div id='vendors-food-item-grid-container'>
      {list}
    </div>
  )
}
  
  