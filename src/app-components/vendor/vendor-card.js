import React from 'react'
import "./vendor-card.css"
import mrEdible from "./mrEdible.PNG";
import { Link, NavLink } from 'react-router-dom';
import vendorsdata from './vendorDatabase';


function VendorCard({name,image,rating, about, vendorPage}) {
    console.log(image)
    return (
        <div id='vendorcard-container'>
            <h3 id='vendor-title'>{name}</h3>
            <div id='vendor-secondDIv'>
                <img src={image} alt='vendor_image'/>
                <div id='vendor-thirdDIv'>
                    <p id='vendor-about'>{about}</p>
                    <div id='vendor-rating'><p>Ratings:</p><div>{rating}</div></div>
                    <NavLink to={vendorPage}>
                    <button id='vendor-button'>Visit online store</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default VendorCard