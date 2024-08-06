import React, { useState } from 'react'
import "./about-vendor.css"
import { getDownloadURL, getStorage, ref as storageref} from 'firebase/storage'


export default function AboutVendor() {
    let vendor=JSON.parse(localStorage.getItem("vendors"))
    const storage= getStorage()
    let [pic, setPic]=useState("https://robohash.org/vendor")
    getDownloadURL(storageref(storage, `${vendor[0].passport}`))
    .then((url) => {
        setPic(url )
        // alert(url)
    })
    .catch((error)=>{
        console.log(error)
        setPic("https://robohash.org/vendor")
    })
    console.log(vendor)
    return (
    <div>
        <div id='Vendors-personal-info-about'>
                <img src={pic} alt='logo'/>
                <h2>{vendor[0].bussiness_name}</h2>
                <p>{vendor[0].email}</p>
                <p>{vendor[0].phonenumber}</p>
                <p>{vendor[0].address}</p>
                <p>We are rated {vendor[0].rating} stars</p>
                <h4>We are <b>{vendor[0].store_status===false? "CLOSE for now, check back later":"OPEN to serve you 🥰"}</b></h4>
        </div>
        <div>
            <p id='vendor-about-us'><b><u>About Us:</u> </b>{vendor[0].aboutUs}</p>
        </div>
    </div>
  )
}
