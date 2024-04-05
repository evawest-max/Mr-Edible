import React from 'react'
import "./overview.css"
import AssetCards from '../components/asset cards/assetCards'
import OverviewTodayCard from '../components/overviewtoday card/overviewTodayCard'
import LineChart from '../components/line chart/lineChart'
import { GiSellCard } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";

export default function Overview() {
  return (
    <div id='admin-container-overview'>
       <div id='first-overview-container'>
            <div id='admin-asset-overview'>
                <div>
                    <h3>Assets</h3>
                    <div id='asset-card-main-container'>
                        <AssetCards home=<GiSellCard /> numb1="783" properties="Vendors"/>
                        <AssetCards pic=<IoPersonSharp /> numb2="562" landlords="Customers"/>
                        <AssetCards pic2= <HiMiniUsers/> numb3="3,674" tenants="food items"/>
                    </div>
                </div>
            </div>
            <div id='overview-today-container'>
                <h3>Overview today</h3>
                <div id='today-first-card-container'>
                    <h1><IoFastFoodSharp /></h1>
                    <div>
                        <h2>28</h2>
                        <p>New Food items</p>
                    </div>
                </div>
                <div id='today-second-card-container'>
                    <OverviewTodayCard number1="160" text1="New Costomers"/>
                    <OverviewTodayCard number2="10" text2="New Vendors"/>
                </div>
            </div>
       </div> 
        <LineChart/>
    </div>
  )
}
