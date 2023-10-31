import React from 'react'
import "./vendor-card.css"


function VendorCard({name,image,rating}) {
    return (
        <div id='vendorcard-container'>
            <h3 id='vendor-title'>{name}</h3>
            <div id='vendor-secondDIv'>
                <img src={image} alt='SmileCakes'/>
                <div id='vendor-thirdDIv'>
                    <p id='vendor-about'>This is a worldclass cake-shop that have served the FMCG since 2015</p>
                    <div id='vendor-rating'><p>Ratings:</p><div>{rating}</div></div>
                    <button id='vendor-button'>Visit online store</button>
                </div>
            </div>
        </div>
    )
}


export default VendorCard