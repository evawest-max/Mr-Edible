import React, { useState } from 'react'
import "./vendorFoodCard.css"
import { getDownloadURL, ref as storageref, getStorage } from 'firebase/storage';

export default function VendorFoodCard(props) {
    let [pics, setpics]=useState("")
    const storage=getStorage()
    if(localStorage.getItem("vendorsFoodItems")&&localStorage.getItem("vendorsFoodItems")!==null){
        getDownloadURL(storageref(storage, props.image))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            setpics(url) 
          })
          .catch((error) => {
            alert(error)
          });

    }
    const [deleteButton, setDeleteButton]=useState(<button className='vendor-profile-food-button' onClick={deleteItem}>Delete</button>)
    function deleteItem(){
        setDeleteButton(<div>
            <p>Sure?</p>
            <div>
                <button onClick={confirmDelete}>yes</button>
                <button onClick={cancleDelete}>cancle</button>
            </div>
        </div>)
    }
    function cancleDelete(){
        setDeleteButton(<button className='vendor-profile-food-button' onClick={deleteItem}>Delete</button>)
    }
    
    function confirmDelete(){
        props.handler()
        
    }
  return (
    <div className="vendor-profile-food-item"  >
        <img src={pics} alt="rice"/>
        <p className="vendor-profile-food-name">{props.name}</p>
        <p className="vendor-profile-food-price"><del>{props.oldAmount}</del> ₦{props.amount}</p>
        {/* <div>{props.stars}</div> */}
        {deleteButton}
    </div>
  )
}
