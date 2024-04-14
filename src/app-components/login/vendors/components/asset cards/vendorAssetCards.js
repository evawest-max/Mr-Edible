import React from 'react'
import "./vendorAssetCards.css"
// import { FaHome } from "react-icons/fa";

export default function VendorAssetCards(props) {
  return (
    <div id='asset-card-container'>
        <h2> {props.icon} {props.pic2}</h2>
        <p id='asset-card-text1'>{props.fooditems} {props.availablefooditems} {props.tenants} {props.totalRevenue}</p>
        <h1>{props.food} {props.availabeFoods} {props.totalAMount}</h1>
        <p id='asset-card-text2'>{props.unavailableMeals}</p>
    </div>
  )
}
