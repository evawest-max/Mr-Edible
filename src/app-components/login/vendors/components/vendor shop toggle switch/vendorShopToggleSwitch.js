import { getDatabase, ref, update } from 'firebase/database';
import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

export default function VendorShopToggleSwitch() {
  const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('mredibleloggedinUser')).store_status );
  const handleChange = async(val) => {
    setChecked(val)
    if (checked===true){
      const db=getDatabase();
      const postData={
        last_store_open_date:new Date().toLocaleString(),
        store_status:false
      }
      await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
        // alert('Update successful')
      })
      .catch((error)=>{
        alert(error)
      })
      alert("closed")
    }else{
      const db=getDatabase();
      const postData={
        last_store_open_date:new Date().toLocaleString(),
        store_status:true
      }
      await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
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
      <h4>Shop Open/Close Toggle switch</h4>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}
