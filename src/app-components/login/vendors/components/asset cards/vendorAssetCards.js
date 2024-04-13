import React from 'react'
import "./vendorAssetCards.css"
// import { FaHome } from "react-icons/fa";

export default function VendorAssetCards(props) {
  return (
    <div id='asset-card-container'>
        <h2>{props.food} {props.home} {props.pic2}</h2>
        <p id='asset-card-text1'>Total no of {props.properties} {props.landlords} {props.tenants}</p>
        <h1>{props.numb1} {props.numb2} {props.numb3}</h1>
        <p id='asset-card-text2'>54 Added Today</p>
    </div>
  )
}
