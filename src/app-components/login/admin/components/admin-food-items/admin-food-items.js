import React from 'react'
import "./admin-food-items.css"

export default function AdminFoodItems(props){
  return (
    <div id="admin-vendorfood-item"  >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8GC_TYhSrQrt8Zvf_tpwt1uNnp9HEJjLCx-Jf9VpwaQ&s" alt="rice"/>
        <p id="admin-vendor-food-name">Rice{props.name}</p>
        <p id="admin-vendor-food-price"><del>5000{props.oldprice}</del> ₦2000{props.price}</p>
        <div>{props.stars}</div>
        <textarea required maxLength={200}/>
        <button id='admin-vendor-food-button'>Delete</button>
    </div>
  )
}
