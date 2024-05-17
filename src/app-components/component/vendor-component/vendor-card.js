import React, { useContext, useState } from 'react'
import "./vendor-card.css"
import {NavLink } from 'react-router-dom';
import { getDownloadURL, getStorage, ref as storageref } from 'firebase/storage';
import SearchBar from '../../Mr edible store/search component/searchBar';
import Cart from '../../Mr edible store/cart component/cart';
import { Cartcontext } from '../../Mr edible store/context folder/appContext';

export let storeName="genesis group"
function ring(){
    alert("ringing")
}

function VendorCard({id, name,image,rating, about, vendorPage}) {
    let  cart=useContext(Cartcontext)
    console.log(image)
    const storage= getStorage()
    let [pic, setPic]=useState("https://robohash.org/vendor")
    getDownloadURL(storageref(storage, `${image}`))
    .then((url) => {
        setPic(url )
    })
    .catch((error)=>{
        console.log(error)
        setPic("https://robohash.org/vendor")
    })
    
    function sendShopDetail(){
        cart.forwardDetails(name, image)
    }
    return (
        <div id='vendorcard-container'>
            
            {/* <div id='vendor-secondDIv'> */}
                <NavLink onClick={sendShopDetail} to={"/mrEdible"}>
                    <img src={pic} alt='vendor_image'/>
                </NavLink>
                    {/* <p id='vendor-about'>{about}</p> */}
                    <div id='vendor-card-name'>{name}</div>
                    <div id='vendor-rating'>{rating}</div>
                    <button id='vendor-Aboutus-button'>About us</button>
            {/* </div> */}
        </div>
    )
}

export default VendorCard