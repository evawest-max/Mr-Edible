import React from 'react'
import "./vendor-card.css"
import {NavLink } from 'react-router-dom';



function VendorCard({name,image,rating, about, vendorPage}) {
    console.log(image)
    return (
        <div id='vendorcard-container'>
            
            <div id='vendor-secondDIv'>
                <NavLink to={vendorPage}>
                    <img src={image} alt='vendor_image'/>
                </NavLink>
                <div id='vendor-thirdDIv'>
                    {/* <p id='vendor-about'>{about}</p> */}
                    <div id='vendor-rating'><p></p><div>{rating}</div></div>
                    {/* <button id='vendor-button'>Visit online store</button> */}
                    
                </div>
            </div>
        </div>
    )
}

export default VendorCard