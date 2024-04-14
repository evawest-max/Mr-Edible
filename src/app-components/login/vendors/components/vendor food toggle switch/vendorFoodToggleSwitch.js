import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

export default function VendorFoodToggleSwitch(props) {
    let food=localStorage.getItem("vendorsFoodItems")!==null && JSON.parse(localStorage.getItem("vendorsFoodItems"))
    let result=null
    if (localStorage.getItem("vendorsFoodItems")!==null){
        Object.keys(food).forEach(key => {
            if (food[key].id===props.id){
                result= food[key].availability
            }
        })
    }
    const [checked, setChecked] = useState(result);

  const handleChange = async(val) => {
    setChecked(val)
    if (checked===true){
      const db=getDatabase();
      const postData={
        availability:false
      }
      await update (ref(db,"food items/"+JSON.parse(localStorage.getItem("mredibleloggedinUser")).name+"/" +props.id ), postData).then(() => {  
        // alert('Update successful')
      })
      .catch((error)=>{
        alert(error)
      })
      alert("closed")
    }else{
      const db=getDatabase();
      const postData={
        availability:true
      }
      await update (ref(db,"food items/"+JSON.parse(localStorage.getItem("mredibleloggedinUser")).name+"/"+props.id), postData).then(() => {  
        // alert('Update successful')
      })
      .catch((error)=>{
        alert(error)
      })
      alert("Open")
    }

  }
  

  return (
    <div  style={{textAlign: "center"}}>
      <h4>Availability Toggle switch</h4>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}
