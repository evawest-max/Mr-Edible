import React, { useState } from 'react'
import "./vendor overview.css"
import VendorAssetCards from '../components/asset cards/vendorAssetCards'
import { GiMeal } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
// import AssetCards from '../components/asset cards/assetCards'
// import OverviewTodayCard from '../components/overviewtoday card/overviewTodayCard'
// import LineChart from '../components/line chart/lineChart'
import VendorLineChart from '../components/Vendor line chart/VendorlineChart';
import { getDownloadURL, getStorage, ref as storageref  } from 'firebase/storage';
import VendorOverviewTodayCard from '../components/Vendor overviewtoday card/vendoroverviewTodayCard';
// import VendorOverviewTodayCard from '../components/Vendor overviewtoday card/vendorverviewTodayCard';
// import { GiSellCard } from "react-icons/gi";
// import { IoFastFoodSharp } from "react-icons/io5";
// import { IoPersonSharp } from "react-icons/io5";
// import { HiMiniUsers } from "react-icons/hi2";

export default function VendorProfileOverview() {
    let totalFood=0
    let availableFoods=0
    if (localStorage.getItem("vendorsFoodItems")!==null){
        let totalFoodsInLocal=JSON.parse(localStorage.getItem("vendorsFoodItems"))
        for(let key in totalFoodsInLocal) {
            ++totalFood;
        }
        Object.keys(totalFoodsInLocal).forEach(key => {
            if (totalFoodsInLocal[key].availability){
                    ++availableFoods
                }
        });
        

    }
    let unavailableMeals=totalFood-availableFoods
    // console.log(totalFood)


    const bussinessName= JSON.parse(localStorage.getItem("mredibleloggedinUser")).bussiness_name
    const email=JSON.parse(localStorage.getItem("mredibleloggedinUser")).email
    const phoneNumber=JSON.parse(localStorage.getItem("mredibleloggedinUser")).phonenumber
    const address=JSON.parse(localStorage.getItem("mredibleloggedinUser")).address
    const bankName=JSON.parse(localStorage.getItem("mredibleloggedinUser")).bankName
    const accountNumber=JSON.parse(localStorage.getItem("mredibleloggedinUser")).accountNumber
    const mrEdiblePoints=JSON.parse(localStorage.getItem("mredibleloggedinUser")).ediblePoints
    const aboutus=JSON.parse(localStorage.getItem("mredibleloggedinUser")).aboutUs
    const storage=getStorage()
    let [pic, setPic]=useState("https://robohash.org/fghj")
    let part=JSON.parse(localStorage.getItem('mredibleloggedinUser')).id
    getDownloadURL(storageref(storage, `${JSON.parse(localStorage.getItem('mredibleloggedinUser')).passport}`))
    .then((url) => {
        setPic(url )
    })
    .catch((error)=>{
        console.log(error)
        setPic("https://robohash.org/fghj")
    })

  return (
    <div id='admin-container-overview'>
       <div id='first-overview-container'>
            <div id='Vendors-personal-info'>
                <img src={pic} alt='logo'/>
                <h3>{bussinessName}</h3>
                <p>{email}</p>
                <p>{phoneNumber}</p>
                <p>{address}</p>
                <p>{bankName} {accountNumber}</p>
                <p></p>
                <p>Edible points: {mrEdiblePoints}</p>
                
            </div>
            <div>
                <p id='vendor-about-us'><b><u>About Us:</u> </b>{aboutus}</p>
                <div id='vendor-asset-overview'>
                    <div>
                        <h3>Assets</h3>
                        <div id='vendor-asset-card-main-container'>
                            <VendorAssetCards food={totalFood} unavailableMeals={`${unavailableMeals} Unavailable Meals`} fooditems="Total number of Meals" icon=<GiMeal />/>
                            <VendorAssetCards availabeFoods={availableFoods} unavailableMeals={`${unavailableMeals} Unavailable Meals`} availablefooditems=" Total number of Available Meals" icon=<GiMeal />/>
                            <VendorAssetCards totalAMount={"3.5 Million"} unavailableMeals={"789 items sold"} totalRevenue="Total Revenew" icon=<FaMoneyBillTrendUp />/>
                        </div>
                    </div>
                </div>
                <div id='vendor-overview-today-container'>
                    <h3>Overview today</h3>
                    <div id='vendor-today-first-card-container'>
                        <div>
                            <p>WE ARE <h2>{JSON.parse(localStorage.getItem('mredibleloggedinUser')).store_status? "OPEN":"CLOSED"}</h2></p>
                            
                        </div>
                    </div>
                    <div id='vendor-today-second-card-container'>
                        <VendorOverviewTodayCard number1="28" text1="Pending order"/>
                        <VendorOverviewTodayCard number1="6" text1="Notifications"/>
                        {/* <OverviewTodayCard />
                        <OverviewTodayCard number2="10" text2="New Vendors"/> */}
                    </div>
                </div>

            </div>
       </div> 
        <VendorLineChart/>
    </div>
  )
}
