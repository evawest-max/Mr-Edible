import React from 'react'
import "./vendorAssetCards.css"
// import { FaHome } from "react-icons/fa";

export default function VendorAssetCards(props) {
  return (
    <div id='asset-card-container'>
        <h2> {props.icon} {props.pic2}</h2>
        <p id='asset-card-text1'>Total no of {props.fooditems} {props.availablefooditems} {props.tenants}</p>
        <h1>{props.food} {props.availabeFoods} {props.numb3}</h1>
        <p id='asset-card-text2'>{props.unavailableMeals} Unavailable Meals</p>
    </div>
  )
}
