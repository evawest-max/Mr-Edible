import React from 'react'
import "./customer history food card.css"

export default function CustomerHistoryFoodCard(props){
  return (
    <div id="admin-customer-food-item"  >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8GC_TYhSrQrt8Zvf_tpwt1uNnp9HEJjLCx-Jf9VpwaQ&s" alt="rice"/>
        <p id="admin-customer-food-name">Rice{props.name}</p>
        <p id="admin-customer-food-price"><del>5000{props.oldprice}</del> ₦2000{props.price}</p>
        <div>{props.stars}</div>
        <button id='admin-customer-food-button'>confirm for user</button>
    </div>
  )
}
