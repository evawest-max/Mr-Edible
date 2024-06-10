import React, { useState } from 'react'
import "./about-vendor.css"
import { getDownloadURL, getStorage, ref as storageref} from 'firebase/storage'
import { storage } from '../../firebase component/firebase config'

export default function AboutVendor({id, bussinessName, logo, rating, about, storeStatus, address, email, phonenumber}) {
    const storage= getStorage()
    let [pic, setPic]=useState("https://robohash.org/vendor")
    getDownloadURL(storageref(storage, `${logo}`))
    .then((url) => {
        setPic(url )
        // alert(url)
    })
    .catch((error)=>{
        console.log(error)
        setPic("https://robohash.org/vendor")
    })

    return (
    <div>
        <div id='Vendors-personal-info'>
                <img src={logo} alt='logo'/>
                <h3>{bussinessName}</h3>
                <p>{email}</p>
                <p>{phonenumber}</p>
                <p>{address}</p>
                <p>{rating}</p>
                <h4>{storeStatus? "CLOSE":"OPEN"}</h4>
        </div>
        <div>
            <p id='vendor-about-us'><b><u>About Us:</u> </b>{about}</p>
        </div>
    </div>
  )
}
